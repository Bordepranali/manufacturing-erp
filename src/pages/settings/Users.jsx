import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  X,
  UserRound,
  ShieldCheck,
  CheckCircle2,
  UserX
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@manufacturex.com",
    role: "Administrator",
    department: "Management",
    status: "Active",
    lastLogin: "28 Sep 2026, 09:42 AM"
  },
  {
    id: 2,
    name: "Rahul Deshmukh",
    email: "rahul@manufacturex.com",
    role: "Production Manager",
    department: "Production",
    status: "Active",
    lastLogin: "28 Sep 2026, 08:55 AM"
  },
  {
    id: 3,
    name: "Sneha Patil",
    email: "sneha@manufacturex.com",
    role: "Quality Manager",
    department: "Quality",
    status: "Active",
    lastLogin: "27 Sep 2026, 05:18 PM"
  },
  {
    id: 4,
    name: "Amit Kulkarni",
    email: "amit@manufacturex.com",
    role: "Inventory Executive",
    department: "Inventory",
    status: "Inactive",
    lastLogin: "22 Sep 2026, 04:10 PM"
  }
];

function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Administrator",
    department: "Management",
    status: "Active"
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeUsers = users.filter((user) => user.status === "Active").length;
  const inactiveUsers = users.filter((user) => user.status === "Inactive").length;

  const openAddModal = () => {
    setSelectedUser(null);
    setForm({
      name: "",
      email: "",
      role: "Administrator",
      department: "Management",
      status: "Active"
    });
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status
    });
    setShowModal(true);
    setShowMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) return;

    if (selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? { ...user, ...form }
            : user
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          lastLogin: "Never"
        }
      ]);
    }

    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active"
            }
          : user
      )
    );
    setShowMenu(null);
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
    setShowMenu(null);
  };

  return (
    <div className="settings-users-page">
      <div className="settings-page-header">
        <div>
          <span className="settings-eyebrow">SETTINGS</span>
          <h1>User Management</h1>
          <p>Create, manage and control ERP system users.</p>
        </div>

        <button className="settings-primary-button" onClick={openAddModal}>
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="settings-user-summary">
        <div className="settings-summary-card">
          <div className="settings-summary-icon">
            <UserRound size={21} />
          </div>
          <div>
            <span>Total Users</span>
            <strong>{users.length}</strong>
          </div>
        </div>

        <div className="settings-summary-card">
          <div className="settings-summary-icon active">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Active Users</span>
            <strong>{activeUsers}</strong>
          </div>
        </div>

        <div className="settings-summary-card">
          <div className="settings-summary-icon inactive">
            <UserX size={21} />
          </div>
          <div>
            <span>Inactive Users</span>
            <strong>{inactiveUsers}</strong>
          </div>
        </div>
      </div>

      <div className="settings-users-card">
        <div className="settings-users-toolbar">
          <div className="settings-search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="settings-table-wrapper">
          <table className="settings-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department</th>
                <th>Last Login</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="settings-user-cell">
                      <div className="settings-user-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="settings-role-cell">
                      <ShieldCheck size={16} />
                      {user.role}
                    </div>
                  </td>

                  <td>{user.department}</td>

                  <td>{user.lastLogin}</td>

                  <td>
                    <span
                      className={`settings-status ${
                        user.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <div className="settings-action-wrapper">
                      <button
                        className="settings-more-button"
                        onClick={() =>
                          setShowMenu(showMenu === user.id ? null : user.id)
                        }
                      >
                        <MoreVertical size={18} />
                      </button>

                      {showMenu === user.id && (
                        <div className="settings-action-menu">
                          <button onClick={() => openEditModal(user)}>
                            Edit User
                          </button>

                          <button onClick={() => toggleStatus(user.id)}>
                            {user.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>

                          <button
                            className="danger"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="settings-empty-state">
              No users found.
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="settings-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="settings-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-modal-header">
              <div>
                <span className="settings-eyebrow">USER MANAGEMENT</span>
                <h2>{selectedUser ? "Edit User" : "Add New User"}</h2>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="settings-form-grid">
                <div className="settings-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="settings-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div className="settings-form-group">
                  <label>Role</label>
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                  >
                    <option>Administrator</option>
                    <option>Production Manager</option>
                    <option>Quality Manager</option>
                    <option>Inventory Executive</option>
                    <option>Purchase Executive</option>
                    <option>Sales Executive</option>
                    <option>HR Executive</option>
                    <option>Maintenance Executive</option>
                  </select>
                </div>

                <div className="settings-form-group">
                  <label>Department</label>
                  <select
                    value={form.department}
                    onChange={(e) =>
                      setForm({ ...form, department: e.target.value })
                    }
                  >
                    <option>Management</option>
                    <option>Production</option>
                    <option>Quality</option>
                    <option>Inventory</option>
                    <option>Purchase</option>
                    <option>Sales</option>
                    <option>HR</option>
                    <option>Maintenance</option>
                    <option>Finance</option>
                  </select>
                </div>

                <div className="settings-form-group">
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="settings-modal-actions">
                <button
                  type="button"
                  className="settings-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="settings-primary-button">
                  {selectedUser ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;