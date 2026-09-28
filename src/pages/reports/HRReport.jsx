import { useMemo, useState } from "react";
import { ArrowLeft, Download, Eye, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    employeeId: "EMP-001",
    employee: "Rahul Deshmukh",
    department: "Production",
    designation: "Machine Operator",
    joiningDate: "2024-06-12",
    attendance: "Present",
    employment: "Active",
    salary: 34500
  },
  {
    employeeId: "EMP-002",
    employee: "Sneha Patil",
    department: "Quality",
    designation: "Quality Inspector",
    joiningDate: "2024-08-05",
    attendance: "Present",
    employment: "Active",
    salary: 31000
  },
  {
    employeeId: "EMP-003",
    employee: "Amit Kulkarni",
    department: "Inventory",
    designation: "Store Executive",
    joiningDate: "2025-01-18",
    attendance: "Absent",
    employment: "Active",
    salary: 17500
  },
  {
    employeeId: "EMP-004",
    employee: "Priya Joshi",
    department: "Finance",
    designation: "Accounts Executive",
    joiningDate: "2023-11-20",
    attendance: "Present",
    employment: "Active",
    salary: 28800
  },
  {
    employeeId: "EMP-005",
    employee: "Vikram Shinde",
    department: "Maintenance",
    designation: "Maintenance Technician",
    joiningDate: "2024-03-14",
    attendance: "Present",
    employment: "Active",
    salary: 26000
  },
  {
    employeeId: "EMP-006",
    employee: "Neha Patil",
    department: "Production",
    designation: "Production Supervisor",
    joiningDate: "2022-09-08",
    attendance: "Present",
    employment: "Active",
    salary: 32500
  },
  {
    employeeId: "EMP-007",
    employee: "Rohit Jadhav",
    department: "Dispatch",
    designation: "Dispatch Executive",
    joiningDate: "2025-02-11",
    attendance: "Leave",
    employment: "Active",
    salary: 22000
  },
  {
    employeeId: "EMP-008",
    employee: "Kavita More",
    department: "HR",
    designation: "HR Executive",
    joiningDate: "2023-07-17",
    attendance: "Present",
    employment: "Active",
    salary: 29500
  }
];

function HRReport() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [attendanceFilter, setAttendanceFilter] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.employee
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.employeeId
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.designation
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        item.department === departmentFilter;

      const matchesAttendance =
        attendanceFilter === "All" ||
        item.attendance === attendanceFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesAttendance
      );
    });
  }, [data, search, departmentFilter, attendanceFilter]);

  const activeEmployees = filteredData.filter(
    (item) => item.employment === "Active"
  ).length;

  const presentEmployees = filteredData.filter(
    (item) => item.attendance === "Present"
  ).length;

  const leaveEmployees = filteredData.filter(
    (item) => item.attendance === "Leave"
  ).length;

  const absentEmployees = filteredData.filter(
    (item) => item.attendance === "Absent"
  ).length;

  const monthlySalary = filteredData.reduce(
    (sum, item) => sum + item.salary,
    0
  );

  const deleteEmployee = (employeeId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this employee record?"
      )
    ) {
      setData((current) =>
        current.filter(
          (item) => item.employeeId !== employeeId
        )
      );
    }
  };

  const exportReport = () => {
    const headers = [
      "Employee ID",
      "Employee Name",
      "Department",
      "Designation",
      "Joining Date",
      "Attendance Status",
      "Employment Status",
      "Monthly Salary"
    ];

    const rows = filteredData.map((item) => [
      item.employeeId,
      item.employee,
      item.department,
      item.designation,
      item.joiningDate,
      item.attendance,
      item.employment,
      item.salary
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
    link.download = "HR_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="hr-report-page">
      <section className="hr-report-hero">
        <div>
          <button
            className="hr-report-back"
            onClick={() => navigate("/reports")}
          >
            <ArrowLeft size={17} />
            Back to Reports
          </button>

          <span className="hr-report-eyebrow">
            HUMAN RESOURCES
          </span>

          <h1>HR Report</h1>

          <p>
            Monitor employees, departments, attendance and
            workforce salary information.
          </p>
        </div>

        <button
          className="hr-report-export"
          onClick={exportReport}
        >
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="hr-report-summary">
        <div className="hr-report-card">
          <span>Active Employees</span>
          <strong>{activeEmployees}</strong>
          <small>Current workforce</small>
        </div>

        <div className="hr-report-card success">
          <span>Present Today</span>
          <strong>{presentEmployees}</strong>
          <small>Employees marked present</small>
        </div>

        <div className="hr-report-card warning">
          <span>On Leave</span>
          <strong>{leaveEmployees}</strong>
          <small>Employees on leave</small>
        </div>

        <div className="hr-report-card danger">
          <span>Absent Today</span>
          <strong>{absentEmployees}</strong>
          <small>Employees absent</small>
        </div>
      </section>

      <section className="hr-report-workforce">
        <div className="hr-report-workforce-header">
          <div>
            <span>Workforce Attendance</span>
            <strong>
              {presentEmployees} / {filteredData.length}
            </strong>
          </div>

          <small>
            {filteredData.length > 0
              ? Math.round(
                  (presentEmployees / filteredData.length) * 100
                )
              : 0}
            % present
          </small>
        </div>

        <div className="hr-report-progress">
          <div
            style={{
              width:
                filteredData.length > 0
                  ? `${
                      (presentEmployees /
                        filteredData.length) *
                      100
                    }%`
                  : "0%"
            }}
          />
        </div>

        <div className="hr-report-salary">
          <span>Monthly Salary / Wages</span>
          <strong>
            ₹{monthlySalary.toLocaleString("en-IN")}
          </strong>
        </div>
      </section>

      <section className="hr-report-panel">
        <div className="hr-report-panel-header">
          <div>
            <h2>Employee Workforce Report</h2>
            <span>{filteredData.length} records found</span>
          </div>
        </div>

        <div className="hr-report-filters">
          <div className="hr-report-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search employee, ID or designation..."
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
            value={attendanceFilter}
            onChange={(e) =>
              setAttendanceFilter(e.target.value)
            }
          >
            <option value="All">All Attendance</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>
        </div>

        <div className="hr-report-table-wrapper">
          <table className="hr-report-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Attendance</th>
                <th>Employment</th>
                <th>Salary / Wages</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.employeeId}>
                  <td>
                    <div className="hr-employee-cell">
                      <div className="hr-employee-avatar">
                        {item.employee
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <strong>{item.employee}</strong>
                        <span>{item.employeeId}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="hr-department">
                      {item.department}
                    </span>
                  </td>

                  <td>{item.designation}</td>

                  <td>{item.joiningDate}</td>

                  <td>
                    <span
                      className={`hr-report-badge ${
                        item.attendance === "Present"
                          ? "success"
                          : item.attendance === "Leave"
                          ? "partial"
                          : "pending"
                      }`}
                    >
                      {item.attendance}
                    </span>
                  </td>

                  <td>
                    <span className="hr-report-badge success">
                      {item.employment}
                    </span>
                  </td>

                  <td>
                    <strong>
                      ₹{item.salary.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <div className="hr-report-actions">
                      <button
                        title="View"
                        onClick={() =>
                          setSelectedEmployee(item)
                        }
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="danger"
                        title="Delete"
                        onClick={() =>
                          deleteEmployee(item.employeeId)
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
                  <td colSpan="8">
                    <div className="hr-report-empty">
                      No employee records found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedEmployee && (
        <div
          className="hr-report-modal-overlay"
          onClick={() => setSelectedEmployee(null)}
        >
          <div
            className="hr-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hr-report-modal-header">
              <div>
                <span>EMPLOYEE DETAILS</span>
                <h2>{selectedEmployee.employee}</h2>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="hr-report-detail-grid">
              <div>
                <span>Employee ID</span>
                <strong>{selectedEmployee.employeeId}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{selectedEmployee.department}</strong>
              </div>

              <div>
                <span>Designation</span>
                <strong>{selectedEmployee.designation}</strong>
              </div>

              <div>
                <span>Joining Date</span>
                <strong>{selectedEmployee.joiningDate}</strong>
              </div>

              <div>
                <span>Attendance</span>
                <strong>{selectedEmployee.attendance}</strong>
              </div>

              <div>
                <span>Employment Status</span>
                <strong>{selectedEmployee.employment}</strong>
              </div>

              <div>
                <span>Monthly Salary / Wages</span>
                <strong>
                  ₹
                  {selectedEmployee.salary.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Employee ID</span>
                <strong>{selectedEmployee.employeeId}</strong>
              </div>
            </div>

            <button
              className="hr-report-close"
              onClick={() => setSelectedEmployee(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HRReport;