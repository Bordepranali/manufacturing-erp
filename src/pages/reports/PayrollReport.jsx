import { useMemo, useState } from "react";
import { ArrowLeft, Download, Eye, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    payrollNo: "PAY-2026-006",
    employeeId: "EMP-001",
    employee: "Rahul Deshmukh",
    department: "Production",
    period: "September 2026",
    gross: 34500,
    deductions: 1200,
    net: 33300,
    status: "Pending"
  },
  {
    payrollNo: "PAY-2026-005",
    employeeId: "EMP-002",
    employee: "Sneha Patil",
    department: "Quality",
    period: "September 2026",
    gross: 31000,
    deductions: 900,
    net: 30100,
    status: "Paid"
  },
  {
    payrollNo: "PAY-2026-004",
    employeeId: "EMP-003",
    employee: "Amit Kulkarni",
    department: "Inventory",
    period: "September 2026",
    gross: 17500,
    deductions: 300,
    net: 17200,
    status: "Pending"
  },
  {
    payrollNo: "PAY-2026-003",
    employeeId: "EMP-004",
    employee: "Priya Joshi",
    department: "Finance",
    period: "September 2026",
    gross: 28800,
    deductions: 700,
    net: 28100,
    status: "Paid"
  },
  {
    payrollNo: "PAY-2026-002",
    employeeId: "EMP-005",
    employee: "Vikram Shinde",
    department: "Maintenance",
    period: "September 2026",
    gross: 26000,
    deductions: 150,
    net: 25850,
    status: "Pending"
  },
  {
    payrollNo: "PAY-2026-001",
    employeeId: "EMP-006",
    employee: "Neha Patil",
    department: "Production",
    period: "September 2026",
    gross: 32500,
    deductions: 200,
    net: 32300,
    status: "Paid"
  },
  {
    payrollNo: "PAY-2026-007",
    employeeId: "EMP-007",
    employee: "Rohit Jadhav",
    department: "Dispatch",
    period: "September 2026",
    gross: 22000,
    deductions: 400,
    net: 21600,
    status: "Pending"
  },
  {
    payrollNo: "PAY-2026-008",
    employeeId: "EMP-008",
    employee: "Kavita More",
    department: "HR",
    period: "September 2026",
    gross: 29500,
    deductions: 600,
    net: 28900,
    status: "Paid"
  }
];

function PayrollReport() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.payrollNo
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.employee
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.employeeId
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        item.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [data, search, departmentFilter, statusFilter]);

  const totalGross = filteredData.reduce(
    (sum, item) => sum + item.gross,
    0
  );

  const totalDeductions = filteredData.reduce(
    (sum, item) => sum + item.deductions,
    0
  );

  const totalNet = filteredData.reduce(
    (sum, item) => sum + item.net,
    0
  );

  const paidAmount = filteredData
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.net, 0);

  const pendingAmount = filteredData
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.net, 0);

  const paidCount = filteredData.filter(
    (item) => item.status === "Paid"
  ).length;

  const deletePayroll = (payrollNo) => {
    if (
      window.confirm(
        "Are you sure you want to delete this payroll record?"
      )
    ) {
      setData((current) =>
        current.filter(
          (item) => item.payrollNo !== payrollNo
        )
      );
    }
  };

  const exportReport = () => {
    const headers = [
      "Payroll Number",
      "Employee ID",
      "Employee Name",
      "Department",
      "Payroll Period",
      "Gross Salary / Wages",
      "Deductions",
      "Net Salary / Wages",
      "Payment Status"
    ];

    const rows = filteredData.map((item) => [
      item.payrollNo,
      item.employeeId,
      item.employee,
      item.department,
      item.period,
      item.gross,
      item.deductions,
      item.net,
      item.status
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Payroll_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="payroll-report-page">
      <section className="payroll-report-hero">
        <div>
          <button
            className="payroll-report-back"
            onClick={() => navigate("/reports")}
          >
            <ArrowLeft size={17} />
            Back to Reports
          </button>

          <span className="payroll-report-eyebrow">
            PAYROLL ANALYTICS
          </span>

          <h1>Payroll Report</h1>

          <p>
            Track gross salary, deductions, net payroll,
            payment status and department-wise payroll data.
          </p>
        </div>

        <button
          className="payroll-report-export"
          onClick={exportReport}
        >
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="payroll-report-summary">
        <div className="payroll-report-card">
          <span>Gross Payroll</span>
          <strong>
            ₹{totalGross.toLocaleString("en-IN")}
          </strong>
          <small>Total salary and wages</small>
        </div>

        <div className="payroll-report-card">
          <span>Total Deductions</span>
          <strong>
            ₹{totalDeductions.toLocaleString("en-IN")}
          </strong>
          <small>Payroll deductions</small>
        </div>

        <div className="payroll-report-card success">
          <span>Net Payroll</span>
          <strong>
            ₹{totalNet.toLocaleString("en-IN")}
          </strong>
          <small>Payable after deductions</small>
        </div>

        <div className="payroll-report-card warning">
          <span>Pending Payroll</span>
          <strong>
            ₹{pendingAmount.toLocaleString("en-IN")}
          </strong>
          <small>Amount awaiting payment</small>
        </div>
      </section>

      <section className="payroll-report-status">
        <div className="payroll-report-status-header">
          <div>
            <span>Payroll Payment Progress</span>
            <strong>
              {paidCount} / {filteredData.length}
            </strong>
          </div>

          <small>
            {filteredData.length > 0
              ? Math.round(
                  (paidCount / filteredData.length) * 100
                )
              : 0}
            % paid
          </small>
        </div>

        <div className="payroll-report-progress">
          <div
            style={{
              width:
                filteredData.length > 0
                  ? `${
                      (paidCount /
                        filteredData.length) *
                      100
                    }%`
                  : "0%"
            }}
          />
        </div>

        <div className="payroll-report-paid">
          <span>Paid Amount</span>
          <strong>
            ₹{paidAmount.toLocaleString("en-IN")}
          </strong>
        </div>
      </section>

      <section className="payroll-report-panel">
        <div className="payroll-report-panel-header">
          <div>
            <h2>Payroll Records</h2>
            <span>{filteredData.length} records found</span>
          </div>
        </div>

        <div className="payroll-report-filters">
          <div className="payroll-report-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search payroll, employee or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
          >
            <option value="All">All Departments</option>
            <option value="Production">Production</option>
            <option value="Quality">Quality</option>
            <option value="Inventory">Inventory</option>
            <option value="Finance">Finance</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Dispatch">Dispatch</option>
            <option value="HR">HR</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="payroll-report-table-wrapper">
          <table className="payroll-report-table">
            <thead>
              <tr>
                <th>Payroll</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Period</th>
                <th>Gross</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.payrollNo}>
                  <td>
                    <div className="payroll-number-cell">
                      <div className="payroll-number-icon">
                        ₹
                      </div>

                      <div>
                        <strong>{item.payrollNo}</strong>
                        <span>{item.employeeId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong>{item.employee}</strong>
                  </td>

                  <td>
                    <span className="payroll-department">
                      {item.department}
                    </span>
                  </td>

                  <td>{item.period}</td>

                  <td>
                    ₹{item.gross.toLocaleString("en-IN")}
                  </td>

                  <td>
                    ₹
                    {item.deductions.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    <strong>
                      ₹{item.net.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`payroll-report-badge ${
                        item.status === "Paid"
                          ? "success"
                          : "pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="payroll-report-actions">
                      <button
                        title="View"
                        onClick={() =>
                          setSelectedPayroll(item)
                        }
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="danger"
                        title="Delete"
                        onClick={() =>
                          deletePayroll(item.payrollNo)
                        }
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="9">
                    <div className="payroll-report-empty">
                      No payroll records found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedPayroll && (
        <div
          className="payroll-report-modal-overlay"
          onClick={() => setSelectedPayroll(null)}
        >
          <div
            className="payroll-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="payroll-report-modal-header">
              <div>
                <span>PAYROLL DETAILS</span>
                <h2>{selectedPayroll.payrollNo}</h2>
              </div>

              <button
                onClick={() => setSelectedPayroll(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="payroll-report-detail-grid">
              <div>
                <span>Employee</span>
                <strong>{selectedPayroll.employee}</strong>
              </div>

              <div>
                <span>Employee ID</span>
                <strong>{selectedPayroll.employeeId}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{selectedPayroll.department}</strong>
              </div>

              <div>
                <span>Payroll Period</span>
                <strong>{selectedPayroll.period}</strong>
              </div>

              <div>
                <span>Gross Salary / Wages</span>
                <strong>
                  ₹
                  {selectedPayroll.gross.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Deductions</span>
                <strong>
                  ₹
                  {selectedPayroll.deductions.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Net Salary / Wages</span>
                <strong>
                  ₹
                  {selectedPayroll.net.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Payment Status</span>
                <strong>{selectedPayroll.status}</strong>
              </div>
            </div>

            <button
              className="payroll-report-close"
              onClick={() => setSelectedPayroll(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PayrollReport;