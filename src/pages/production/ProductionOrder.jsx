import { useMemo, useState } from "react";
import {
  ClipboardList,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  X,
  Trash2,
  Factory,
  CalendarDays,
  UserRound,
  Package,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

const initialOrders = [
  {
    id: "PROD-2026-021",
    orderDate: "10 Sep 2026",
    product: "Industrial Pump",
    code: "FG-001",
    quantity: 50,
    completed: 32,
    startDate: "11 Sep 2026",
    dueDate: "18 Sep 2026",
    assignedTo: "Rahul Deshmukh",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "PROD-2026-020",
    orderDate: "09 Sep 2026",
    product: "Machine Frame",
    code: "SF-001",
    quantity: 30,
    completed: 30,
    startDate: "09 Sep 2026",
    dueDate: "15 Sep 2026",
    assignedTo: "Amit Kulkarni",
    priority: "Normal",
    status: "Completed",
  },
  {
    id: "PROD-2026-019",
    orderDate: "08 Sep 2026",
    product: "Hydraulic Pump Assembly",
    code: "FG-002",
    quantity: 40,
    completed: 12,
    startDate: "10 Sep 2026",
    dueDate: "20 Sep 2026",
    assignedTo: "Rahul Deshmukh",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "PROD-2026-018",
    orderDate: "07 Sep 2026",
    product: "Motor Mount",
    code: "SF-003",
    quantity: 75,
    completed: 0,
    startDate: "16 Sep 2026",
    dueDate: "24 Sep 2026",
    assignedTo: "Vikram Shinde",
    priority: "Normal",
    status: "Planned",
  },
  {
    id: "PROD-2026-017",
    orderDate: "05 Sep 2026",
    product: "Industrial Pump",
    code: "FG-001",
    quantity: 25,
    completed: 25,
    startDate: "06 Sep 2026",
    dueDate: "12 Sep 2026",
    assignedTo: "Rahul Deshmukh",
    priority: "Urgent",
    status: "Completed",
  },
];

const products = [
  { name: "Industrial Pump", code: "FG-001", unit: "PCS" },
  { name: "Hydraulic Pump Assembly", code: "FG-002", unit: "PCS" },
  { name: "Machine Frame", code: "SF-001", unit: "PCS" },
  { name: "Motor Mount", code: "SF-003", unit: "PCS" },
];

const supervisors = [
  "Rahul Deshmukh",
  "Amit Kulkarni",
  "Vikram Shinde",
];

const priorities = ["Normal", "High", "Urgent"];

function ProductionOrder() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [form, setForm] = useState({
    product: "",
    quantity: "",
    startDate: "",
    dueDate: "",
    assignedTo: "",
    priority: "Normal",
    notes: "",
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const value = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(value) ||
        order.product.toLowerCase().includes(value) ||
        order.code.toLowerCase().includes(value) ||
        order.assignedTo.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || order.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [orders, search, statusFilter, priorityFilter]);

  const summary = {
    total: orders.length,
    planned: orders.filter((order) => order.status === "Planned").length,
    inProgress: orders.filter((order) => order.status === "In Progress").length,
    completed: orders.filter((order) => order.status === "Completed").length,
  };

  const resetForm = () => {
    setForm({
      product: "",
      quantity: "",
      startDate: "",
      dueDate: "",
      assignedTo: "",
      priority: "Normal",
      notes: "",
    });
  };

  const createOrder = (status) => {
    if (!form.product) {
      window.alert("Please select a product.");
      return;
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      window.alert("Please enter a valid production quantity.");
      return;
    }

    if (!form.startDate) {
      window.alert("Please select a start date.");
      return;
    }

    if (!form.dueDate) {
      window.alert("Please select a due date.");
      return;
    }

    if (!form.assignedTo) {
      window.alert("Please assign a production supervisor.");
      return;
    }

    const product = products.find((item) => item.name === form.product);

    const newOrder = {
      id: `PROD-2026-${String(orders.length + 22).padStart(3, "0")}`,
      orderDate: "11 Sep 2026",
      product: form.product,
      code: product?.code || "",
      quantity: Number(form.quantity),
      completed: 0,
      startDate: form.startDate,
      dueDate: form.dueDate,
      assignedTo: form.assignedTo,
      priority: form.priority,
      status,
      notes: form.notes,
    };

    setOrders([newOrder, ...orders]);
    setShowModal(false);
    resetForm();

    window.alert(
      status === "In Progress"
        ? "Production order created successfully."
        : "Production order saved as planned."
    );
  };

  const editOrder = (order) => {
    setForm({
      product: order.product,
      quantity: String(order.quantity),
      startDate: order.startDate,
      dueDate: order.dueDate,
      assignedTo: order.assignedTo,
      priority: order.priority,
      notes: order.notes || "",
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  const progress = (order) => {
    if (!order.quantity) return 0;
    return Math.round((order.completed / order.quantity) * 100);
  };

  return (
    <div className="production-order-page">
      <div className="production-order-heading">
        <div>
          <div className="module-eyebrow">PRODUCTION MANAGEMENT</div>
          <h1>Production Orders</h1>
          <p>
            Plan, assign and monitor manufacturing orders across the production floor.
          </p>
        </div>

        <button
          className="production-order-add-button"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Create Production Order
        </button>
      </div>

      <div className="production-order-summary-grid">
        <div className="production-order-summary-card">
          <div className="production-order-summary-icon blue">
            <ClipboardList size={21} />
          </div>
          <div>
            <span>Total Orders</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="production-order-summary-card">
          <div className="production-order-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Planned</span>
            <strong>{summary.planned}</strong>
          </div>
        </div>

        <div className="production-order-summary-card">
          <div className="production-order-summary-icon purple">
            <Factory size={21} />
          </div>
          <div>
            <span>In Progress</span>
            <strong>{summary.inProgress}</strong>
          </div>
        </div>

        <div className="production-order-summary-card">
          <div className="production-order-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
        </div>
      </div>

      <div className="production-order-container">
        <div className="production-order-toolbar">
          <div className="production-order-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search order, product or supervisor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="production-order-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            className="production-order-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priority</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>

          <span className="production-order-result-count">
            {filteredOrders.length} orders
          </span>
        </div>

        <div className="production-order-table-wrapper">
          <table className="production-order-table">
            <thead>
              <tr>
                <th>Production Order</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Progress</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Supervisor</th>
                <th>Priority</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="production-order-id">
                      <div className="production-order-id-icon">
                        <ClipboardList size={16} />
                      </div>
                      <div>
                        <strong>{order.id}</strong>
                        <span>{order.orderDate}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="production-order-product">
                      <div className="production-order-product-icon">
                        <Package size={17} />
                      </div>
                      <div>
                        <strong>{order.product}</strong>
                        <span>{order.code}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong>{order.quantity}</strong>
                    <span className="production-order-unit">PCS</span>
                  </td>

                  <td>
                    <div className="production-order-progress-area">
                      <div className="production-order-progress-top">
                        <span>
                          {order.completed}/{order.quantity}
                        </span>
                        <strong>{progress(order)}%</strong>
                      </div>
                      <div className="production-order-progress">
                        <div
                          style={{
                            width: `${progress(order)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>{order.startDate}</td>
                  <td>{order.dueDate}</td>

                  <td>
                    <div className="production-order-person">
                      <UserRound size={14} />
                      {order.assignedTo}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`production-order-priority ${order.priority.toLowerCase()}`}
                    >
                      {order.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`production-order-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <div className="production-order-action-area">
                      <button
                        className="production-order-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === order.id ? null : order.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === order.id && (
                        <div className="production-order-action-menu">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setOpenMenu(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button onClick={() => editOrder(order)}>
                            <Pencil size={15} />
                            Edit Order
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="production-order-empty-state">
              <ClipboardList size={34} />
              <h3>No production orders found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div className="production-order-footer">
          Showing {filteredOrders.length} of {orders.length} production orders
        </div>
      </div>

      {showModal && (
        <div
          className="production-order-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="production-order-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="production-order-modal-header">
              <div>
                <span>PRODUCTION</span>
                <h2>Create Production Order</h2>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="production-order-form">
              <div className="production-order-section-title">
                <div>01</div>
                <section>
                  <h3>Order Information</h3>
                  <p>Define the product and quantity to be manufactured.</p>
                </section>
              </div>

              <div className="production-order-form-row">
                <div className="production-order-field">
                  <label>Production Order No.</label>
                  <input
                    type="text"
                    value={`PROD-2026-${String(orders.length + 22).padStart(
                      3,
                      "0"
                    )}`}
                    readOnly
                  />
                </div>

                <div className="production-order-field">
                  <label>Product *</label>
                  <select
                    value={form.product}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        product: e.target.value,
                      })
                    }
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.code} value={product.name}>
                        {product.name} ({product.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="production-order-form-row">
                <div className="production-order-field">
                  <label>Production Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="production-order-field">
                  <label>Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priority: e.target.value,
                      })
                    }
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="production-order-section-title production-order-section-spacing">
                <div>02</div>
                <section>
                  <h3>Production Schedule</h3>
                  <p>Set the planned production timeline.</p>
                </section>
              </div>

              <div className="production-order-form-row">
                <div className="production-order-field">
                  <label>Start Date *</label>
                  <div className="production-order-input-icon">
                    <CalendarDays size={16} />
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="production-order-field">
                  <label>Due Date *</label>
                  <div className="production-order-input-icon">
                    <CalendarDays size={16} />
                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="production-order-section-title production-order-section-spacing">
                <div>03</div>
                <section>
                  <h3>Production Assignment</h3>
                  <p>Assign responsibility for this production order.</p>
                </section>
              </div>

              <div className="production-order-form-row">
                <div className="production-order-field">
                  <label>Production Supervisor *</label>
                  <select
                    value={form.assignedTo}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        assignedTo: e.target.value,
                      })
                    }
                  >
                    <option value="">Select supervisor</option>
                    {supervisors.map((person) => (
                      <option key={person} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="production-order-field">
                  <label>Unit</label>
                  <input
                    value={
                      products.find(
                        (product) => product.name === form.product
                      )?.unit || "PCS"
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="production-order-section-title production-order-section-spacing">
                <div>04</div>
                <section>
                  <h3>Notes</h3>
                  <p>Add production instructions or additional information.</p>
                </section>
              </div>

              <div className="production-order-field">
                <textarea
                  rows="4"
                  placeholder="Enter production notes..."
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="production-order-modal-footer">
              <button
                className="production-order-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="production-order-plan-button"
                onClick={() => createOrder("Planned")}
              >
                Save as Planned
              </button>

              <button
                className="production-order-start-button"
                onClick={() => createOrder("In Progress")}
              >
                <Factory size={16} />
                Create & Start
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div
          className="production-order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="production-order-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="production-order-modal-header">
              <div>
                <span>PRODUCTION ORDER</span>
                <h2>{selectedOrder.id}</h2>
              </div>

              <button onClick={() => setSelectedOrder(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="production-order-details-content">
              <div className="production-order-detail-hero">
                <div className="production-order-detail-icon">
                  <Factory size={23} />
                </div>

                <div>
                  <span>PRODUCT</span>
                  <h3>{selectedOrder.product}</h3>
                  <p>{selectedOrder.code}</p>
                </div>

                <span
                  className={`production-order-status ${selectedOrder.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div className="production-order-detail-stats">
                <div>
                  <span>Order Quantity</span>
                  <strong>{selectedOrder.quantity}</strong>
                </div>

                <div>
                  <span>Completed</span>
                  <strong>{selectedOrder.completed}</strong>
                </div>

                <div>
                  <span>Progress</span>
                  <strong>{progress(selectedOrder)}%</strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>{selectedOrder.priority}</strong>
                </div>
              </div>

              <div className="production-order-detail-progress-box">
                <div>
                  <span>Production Progress</span>
                  <strong>
                    {selectedOrder.completed} / {selectedOrder.quantity} PCS
                  </strong>
                </div>

                <div className="production-order-large-progress">
                  <div
                    style={{
                      width: `${progress(selectedOrder)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="production-order-detail-grid">
                <div>
                  <CalendarDays size={17} />
                  <section>
                    <span>Start Date</span>
                    <strong>{selectedOrder.startDate}</strong>
                  </section>
                </div>

                <div>
                  <AlertTriangle size={17} />
                  <section>
                    <span>Due Date</span>
                    <strong>{selectedOrder.dueDate}</strong>
                  </section>
                </div>

                <div>
                  <UserRound size={17} />
                  <section>
                    <span>Supervisor</span>
                    <strong>{selectedOrder.assignedTo}</strong>
                  </section>
                </div>

                <div>
                  <Package size={17} />
                  <section>
                    <span>Product Code</span>
                    <strong>{selectedOrder.code}</strong>
                  </section>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="production-order-notes-box">
                  <span>NOTES</span>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductionOrder;