import { useMemo, useState } from "react";
import {
  ShoppingBag,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  X,
  Trash2,
  CalendarDays,
  UserRound,
  Package,
  IndianRupee,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

const initialOrders = [
  {
    id: "SO-2026-015",
    customer: "Apex Engineering Pvt. Ltd.",
    orderDate: "10 Sep 2026",
    deliveryDate: "18 Sep 2026",
    items: 3,
    amount: 385000,
    available: 2,
    productionRequired: 1,
    dispatched: 0,
    pending: 3,
    status: "Confirmed",
    paymentStatus: "Pending",
  },
  {
    id: "SO-2026-014",
    customer: "Shree Auto Components",
    orderDate: "09 Sep 2026",
    deliveryDate: "16 Sep 2026",
    items: 2,
    amount: 248500,
    available: 2,
    productionRequired: 0,
    dispatched: 1,
    pending: 1,
    status: "Processing",
    paymentStatus: "Partially Paid",
  },
  {
    id: "SO-2026-013",
    customer: "MechPro Solutions",
    orderDate: "08 Sep 2026",
    deliveryDate: "15 Sep 2026",
    items: 4,
    amount: 524800,
    available: 2,
    productionRequired: 2,
    dispatched: 0,
    pending: 4,
    status: "Production",
    paymentStatus: "Pending",
  },
  {
    id: "SO-2026-012",
    customer: "Nova Machinery",
    orderDate: "07 Sep 2026",
    deliveryDate: "13 Sep 2026",
    items: 2,
    amount: 176500,
    available: 2,
    productionRequired: 0,
    dispatched: 2,
    pending: 0,
    status: "Completed",
    paymentStatus: "Paid",
  },
  {
    id: "SO-2026-011",
    customer: "Precision Works",
    orderDate: "05 Sep 2026",
    deliveryDate: "12 Sep 2026",
    items: 3,
    amount: 312750,
    available: 3,
    productionRequired: 0,
    dispatched: 0,
    pending: 3,
    status: "Pending",
    paymentStatus: "Pending",
  },
];

const customers = [
  "Apex Engineering Pvt. Ltd.",
  "Shree Auto Components",
  "MechPro Solutions",
  "Precision Works",
  "Nova Machinery",
];

const products = [
  {
    name: "Industrial Pump",
    unit: "PCS",
    rate: 10500,
    stock: 68,
  },
  {
    name: "Machine Frame",
    unit: "PCS",
    rate: 1750,
    stock: 125,
  },
  {
    name: "Hydraulic Pump Assembly",
    unit: "PCS",
    rate: 8200,
    stock: 32,
  },
  {
    name: "Motor Mount",
    unit: "PCS",
    rate: 2400,
    stock: 75,
  },
  {
    name: "Steel Sheet",
    unit: "KG",
    rate: 95,
    stock: 2450,
  },
];

const createEmptyItem = () => ({
  product: "",
  quantity: 1,
  unit: "",
  rate: 0,
  discount: 0,
  tax: 18,
  total: 0,
});

function CustomerOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [form, setForm] = useState({
    orderNo: "SO-2026-016",
    customer: "",
    orderDate: "2026-09-12",
    expectedDeliveryDate: "2026-09-20",
    deliveryAddress: "",
    paymentTerms: "Net 30",
    notes: "",
    items: [createEmptyItem()],
  });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || order.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [orders, search, statusFilter]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const processingOrders = orders.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Production"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const updateItem = (index, field, value) => {
    setForm((current) => {
      const items = [...current.items];
      const item = { ...items[index] };

      if (field === "product") {
        const product = products.find((p) => p.name === value);

        item.product = value;
        item.unit = product?.unit || "";
        item.rate = product?.rate || 0;
      } else {
        item[field] = value;
      }

      const quantity = Number(item.quantity) || 0;
      const rate = Number(item.rate) || 0;
      const discount = Number(item.discount) || 0;
      const tax = Number(item.tax) || 0;

      const baseAmount = quantity * rate;
      const discountAmount = (baseAmount * discount) / 100;
      const taxableAmount = baseAmount - discountAmount;
      const taxAmount = (taxableAmount * tax) / 100;

      item.total = taxableAmount + taxAmount;

      items[index] = item;

      return {
        ...current,
        items,
      };
    });
  };

  const addItem = () => {
    setForm((current) => ({
      ...current,
      items: [...current.items, createEmptyItem()],
    }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) return;

    setForm((current) => ({
      ...current,
      items: current.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const grandTotal = form.items.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const subtotal = form.items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) * Number(item.rate || 0),
    0
  );

  const totalDiscount = form.items.reduce(
    (sum, item) => {
      const base =
        Number(item.quantity || 0) * Number(item.rate || 0);

      return sum + (base * Number(item.discount || 0)) / 100;
    },
    0
  );

  const totalTax = grandTotal - subtotal + totalDiscount;

  const handleCreateOrder = () => {
    if (!form.customer) {
      window.alert("Please select a customer.");
      return;
    }

    const validItems = form.items.filter(
      (item) => item.product && Number(item.quantity) > 0
    );

    if (validItems.length === 0) {
      window.alert("Please add at least one product.");
      return;
    }

    const newOrder = {
      id: form.orderNo,
      customer: form.customer,
      orderDate: "12 Sep 2026",
      deliveryDate: "20 Sep 2026",
      items: validItems.length,
      amount: grandTotal,
      available: validItems.length,
      productionRequired: 0,
      dispatched: 0,
      pending: validItems.length,
      status: "Pending",
      paymentStatus: "Pending",
    };

    setOrders((current) => [newOrder, ...current]);
    setShowCreateModal(false);

    setForm({
      orderNo: "SO-2026-" + String(orders.length + 17).padStart(3, "0"),
      customer: "",
      orderDate: "2026-09-12",
      expectedDeliveryDate: "2026-09-20",
      deliveryAddress: "",
      paymentTerms: "Net 30",
      notes: "",
      items: [createEmptyItem()],
    });

    window.alert("Customer order created successfully.");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer order?"
    );

    if (confirmed) {
      setOrders((current) =>
        current.filter((order) => order.id !== id)
      );
      setMenuOpen(null);
    }
  };

  return (
    <div className="sales-orders-page">
      <div className="sales-orders-heading">
        <div>
          <div className="module-eyebrow">SALES MANAGEMENT</div>
          <h1>Customer Orders</h1>
          <p>
            Manage customer orders, stock availability and production
            requirements.
          </p>
        </div>

        <button
          className="sales-orders-add-button"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Create Order
        </button>
      </div>

      <div className="sales-orders-summary-grid">
        <div className="sales-orders-summary-card">
          <div className="sales-orders-summary-icon blue">
            <ShoppingBag size={20} />
          </div>
          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>
        </div>

        <div className="sales-orders-summary-card">
          <div className="sales-orders-summary-icon orange">
            <Clock3 size={20} />
          </div>
          <div>
            <span>Pending Orders</span>
            <strong>{pendingOrders}</strong>
          </div>
        </div>

        <div className="sales-orders-summary-card">
          <div className="sales-orders-summary-icon purple">
            <Package size={20} />
          </div>
          <div>
            <span>In Process</span>
            <strong>{processingOrders}</strong>
          </div>
        </div>

        <div className="sales-orders-summary-card">
          <div className="sales-orders-summary-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedOrders}</strong>
          </div>
        </div>
      </div>

      <div className="sales-orders-container">
        <div className="sales-orders-toolbar">
          <div className="sales-orders-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="sales-orders-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Production">Production</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <span className="sales-orders-result-count">
            {filteredOrders.length} orders
          </span>
        </div>

        <div className="sales-orders-table-wrapper">
          <table className="sales-orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Delivery</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Stock / Production</th>
                <th>Status</th>
                <th>Payment</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="sales-orders-id">
                      <strong>{order.id}</strong>
                      <span>{order.items} products</span>
                    </div>
                  </td>

                  <td>
                    <div className="sales-orders-customer">
                      <div className="sales-orders-customer-icon">
                        <UserRound size={16} />
                      </div>
                      <strong>{order.customer}</strong>
                    </div>
                  </td>

                  <td>{order.orderDate}</td>

                  <td>
                    <div className="sales-orders-date">
                      <CalendarDays size={14} />
                      {order.deliveryDate}
                    </div>
                  </td>

                  <td>
                    <strong>{order.items}</strong>
                  </td>

                  <td>
                    <strong className="sales-orders-amount">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <div className="sales-orders-stock">
                      <span>
                        Available: <strong>{order.available}</strong>
                      </span>
                      <span>
                        Production:{" "}
                        <strong>{order.productionRequired}</strong>
                      </span>
                      <span>
                        Pending: <strong>{order.pending}</strong>
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`sales-orders-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span></span>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`sales-orders-payment ${order.paymentStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <div className="sales-orders-action-area">
                      <button
                        className="sales-orders-more-button"
                        onClick={() =>
                          setMenuOpen(
                            menuOpen === order.id ? null : order.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuOpen === order.id && (
                        <div className="sales-orders-action-menu">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setMenuOpen(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setMenuOpen(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit Order
                          </button>

                          <button
                            className="danger"
                            onClick={() => handleDelete(order.id)}
                          >
                            <Trash2 size={15} />
                            Delete Order
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
            <div className="sales-orders-empty">
              <ShoppingBag size={34} />
              <h3>No customer orders found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}
        </div>

        <div className="sales-orders-footer">
          <span>
            Showing {filteredOrders.length} of {orders.length} orders
          </span>

          <div className="sales-orders-pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div
          className="sales-orders-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="sales-orders-modal large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sales-orders-modal-header">
              <div>
                <span>SALES ORDER</span>
                <h2>Create Customer Order</h2>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="sales-orders-form">
              <div className="sales-orders-form-section">
                <div className="sales-orders-section-title">
                  <ShoppingBag size={17} />
                  <div>
                    <strong>Order Information</strong>
                    <span>Basic customer order details</span>
                  </div>
                </div>

                <div className="sales-orders-form-grid">
                  <div className="sales-orders-field">
                    <label>Sales Order Number</label>
                    <input
                      value={form.orderNo}
                      readOnly
                    />
                  </div>

                  <div className="sales-orders-field">
                    <label>Customer / Distributor</label>
                    <select
                      value={form.customer}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          customer: e.target.value,
                        })
                      }
                    >
                      <option value="">Select customer</option>
                      {customers.map((customer) => (
                        <option key={customer} value={customer}>
                          {customer}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sales-orders-field">
                    <label>Order Date</label>
                    <input
                      type="date"
                      value={form.orderDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          orderDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="sales-orders-field">
                    <label>Expected Delivery Date</label>
                    <input
                      type="date"
                      value={form.expectedDeliveryDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          expectedDeliveryDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="sales-orders-field full">
                    <label>Delivery Address</label>
                    <textarea
                      rows="2"
                      placeholder="Enter delivery address"
                      value={form.deliveryAddress}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="sales-orders-field">
                    <label>Payment Terms</label>
                    <select
                      value={form.paymentTerms}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          paymentTerms: e.target.value,
                        })
                      }
                    >
                      <option>Advance</option>
                      <option>Net 15</option>
                      <option>Net 30</option>
                      <option>Net 45</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="sales-orders-form-section">
                <div className="sales-orders-section-heading">
                  <div className="sales-orders-section-title">
                    <Package size={17} />
                    <div>
                      <strong>Products</strong>
                      <span>
                        Add products and pricing details
                      </span>
                    </div>
                  </div>

                  <button
                    className="sales-orders-add-row"
                    onClick={addItem}
                  >
                    <Plus size={15} />
                    Add Row
                  </button>
                </div>

                <div className="sales-orders-items-wrapper">
                  <table className="sales-orders-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Discount %</th>
                        <th>Tax %</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {form.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              value={item.product}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "product",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">
                                Select product
                              </option>

                              {products.map((product) => (
                                <option
                                  key={product.name}
                                  value={product.name}
                                >
                                  {product.name}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              value={item.unit}
                              readOnly
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "rate",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.discount}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "discount",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              min="0"
                              value={item.tax}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "tax",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <strong>
                              ₹{Number(item.total).toLocaleString("en-IN")}
                            </strong>
                          </td>

                          <td>
                            <button
                              className="sales-orders-remove-row"
                              onClick={() => removeItem(index)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sales-orders-bottom-section">
                <div className="sales-orders-field notes-field">
                  <label>Notes</label>
                  <textarea
                    rows="4"
                    placeholder="Add order notes..."
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="sales-orders-total-card">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ₹{subtotal.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span>Discount</span>
                    <strong>
                      - ₹{totalDiscount.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span>Tax</span>
                    <strong>
                      ₹{totalTax.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="grand">
                    <span>Total Amount</span>
                    <strong>
                      <IndianRupee size={16} />
                      {grandTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="sales-orders-modal-footer">
              <button
                className="sales-orders-cancel-button"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>

              <button
                className="sales-orders-create-button"
                onClick={handleCreateOrder}
              >
                <CheckCircle2 size={17} />
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div
          className="sales-orders-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="sales-orders-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sales-orders-modal-header">
              <div>
                <span>CUSTOMER ORDER</span>
                <h2>{selectedOrder.id}</h2>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="sales-orders-detail-body">
              <div className="sales-orders-detail-customer">
                <div className="sales-orders-detail-icon">
                  <UserRound size={21} />
                </div>
                <div>
                  <span>Customer</span>
                  <strong>{selectedOrder.customer}</strong>
                </div>
              </div>

              <div className="sales-orders-detail-grid">
                <div>
                  <span>Order Date</span>
                  <strong>{selectedOrder.orderDate}</strong>
                </div>

                <div>
                  <span>Expected Delivery</span>
                  <strong>{selectedOrder.deliveryDate}</strong>
                </div>

                <div>
                  <span>Total Items</span>
                  <strong>{selectedOrder.items}</strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong>
                    ₹{selectedOrder.amount.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>

              <div className="sales-orders-progress-box">
                <div className="sales-orders-progress-heading">
                  <strong>Order Fulfillment</strong>
                  <span>
                    {selectedOrder.dispatched} / {selectedOrder.items}{" "}
                    dispatched
                  </span>
                </div>

                <div className="sales-orders-progress-track">
                  <div
                    className="sales-orders-progress-fill"
                    style={{
                      width: `${
                        selectedOrder.items
                          ? (selectedOrder.dispatched /
                              selectedOrder.items) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="sales-orders-detail-statuses">
                <div>
                  <span>Available Stock</span>
                  <strong>{selectedOrder.available}</strong>
                </div>

                <div>
                  <span>Production Required</span>
                  <strong>{selectedOrder.productionRequired}</strong>
                </div>

                <div>
                  <span>Dispatched</span>
                  <strong>{selectedOrder.dispatched}</strong>
                </div>

                <div>
                  <span>Pending</span>
                  <strong>{selectedOrder.pending}</strong>
                </div>
              </div>

              {selectedOrder.productionRequired > 0 && (
                <div className="sales-orders-warning">
                  <AlertTriangle size={17} />
                  <span>
                    Production is required before the complete order
                    can be dispatched.
                  </span>
                </div>
              )}
            </div>

            <div className="sales-orders-modal-footer">
              <button
                className="sales-orders-cancel-button"
                onClick={() => setSelectedOrder(null)}
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

export default CustomerOrders;