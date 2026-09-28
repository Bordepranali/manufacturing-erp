import { useMemo, useState } from "react";
import {
  CalendarDays,
  Users,
  UserCheck,
  UserX,
  Clock3,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  Save
} from "lucide-react";

const initialAttendance = [
  {
    id: 1,
    date: "2026-09-28",
    employeeId: "EMP-001",
    employee: "Rahul Deshmukh",
    department: "Production",
    shift: "Morning",
    checkIn: "08:54 AM",
    checkOut: "05:42 PM",
    status: "Present",
    hours: 8.8,
    remarks: ""
  },
  {
    id: 2,
    date: "2026-09-28",
    employeeId: "EMP-002",
    employee: "Sneha Patil",
    department: "Quality",
    shift: "Morning",
    checkIn: "08:47 AM",
    checkOut: "05:31 PM",
    status: "Present",
    hours: 8.7,
    remarks: ""
  },
  {
    id: 3,
    date: "2026-09-28",
    employeeId: "EMP-003",
    employee: "Amit Kulkarni",
    department: "Inventory",
    shift: "Morning",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
    hours: 0,
    remarks: "Not reported"
  },
  {
    id: 4,
    date: "2026-09-28",
    employeeId: "EMP-004",
    employee: "Priya Joshi",
    department: "Finance",
    shift: "General",
    checkIn: "09:08 AM",
    checkOut: "05:46 PM",
    status: "Present",
    hours: 8.6,
    remarks: ""
  },
  {
    id: 5,
    date: "2026-09-28",
    employeeId: "EMP-005",
    employee: "Vikram Shinde",
    department: "Maintenance",
    shift: "Morning",
    checkIn: "08:59 AM",
    checkOut: "04:35 PM",
    status: "Present",
    hours: 7.6,
    remarks: ""
  },
  {
    id: 6,
    date: "2026-09-28",
    employeeId: "EMP-006",
    employee: "Neha Patil",
    department: "Production",
    shift: "Morning",
    checkIn: "08:42 AM",
    checkOut: "05:50 PM",
    status: "Present",
    hours: 9.1,
    remarks: ""
  },
  {
    id: 7,
    date: "2026-09-28",
    employeeId: "EMP-007",
    employee: "Rohit Jadhav",
    department: "Dispatch",
    shift: "General",
    checkIn: "-",
    checkOut: "-",
    status: "Leave",
    hours: 0,
    remarks: "Casual leave"
  },
  {
    id: 8,
    date: "2026-09-28",
    employeeId: "EMP-008",
    employee: "Kavita More",
    department: "HR",
    shift: "General",
    checkIn: "09:02 AM",
    checkOut: "05:37 PM",
    status: "Present",
    hours: 8.6,
    remarks: ""
  },
  {
    id: 9,
    date: "2026-09-28",
    employeeId: "EMP-009",
    employee: "Suresh Pawar",
    department: "Production",
    shift: "Evening",
    checkIn: "01:58 PM",
    checkOut: "10:04 PM",
    status: "Present",
    hours: 8.1,
    remarks: ""
  },
  {
    id: 10,
    date: "2026-09-28",
    employeeId: "EMP-010",
    employee: "Meena Shinde",
    department: "Production",
    shift: "Morning",
    checkIn: "09:18 AM",
    checkOut: "05:29 PM",
    status: "Late",
    hours: 8.2,
    remarks: "Late arrival"
  }
];

const employeeList = [
  {
    employeeId: "EMP-001",
    employee: "Rahul Deshmukh",
    department: "Production"
  },
  {
    employeeId: "EMP-002",
    employee: "Sneha Patil",
    department: "Quality"
  },
  {
    employeeId: "EMP-003",
    employee: "Amit Kulkarni",
    department: "Inventory"
  },
  {
    employeeId: "EMP-004",
    employee: "Priya Joshi",
    department: "Finance"
  },
  {
    employeeId: "EMP-005",
    employee: "Vikram Shinde",
    department: "Maintenance"
  },
  {
    employeeId: "EMP-006",
    employee: "Neha Patil",
    department: "Production"
  },
  {
    employeeId: "EMP-007",
    employee: "Rohit Jadhav",
    department: "Dispatch"
  },
  {
    employeeId: "EMP-008",
    employee: "Kavita More",
    department: "HR"
  },
  {
    employeeId: "EMP-009",
    employee: "Suresh Pawar",
    department: "Production"
  },
  {
    employeeId: "EMP-010",
    employee: "Meena Shinde",
    department: "Production"
  }
];

function Attendance() {
  const [attendance, setAttendance] = useState(
    initialAttendance
  );

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState(null);
  const [editingRecord, setEditingRecord] =
    useState(null);

  const [form, setForm] = useState({
    date: "2026-09-28",
    employeeId: "",
    employee: "",
    department: "",
    shift: "Morning",
    checkIn: "",
    checkOut: "",
    status: "Present",
    remarks: ""
  });

  const filteredAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const text = search.toLowerCase();

      const matchesSearch =
        item.employee.toLowerCase().includes(text) ||
        item.employeeId.toLowerCase().includes(text) ||
        item.department.toLowerCase().includes(text);

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
  }, [
    attendance,
    search,
    departmentFilter,
    statusFilter
  ]);

  const totalEmployees = attendance.length;

  const presentCount = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const lateCount = attendance.filter(
    (item) => item.status === "Late"
  ).length;

  const leaveCount = attendance.filter(
    (item) => item.status === "Leave"
  ).length;

  const attendanceRate =
    totalEmployees > 0
      ? Math.round(
          ((presentCount + lateCount) /
            totalEmployees) *
            100
        )
      : 0;

  const openCreateModal = () => {
    setEditingRecord(null);

    setForm({
      date: "2026-09-28",
      employeeId: "",
      employee: "",
      department: "",
      shift: "Morning",
      checkIn: "",
      checkOut: "",
      status: "Present",
      remarks: ""
    });

    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setForm({
      date: record.date,
      employeeId: record.employeeId,
      employee: record.employee,
      department: record.department,
      shift: record.shift,
      checkIn: record.checkIn === "-" ? "" : record.checkIn,
      checkOut:
        record.checkOut === "-" ? "" : record.checkOut,
      status: record.status,
      remarks: record.remarks
    });

    setShowModal(true);
  };

  const handleEmployeeChange = (employeeId) => {
    const employee = employeeList.find(
      (item) => item.employeeId === employeeId
    );

    setForm((current) => ({
      ...current,
      employeeId,
      employee: employee?.employee || "",
      department: employee?.department || ""
    }));
  };

  const calculateHours = () => {
    if (!form.checkIn || !form.checkOut) {
      return 0;
    }

    const parseTime = (time) => {
      const match = time.match(
        /(\d+):(\d+)\s*(AM|PM)/i
      );

      if (!match) return null;

      let hours = Number(match[1]);
      const minutes = Number(match[2]);
      const period = match[3].toUpperCase();

      if (period === "PM" && hours !== 12) {
        hours += 12;
      }

      if (period === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes;
    };

    const start = parseTime(form.checkIn);
    const end = parseTime(form.checkOut);

    if (start === null || end === null || end < start) {
      return 0;
    }

    return Number(((end - start) / 60).toFixed(1));
  };

  const handleSave = () => {
    if (!form.employeeId) {
      alert("Please select an employee.");
      return;
    }

    const hours =
      form.status === "Absent" || form.status === "Leave"
        ? 0
        : calculateHours();

    const record = {
      id: editingRecord
        ? editingRecord.id
        : Date.now(),
      date: form.date,
      employeeId: form.employeeId,
      employee: form.employee,
      department: form.department,
      shift: form.shift,
      checkIn: form.checkIn || "-",
      checkOut: form.checkOut || "-",
      status: form.status,
      hours,
      remarks: form.remarks
    };

    if (editingRecord) {
      setAttendance((current) =>
        current.map((item) =>
          item.id === editingRecord.id
            ? record
            : item
        )
      );
    } else {
      setAttendance((current) => [
        record,
        ...current
      ]);
    }

    setShowModal(false);
    setEditingRecord(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmed) return;

    setAttendance((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="attendance-page">
      <section className="attendance-hero">
        <div>
          <span className="attendance-eyebrow">
            HR & PAYROLL
          </span>

          <h1>Attendance</h1>

          <p>
            Track daily employee attendance, shifts,
            working hours and attendance status.
          </p>
        </div>

        <button
          className="attendance-add-button"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Mark Attendance
        </button>
      </section>

      <section className="attendance-summary-grid">
        <div className="attendance-summary-card">
          <div className="attendance-summary-icon">
            <Users size={21} />
          </div>

          <div>
            <span>Total Employees</span>
            <strong>{totalEmployees}</strong>
          </div>
        </div>

        <div className="attendance-summary-card">
          <div className="attendance-summary-icon">
            <UserCheck size={21} />
          </div>

          <div>
            <span>Present</span>
            <strong>{presentCount}</strong>
          </div>
        </div>

        <div className="attendance-summary-card">
          <div className="attendance-summary-icon">
            <UserX size={21} />
          </div>

          <div>
            <span>Absent</span>
            <strong>{absentCount}</strong>
          </div>
        </div>

        <div className="attendance-summary-card">
          <div className="attendance-summary-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Late / Leave</span>
            <strong>
              {lateCount + leaveCount}
            </strong>
          </div>
        </div>
      </section>

      <section className="attendance-insight-card">
        <div>
          <span>Today's Attendance</span>
          <strong>{attendanceRate}%</strong>
        </div>

        <div className="attendance-progress">
          <div
            style={{
              width: `${attendanceRate}%`
            }}
          ></div>
        </div>

        <p>
          {presentCount + lateCount} employees are
          present or have reported today.
        </p>
      </section>

      <section className="attendance-content-card">
        <div className="attendance-toolbar">
          <div className="attendance-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search employee or department..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All Departments
            </option>
            <option value="Production">
              Production
            </option>
            <option value="Quality">
              Quality
            </option>
            <option value="Inventory">
              Inventory
            </option>
            <option value="Finance">
              Finance
            </option>
            <option value="Maintenance">
              Maintenance
            </option>
            <option value="Dispatch">
              Dispatch
            </option>
            <option value="HR">HR</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">
              All Attendance
            </option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Leave">Leave</option>
          </select>
        </div>

        <div className="attendance-table-header">
          <div>
            <h2>Today's Attendance</h2>

            <p>
              Showing {filteredAttendance.length} of{" "}
              {attendance.length} records
            </p>
          </div>

          <div className="attendance-date-badge">
            <CalendarDays size={16} />
            28 September 2026
          </div>
        </div>

        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Shift</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAttendance.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="attendance-employee">
                      <div className="attendance-avatar">
                        {item.employee
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>
                          {item.employee}
                        </strong>

                        <span>
                          {item.employeeId}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>{item.department}</td>

                  <td>{item.shift}</td>

                  <td>{item.checkIn}</td>

                  <td>{item.checkOut}</td>

                  <td>
                    {item.hours > 0
                      ? `${item.hours} hrs`
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`attendance-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    {item.remarks || "-"}
                  </td>

                  <td>
                    <div className="attendance-actions">
                      <button
                        title="View"
                        onClick={() =>
                          setSelectedRecord(item)
                        }
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit"
                        onClick={() =>
                          openEditModal(item)
                        }
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredAttendance.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="attendance-empty"
                  >
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div
          className="attendance-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="attendance-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="attendance-modal-header">
              <div>
                <span>
                  {editingRecord
                    ? "Edit Attendance"
                    : "Daily Attendance"}
                </span>

                <h2>
                  {editingRecord
                    ? "Update Attendance"
                    : "Mark Attendance"}
                </h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="attendance-form">
              <div className="attendance-form-grid">
                <div className="attendance-field">
                  <label>Date</label>

                  <input
                    type="date"
                    value={form.date}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        date: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="attendance-field">
                  <label>Employee</label>

                  <select
                    value={form.employeeId}
                    onChange={(event) =>
                      handleEmployeeChange(
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select employee
                    </option>

                    {employeeList.map((employee) => (
                      <option
                        key={employee.employeeId}
                        value={employee.employeeId}
                      >
                        {employee.employee}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="attendance-field">
                  <label>Employee ID</label>

                  <input
                    value={form.employeeId}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>

                <div className="attendance-field">
                  <label>Department</label>

                  <input
                    value={form.department}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>

                <div className="attendance-field">
                  <label>Shift</label>

                  <select
                    value={form.shift}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        shift: event.target.value
                      }))
                    }
                  >
                    <option>Morning</option>
                    <option>Evening</option>
                    <option>Night</option>
                    <option>General</option>
                  </select>
                </div>

                <div className="attendance-field">
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value
                      }))
                    }
                  >
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                    <option>Leave</option>
                  </select>
                </div>

                <div className="attendance-field">
                  <label>Check In</label>

                  <input
                    type="text"
                    placeholder="08:55 AM"
                    value={form.checkIn}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        checkIn: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="attendance-field">
                  <label>Check Out</label>

                  <input
                    type="text"
                    placeholder="05:40 PM"
                    value={form.checkOut}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        checkOut: event.target.value
                      }))
                    }
                  />
                </div>
              </div>

              <div className="attendance-hours-preview">
                <span>Calculated Working Hours</span>

                <strong>
                  {form.status === "Absent" ||
                  form.status === "Leave"
                    ? "0 hrs"
                    : `${calculateHours()} hrs`}
                </strong>
              </div>

              <div className="attendance-field">
                <label>Remarks</label>

                <textarea
                  rows="3"
                  placeholder="Add attendance remarks..."
                  value={form.remarks}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      remarks: event.target.value
                    }))
                  }
                />
              </div>
            </div>

            <div className="attendance-modal-footer">
              <button
                className="attendance-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="attendance-save-button"
                onClick={handleSave}
              >
                <Save size={17} />

                {editingRecord
                  ? "Update Attendance"
                  : "Save Attendance"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRecord && (
        <div
          className="attendance-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="attendance-view-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="attendance-modal-header">
              <div>
                <span>
                  Attendance Details
                </span>

                <h2>
                  {selectedRecord.employee}
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="attendance-detail-grid">
              <div>
                <span>Employee ID</span>
                <strong>
                  {selectedRecord.employeeId}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {selectedRecord.date}
                </strong>
              </div>

              <div>
                <span>Department</span>
                <strong>
                  {selectedRecord.department}
                </strong>
              </div>

              <div>
                <span>Shift</span>
                <strong>
                  {selectedRecord.shift}
                </strong>
              </div>

              <div>
                <span>Check In</span>
                <strong>
                  {selectedRecord.checkIn}
                </strong>
              </div>

              <div>
                <span>Check Out</span>
                <strong>
                  {selectedRecord.checkOut}
                </strong>
              </div>

              <div>
                <span>Working Hours</span>
                <strong>
                  {selectedRecord.hours} hrs
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedRecord.status}
                </strong>
              </div>

              <div className="attendance-detail-wide">
                <span>Remarks</span>
                <strong>
                  {selectedRecord.remarks || "-"}
                </strong>
              </div>
            </div>

            <div className="attendance-modal-footer">
              <button
                className="attendance-cancel-button"
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;