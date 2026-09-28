import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  Send,
  Printer,
  FileText,
  Clock3,
  CheckCircle2,
  ShoppingCart,
  Warehouse,
  X,
  Trash2,
  Calculator,
  CalendarDays
} from "lucide-react";

const purchaseOrders = [
  {
    id: "PO-2026-001",
    date: "10 Sep 2026",
    supplier: "Tata Steel Industries",
    warehouse: "Main Warehouse",
    items: 4,
    amount: 248500,
    paymentTerms: "Net 30",
    status: "Sent"
  },
  {
    id: "PO-2026-002",
    date: "09 Sep 2026",
    supplier: "Hindalco Metals",
    warehouse: "Raw Material Store",
    items: 3,
    amount: 176800,
    paymentTerms: "Net 45",
    status: "Approved"
  },
  {
    id: "PO-2026-003",
    date: "08 Sep 2026",
    supplier: "SKF Industrial Supplies",
    warehouse: "Components Store",
    items: 6,
    amount: 94500,
    paymentTerms: "Net 30",
    status: "Draft"
  },
  {
    id: "PO-2026-004",
    date: "07 Sep 2026",
    supplier: "Castrol Manufacturing",
    warehouse: "Maintenance Store",
    items: 2,
    amount: 38400,
    paymentTerms: "Advance",
    status: "Partially Received"
  },
  {
    id: "PO-2026-005",
    date: "05 Sep 2026",
    supplier: "Industrial Tools Co.",
    warehouse: "Main Warehouse",
    items: 5,
    amount: 126750,
    paymentTerms: "Net 30",
    status: "Closed"
  }
];

const products = [
  "Steel Sheet",
  "Aluminium Rod",
  "Lubricant Oil",
  "Industrial Bearing",
  "Machine Belt",
  "Welding Electrode"
];

function PurchaseOrder() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    poNo: "PO-2026-006",
    poDate: "2026-09-11",
    supplier: "",
    warehouse: "",
    paymentTerms: "Net 30"
  });

  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
      rate: 0,
      discount: 0,
      tax: 18
    }
  ]);

  const filteredOrders = useMemo(() => {
    return purchaseOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.supplier.toLowerCase().includes(search.toLowerCase()) ||
        order.warehouse.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const draftCount = purchaseOrders.filter(
    (order) => order.status === "Draft"
  ).length;

  const sentCount = purchaseOrders.filter(
    (order) => order.status === "Sent"
  ).length;

  const approvedCount = purchaseOrders.filter(
    (order) => order.status === "Approved"
  ).length;

  const calculateItem = (item) => {
    const quantity = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const discount = Number(item.discount) || 0;
    const tax = Number(item.tax) || 0;

    const baseAmount = quantity * rate;
    const discountAmount = baseAmount * (discount / 100);
    const taxableAmount = baseAmount - discountAmount;
    const taxAmount = taxableAmount * (tax / 100);

    return taxableAmount + taxAmount;
  };

  const subtotal = items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const discount = Number(item.discount) || 0;
    const baseAmount = quantity * rate;
    const discountAmount = baseAmount * (discount / 100);

    return sum + baseAmount - discountAmount;
  }, 0);

  const taxTotal = items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const discount = Number(item.discount) || 0;
    const tax = Number(item.tax) || 0;

    const baseAmount = quantity * rate;
    const discountAmount = baseAmount * (discount / 100);
    const taxableAmount = baseAmount - discountAmount;

    return sum + taxableAmount * (tax / 100);
  }, 0);

  const grandTotal = subtotal + taxTotal;

  const updateForm = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        product: "",
        quantity: 1,
        rate: 0,
        discount: 0,
        tax: 18
      }
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;

    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const saveDraft = () => {
    window.alert("Purchase Order saved as draft.");
    setShowForm(false);
  };

  const sendSupplier = () => {
    window.alert("Purchase Order sent to supplier.");
    setShowForm(false);
  };

  return (
    <div className="purchase-order-page">
      <div className="purchase-order-heading">
        <div>
          <div className="module-eyebrow">PURCHASE / PURCHASE ORDERS</div>
          <h1>Purchase Orders</h1>
          <p>Create, track and manage supplier purchase orders.</p>
        </div>

        <button
          className="purchase-order-add-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Create Purchase Order
        </button>
      </div>

      <div className="purchase-order-summary-grid">
        <div className="purchase-order-summary-card">
          <div className="purchase-order-summary-icon blue">
            <ShoppingCart size={21} />
          </div>
          <div>
            <span>Total Purchase Orders</span>
            <strong>{purchaseOrders.length}</strong>
            <small>Current purchase records</small>
          </div>
        </div>

        <div className="purchase-order-summary-card">
          <div className="purchase-order-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Draft Orders</span>
            <strong>{draftCount}</strong>
            <small>Waiting to be sent</small>
          </div>
        </div>

        <div className="purchase-order-summary-card">
          <div className="purchase-order-summary-icon violet">
            <Send size={21} />
          </div>
          <div>
            <span>Sent Orders</span>
            <strong>{sentCount}</strong>
            <small>With suppliers</small>
          </div>
        </div>

        <div className="purchase-order-summary-card">
          <div className="purchase-order-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Approved Orders</span>
            <strong>{approvedCount}</strong>
            <small>Approved purchase orders</small>
          </div>
        </div>
      </div>

      <div className="purchase-order-container">
        <div className="purchase-order-toolbar">
          <div className="purchase-order-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search PO, supplier or warehouse..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="purchase-order-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Approved">Approved</option>
              <option value="Partially Received">
                Partially Received
              </option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="purchase-order-result-count">
            {filteredOrders.length} orders
          </div>
        </div>

        <div className="purchase-order-table-wrapper">
          <table className="purchase-order-table">
            <thead>
              <tr>
                <th>Purchase Order</th>
                <th>Supplier</th>
                <th>Delivery Warehouse</th>
                <th>PO Date</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment Terms</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="purchase-order-main-info">
                      <div className="purchase-order-icon">
                        <FileText size={17} />
                      </div>

                      <div>
                        <strong>{order.id}</strong>
                        <span>Purchase Order</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="purchase-order-supplier">
                      {order.supplier}
                    </div>
                  </td>

                  <td>
                    <div className="purchase-order-warehouse">
                      <Warehouse size={15} />
                      {order.warehouse}
                    </div>
                  </td>

                  <td>
                    <span className="purchase-order-date">
                      {order.date}
                    </span>
                  </td>

                  <td>
                    <span className="purchase-order-items">
                      {order.items} items
                    </span>
                  </td>

                  <td>
                    <strong className="purchase-order-amount">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <span className="purchase-order-payment">
                      {order.paymentTerms}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`purchase-order-status ${order.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      <span></span>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    <div className="purchase-order-action-area">
                      <button
                        className="purchase-order-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === order.id ? null : order.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === order.id && (
                        <div className="purchase-order-action-menu">
                          <button>
                            <Eye size={15} />
                            View
                          </button>

                          <button>
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button>
                            <Send size={15} />
                            Send
                          </button>

                          <button>
                            <Printer size={15} />
                            Print
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
            <div className="purchase-order-empty-state">
              <FileText size={34} />
              <strong>No purchase orders found</strong>
              <span>Try changing your search or filter.</span>
            </div>
          )}
        </div>

        <div className="purchase-order-footer">
          <span>
            Showing {filteredOrders.length} of {purchaseOrders.length} orders
          </span>

          <div className="purchase-order-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="purchase-order-modal-overlay">
          <div className="purchase-order-modal">
            <div className="purchase-order-modal-header">
              <div>
                <div className="module-eyebrow">NEW PURCHASE ORDER</div>
                <h2>Create Purchase Order</h2>
                <p>Enter supplier and material details for this order.</p>
              </div>

              <button
                className="purchase-order-close-button"
                onClick={closeForm}
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="purchase-order-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="purchase-order-form-section">
                <div className="purchase-order-section-heading">
                  <div>
                    <span>01</span>
                    <div>
                      <h3>Order Information</h3>
                      <p>Basic purchase order details</p>
                    </div>
                  </div>
                </div>

                <div className="purchase-order-form-grid">
                  <label>
                    <span>Purchase Order No.</span>
                    <input
                      type="text"
                      value={formData.poNo}
                      onChange={(e) =>
                        updateForm("poNo", e.target.value)
                      }
                    />
                  </label>

                  <label>
                    <span>PO Date</span>
                    <div className="purchase-order-input-icon">
                      <CalendarDays size={16} />
                      <input
                        type="date"
                        value={formData.poDate}
                        onChange={(e) =>
                          updateForm("poDate", e.target.value)
                        }
                      />
                    </div>
                  </label>

                  <label>
                    <span>Supplier</span>
                    <select
                      value={formData.supplier}
                      onChange={(e) =>
                        updateForm("supplier", e.target.value)
                      }
                    >
                      <option value="">Select Supplier</option>
                      <option>Tata Steel Industries</option>
                      <option>Hindalco Metals</option>
                      <option>SKF Industrial Supplies</option>
                      <option>Castrol Manufacturing</option>
                      <option>Industrial Tools Co.</option>
                    </select>
                  </label>

                  <label>
                    <span>Delivery Warehouse</span>
                    <select
                      value={formData.warehouse}
                      onChange={(e) =>
                        updateForm("warehouse", e.target.value)
                      }
                    >
                      <option value="">Select Warehouse</option>
                      <option>Main Warehouse</option>
                      <option>Raw Material Store</option>
                      <option>Components Store</option>
                      <option>Maintenance Store</option>
                    </select>
                  </label>

                  <label>
                    <span>Payment Terms</span>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) =>
                        updateForm("paymentTerms", e.target.value)
                      }
                    >
                      <option>Net 30</option>
                      <option>Net 45</option>
                      <option>Net 60</option>
                      <option>Advance</option>
                      <option>Cash on Delivery</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="purchase-order-form-section">
                <div className="purchase-order-section-heading items-heading">
                  <div>
                    <span>02</span>
                    <div>
                      <h3>Order Items</h3>
                      <p>Add products or materials to this purchase order</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="purchase-order-add-row"
                    onClick={addItem}
                  >
                    <Plus size={16} />
                    Add Row
                  </button>
                </div>

                <div className="purchase-order-items-table-wrapper">
                  <table className="purchase-order-items-table">
                    <thead>
                      <tr>
                        <th>Product / Material</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Discount %</th>
                        <th>Tax %</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((item, index) => (
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
                              <option value="">Select Product</option>
                              {products.map((product) => (
                                <option key={product}>{product}</option>
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
                              type="number"
                              min="0"
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
                              ₹
                              {calculateItem(item).toLocaleString(
                                "en-IN",
                                {
                                  maximumFractionDigits: 0
                                }
                              )}
                            </strong>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="purchase-order-remove-row"
                              onClick={() => removeItem(index)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="purchase-order-total-section">
                <div className="purchase-order-calculation-label">
                  <Calculator size={18} />
                  <div>
                    <strong>Order Summary</strong>
                    <span>Calculated automatically</span>
                  </div>
                </div>

                <div className="purchase-order-calculations">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ₹
                      {subtotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 0
                      })}
                    </strong>
                  </div>

                  <div>
                    <span>Tax</span>
                    <strong>
                      ₹
                      {taxTotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 0
                      })}
                    </strong>
                  </div>

                  <div className="grand-total">
                    <span>Grand Total</span>
                    <strong>
                      ₹
                      {grandTotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 0
                      })}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="purchase-order-form-actions">
                <button
                  type="button"
                  className="purchase-order-cancel-button"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="purchase-order-draft-button"
                  onClick={saveDraft}
                >
                  Save Draft
                </button>

                <button
                  type="button"
                  className="purchase-order-print-button"
                  onClick={() => window.print()}
                >
                  <Printer size={17} />
                  Print
                </button>

                <button
                  type="button"
                  className="purchase-order-send-button"
                  onClick={sendSupplier}
                >
                  <Send size={17} />
                  Send to Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseOrder;