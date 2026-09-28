import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  Power,
  Users,
  CheckCircle2,
  Clock3,
  BriefcaseBusiness,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

const employeeData = [
  {
    id: "EMP-001",
    name: "Rahul Deshmukh",
    department: "Production",
    role: "Production Supervisor",
    phone: "+91 98765 42130",
    email: "rahul.d@manufacturex.com",
    location: "Loni",
    joiningDate: "12 Jan 2024",
    attendance: "Present",
    status: "Active"
  },
  {
    id: "EMP-002",
    name: "Sneha Patil",
    department: "Quality",
    role: "Quality Analyst",
    phone: "+91 98234 56120",
    email: "sneha.p@manufacturex.com",
    location: "Pune",
    joiningDate: "08 Mar 2024",
    attendance: "Present",
    status: "Active"
  },
  {
    id: "EMP-003",
    name: "Amit Kulkarni",
    department: "Inventory",
    role: "Warehouse Executive",
    phone: "+91 97654 32109",
    email: "amit.k@manufacturex.com",
    location: "Nashik",
    joiningDate: "19 Jun 2023",
    attendance: "On Leave",
    status: "Active"
  },
  {
    id: "EMP-004",
    name: "Priya Joshi",
    department: "Finance",
    role: "Accounts Executive",
    phone: "+91 99887 66554",
    email: "priya.j@manufacturex.com",
    location: "Ahmednagar",
    joiningDate: "25 Sep 2023",
    attendance: "Present",
    status: "Active"
  },
  {
    id: "EMP-005",
    name: "Vikram Shinde",
    department: "Maintenance",
    role: "Maintenance Technician",
    phone: "+91 98989 45454",
    email: "vikram.s@manufacturex.com",
    location: "Loni",
    joiningDate: "03 Feb 2022",
    attendance: "Absent",
    status: "Inactive"
  }
];

function Employees() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredEmployees = useMemo(() => {
    return employeeData.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.id.toLowerCase().includes(search.toLowerCase()) ||
        employee.role.toLowerCase().includes(search.toLowerCase()) ||
        employee.department.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || employee.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [search, statusFilter, departmentFilter]);

  const activeCount = employeeData.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveCount = employeeData.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const presentCount = employeeData.filter(
    (employee) => employee.attendance === "Present"
  ).length;

  return (
    <div className="employees-page">
      <div className="employees-heading">
        <div>
          <div className="module-eyebrow">MASTER DATA / EMPLOYEES</div>
          <h1>Employees</h1>
          <p>Manage employee profiles, departments and workforce status.</p>
        </div>

        <button className="employees-add-button">
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      <div className="employee-summary-grid">
        <div className="employee-summary-card">
          <div className="employee-summary-icon blue">
            <Users size={21} />
          </div>
          <div>
            <span>Total Employees</span>
            <strong>{employeeData.length}</strong>
            <small>Registered workforce</small>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Active Employees</span>
            <strong>{activeCount}</strong>
            <small>Currently employed</small>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Present Today</span>
            <strong>{presentCount}</strong>
            <small>Today's attendance</small>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="employee-summary-icon violet">
            <BriefcaseBusiness size={21} />
          </div>
          <div>
            <span>Inactive</span>
            <strong>{inactiveCount}</strong>
            <small>Inactive employees</small>
          </div>
        </div>
      </div>

      <div className="employees-container">
        <div className="employees-toolbar">
          <div className="employees-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search employee, role or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="employee-filter">
            <SlidersHorizontal size={17} />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Production">Production</option>
              <option value="Quality">Quality</option>
              <option value="Inventory">Inventory</option>
              <option value="Finance">Finance</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="employee-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="employee-result-count">
            {filteredEmployees.length} employees
          </div>
        </div>

        <div className="employees-table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Joining Date</th>
                <th>Attendance</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-main-info">
                      <div className="employee-avatar">
                        {employee.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{employee.name}</strong>
                        <span>{employee.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="employee-department">
                      {employee.department}
                    </span>
                  </td>

                  <td>
                    <div className="employee-role">
                      {employee.role}
                    </div>
                  </td>

                  <td>
                    <div className="employee-contact-details">
                      <span>
                        <Phone size={13} />
                        {employee.phone}
                      </span>
                      <span>
                        <Mail size={13} />
                        {employee.email}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="employee-location">
                      <MapPin size={14} />
                      {employee.location}
                    </div>
                  </td>

                  <td>
                    <span className="employee-joining-date">
                      {employee.joiningDate}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`employee-attendance ${
                        employee.attendance === "Present"
                          ? "present"
                          : employee.attendance === "On Leave"
                          ? "leave"
                          : "absent"
                      }`}
                    >
                      {employee.attendance}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`employee-status ${
                        employee.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      <span></span>
                      {employee.status}
                    </span>
                  </td>

                  <td>
                    <div className="employee-action-area">
                      <button
                        className="employee-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === employee.id ? null : employee.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === employee.id && (
                        <div className="employee-action-menu">
                          <button>
                            <Eye size={15} />
                            View
                          </button>

                          <button>
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button>
                            <Power size={15} />
                            {employee.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <div className="employee-empty-state">
              <Users size={34} />
              <strong>No employees found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>

        <div className="employees-footer">
          <span>
            Showing {filteredEmployees.length} of {employeeData.length} employees
          </span>

          <div className="employee-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;