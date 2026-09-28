import { useMemo, useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  Save,
  Calculator
} from "lucide-react";

const products = [
  {
    name: "Industrial Gearbox",
    code: "FG-001",
    unit: "Nos",
    rate: 62000,
    tax: 18
  },
  {
    name: "Heavy Duty Motor",
    code: "FG-002",
    unit: "Nos",
    rate: 48500,
    tax: 18
  },
  {
    name: "Gear Housing",
    code: "SFG-001",
    unit: "Nos",
    rate: 18500,
    tax: 18
  },
  {
    name: "Hydraulic Pump",
    code: "FG-003",
    unit: "Nos",
    rate: 32500,
    tax: 18
  },
  {
    name: "Steel Coupling",
    code: "FG-004",
    unit: "Nos",
    rate: 12800,
    tax: 18
  }
];

const customers = [
  {
    name: "Tata Industrial Solutions",
    address: "Pune, Maharashtra",
    gstin: "27AABCT1234A1Z5"
  },
  {
    name: "Shree Engineering Works",
    address: "Nashik, Maharashtra",
    gstin: "27AABCS5678B1Z2"
  },
  {
    name: "Maharashtra Auto Parts",
    address: "Aurangabad, Maharashtra",
    gstin: "27AABCM9012C1Z8"
  },
  {
    name: "Prime Manufacturing",
    address: "Mumbai, Maharashtra",
    gstin: "27AABCP3456D1Z4"
  },
  {
    name: "Universal Machinery",
    address: "Kolhapur, Maharashtra",
    gstin: "27AABCU7890E1Z6"
  }
];

const initialInvoices = [
  {
    invoiceNo: "INV-2026-031",
    invoiceDate: "2026-09-12",
    orderNo: "SO-2026-031",
    customer: "Tata Industrial Solutions",
    items: 4,
    subtotal: 248000,
    tax: 44640,
    total: 292640,
    paymentStatus: "Pending",
    status: "Generated"
  },
  {
    invoiceNo: "INV-2026-030",
    invoiceDate: "2026-09-11",
    orderNo: "SO-2026-030",
    customer: "Shree Engineering Works",
    items: 3,
    subtotal: 156500,
    tax: 28170,
    total: 184670,
    paymentStatus: "Paid",
    status: "Generated"
  },
  {
    invoiceNo: "INV-2026-029",
    invoiceDate: "2026-09-09",
    orderNo: "SO-2026-029",
    customer: "Maharashtra Auto Parts",
    items: 6,
    subtotal: 324800,
    tax: 58464,
    total: 383264,
    paymentStatus: "Partially Paid",
    status: "Generated"
  },
  {
    invoiceNo: "INV-2026-028",
    invoiceDate: "2026-09-08",
    orderNo: "SO-2026-028",
    customer: "Prime Manufacturing",
    items: 2,
    subtotal: 98500,
    tax: 17730,
    total: 116230,
    paymentStatus: "Pending",
    status: "Draft"
  },
  {
    invoiceNo: "INV-2026-027",
    invoiceDate: "2026-09-06",
    orderNo: "SO-2026-027",
    customer: "Universal Machinery",
    items: 5,
    subtotal: 412000,
    tax: 74160,
    total: 486160,
    paymentStatus: "Paid",
    status: "Generated"
  },
  {
    invoiceNo: "INV-2026-026",
    invoiceDate: "2026-09-04",
    orderNo: "SO-2026-026",
    customer: "Shivam Engineering",
    items: 3,
    subtotal: 187400,
    tax: 33732,
    total: 221132,
    paymentStatus: "Paid",
    status: "Generated"
  }
];

const createEmptyItem = () => ({
  product: "",
  quantity: 1,
  rate: 0,
  tax: 18
});

function SalesInvoice() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const [form, setForm] = useState({
    invoiceNo: "INV-2026-032",
    invoiceDate: "2026-09-13",
    orderNo: "",
    customer: "",
    billingAddress: "",
    gstin: "",
    paymentTerms: "30 Days",
    dueDate: "2026-10-13",
    notes: "",
    items: [createEmptyItem()]
  });

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const text = search.toLowerCase();

      const matchesSearch =
        invoice.invoiceNo.toLowerCase().includes(text) ||
        invoice.orderNo.toLowerCase().includes(text) ||
        invoice.customer.toLowerCase().includes(text);

      const matchesPayment =
        paymentFilter === "All" ||
        invoice.paymentStatus === paymentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        invoice.status === statusFilter;

      return matchesSearch && matchesPayment && matchesStatus;
    });
  }, [invoices, search, paymentFilter, statusFilter]);

  const totalInvoices = invoices.length;

  const generatedInvoices = invoices.filter(
    (invoice) => invoice.status === "Generated"
  ).length;

  const pendingPayments = invoices.filter(
    (invoice) => invoice.paymentStatus === "Pending"
  ).length;

  const totalValue = invoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0
  );

  const calculateItemAmount = (item) => {
    const quantity = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const tax = Number(item.tax) || 0;

    const base = quantity * rate;
    const taxAmount = (base * tax) / 100;

    return {
      base,
      taxAmount,
      total: base + taxAmount
    };
  };

  const totals = useMemo(() => {
    const subtotal = form.items.reduce(
      (sum, item) => sum + calculateItemAmount(item).base,
      0
    );

    const tax = form.items.reduce(
      (sum, item) => sum + calculateItemAmount(item).taxAmount,
      0
    );

    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  }, [form.items]);

  const openCreateModal = () => {
    setEditingInvoice(null);

    setForm({
      invoiceNo: `INV-2026-${String(
        invoices.length + 32
      ).padStart(3, "0")}`,
      invoiceDate: "2026-09-13",
      orderNo: "",
      customer: "",
      billingAddress: "",
      gstin: "",
      paymentTerms: "30 Days",
      dueDate: "2026-10-13",
      notes: "",
      items: [createEmptyItem()]
    });

    setShowModal(true);
  };

  const openEditModal = (invoice) => {
    setEditingInvoice(invoice);

    setForm({
      invoiceNo: invoice.invoiceNo,
      invoiceDate: invoice.invoiceDate,
      orderNo: invoice.orderNo,
      customer: invoice.customer,
      billingAddress: "",
      gstin: "",
      paymentTerms: "30 Days",
      dueDate: "2026-10-13",
      notes: "",
      items: [
        {
          product: "Industrial Gearbox",
          quantity: invoice.items,
          rate:
            invoice.subtotal / Math.max(invoice.items, 1),
          tax: 18
        }
      ]
    });

    setShowModal(true);
  };

  const handleCustomerChange = (customerName) => {
    const customer = customers.find(
      (item) => item.name === customerName
    );

    setForm((current) => ({
      ...current,
      customer: customerName,
      billingAddress: customer?.address || "",
      gstin: customer?.gstin || ""
    }));
  };

  const handleProductChange = (index, productName) => {
    const product = products.find(
      (item) => item.name === productName
    );

    setForm((current) => {
      const items = [...current.items];

      items[index] = {
        ...items[index],
        product: productName,
        rate: product?.rate || 0,
        tax: product?.tax || 18
      };

      return {
        ...current,
        items
      };
    });
  };

  const updateItem = (index, field, value) => {
    setForm((current) => {
      const items = [...current.items];

      items[index] = {
        ...items[index],
        [field]: value
      };

      return {
        ...current,
        items
      };
    });
  };

  const addItem = () => {
    setForm((current) => ({
      ...current,
      items: [...current.items, createEmptyItem()]
    }));
  };

  const removeItem = (index) => {
    if (form.items.length === 1) return;

    setForm((current) => ({
      ...current,
      items: current.items.filter(
        (_, itemIndex) => itemIndex !== index
      )
    }));
  };

  const handleSave = () => {
    if (!form.customer) {
      alert("Please select a customer.");
      return;
    }

    const validItems = form.items.filter(
      (item) => item.product && Number(item.quantity) > 0
    );

    if (validItems.length === 0) {
      alert("Please add at least one invoice item.");
      return;
    }

    const newInvoice = {
      invoiceNo: form.invoiceNo,
      invoiceDate: form.invoiceDate,
      orderNo: form.orderNo || "SO-PENDING",
      customer: form.customer,
      items: validItems.length,
      subtotal: totals.subtotal,
      tax: totals.tax,
      total: totals.total,
      paymentStatus: "Pending",
      status: "Generated"
    };

    if (editingInvoice) {
      setInvoices((current) =>
        current.map((invoice) =>
          invoice.invoiceNo === editingInvoice.invoiceNo
            ? {
                ...invoice,
                ...newInvoice
              }
            : invoice
        )
      );
    } else {
      setInvoices((current) => [
        newInvoice,
        ...current
      ]);
    }

    setShowModal(false);
    setEditingInvoice(null);
  };

  const handleDelete = (invoiceNo) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sales invoice?"
    );

    if (!confirmed) return;

    setInvoices((current) =>
      current.filter(
        (invoice) => invoice.invoiceNo !== invoiceNo
      )
    );
  };

  return (
    <div className="sales-invoice-page">
      <section className="sales-invoice-hero">
        <div>
          <span className="sales-invoice-eyebrow">
            SALES MANAGEMENT
          </span>

          <h1>Sales Invoice</h1>

          <p>
            Create, manage and track customer invoices generated
            from sales orders.
          </p>
        </div>

        <button
          className="sales-invoice-add-button"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Create Invoice
        </button>
      </section>

      <section className="sales-invoice-summary-grid">
        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-summary-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Total Invoices</span>
            <strong>{totalInvoices}</strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-summary-icon">
            <Calculator size={21} />
          </div>

          <div>
            <span>Invoice Value</span>
            <strong>
              ₹{totalValue.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-summary-icon">
            <Save size={21} />
          </div>

          <div>
            <span>Generated</span>
            <strong>{generatedInvoices}</strong>
          </div>
        </div>

        <div className="sales-invoice-summary-card">
          <div className="sales-invoice-summary-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Pending Payments</span>
            <strong>{pendingPayments}</strong>
          </div>
        </div>
      </section>

      <section className="sales-invoice-content-card">
        <div className="sales-invoice-toolbar">
          <div className="sales-invoice-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search invoice, order or customer..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={paymentFilter}
            onChange={(event) =>
              setPaymentFilter(event.target.value)
            }
          >
            <option value="All">All Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partially Paid">
              Partially Paid
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Invoice Status</option>
            <option value="Generated">Generated</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="sales-invoice-table-header">
          <div>
            <h2>Customer Invoices</h2>

            <p>
              Showing {filteredInvoices.length} of{" "}
              {invoices.length} invoices
            </p>
          </div>
        </div>

        <div className="sales-invoice-table-wrapper">
          <table className="sales-invoice-table">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Date</th>
                <th>Sales Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Taxable Amount</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.invoiceNo}>
                  <td>
                    <strong>{invoice.invoiceNo}</strong>
                  </td>

                  <td>{invoice.invoiceDate}</td>

                  <td>{invoice.orderNo}</td>

                  <td>{invoice.customer}</td>

                  <td>{invoice.items}</td>

                  <td>
                    ₹{invoice.subtotal.toLocaleString("en-IN")}
                  </td>

                  <td>
                    <strong>
                      ₹{invoice.total.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`sales-invoice-payment-status ${invoice.paymentStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {invoice.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`sales-invoice-status ${invoice.status.toLowerCase()}`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td>
                    <div className="sales-invoice-actions">
                      <button
                        title="View"
                        onClick={() =>
                          setSelectedInvoice(invoice)
                        }
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit"
                        onClick={() =>
                          openEditModal(invoice)
                        }
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() =>
                          handleDelete(invoice.invoiceNo)
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    className="sales-invoice-empty"
                  >
                    No sales invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div
          className="sales-invoice-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="sales-invoice-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sales-invoice-modal-header">
              <div>
                <span>
                  {editingInvoice
                    ? "Edit Invoice"
                    : "New Customer Invoice"}
                </span>

                <h2>
                  {editingInvoice
                    ? editingInvoice.invoiceNo
                    : "Create Sales Invoice"}
                </h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="sales-invoice-form">
              <div className="sales-invoice-form-grid">
                <div className="sales-invoice-field">
                  <label>Invoice Number</label>
                  <input
                    value={form.invoiceNo}
                    readOnly
                  />
                </div>

                <div className="sales-invoice-field">
                  <label>Invoice Date</label>
                  <input
                    type="date"
                    value={form.invoiceDate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        invoiceDate: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="sales-invoice-field">
                  <label>Sales Order</label>
                  <input
                    placeholder="SO-2026-XXX"
                    value={form.orderNo}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        orderNo: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="sales-invoice-field">
                  <label>Customer</label>
                  <select
                    value={form.customer}
                    onChange={(event) =>
                      handleCustomerChange(
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select customer
                    </option>

                    {customers.map((customer) => (
                      <option
                        key={customer.name}
                        value={customer.name}
                      >
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sales-invoice-field">
                  <label>Billing Address</label>
                  <input
                    value={form.billingAddress}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>

                <div className="sales-invoice-field">
                  <label>GSTIN</label>
                  <input
                    value={form.gstin}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>

                <div className="sales-invoice-field">
                  <label>Payment Terms</label>
                  <select
                    value={form.paymentTerms}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        paymentTerms: event.target.value
                      }))
                    }
                  >
                    <option>Immediate</option>
                    <option>15 Days</option>
                    <option>30 Days</option>
                    <option>45 Days</option>
                    <option>60 Days</option>
                  </select>
                </div>

                <div className="sales-invoice-field">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        dueDate: event.target.value
                      }))
                    }
                  />
                </div>
              </div>

              <div className="sales-invoice-items-section">
                <div className="sales-invoice-items-header">
                  <div>
                    <h3>Invoice Items</h3>
                    <p>
                      Add products and invoice quantities.
                    </p>
                  </div>

                  <button onClick={addItem}>
                    <Plus size={16} />
                    Add Row
                  </button>
                </div>

                <div className="sales-invoice-items-table-wrapper">
                  <table className="sales-invoice-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Tax %</th>
                        <th>Taxable</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {form.items.map((item, index) => {
                        const itemTotal =
                          calculateItemAmount(item);

                        return (
                          <tr key={index}>
                            <td>
                              <select
                                value={item.product}
                                onChange={(event) =>
                                  handleProductChange(
                                    index,
                                    event.target.value
                                  )
                                }
                              >
                                <option value="">
                                  Select product
                                </option>

                                {products.map((product) => (
                                  <option
                                    key={product.code}
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
                                onChange={(event) =>
                                  updateItem(
                                    index,
                                    "quantity",
                                    event.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                min="0"
                                value={item.rate}
                                onChange={(event) =>
                                  updateItem(
                                    index,
                                    "rate",
                                    event.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                min="0"
                                value={item.tax}
                                onChange={(event) =>
                                  updateItem(
                                    index,
                                    "tax",
                                    event.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              ₹
                              {itemTotal.base.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td>
                              ₹
                              {itemTotal.total.toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td>
                              <button
                                className="sales-invoice-remove-row"
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

              <div className="sales-invoice-bottom-grid">
                <div className="sales-invoice-notes">
                  <label>Notes</label>

                  <textarea
                    rows="5"
                    placeholder="Add invoice notes..."
                    value={form.notes}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        notes: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="sales-invoice-total-box">
                  <div>
                    <span>Taxable Amount</span>
                    <strong>
                      ₹{totals.subtotal.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <span>Tax</span>
                    <strong>
                      ₹{totals.tax.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="sales-invoice-grand-total">
                    <span>Grand Total</span>
                    <strong>
                      ₹{totals.total.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="sales-invoice-modal-footer">
              <button
                className="sales-invoice-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="sales-invoice-save-button"
                onClick={handleSave}
              >
                <Save size={17} />
                {editingInvoice
                  ? "Update Invoice"
                  : "Save Invoice"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedInvoice && (
        <div
          className="sales-invoice-modal-overlay"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="sales-invoice-view-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sales-invoice-modal-header">
              <div>
                <span>Invoice Details</span>
                <h2>{selectedInvoice.invoiceNo}</h2>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="sales-invoice-view-content">
              <div className="sales-invoice-detail-grid">
                <div>
                  <span>Invoice Date</span>
                  <strong>
                    {selectedInvoice.invoiceDate}
                  </strong>
                </div>

                <div>
                  <span>Sales Order</span>
                  <strong>{selectedInvoice.orderNo}</strong>
                </div>

                <div>
                  <span>Customer</span>
                  <strong>{selectedInvoice.customer}</strong>
                </div>

                <div>
                  <span>Items</span>
                  <strong>{selectedInvoice.items}</strong>
                </div>

                <div>
                  <span>Taxable Amount</span>
                  <strong>
                    ₹
                    {selectedInvoice.subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div>
                  <span>Tax</span>
                  <strong>
                    ₹
                    {selectedInvoice.tax.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong>
                    ₹
                    {selectedInvoice.total.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div>
                  <span>Payment Status</span>
                  <strong>
                    {selectedInvoice.paymentStatus}
                  </strong>
                </div>
              </div>
            </div>

            <div className="sales-invoice-modal-footer">
              <button
                className="sales-invoice-cancel-button"
                onClick={() => setSelectedInvoice(null)}
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

export default SalesInvoice;