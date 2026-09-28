import { useMemo, useState } from "react";
import {
  Truck,
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
  CheckCircle2,
  Clock3,
  MapPin,
  FileCheck2,
} from "lucide-react";

const initialDispatches = [
  {
    id: "DSP-2026-012",
    order: "SO-2026-014",
    customer: "Shree Auto Components",
    warehouse: "Finished Goods Store",
    dispatchDate: "10 Sep 2026",
    items: 2,
    quantity: 24,
    transporter: "VRL Logistics",
    driver: "Suresh Pawar",
    status: "Dispatched",
  },
  {
    id: "DSP-2026-011",
    order: "SO-2026-012",
    customer: "Nova Machinery",
    warehouse: "Finished Goods Store",
    dispatchDate: "09 Sep 2026",
    items: 2,
    quantity: 20,
    transporter: "Delhivery Freight",
    driver: "Amit Jadhav",
    status: "Delivered",
  },
  {
    id: "DSP-2026-010",
    order: "SO-2026-010",
    customer: "Apex Engineering Pvt. Ltd.",
    warehouse: "Main Warehouse",
    dispatchDate: "08 Sep 2026",
    items: 3,
    quantity: 42,
    transporter: "TCI Express",
    driver: "Rohit Shinde",
    status: "Delivered",
  },
  {
    id: "DSP-2026-009",
    order: "SO-2026-008",
    customer: "MechPro Solutions",
    warehouse: "Finished Goods Store",
    dispatchDate: "07 Sep 2026",
    items: 1,
    quantity: 15,
    transporter: "VRL Logistics",
    driver: "Ganesh More",
    status: "Pending",
  },
  {
    id: "DSP-2026-008",
    order: "SO-2026-007",
    customer: "Precision Works",
    warehouse: "Components Store",
    dispatchDate: "06 Sep 2026",
    items: 2,
    quantity: 30,
    transporter: "Blue Dart Freight",
    driver: "Nilesh Patil",
    status: "Dispatched",
  },
];

const salesOrders = [
  {
    order: "SO-2026-015",
    customer: "Apex Engineering Pvt. Ltd.",
    address: "MIDC Bhosari, Pune, Maharashtra",
  },
  {
    order: "SO-2026-014",
    customer: "Shree Auto Components",
    address: "Ambad MIDC, Nashik, Maharashtra",
  },
  {
    order: "SO-2026-013",
    customer: "MechPro Solutions",
    address: "Andheri East, Mumbai, Maharashtra",
  },
  {
    order: "SO-2026-011",
    customer: "Precision Works",
    address: "Waluj MIDC, Aurangabad, Maharashtra",
  },
];

const products = [
  {
    name: "Industrial Pump",
    unit: "PCS",
    stock: 68,
    batch: "IP-SEP26-06",
  },
  {
    name: "Machine Frame",
    unit: "PCS",
    stock: 125,
    batch: "MF-SEP26-02",
  },
  {
    name: "Hydraulic Pump Assembly",
    unit: "PCS",
    stock: 32,
    batch: "HP-SEP26-03",
  },
  {
    name: "Motor Mount",
    unit: "PCS",
    stock: 75,
    batch: "MM-SEP26-05",
  },
];

const warehouses = [
  "Main Warehouse",
  "Finished Goods Store",
  "Components Store",
  "Production Floor",
];

const transporters = [
  "VRL Logistics",
  "TCI Express",
  "Delhivery Freight",
  "Blue Dart Freight",
];

const createItem = () => ({
  product: "",
  quantity: 1,
  unit: "",
  batch: "",
});

function Dispatch() {
  const [dispatches, setDispatches] = useState(initialDispatches);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [form, setForm] = useState({
    dispatchNo: "DSP-2026-013",
    salesOrder: "",
    customer: "",
    dispatchDate: "2026-09-12",
    warehouse: "",
    deliveryAddress: "",
    transporter: "",
    driverName: "",
    vehicleNumber: "",
    lrNumber: "",
    remarks: "",
    proofOfDelivery: "",
    items: [createItem()],
  });

  const filteredDispatches = useMemo(() => {
    return dispatches.filter((dispatch) => {
      const searchMatch =
        dispatch.id.toLowerCase().includes(search.toLowerCase()) ||
        dispatch.order.toLowerCase().includes(search.toLowerCase()) ||
        dispatch.customer.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || dispatch.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [dispatches, search, statusFilter]);

  const totalDispatches = dispatches.length;
  const pending = dispatches.filter(
    (item) => item.status === "Pending"
  ).length;
  const dispatched = dispatches.filter(
    (item) => item.status === "Dispatched"
  ).length;
  const delivered = dispatches.filter(
    (item) => item.status === "Delivered"
  ).length;

  const updateOrder = (value) => {
    const selected = salesOrders.find(
      (order) => order.order === value
    );

    setForm((current) => ({
      ...current,
      salesOrder: value,
      customer: selected?.customer || "",
      deliveryAddress: selected?.address || "",
    }));
  };

  const updateItem = (index, field, value) => {
    setForm((current) => {
      const items = [...current.items];
      const item = { ...items[index] };

      if (field === "product") {
        const selected = products.find(
          (product) => product.name === value
        );

        item.product = value;
        item.unit = selected?.unit || "";
        item.batch = selected?.batch || "";
      } else {
        item[field] = value;
      }

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
      items: [...current.items, createItem()],
    }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) return;

    setForm((current) => ({
      ...current,
      items: current.items.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  };

  const totalQuantity = form.items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const handleCreateDispatch = () => {
    if (!form.salesOrder) {
      window.alert("Please select a sales order.");
      return;
    }

    if (!form.warehouse) {
      window.alert("Please select a warehouse.");
      return;
    }

    if (!form.transporter) {
      window.alert("Please select a transporter.");
      return;
    }

    const validItems = form.items.filter(
      (item) => item.product && Number(item.quantity) > 0
    );

    if (validItems.length === 0) {
      window.alert("Please add at least one product.");
      return;
    }

    const newDispatch = {
      id: form.dispatchNo,
      order: form.salesOrder,
      customer: form.customer,
      warehouse: form.warehouse,
      dispatchDate: "12 Sep 2026",
      items: validItems.length,
      quantity: totalQuantity,
      transporter: form.transporter,
      driver: form.driverName || "Not Assigned",
      status: "Pending",
    };

    setDispatches((current) => [newDispatch, ...current]);
    setShowCreateModal(false);

    setForm({
      dispatchNo:
        "DSP-2026-" +
        String(dispatches.length + 14).padStart(3, "0"),
      salesOrder: "",
      customer: "",
      dispatchDate: "2026-09-12",
      warehouse: "",
      deliveryAddress: "",
      transporter: "",
      driverName: "",
      vehicleNumber: "",
      lrNumber: "",
      remarks: "",
      proofOfDelivery: "",
      items: [createItem()],
    });

    window.alert("Dispatch created successfully.");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dispatch?"
    );

    if (confirmed) {
      setDispatches((current) =>
        current.filter((item) => item.id !== id)
      );
      setMenuOpen(null);
    }
  };

  return (
    <div className="dispatch-page">
      <div className="dispatch-heading">
        <div>
          <div className="module-eyebrow">SALES MANAGEMENT</div>
          <h1>Dispatch</h1>
          <p>
            Manage shipments, delivery details and proof of delivery.
          </p>
        </div>

        <button
          className="dispatch-add-button"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Create Dispatch
        </button>
      </div>

      <div className="dispatch-summary-grid">
        <div className="dispatch-summary-card">
          <div className="dispatch-summary-icon blue">
            <Truck size={20} />
          </div>
          <div>
            <span>Total Dispatches</span>
            <strong>{totalDispatches}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-summary-icon orange">
            <Clock3 size={20} />
          </div>
          <div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-summary-icon purple">
            <Truck size={20} />
          </div>
          <div>
            <span>In Transit</span>
            <strong>{dispatched}</strong>
          </div>
        </div>

        <div className="dispatch-summary-card">
          <div className="dispatch-summary-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Delivered</span>
            <strong>{delivered}</strong>
          </div>
        </div>
      </div>

      <div className="dispatch-container">
        <div className="dispatch-toolbar">
          <div className="dispatch-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search dispatch, order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="dispatch-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <span className="dispatch-result-count">
            {filteredDispatches.length} dispatches
          </span>
        </div>

        <div className="dispatch-table-wrapper">
          <table className="dispatch-table">
            <thead>
              <tr>
                <th>Dispatch</th>
                <th>Sales Order</th>
                <th>Customer</th>
                <th>Warehouse</th>
                <th>Dispatch Date</th>
                <th>Items / Qty</th>
                <th>Transporter</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredDispatches.map((dispatch) => (
                <tr key={dispatch.id}>
                  <td>
                    <div className="dispatch-id">
                      <strong>{dispatch.id}</strong>
                      <span>{dispatch.driver}</span>
                    </div>
                  </td>

                  <td>
                    <strong className="dispatch-order">
                      {dispatch.order}
                    </strong>
                  </td>

                  <td>
                    <div className="dispatch-customer">
                      <div className="dispatch-customer-icon">
                        <UserRound size={15} />
                      </div>
                      <strong>{dispatch.customer}</strong>
                    </div>
                  </td>

                  <td>
                    <div className="dispatch-warehouse">
                      <MapPin size={14} />
                      {dispatch.warehouse}
                    </div>
                  </td>

                  <td>
                    <div className="dispatch-date">
                      <CalendarDays size={14} />
                      {dispatch.dispatchDate}
                    </div>
                  </td>

                  <td>
                    <div className="dispatch-quantity">
                      <strong>{dispatch.items} items</strong>
                      <span>{dispatch.quantity} units</span>
                    </div>
                  </td>

                  <td>
                    <span className="dispatch-transporter">
                      {dispatch.transporter}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`dispatch-status ${dispatch.status.toLowerCase()}`}
                    >
                      <span></span>
                      {dispatch.status}
                    </span>
                  </td>

                  <td>
                    <div className="dispatch-action-area">
                      <button
                        className="dispatch-more-button"
                        onClick={() =>
                          setMenuOpen(
                            menuOpen === dispatch.id
                              ? null
                              : dispatch.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuOpen === dispatch.id && (
                        <div className="dispatch-action-menu">
                          <button
                            onClick={() => {
                              setSelectedDispatch(dispatch);
                              setMenuOpen(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              setSelectedDispatch(dispatch);
                              setMenuOpen(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit Dispatch
                          </button>

                          <button
                            className="danger"
                            onClick={() =>
                              handleDelete(dispatch.id)
                            }
                          >
                            <Trash2 size={15} />
                            Delete Dispatch
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredDispatches.length === 0 && (
            <div className="dispatch-empty">
              <Truck size={34} />
              <h3>No dispatches found</h3>
              <p>Try changing your search or filter.</p>
            </div>
          )}
        </div>

        <div className="dispatch-footer">
          <span>
            Showing {filteredDispatches.length} of{" "}
            {dispatches.length} dispatches
          </span>

          <div className="dispatch-pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div
          className="dispatch-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="dispatch-modal large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dispatch-modal-header">
              <div>
                <span>OUTBOUND DISPATCH</span>
                <h2>Create Dispatch</h2>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="dispatch-form">
              <div className="dispatch-form-section">
                <div className="dispatch-section-title">
                  <Truck size={17} />
                  <div>
                    <strong>Dispatch Information</strong>
                    <span>
                      Select the sales order and dispatch warehouse
                    </span>
                  </div>
                </div>

                <div className="dispatch-form-grid">
                  <div className="dispatch-field">
                    <label>Dispatch Number</label>
                    <input value={form.dispatchNo} readOnly />
                  </div>

                  <div className="dispatch-field">
                    <label>Sales Order</label>
                    <select
                      value={form.salesOrder}
                      onChange={(e) =>
                        updateOrder(e.target.value)
                      }
                    >
                      <option value="">Select sales order</option>
                      {salesOrders.map((order) => (
                        <option
                          key={order.order}
                          value={order.order}
                        >
                          {order.order} — {order.customer}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="dispatch-field">
                    <label>Customer</label>
                    <input
                      value={form.customer}
                      readOnly
                      placeholder="Auto-filled from sales order"
                    />
                  </div>

                  <div className="dispatch-field">
                    <label>Dispatch Date</label>
                    <input
                      type="date"
                      value={form.dispatchDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          dispatchDate: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="dispatch-field">
                    <label>Warehouse</label>
                    <select
                      value={form.warehouse}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          warehouse: e.target.value,
                        })
                      }
                    >
                      <option value="">Select warehouse</option>
                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse}
                          value={warehouse}
                        >
                          {warehouse}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="dispatch-field full">
                    <label>Delivery Address</label>
                    <textarea
                      rows="2"
                      value={form.deliveryAddress}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          deliveryAddress: e.target.value,
                        })
                      }
                      placeholder="Delivery address"
                    />
                  </div>
                </div>
              </div>

              <div className="dispatch-form-section">
                <div className="dispatch-section-heading">
                  <div className="dispatch-section-title">
                    <Package size={17} />
                    <div>
                      <strong>Products & Batch</strong>
                      <span>
                        Select products and quantities to dispatch
                      </span>
                    </div>
                  </div>

                  <button
                    className="dispatch-add-row"
                    onClick={addItem}
                  >
                    <Plus size={15} />
                    Add Row
                  </button>
                </div>

                <div className="dispatch-items-wrapper">
                  <table className="dispatch-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Available Stock</th>
                        <th>Batch Number</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {form.items.map((item, index) => {
                        const selectedProduct = products.find(
                          (product) => product.name === item.product
                        );

                        return (
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
                              <span className="dispatch-stock">
                                {selectedProduct?.stock || 0}
                              </span>
                            </td>

                            <td>
                              <input
                                value={item.batch}
                                onChange={(e) =>
                                  updateItem(
                                    index,
                                    "batch",
                                    e.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              <button
                                className="dispatch-remove-row"
                                onClick={() =>
                                  removeItem(index)
                                }
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dispatch-form-section">
                <div className="dispatch-section-title">
                  <Truck size={17} />
                  <div>
                    <strong>Transport Details</strong>
                    <span>Shipment and driver information</span>
                  </div>
                </div>

                <div className="dispatch-form-grid">
                  <div className="dispatch-field">
                    <label>Transporter</label>
                    <select
                      value={form.transporter}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          transporter: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Select transporter
                      </option>
                      {transporters.map((transporter) => (
                        <option
                          key={transporter}
                          value={transporter}
                        >
                          {transporter}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="dispatch-field">
                    <label>Driver Name</label>
                    <input
                      value={form.driverName}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          driverName: e.target.value,
                        })
                      }
                      placeholder="Enter driver name"
                    />
                  </div>

                  <div className="dispatch-field">
                    <label>Vehicle Number</label>
                    <input
                      value={form.vehicleNumber}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          vehicleNumber: e.target.value,
                        })
                      }
                      placeholder="MH 12 AB 1234"
                    />
                  </div>

                  <div className="dispatch-field">
                    <label>LR / Consignment Number</label>
                    <input
                      value={form.lrNumber}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          lrNumber: e.target.value,
                        })
                      }
                      placeholder="Enter LR number"
                    />
                  </div>

                  <div className="dispatch-field full">
                    <label>Remarks</label>
                    <textarea
                      rows="3"
                      value={form.remarks}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          remarks: e.target.value,
                        })
                      }
                      placeholder="Add dispatch remarks..."
                    />
                  </div>

                  <div className="dispatch-field full">
                    <label>Proof of Delivery</label>
                    <input
                      value={form.proofOfDelivery}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          proofOfDelivery: e.target.value,
                        })
                      }
                      placeholder="Enter POD reference or document number"
                    />
                  </div>
                </div>
              </div>

              <div className="dispatch-total-box">
                <div>
                  <Package size={19} />
                  <span>Total Items</span>
                  <strong>{form.items.length}</strong>
                </div>

                <div>
                  <Truck size={19} />
                  <span>Total Quantity</span>
                  <strong>{totalQuantity}</strong>
                </div>

                <div>
                  <FileCheck2 size={19} />
                  <span>Dispatch Status</span>
                  <strong>Pending</strong>
                </div>
              </div>
            </div>

            <div className="dispatch-modal-footer">
              <button
                className="dispatch-cancel-button"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>

              <button
                className="dispatch-create-button"
                onClick={handleCreateDispatch}
              >
                <CheckCircle2 size={17} />
                Create Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDispatch && (
        <div
          className="dispatch-modal-overlay"
          onClick={() => setSelectedDispatch(null)}
        >
          <div
            className="dispatch-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dispatch-modal-header">
              <div>
                <span>DISPATCH DETAILS</span>
                <h2>{selectedDispatch.id}</h2>
              </div>

              <button
                onClick={() => setSelectedDispatch(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="dispatch-detail-body">
              <div className="dispatch-detail-top">
                <div className="dispatch-detail-icon">
                  <Truck size={21} />
                </div>

                <div>
                  <span>Customer</span>
                  <strong>{selectedDispatch.customer}</strong>
                </div>

                <span
                  className={`dispatch-status ${selectedDispatch.status.toLowerCase()}`}
                >
                  <span></span>
                  {selectedDispatch.status}
                </span>
              </div>

              <div className="dispatch-detail-grid">
                <div>
                  <span>Sales Order</span>
                  <strong>{selectedDispatch.order}</strong>
                </div>

                <div>
                  <span>Dispatch Date</span>
                  <strong>{selectedDispatch.dispatchDate}</strong>
                </div>

                <div>
                  <span>Warehouse</span>
                  <strong>{selectedDispatch.warehouse}</strong>
                </div>

                <div>
                  <span>Transporter</span>
                  <strong>{selectedDispatch.transporter}</strong>
                </div>

                <div>
                  <span>Driver</span>
                  <strong>{selectedDispatch.driver}</strong>
                </div>

                <div>
                  <span>Total Quantity</span>
                  <strong>{selectedDispatch.quantity}</strong>
                </div>
              </div>

              <div className="dispatch-detail-address">
                <MapPin size={17} />
                <div>
                  <span>Delivery Address</span>
                  <strong>
                    Delivery location linked with{" "}
                    {selectedDispatch.customer}
                  </strong>
                </div>
              </div>
            </div>

            <div className="dispatch-modal-footer">
              <button
                className="dispatch-cancel-button"
                onClick={() => setSelectedDispatch(null)}
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

export default Dispatch;