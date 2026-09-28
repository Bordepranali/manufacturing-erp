import { useMemo, useState } from "react";
import {
  WalletCards,
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
  BriefcaseBusiness,
} from "lucide-react";

const wageData = [
  {
    id: "WAG-2026-006",
    employee: "Rahul Deshmukh",
    employeeId: "EMP-001",
    department: "Production",
    employmentType: "Permanent",
    wageType: "Monthly",
    rate: 32000,
    period: "September 2026",
    daysWorked: 22,
    approvedHours: 176,
    quantity: 0,
    overtime: 8,
    earnings: 2500,
    deductions: 1200,
    status: "Pending",
  },
  {
    id: "WAG-2026-005",
    employee: "Sneha Patil",
    employeeId: "EMP-002",
    department: "Quality",
    employmentType: "Permanent",
    wageType: "Monthly",
    rate: 30000,
    period: "September 2026",
    daysWorked: 22,
    approvedHours: 176,
    quantity: 0,
    overtime: 4,
    earnings: 1000,
    deductions: 900,
    status: "Paid",
  },
  {
    id: "WAG-2026-004",
    employee: "Amit Kulkarni",
    employeeId: "EMP-003",
    department: "Inventory",
    employmentType: "Daily Wage",
    wageType: "Daily",
    rate: 850,
    period: "September 2026",
    daysWorked: 20,
    approvedHours: 160,
    quantity: 0,
    overtime: 5,
    earnings: 500,
    deductions: 300,
    status: "Pending",
  },
  {
    id: "WAG-2026-003",
    employee: "Priya Joshi",
    employeeId: "EMP-004",
    department: "Finance",
    employmentType: "Permanent",
    wageType: "Monthly",
    rate: 28000,
    period: "September 2026",
    daysWorked: 22,
    approvedHours: 176,
    quantity: 0,
    overtime: 2,
    earnings: 800,
    deductions: 700,
    status: "Paid",
  },
  {
    id: "WAG-2026-002",
    employee: "Vikram Shinde",
    employeeId: "EMP-005",
    department: "Maintenance",
    employmentType: "Hourly",
    wageType: "Hourly",
    rate: 180,
    period: "September 2026",
    daysWorked: 18,
    approvedHours: 142,
    quantity: 0,
    overtime: 6,
    earnings: 300,
    deductions: 150,
    status: "Pending",
  },
  {
    id: "WAG-2026-001",
    employee: "Neha Patil",
    employeeId: "EMP-006",
    department: "Production",
    employmentType: "Piece Rate",
    wageType: "Piece",
    rate: 75,
    period: "September 2026",
    daysWorked: 20,
    approvedHours: 150,
    quantity: 420,
    overtime: 0,
    earnings: 1000,
    deductions: 200,
    status: "Paid",
  },
];

const employees = [
  {
    id: "EMP-001",
    name: "Rahul Deshmukh",
    department: "Production",
    employmentType: "Permanent",
    wageType: "Monthly",
    rate: 32000,
  },
  {
    id: "EMP-002",
    name: "Sneha Patil",
    department: "Quality",
    employmentType: "Permanent",
    wageType: "Monthly",
    rate: 30000,
  },
  {
    id: "EMP-003",
    name: "Amit Kulkarni",
    department: "Inventory",
    employmentType: "Daily Wage",
    wageType: "Daily",
    rate: 850,
  },
  {
    id: "EMP-004",
    name: "Priya Joshi",
    department: "Finance",
    employmentType: "Permanent",
    wageType: "Monthly",
    rate: 28000,
  },
  {
    id: "EMP-005",
    name: "Vikram Shinde",
    department: "Maintenance",
    employmentType: "Hourly",
    wageType: "Hourly",
    rate: 180,
  },
  {
    id: "EMP-006",
    name: "Neha Patil",
    department: "Production",
    employmentType: "Piece Rate",
    wageType: "Piece",
    rate: 75,
  },
];

function SalaryWages() {
  const [records, setRecords] = useState(wageData);
  const [search, setSearch] = useState("");
  const [wageTypeFilter, setWageTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [form, setForm] = useState({
    employee: "",
    period: "September 2026",
    daysWorked: "22",
    approvedHours: "176",
    quantity: "0",
    overtime: "0",
    otherEarnings: "0",
    deductions: "0",
    status: "Pending",
  });

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const matchesSearch =
        item.employee.toLowerCase().includes(search.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const matchesWageType =
        wageTypeFilter === "All" || item.wageType === wageTypeFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesWageType && matchesStatus;
    });
  }, [records, search, wageTypeFilter, statusFilter]);

  const getBasicAmount = (record) => {
    if (record.wageType === "Daily") {
      return record.daysWorked * record.rate;
    }

    if (record.wageType === "Hourly") {
      return record.approvedHours * record.rate;
    }

    if (record.wageType === "Piece") {
      return record.quantity * record.rate;
    }

    return record.rate;
  };

  const getFinalAmount = (record) => {
    return (
      getBasicAmount(record) +
      Number(record.earnings || 0) -
      Number(record.deductions || 0)
    );
  };

  const totalWages = records.reduce(
    (sum, record) => sum + getFinalAmount(record),
    0
  );

  const paidAmount = records
    .filter((record) => record.status === "Paid")
    .reduce((sum, record) => sum + getFinalAmount(record), 0);

  const pendingAmount = records
    .filter((record) => record.status === "Pending")
    .reduce((sum, record) => sum + getFinalAmount(record), 0);

  const paidWorkers = records.filter(
    (record) => record.status === "Paid"
  ).length;

  const handleEmployeeChange = (employeeId) => {
    const employee = employees.find((item) => item.id === employeeId);

    if (!employee) {
      setForm({
        ...form,
        employee: "",
      });
      return;
    }

    setForm({
      ...form,
      employee: employee.id,
    });
  };

  const calculateBasic = () => {
    const employee = employees.find(
      (item) => item.id === form.employee
    );

    if (!employee) return 0;

    if (employee.wageType === "Daily") {
      return Number(form.daysWorked || 0) * employee.rate;
    }

    if (employee.wageType === "Hourly") {
      return Number(form.approvedHours || 0) * employee.rate;
    }

    if (employee.wageType === "Piece") {
      return Number(form.quantity || 0) * employee.rate;
    }

    return employee.rate;
  };

  const finalPayable =
    calculateBasic() +
    Number(form.otherEarnings || 0) -
    Number(form.deductions || 0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const employee = employees.find(
      (item) => item.id === form.employee
    );

    if (!employee) {
      window.alert("Please select an employee.");
      return;
    }

    const newRecord = {
      id: `WAG-2026-${String(records.length + 1).padStart(3, "0")}`,
      employee: employee.name,
      employeeId: employee.id,
      department: employee.department,
      employmentType: employee.employmentType,
      wageType: employee.wageType,
      rate: employee.rate,
      period: form.period,
      daysWorked: Number(form.daysWorked || 0),
      approvedHours: Number(form.approvedHours || 0),
      quantity: Number(form.quantity || 0),
      overtime: Number(form.overtime || 0),
      earnings: Number(form.otherEarnings || 0),
      deductions: Number(form.deductions || 0),
      status: form.status,
    };

    setRecords((previous) => [newRecord, ...previous]);
    setShowModal(false);

    setForm({
      employee: "",
      period: "September 2026",
      daysWorked: "22",
      approvedHours: "176",
      quantity: "0",
      overtime: "0",
      otherEarnings: "0",
      deductions: "0",
      status: "Pending",
    });

    window.alert("Salary / wage record created successfully.");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this wage record?"
    );

    if (!confirmed) return;

    setRecords((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setOpenMenu(null);
  };

  return (
    <div className="salary-wages-page">
      <div className="salary-wages-heading">
        <div>
          <span className="module-eyebrow">HR & PAYROLL</span>
          <h1>Salary / Wages</h1>
          <p>
            Manage worker wages and salary calculations based on configured
            wage types.
          </p>
        </div>

        <button
          className="salary-wages-add-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          Add Salary / Wage
        </button>
      </div>

      <div className="salary-wages-summary-grid">
        <div className="salary-wages-summary-card">
          <div className="salary-wages-summary-icon blue">
            <IndianRupee size={21} />
          </div>
          <div>
            <span>Total Salary / Wages</span>
            <strong>₹{totalWages.toLocaleString("en-IN")}</strong>
            <small>Current payroll period</small>
          </div>
        </div>

        <div className="salary-wages-summary-card">
          <div className="salary-wages-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Paid Amount</span>
            <strong>₹{paidAmount.toLocaleString("en-IN")}</strong>
            <small>{paidWorkers} workers paid</small>
          </div>
        </div>

        <div className="salary-wages-summary-card">
          <div className="salary-wages-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending Amount</span>
            <strong>₹{pendingAmount.toLocaleString("en-IN")}</strong>
            <small>Awaiting payment</small>
          </div>
        </div>

        <div className="salary-wages-summary-card">
          <div className="salary-wages-summary-icon purple">
            <BriefcaseBusiness size={21} />
          </div>
          <div>
            <span>Total Workers</span>
            <strong>{records.length}</strong>
            <small>Salary / wage records</small>
          </div>
        </div>
      </div>

      <div className="salary-wages-info-banner">
        <div className="salary-wages-info-icon">
          <WalletCards size={21} />
        </div>

        <div>
          <strong>Flexible Wage Calculation</strong>
          <p>
            Monthly workers use their monthly rate. Daily workers are
            calculated by days worked, hourly workers by approved hours, and
            piece-rate workers by approved quantity.
          </p>
        </div>
      </div>

      <div className="salary-wages-container">
        <div className="salary-wages-toolbar">
          <div className="salary-wages-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search employee or wage ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="salary-wages-filter">
            <SlidersHorizontal size={17} />
            <select
              value={wageTypeFilter}
              onChange={(event) =>
                setWageTypeFilter(event.target.value)
              }
            >
              <option>All</option>
              <option>Monthly</option>
              <option>Daily</option>
              <option>Hourly</option>
              <option>Piece</option>
            </select>
          </div>

          <div className="salary-wages-filter">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
          </div>

          <span className="salary-wages-result-count">
            {filteredRecords.length} records
          </span>
        </div>

        <div className="salary-wages-table-wrapper">
          <table className="salary-wages-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Period</th>
                <th>Wage Type</th>
                <th>Rate</th>
                <th>Work</th>
                <th>Basic Amount</th>
                <th>Other / Deduction</th>
                <th>Final Payable</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="salary-wages-employee">
                      <div className="salary-wages-avatar">
                        {item.employee.charAt(0)}
                      </div>

                      <div>
                        <strong>{item.employee}</strong>
                        <span>
                          {item.employeeId} · {item.department}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="salary-wages-period">
                      {item.period}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`salary-wage-type ${item.wageType
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.wageType}
                    </span>
                  </td>

                  <td>
                    <strong>
                      ₹{item.rate.toLocaleString("en-IN")}
                    </strong>
                    <span className="salary-rate-label">
                      {item.wageType === "Monthly"
                        ? "monthly"
                        : `per ${item.wageType === "Piece" ? "piece" : item.wageType.toLowerCase()}`}
                    </span>
                  </td>

                  <td>
                    <div className="salary-work-value">
                      {item.wageType === "Monthly" && (
                        <>
                          <strong>{item.daysWorked}</strong>
                          <span>days</span>
                        </>
                      )}

                      {item.wageType === "Daily" && (
                        <>
                          <strong>{item.daysWorked}</strong>
                          <span>days</span>
                        </>
                      )}

                      {item.wageType === "Hourly" && (
                        <>
                          <strong>{item.approvedHours}</strong>
                          <span>hours</span>
                        </>
                      )}

                      {item.wageType === "Piece" && (
                        <>
                          <strong>{item.quantity}</strong>
                          <span>pieces</span>
                        </>
                      )}
                    </div>
                  </td>

                  <td>
                    <strong>
                      ₹{getBasicAmount(item).toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <div className="salary-adjustments">
                      <span className="earning">
                        +₹{item.earnings.toLocaleString("en-IN")}
                      </span>
                      <span className="deduction">
                        -₹{item.deductions.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </td>

                  <td>
                    <strong className="salary-final-amount">
                      ₹{getFinalAmount(item).toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`salary-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="salary-action-area">
                      <button
                        className="salary-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.id ? null : item.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === item.id && (
                        <div className="salary-action-menu">
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
                              window.alert(
                                `Edit wage record: ${item.id}`
                              );
                              setOpenMenu(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            className="danger"
                            onClick={() => handleDelete(item.id)}
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

          {filteredRecords.length === 0 && (
            <div className="salary-wages-empty">
              <WalletCards size={30} />
              <h3>No salary or wage records found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div className="salary-wages-footer">
          <span>
            Showing {filteredRecords.length} of {records.length} records
          </span>

          <div className="salary-wages-pagination">
            <button>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="salary-wages-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="salary-wages-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="salary-wages-modal-header">
              <div>
                <span className="module-eyebrow">HR & PAYROLL</span>
                <h2>Add Salary / Wage</h2>
                <p>
                  Create a salary or wage record for the selected worker.
                </p>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="salary-form-section">
                <div className="salary-section-title">
                  <UserRound size={18} />
                  Worker Information
                </div>

                <div className="salary-form-grid">
                  <div className="salary-form-group">
                    <label>Employee / Worker *</label>
                    <select
                      value={form.employee}
                      onChange={(event) =>
                        handleEmployeeChange(event.target.value)
                      }
                      required
                    >
                      <option value="">Select employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name} — {employee.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="salary-form-group">
                    <label>Payroll Period *</label>
                    <input
                      type="month"
                      defaultValue="2026-09"
                      onChange={(event) =>
                        setForm({
                          ...form,
                          period: new Date(
                            `${event.target.value}-01T00:00:00`
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          }),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {form.employee && (
                <div className="salary-worker-card">
                  {(() => {
                    const employee = employees.find(
                      (item) => item.id === form.employee
                    );

                    return (
                      <>
                        <div className="salary-worker-avatar">
                          {employee?.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{employee?.name}</strong>
                          <span>
                            {employee?.employmentType} ·{" "}
                            {employee?.department}
                          </span>
                        </div>

                        <div className="salary-worker-rate">
                          <span>Configured Rate</span>
                          <strong>
                            ₹{employee?.rate.toLocaleString("en-IN")}
                          </strong>
                        </div>

                        <div className="salary-worker-type">
                          <span>Wage Type</span>
                          <strong>{employee?.wageType}</strong>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              <div className="salary-form-section">
                <div className="salary-section-title">
                  <Clock3 size={18} />
                  Work Calculation
                </div>

                <div className="salary-form-grid">
                  <div className="salary-form-group">
                    <label>Days Worked</label>
                    <input
                      type="number"
                      min="0"
                      value={form.daysWorked}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          daysWorked: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="salary-form-group">
                    <label>Approved Hours</label>
                    <input
                      type="number"
                      min="0"
                      value={form.approvedHours}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          approvedHours: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="salary-form-group">
                    <label>Approved Quantity</label>
                    <input
                      type="number"
                      min="0"
                      value={form.quantity}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          quantity: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="salary-form-group">
                    <label>Overtime Hours</label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={form.overtime}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          overtime: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="salary-calculation-box">
                <div>
                  <span>Basic Salary / Wage</span>
                  <strong>
                    ₹{calculateBasic().toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Other Earnings</span>
                  <input
                    type="number"
                    min="0"
                    value={form.otherEarnings}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        otherEarnings: event.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <span>Deductions</span>
                  <input
                    type="number"
                    min="0"
                    value={form.deductions}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        deductions: event.target.value,
                      })
                    }
                  />
                </div>

                <div className="salary-final-row">
                  <span>Final Payable Amount</span>
                  <strong>
                    ₹{Math.max(0, finalPayable).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <div className="salary-form-section">
                <div className="salary-form-grid">
                  <div className="salary-form-group">
                    <label>Payment Status</label>
                    <select
                      value={form.status}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          status: event.target.value,
                        })
                      }
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="salary-modal-actions">
                <button
                  type="button"
                  className="salary-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="salary-save-button">
                  <CheckCircle2 size={17} />
                  Save Salary / Wage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetails && (
        <div
          className="salary-wages-modal-overlay"
          onClick={() => setShowDetails(null)}
        >
          <div
            className="salary-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="salary-wages-modal-header">
              <div>
                <span className="module-eyebrow">WAGE RECORD</span>
                <h2>{showDetails.employee}</h2>
                <p>{showDetails.id}</p>
              </div>

              <button onClick={() => setShowDetails(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="salary-details-status">
              <span
                className={`salary-status ${showDetails.status.toLowerCase()}`}
              >
                {showDetails.status}
              </span>
            </div>

            <div className="salary-details-grid">
              <div>
                <span>Employee ID</span>
                <strong>{showDetails.employeeId}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{showDetails.department}</strong>
              </div>

              <div>
                <span>Period</span>
                <strong>{showDetails.period}</strong>
              </div>

              <div>
                <span>Wage Type</span>
                <strong>{showDetails.wageType}</strong>
              </div>

              <div>
                <span>Configured Rate</span>
                <strong>
                  ₹{showDetails.rate.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Days Worked</span>
                <strong>{showDetails.daysWorked}</strong>
              </div>

              <div>
                <span>Approved Hours</span>
                <strong>{showDetails.approvedHours}</strong>
              </div>

              <div>
                <span>Approved Quantity</span>
                <strong>{showDetails.quantity}</strong>
              </div>

              <div>
                <span>Overtime</span>
                <strong>{showDetails.overtime} hrs</strong>
              </div>

              <div>
                <span>Basic Amount</span>
                <strong>
                  ₹{getBasicAmount(showDetails).toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Other Earnings</span>
                <strong>
                  ₹{showDetails.earnings.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Deductions</span>
                <strong>
                  ₹{showDetails.deductions.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <div className="salary-details-total">
              <span>Final Payable Amount</span>
              <strong>
                ₹{getFinalAmount(showDetails).toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              className="salary-close-details"
              onClick={() => setShowDetails(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalaryWages;