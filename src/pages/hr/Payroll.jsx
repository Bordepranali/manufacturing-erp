import { useMemo, useState } from "react";
import {
  Banknote,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  X,
  Trash2,
  UserRound,
  IndianRupee,
  CheckCircle2,
  Clock3,
  Users,
  FileText,
  CalendarDays,
  Download,
} from "lucide-react";

const initialPayrollData = [
  {
    id: "PAY-2026-006",
    employeeId: "EMP-001",
    employee: "Rahul Deshmukh",
    department: "Production",
    period: "September 2026",
    workers: 1,
    gross: 34500,
    deductions: 1200,
    netPayable: 33300,
    paymentDate: "10 Sep 2026",
    status: "Pending",
  },
  {
    id: "PAY-2026-005",
    employeeId: "EMP-002",
    employee: "Sneha Patil",
    department: "Quality",
    period: "September 2026",
    workers: 1,
    gross: 31000,
    deductions: 900,
    netPayable: 30100,
    paymentDate: "10 Sep 2026",
    status: "Paid",
  },
  {
    id: "PAY-2026-004",
    employeeId: "EMP-003",
    employee: "Amit Kulkarni",
    department: "Inventory",
    period: "September 2026",
    workers: 1,
    gross: 17500,
    deductions: 300,
    netPayable: 17200,
    paymentDate: "09 Sep 2026",
    status: "Pending",
  },
  {
    id: "PAY-2026-003",
    employeeId: "EMP-004",
    employee: "Priya Joshi",
    department: "Finance",
    period: "September 2026",
    workers: 1,
    gross: 28800,
    deductions: 700,
    netPayable: 28100,
    paymentDate: "08 Sep 2026",
    status: "Paid",
  },
  {
    id: "PAY-2026-002",
    employeeId: "EMP-005",
    employee: "Vikram Shinde",
    department: "Maintenance",
    period: "September 2026",
    workers: 1,
    gross: 26000,
    deductions: 150,
    netPayable: 25850,
    paymentDate: "08 Sep 2026",
    status: "Pending",
  },
  {
    id: "PAY-2026-001",
    employeeId: "EMP-006",
    employee: "Neha Patil",
    department: "Production",
    period: "September 2026",
    workers: 1,
    gross: 32500,
    deductions: 200,
    netPayable: 32300,
    paymentDate: "07 Sep 2026",
    status: "Paid",
  },
];

const employeeOptions = [
  {
    id: "EMP-001",
    name: "Rahul Deshmukh",
    department: "Production",
    monthly: 32000,
  },
  {
    id: "EMP-002",
    name: "Sneha Patil",
    department: "Quality",
    monthly: 30000,
  },
  {
    id: "EMP-003",
    name: "Amit Kulkarni",
    department: "Inventory",
    monthly: 17000,
  },
  {
    id: "EMP-004",
    name: "Priya Joshi",
    department: "Finance",
    monthly: 28000,
  },
  {
    id: "EMP-005",
    name: "Vikram Shinde",
    department: "Maintenance",
    monthly: 26000,
  },
  {
    id: "EMP-006",
    name: "Neha Patil",
    department: "Production",
    monthly: 31500,
  },
];

function formatCurrency(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function Payroll() {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [form, setForm] = useState({
    employeeId: "",
    period: "September 2026",
    gross: "",
    deductions: "",
    paymentDate: "",
    paymentMode: "Bank Transfer",
    notes: "",
  });

  const selectedEmployee = employeeOptions.find(
    (employee) => employee.id === form.employeeId
  );

  const filteredPayroll = useMemo(() => {
    return payrollData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.employee.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        item.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [payrollData, search, statusFilter, departmentFilter]);

  const totals = useMemo(() => {
    const totalGross = payrollData.reduce(
      (sum, item) => sum + item.gross,
      0
    );

    const totalPaid = payrollData
      .filter((item) => item.status === "Paid")
      .reduce((sum, item) => sum + item.netPayable, 0);

    const totalPending = payrollData
      .filter((item) => item.status === "Pending")
      .reduce((sum, item) => sum + item.netPayable, 0);

    return {
      totalGross,
      totalPaid,
      totalPending,
      paidWorkers: payrollData.filter((item) => item.status === "Paid").length,
      pendingWorkers: payrollData.filter(
        (item) => item.status === "Pending"
      ).length,
    };
  }, [payrollData]);

  const openAddModal = () => {
    setForm({
      employeeId: "",
      period: "September 2026",
      gross: "",
      deductions: "",
      paymentDate: "",
      paymentMode: "Bank Transfer",
      notes: "",
    });
    setShowModal(true);
  };

  const handleEmployeeChange = (employeeId) => {
    const employee = employeeOptions.find(
      (item) => item.id === employeeId
    );

    setForm((prev) => ({
      ...prev,
      employeeId,
      gross: employee ? employee.monthly : "",
    }));
  };

  const handleSave = () => {
    if (
      !form.employeeId ||
      !form.period ||
      !form.gross ||
      !form.paymentDate
    ) {
      window.alert("Please fill all required fields.");
      return;
    }

    const gross = Number(form.gross);
    const deductions = Number(form.deductions || 0);
    const netPayable = gross - deductions;

    if (netPayable < 0) {
      window.alert("Deductions cannot be greater than gross salary.");
      return;
    }

    const employee = employeeOptions.find(
      (item) => item.id === form.employeeId
    );

    const newPayroll = {
      id: `PAY-2026-${String(payrollData.length + 7).padStart(3, "0")}`,
      employeeId: employee.id,
      employee: employee.name,
      department: employee.department,
      period: form.period,
      workers: 1,
      gross,
      deductions,
      netPayable,
      paymentDate: form.paymentDate,
      status: "Pending",
    };

    setPayrollData((prev) => [newPayroll, ...prev]);
    setShowModal(false);
    window.alert("Payroll record created successfully.");
  };

  const markPaid = (id) => {
    setPayrollData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Paid",
              paymentDate: "12 Sep 2026",
            }
          : item
      )
    );
    setOpenMenu(null);
  };

  const deletePayroll = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payroll record?"
    );

    if (!confirmed) return;

    setPayrollData((prev) => prev.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  const departments = ["All", "Production", "Quality", "Inventory", "Finance", "Maintenance"];

  return (
    <div className="payroll-page">
      <div className="payroll-heading">
        <div>
          <span className="module-eyebrow">HR & PAYROLL</span>
          <h1>Payroll</h1>
          <p>Manage salary processing, payroll records and employee payments.</p>
        </div>

        <button className="payroll-add-button" onClick={openAddModal}>
          <Plus size={18} />
          Generate Payroll
        </button>
      </div>

      <div className="payroll-summary-grid">
        <div className="payroll-summary-card">
          <div className="payroll-summary-icon blue">
            <IndianRupee size={21} />
          </div>
          <div>
            <span>Total Salary / Wages</span>
            <strong>{formatCurrency(totals.totalGross)}</strong>
            <small>Current payroll period</small>
          </div>
        </div>

        <div className="payroll-summary-card">
          <div className="payroll-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Paid Amount</span>
            <strong>{formatCurrency(totals.totalPaid)}</strong>
            <small>{totals.paidWorkers} workers paid</small>
          </div>
        </div>

        <div className="payroll-summary-card">
          <div className="payroll-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending Amount</span>
            <strong>{formatCurrency(totals.totalPending)}</strong>
            <small>{totals.pendingWorkers} workers pending</small>
          </div>
        </div>

        <div className="payroll-summary-card">
          <div className="payroll-summary-icon purple">
            <Users size={21} />
          </div>
          <div>
            <span>Workers in Payroll</span>
            <strong>{payrollData.length}</strong>
            <small>Salary records</small>
          </div>
        </div>
      </div>

      <div className="payroll-info-banner">
        <div className="payroll-info-icon">
          <Banknote size={20} />
        </div>
        <div>
          <strong>Payroll Processing</strong>
          <p>
            Review generated salary and wage records before marking employee
            payments as completed.
          </p>
        </div>
      </div>

      <div className="payroll-container">
        <div className="payroll-toolbar">
          <div className="payroll-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search payroll, employee or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="payroll-filter">
            <SlidersHorizontal size={17} />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department === "All"
                    ? "All Departments"
                    : department}
                </option>
              ))}
            </select>
          </div>

          <div className="payroll-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <span className="payroll-result-count">
            {filteredPayroll.length} records
          </span>
        </div>

        <div className="payroll-table-wrapper">
          <table className="payroll-table">
            <thead>
              <tr>
                <th>Payroll</th>
                <th>Employee</th>
                <th>Period</th>
                <th>Department</th>
                <th>Gross</th>
                <th>Deductions</th>
                <th>Net Payable</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredPayroll.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="payroll-id-cell">
                      <div className="payroll-document-icon">
                        <FileText size={16} />
                      </div>
                      <strong>{item.id}</strong>
                    </div>
                  </td>

                  <td>
                    <div className="payroll-employee-cell">
                      <div className="payroll-avatar">
                        {item.employee.charAt(0)}
                      </div>
                      <div>
                        <strong>{item.employee}</strong>
                        <span>{item.employeeId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="payroll-period">
                      <CalendarDays size={15} />
                      {item.period}
                    </div>
                  </td>

                  <td>
                    <span className="payroll-department">
                      {item.department}
                    </span>
                  </td>

                  <td>
                    <strong>{formatCurrency(item.gross)}</strong>
                  </td>

                  <td>
                    <span className="payroll-deduction">
                      - {formatCurrency(item.deductions)}
                    </span>
                  </td>

                  <td>
                    <strong className="payroll-net">
                      {formatCurrency(item.netPayable)}
                    </strong>
                  </td>

                  <td>{item.paymentDate}</td>

                  <td>
                    <span
                      className={`payroll-status ${
                        item.status === "Paid" ? "paid" : "pending"
                      }`}
                    >
                      <span></span>
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="payroll-action-area">
                      <button
                        className="payroll-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.id ? null : item.id
                          )
                        }
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {openMenu === item.id && (
                        <div className="payroll-action-menu">
                          <button
                            onClick={() => {
                              setShowDetails(item);
                              setOpenMenu(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              setShowDetails(item);
                              setOpenMenu(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit Record
                          </button>

                          {item.status === "Pending" && (
                            <button onClick={() => markPaid(item.id)}>
                              <CheckCircle2 size={15} />
                              Mark as Paid
                            </button>
                          )}

                          <button
                            className="danger"
                            onClick={() => deletePayroll(item.id)}
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayroll.length === 0 && (
            <div className="payroll-empty-state">
              <Banknote size={34} />
              <strong>No payroll records found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>

        <div className="payroll-footer">
          <span>
            Showing {filteredPayroll.length} of {payrollData.length} records
          </span>

          <div className="payroll-pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="payroll-modal-overlay">
          <div className="payroll-modal">
            <div className="payroll-modal-header">
              <div>
                <span className="module-eyebrow">PAYROLL ENTRY</span>
                <h2>Generate Payroll</h2>
              </div>

              <button
                className="payroll-modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="payroll-modal-body">
              <div className="payroll-form-section">
                <div className="payroll-section-title">
                  <UserRound size={18} />
                  Employee Information
                </div>

                <div className="payroll-form-grid">
                  <div className="payroll-field full">
                    <label>
                      Employee <span>*</span>
                    </label>
                    <select
                      value={form.employeeId}
                      onChange={(e) =>
                        handleEmployeeChange(e.target.value)
                      }
                    >
                      <option value="">Select employee</option>
                      {employeeOptions.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} — {employee.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedEmployee && (
                    <div className="payroll-worker-card">
                      <div className="payroll-avatar large">
                        {selectedEmployee.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{selectedEmployee.name}</strong>
                        <span>
                          {selectedEmployee.department} ·{" "}
                          {selectedEmployee.id}
                        </span>
                      </div>
                      <div className="payroll-worker-rate">
                        <small>Configured Salary</small>
                        <strong>
                          {formatCurrency(selectedEmployee.monthly)}
                        </strong>
                      </div>
                    </div>
                  )}

                  <div className="payroll-field">
                    <label>
                      Payroll Period <span>*</span>
                    </label>
                    <input
                      type="month"
                      value="2026-09"
                      onChange={() =>
                        setForm((prev) => ({
                          ...prev,
                          period: "September 2026",
                        }))
                      }
                    />
                  </div>

                  <div className="payroll-field">
                    <label>
                      Payment Date <span>*</span>
                    </label>
                    <input
                      type="date"
                      value={form.paymentDate}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          paymentDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="payroll-form-section">
                <div className="payroll-section-title">
                  <IndianRupee size={18} />
                  Payroll Calculation
                </div>

                <div className="payroll-form-grid">
                  <div className="payroll-field">
                    <label>
                      Gross Salary / Wages <span>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter gross amount"
                      value={form.gross}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          gross: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="payroll-field">
                    <label>Deductions</label>
                    <input
                      type="number"
                      placeholder="Enter deductions"
                      value={form.deductions}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          deductions: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="payroll-calculation-card">
                    <span>Net Payable</span>
                    <strong>
                      {formatCurrency(
                        Math.max(
                          0,
                          Number(form.gross || 0) -
                            Number(form.deductions || 0)
                        )
                      )}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="payroll-form-section">
                <div className="payroll-section-title">
                  <Banknote size={18} />
                  Payment Details
                </div>

                <div className="payroll-form-grid">
                  <div className="payroll-field">
                    <label>Payment Mode</label>
                    <select
                      value={form.paymentMode}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          paymentMode: e.target.value,
                        }))
                      }
                    >
                      <option>Bank Transfer</option>
                      <option>Cash</option>
                      <option>UPI</option>
                      <option>Cheque</option>
                    </select>
                  </div>

                  <div className="payroll-field">
                    <label>Notes</label>
                    <input
                      type="text"
                      placeholder="Optional notes"
                      value={form.notes}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="payroll-modal-footer">
              <button
                className="payroll-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="payroll-save-button"
                onClick={handleSave}
              >
                <Banknote size={17} />
                Generate Payroll
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetails && (
        <div className="payroll-modal-overlay">
          <div className="payroll-details-modal">
            <div className="payroll-modal-header">
              <div>
                <span className="module-eyebrow">PAYROLL DETAILS</span>
                <h2>{showDetails.id}</h2>
              </div>

              <button
                className="payroll-modal-close"
                onClick={() => setShowDetails(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="payroll-details-body">
              <div className="payroll-details-hero">
                <div className="payroll-avatar large">
                  {showDetails.employee.charAt(0)}
                </div>
                <div>
                  <strong>{showDetails.employee}</strong>
                  <span>
                    {showDetails.employeeId} · {showDetails.department}
                  </span>
                </div>

                <span
                  className={`payroll-status ${
                    showDetails.status === "Paid" ? "paid" : "pending"
                  }`}
                >
                  <span></span>
                  {showDetails.status}
                </span>
              </div>

              <div className="payroll-details-grid">
                <div>
                  <small>Payroll Period</small>
                  <strong>{showDetails.period}</strong>
                </div>

                <div>
                  <small>Payment Date</small>
                  <strong>{showDetails.paymentDate}</strong>
                </div>

                <div>
                  <small>Gross Salary / Wages</small>
                  <strong>{formatCurrency(showDetails.gross)}</strong>
                </div>

                <div>
                  <small>Deductions</small>
                  <strong>{formatCurrency(showDetails.deductions)}</strong>
                </div>
              </div>

              <div className="payroll-total-box">
                <div>
                  <span>Final Payable Amount</span>
                  <strong>{formatCurrency(showDetails.netPayable)}</strong>
                </div>

                <Download size={22} />
              </div>
            </div>

            <div className="payroll-modal-footer">
              <button
                className="payroll-cancel-button"
                onClick={() => setShowDetails(null)}
              >
                Close
              </button>

              {showDetails.status === "Pending" && (
                <button
                  className="payroll-save-button"
                  onClick={() => {
                    markPaid(showDetails.id);
                    setShowDetails(null);
                  }}
                >
                  <CheckCircle2 size={17} />
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payroll;