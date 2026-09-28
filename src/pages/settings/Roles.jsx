import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  X,
  ShieldCheck,
  Users,
  Edit3,
  Trash2
} from "lucide-react";

const initialRoles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full access to all ERP modules and settings.",
    users: 1,
    permissions: 24,
    status: "Active"
  },
  {
    id: 2,
    name: "Production Manager",
    description: "Manages production orders, BOM and production tracking.",
    users: 2,
    permissions: 12,
    status: "Active"
  },
  {
    id: 3,
    name: "Inventory Executive",
    description: "Manages stock, movements and warehouse transfers.",
    users: 3,
    permissions: 9,
    status: "Active"
  },
  {
    id: 4,
    name: "Quality Manager",
    description: "Manages quality checks and rejected items.",
    users: 1,
    permissions: 7,
    status: "Active"
  },
  {
    id: 5,
    name: "Sales Executive",
    description: "Manages customer orders, dispatch and invoices.",
    users: 2,
    permissions: 8,
    status: "Active"
  },
  {
    id: 6,
    name: "HR Executive",
    description: "Manages employees, attendance and payroll.",
    users: 1,
    permissions: 8,
    status: "Inactive"
  }
];

const permissionGroups = {
  Dashboard: ["View Dashboard"],
  Masters: [
    "View Products",
    "Manage Suppliers",
    "Manage Customers",
    "Manage Employees",
    "Manage Warehouses",
    "Manage Machines"
  ],
  Purchase: [
    "Purchase Requests",
    "Purchase Orders",
    "Goods Receipts",
    "Supplier Payments"
  ],
  Inventory: [
    "Stock Overview",
    "Stock Movement",
    "Warehouse Transfer"
  ],
  Production: [
    "BOM Management",
    "Production Orders",
    "Production Tracking"
  ],
  Quality: [
    "Quality Checks",
    "Rejected / Quarantine"
  ],
  Sales: [
    "Customer Orders",
    "Dispatch",
    "Sales Invoice",
    "Customer Payments"
  ],
  HR: [
    "Employees",
    "Attendance",
    "Salary / Wages",
    "Payroll"
  ],
  Maintenance: [
    "Maintenance Records"
  ],
  Reports: [
    "View Reports",
    "Export Reports"
  ],
  Settings: [
    "Manage Users",
    "Manage Roles",
    "Company Settings"
  ]
};

function Roles() {
  const [roles, setRoles] = useState(initialRoles);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
    permissions: []
  });

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(search.toLowerCase()) ||
      role.description.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setSelectedRole(null);
    setForm({
      name: "",
      description: "",
      status: "Active",
      permissions: []
    });
    setShowModal(true);
  };

  const openEditModal = (role) => {
    setSelectedRole(role);
    setForm({
      name: role.name,
      description: role.description,
      status: role.status,
      permissions: []
    });
    setShowMenu(null);
    setShowModal(true);
  };

  const togglePermission = (permission) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((item) => item !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) return;

    if (selectedRole) {
      setRoles((prev) =>
        prev.map((role) =>
          role.id === selectedRole.id
            ? {
                ...role,
                name: form.name,
                description: form.description,
                status: form.status,
                permissions:
                  form.permissions.length || role.permissions
              }
            : role
        )
      );
    } else {
      setRoles((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: form.name,
          description: form.description,
          users: 0,
          permissions: form.permissions.length,
          status: form.status
        }
      ]);
    }

    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === id
          ? {
              ...role,
              status: role.status === "Active" ? "Inactive" : "Active"
            }
          : role
      )
    );

    setShowMenu(null);
  };

  const deleteRole = (id) => {
    const role = roles.find((item) => item.id === id);

    if (role?.users > 0) {
      alert("This role has assigned users and cannot be deleted.");
      setShowMenu(null);
      return;
    }

    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles((prev) => prev.filter((role) => role.id !== id));
    }

    setShowMenu(null);
  };

  return (
    <div className="settings-roles-page">
      <div className="settings-page-header">
        <div>
          <span className="settings-eyebrow">SETTINGS</span>
          <h1>Roles & Permissions</h1>
          <p>Control what each ERP role can access and manage.</p>
        </div>

        <button className="settings-primary-button" onClick={openAddModal}>
          <Plus size={18} />
          Add Role
        </button>
      </div>

      <div className="roles-summary-grid">
        <div className="roles-summary-card">
          <div className="roles-summary-icon">
            <ShieldCheck size={21} />
          </div>
          <div>
            <span>Total Roles</span>
            <strong>{roles.length}</strong>
          </div>
        </div>

        <div className="roles-summary-card">
          <div className="roles-summary-icon green">
            <ShieldCheck size={21} />
          </div>
          <div>
            <span>Active Roles</span>
            <strong>
              {roles.filter((role) => role.status === "Active").length}
            </strong>
          </div>
        </div>

        <div className="roles-summary-card">
          <div className="roles-summary-icon purple">
            <Users size={21} />
          </div>
          <div>
            <span>Assigned Users</span>
            <strong>
              {roles.reduce((total, role) => total + role.users, 0)}
            </strong>
          </div>
        </div>
      </div>

      <div className="roles-content-card">
        <div className="roles-toolbar">
          <div className="settings-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="roles-grid">
          {filteredRoles.map((role) => (
            <div className="role-card" key={role.id}>
              <div className="role-card-top">
                <div className="role-icon">
                  <ShieldCheck size={21} />
                </div>

                <div className="role-menu-wrapper">
                  <button
                    className="settings-more-button"
                    onClick={() =>
                      setShowMenu(
                        showMenu === role.id ? null : role.id
                      )
                    }
                  >
                    <MoreVertical size={18} />
                  </button>

                  {showMenu === role.id && (
                    <div className="settings-action-menu">
                      <button onClick={() => openEditModal(role)}>
                        Edit Role
                      </button>

                      <button onClick={() => toggleStatus(role.id)}>
                        {role.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>

                      <button
                        className="danger"
                        onClick={() => deleteRole(role.id)}
                      >
                        Delete Role
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="role-card-body">
                <div className="role-title-row">
                  <h3>{role.name}</h3>
                  <span
                    className={`settings-status ${
                      role.status === "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {role.status}
                  </span>
                </div>

                <p>{role.description}</p>
              </div>

              <div className="role-card-footer">
                <div>
                  <Users size={16} />
                  <span>{role.users} Users</span>
                </div>

                <div>
                  <ShieldCheck size={16} />
                  <span>{role.permissions} Permissions</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRoles.length === 0 && (
          <div className="settings-empty-state">
            No roles found.
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="settings-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="roles-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-modal-header">
              <div>
                <span className="settings-eyebrow">
                  ROLE MANAGEMENT
                </span>
                <h2>
                  {selectedRole ? "Edit Role" : "Create New Role"}
                </h2>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="roles-basic-fields">
                <div className="settings-form-group">
                  <label>Role Name</label>
                  <input
                    type="text"
                    placeholder="Enter role name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value
                      })
                    }
                    required
                  />
                </div>

                <div className="settings-form-group">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value
                      })
                    }
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div className="settings-form-group role-description-field">
                  <label>Description</label>
                  <textarea
                    placeholder="Describe this role..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="permission-heading">
                <div>
                  <h3>Permissions</h3>
                  <span>
                    Select the modules and actions available to this role.
                  </span>
                </div>

                <strong>
                  {form.permissions.length} selected
                </strong>
              </div>

              <div className="permissions-container">
                {Object.entries(permissionGroups).map(
                  ([group, permissions]) => (
                    <div className="permission-group" key={group}>
                      <h4>{group}</h4>

                      <div className="permission-list">
                        {permissions.map((permission) => (
                          <label
                            className="permission-item"
                            key={permission}
                          >
                            <input
                              type="checkbox"
                              checked={form.permissions.includes(
                                permission
                              )}
                              onChange={() =>
                                togglePermission(permission)
                              }
                            />
                            <span>{permission}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="settings-modal-actions">
                <button
                  type="button"
                  className="settings-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="settings-primary-button"
                >
                  {selectedRole ? "Update Role" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;