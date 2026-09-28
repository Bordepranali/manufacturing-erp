import { useMemo, useState } from "react";
import {
  CreditCard,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  X,
  Trash2,
  IndianRupee,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  CalendarDays,
  UserRound,
  FileText
} from "lucide-react";

const paymentData = [
  {
    id: "CPY-2026-009",
    customer: "Apex Engineering Pvt. Ltd.",
    invoice: "INV-2026-012",
    salesOrder: "SO-2026-015",
    paymentDate: "10 Sep 2026",
    totalDue: 385000,
    amountPaid: 185000,
    pending: 200000,
    dueDate: "10 Oct 2026",
    paymentMode: "Bank Transfer",
    reference: "NEFT-AXP-82941",
    status: "Partially Paid"
  },
  {
    id: "CPY-2026-008",
    customer: "Shree Auto Components",
    invoice: "INV-2026-011",
    salesOrder: "SO-2026-014",
    paymentDate: "09 Sep 2026",
    totalDue: 248500,
    amountPaid: 148500,
    pending: 100000,
    dueDate: "24 Sep 2026",
    paymentMode: "UPI",
    reference: "UPI-SAC-78214",
    status: "Partially Paid"
  },
  {
    id: "CPY-2026-007",
    customer: "MechPro Solutions",
    invoice: "INV-2026-010",
    salesOrder: "SO-2026-013",
    paymentDate: "-",
    totalDue: 524800,
    amountPaid: 0,
    pending: 524800,
    dueDate: "08 Oct 2026",
    paymentMode: "-",
    reference: "-",
    status: "Pending"
  },
  {
    id: "CPY-2026-006",
    customer: "Nova Machinery",
    invoice: "INV-2026-009",
    salesOrder: "SO-2026-012",
    paymentDate: "07 Sep 2026",
    totalDue: 176500,
    amountPaid: 176500,
    pending: 0,
    dueDate: "07 Sep 2026",
    paymentMode: "Bank Transfer",
    reference: "NEFT-NM-55128",
    status: "Paid"
  },
  {
    id: "CPY-2026-005",
    customer: "Precision Works",
    invoice: "INV-2026-008",
    salesOrder: "SO-2026-011",
    paymentDate: "-",
    totalDue: 312750,
    amountPaid: 0,
    pending: 312750,
    dueDate: "05 Oct 2026",
    paymentMode: "-",
    reference: "-",
    status: "Pending"
  }
];

const customers = [
  "Apex Engineering Pvt. Ltd.",
  "Shree Auto Components",
  "MechPro Solutions",
  "Precision Works",
  "Nova Machinery"
];

const invoices = [
  {
    id: "INV-2026-012",
    customer: "Apex Engineering Pvt. Ltd.",
    amount: 385000
  },
  {
    id: "INV-2026-011",
    customer: "Shree Auto Components",
    amount: 248500
  },
  {
    id: "INV-2026-010",
    customer: "MechPro Solutions",
    amount: 524800
  },
  {
    id: "INV-2026-009",
    customer: "Nova Machinery",
    amount: 176500
  },
  {
    id: "INV-2026-008",
    customer: "Precision Works",
    amount: 312750
  }
];

function CustomerPayments() {
  const [payments, setPayments] = useState(paymentData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewPayment, setViewPayment] = useState(null);

  const [form, setForm] = useState({
    paymentNumber: "CPY-2026-010",
    customer: "",
    invoice: "",
    paymentDate: "2026-09-12",
    totalDue: 0,
    amountPaid: "",
    pendingAmount: 0,
    paymentMode: "Bank Transfer",
    transactionReference: "",
    notes: ""
  });

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(search.toLowerCase()) ||
        payment.customer.toLowerCase().includes(search.toLowerCase()) ||
        payment.invoice.toLowerCase().includes(search.toLowerCase()) ||
        payment.salesOrder.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const totalDue = payments.reduce(
    (sum, payment) => sum + payment.totalDue,
    0
  );

  const totalPaid = payments.reduce(
    (sum, payment) => sum + payment.amountPaid,
    0
  );

  const totalPending = payments.reduce(
    (sum, payment) => sum + payment.pending,
    0
  );

  const paidTransactions = payments.filter(
    (payment) => payment.status === "Paid"
  ).length;

  const updatePaymentAmount = (amount) => {
    const numericAmount = Number(amount) || 0;

    setForm({
      ...form,
      amountPaid: amount,
      pendingAmount: Math.max(
        Number(form.totalDue) - numericAmount,
        0
      )
    });
  };

  const handleCustomerChange = (customer) => {
    setForm({
      ...form,
      customer,
      invoice: "",
      totalDue: 0,
      amountPaid: "",
      pendingAmount: 0
    });
  };

  const handleInvoiceChange = (invoiceId) => {
    const selectedInvoice = invoices.find(
      (invoice) => invoice.id === invoiceId
    );

    setForm({
      ...form,
      invoice: invoiceId,
      customer: selectedInvoice?.customer || form.customer,
      totalDue: selectedInvoice?.amount || 0,
      amountPaid: "",
      pendingAmount: selectedInvoice?.amount || 0
    });
  };

  const resetForm = () => {
    setForm({
      paymentNumber: `CPY-2026-${String(payments.length + 10).padStart(3, "0")}`,
      customer: "",
      invoice: "",
      paymentDate: "2026-09-12",
      totalDue: 0,
      amountPaid: "",
      pendingAmount: 0,
      paymentMode: "Bank Transfer",
      transactionReference: "",
      notes: ""
    });
  };

  const savePayment = () => {
    if (!form.customer) {
      alert("Please select a customer.");
      return;
    }

    if (!form.invoice) {
      alert("Please select an invoice.");
      return;
    }

    if (!form.amountPaid || Number(form.amountPaid) <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (Number(form.amountPaid) > Number(form.totalDue)) {
      alert("Payment amount cannot be greater than the total due.");
      return;
    }

    const numericPaid = Number(form.amountPaid);
    const numericDue = Number(form.totalDue);
    const pending = numericDue - numericPaid;

    let status = "Pending";

    if (pending === 0) {
      status = "Paid";
    } else if (numericPaid > 0) {
      status = "Partially Paid";
    }

    const newPayment = {
      id: form.paymentNumber,
      customer: form.customer,
      invoice: form.invoice,
      salesOrder: "SO-2026-015",
      paymentDate: form.paymentDate,
      totalDue: numericDue,
      amountPaid: numericPaid,
      pending,
      dueDate: "12 Oct 2026",
      paymentMode: form.paymentMode,
      reference: form.transactionReference || "-",
      status
    };

    setPayments([newPayment, ...payments]);
    alert("Customer payment recorded successfully.");
    setShowModal(false);
    resetForm();
  };

  const deletePayment = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmed) return;

    setPayments(
      payments.filter((payment) => payment.id !== id)
    );

    setOpenMenu(null);
  };

  return (
    <div className="customer-payments-page">
      <div className="customer-payments-heading">
        <div>
          <div className="module-eyebrow">SALES / COLLECTIONS</div>
          <h1>Customer Payments</h1>
          <p>Track customer receipts, outstanding amounts and payment status.</p>
        </div>

        <button
          className="customer-payment-add-button"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Record Payment
        </button>
      </div>

      <div className="customer-payment-summary-grid">
        <div className="customer-payment-summary-card">
          <div className="customer-payment-summary-icon blue">
            <IndianRupee size={21} />
          </div>
          <div>
            <span>Total Due</span>
            <strong>₹{totalDue.toLocaleString("en-IN")}</strong>
            <small>Customer receivables</small>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Total Collected</span>
            <strong>₹{totalPaid.toLocaleString("en-IN")}</strong>
            <small>Received from customers</small>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending Amount</span>
            <strong>₹{totalPending.toLocaleString("en-IN")}</strong>
            <small>Awaiting collection</small>
          </div>
        </div>

        <div className="customer-payment-summary-card">
          <div className="customer-payment-summary-icon purple">
            <CreditCard size={21} />
          </div>
          <div>
            <span>Paid Transactions</span>
            <strong>{paidTransactions}</strong>
            <small>Fully settled</small>
          </div>
        </div>
      </div>

      <div className="customer-payments-container">
        <div className="customer-payments-toolbar">
          <div className="customer-payments-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search payment, customer or invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="customer-payments-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Paid</option>
              <option>Partially Paid</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="customer-payments-result-count">
            {filteredPayments.length} payments
          </div>
        </div>

        <div className="customer-payments-table-wrapper">
          <table className="customer-payments-table">
            <thead>
              <tr>
                <th>Payment</th>
                <th>Customer</th>
                <th>Invoice / Order</th>
                <th>Total Due</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Payment Date</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <div className="customer-payment-number">
                      <div className="customer-payment-number-icon">
                        <CreditCard size={16} />
                      </div>
                      <div>
                        <strong>{payment.id}</strong>
                        <span>{payment.reference}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="customer-payment-customer">
                      <div className="customer-payment-avatar">
                        {payment.customer.charAt(0)}
                      </div>
                      <span>{payment.customer}</span>
                    </div>
                  </td>

                  <td>
                    <div className="customer-payment-invoice">
                      <strong>{payment.invoice}</strong>
                      <span>{payment.salesOrder}</span>
                    </div>
                  </td>

                  <td>
                    <strong className="payment-due-amount">
                      ₹{payment.totalDue.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <strong className="payment-paid-amount">
                      ₹{payment.amountPaid.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <strong className="payment-pending-amount">
                      ₹{payment.pending.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <div className="payment-date-cell">
                      <CalendarDays size={15} />
                      {payment.paymentDate}
                    </div>
                  </td>

                  <td>
                    <span className="payment-mode-badge">
                      {payment.paymentMode}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`customer-payment-status ${payment.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td>
                    <div className="customer-payment-action-area">
                      <button
                        className="customer-payment-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === payment.id
                              ? null
                              : payment.id
                          )
                        }
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {openMenu === payment.id && (
                        <div className="customer-payment-action-menu">
                          <button
                            onClick={() => {
                              setViewPayment(payment);
                              setOpenMenu(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              alert("Edit payment form opened.");
                              setOpenMenu(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          {payment.pending > 0 && (
                            <button
                              onClick={() => {
                                resetForm();
                                setForm({
                                  ...form,
                                  paymentNumber: `CPY-2026-${String(
                                    payments.length + 10
                                  ).padStart(3, "0")}`,
                                  customer: payment.customer,
                                  invoice: payment.invoice,
                                  totalDue: payment.totalDue,
                                  pendingAmount: payment.pending
                                });
                                setOpenMenu(null);
                                setShowModal(true);
                              }}
                            >
                              <CreditCard size={15} />
                              Pay Balance
                            </button>
                          )}

                          <button
                            className="danger"
                            onClick={() =>
                              deletePayment(payment.id)
                            }
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
        </div>

        {filteredPayments.length === 0 && (
          <div className="customer-payment-empty">
            <CreditCard size={32} />
            <strong>No payments found</strong>
            <span>Try changing your search or status filter.</span>
          </div>
        )}

        <div className="customer-payment-footer">
          <span>
            Showing {filteredPayments.length} of {payments.length} payments
          </span>

          <div className="customer-payment-pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="customer-payment-modal-overlay">
          <div className="customer-payment-modal">
            <div className="customer-payment-modal-header">
              <div>
                <span>SALES / COLLECTIONS</span>
                <h2>Record Customer Payment</h2>
                <p>Record a payment received against a customer invoice.</p>
              </div>

              <button
                className="customer-payment-close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="customer-payment-modal-body">
              <div className="customer-payment-form-section">
                <div className="customer-payment-section-heading">
                  <div className="customer-payment-section-icon">
                    <CreditCard size={17} />
                  </div>

                  <div>
                    <h3>Payment Information</h3>
                    <p>Enter customer and invoice payment details</p>
                  </div>
                </div>

                <div className="customer-payment-form-grid">
                  <div className="customer-payment-field">
                    <label>Payment Number</label>
                    <input value={form.paymentNumber} readOnly />
                  </div>

                  <div className="customer-payment-field">
                    <label>Payment Date</label>
                    <input
                      type="date"
                      value={form.paymentDate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          paymentDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="customer-payment-field">
                    <label>Customer *</label>
                    <select
                      value={form.customer}
                      onChange={(e) =>
                        handleCustomerChange(e.target.value)
                      }
                    >
                      <option value="">Select customer</option>
                      {customers.map((customer) => (
                        <option key={customer}>{customer}</option>
                      ))}
                    </select>
                  </div>

                  <div className="customer-payment-field">
                    <label>Invoice *</label>
                    <select
                      value={form.invoice}
                      onChange={(e) =>
                        handleInvoiceChange(e.target.value)
                      }
                    >
                      <option value="">Select invoice</option>
                      {invoices
                        .filter(
                          (invoice) =>
                            !form.customer ||
                            invoice.customer === form.customer
                        )
                        .map((invoice) => (
                          <option key={invoice.id} value={invoice.id}>
                            {invoice.id} — ₹
                            {invoice.amount.toLocaleString("en-IN")}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="customer-payment-field">
                    <label>Total Due</label>
                    <div className="payment-readonly-value">
                      ₹{Number(form.totalDue).toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="customer-payment-field">
                    <label>Amount Paid *</label>
                    <input
                      type="number"
                      min="0"
                      value={form.amountPaid}
                      onChange={(e) =>
                        updatePaymentAmount(e.target.value)
                      }
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="customer-payment-field">
                    <label>Pending Amount</label>
                    <div className="payment-pending-value">
                      ₹
                      {Number(form.pendingAmount).toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>

                  <div className="customer-payment-field">
                    <label>Payment Mode</label>
                    <select
                      value={form.paymentMode}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          paymentMode: e.target.value
                        })
                      }
                    >
                      <option>Bank Transfer</option>
                      <option>UPI</option>
                      <option>Cash</option>
                      <option>Cheque</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="customer-payment-field full">
                    <label>Transaction Reference</label>
                    <input
                      value={form.transactionReference}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          transactionReference: e.target.value
                        })
                      }
                      placeholder="Enter bank / UPI / cheque reference"
                    />
                  </div>
                </div>
              </div>

              <div className="customer-payment-notes">
                <label>Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value
                    })
                  }
                  placeholder="Add payment notes..."
                />
              </div>

              <div className="customer-payment-preview">
                <div className="customer-payment-preview-icon">
                  <IndianRupee size={20} />
                </div>

                <div>
                  <span>Payment Summary</span>
                  <strong>
                    ₹{Number(form.amountPaid || 0).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div className="customer-payment-preview-divider"></div>

                <div>
                  <span>Remaining Balance</span>
                  <strong>
                    ₹
                    {Number(form.pendingAmount).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>
            </div>

            <div className="customer-payment-modal-footer">
              <button
                className="customer-payment-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="customer-payment-save"
                onClick={savePayment}
              >
                <CheckCircle2 size={17} />
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {viewPayment && (
        <div className="customer-payment-modal-overlay">
          <div className="customer-payment-detail-modal">
            <div className="customer-payment-detail-header">
              <div>
                <span>PAYMENT DETAILS</span>
                <h2>{viewPayment.id}</h2>
              </div>

              <button
                className="customer-payment-close"
                onClick={() => setViewPayment(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="customer-payment-detail-body">
              <div className="customer-payment-detail-highlight">
                <div className="customer-payment-detail-icon">
                  <IndianRupee size={22} />
                </div>

                <div>
                  <span>Amount Received</span>
                  <strong>
                    ₹{viewPayment.amountPaid.toLocaleString("en-IN")}
                  </strong>
                </div>

                <span
                  className={`customer-payment-status ${viewPayment.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {viewPayment.status}
                </span>
              </div>

              <div className="customer-payment-detail-grid">
                <div>
                  <span>Customer</span>
                  <strong>{viewPayment.customer}</strong>
                </div>

                <div>
                  <span>Invoice</span>
                  <strong>{viewPayment.invoice}</strong>
                </div>

                <div>
                  <span>Sales Order</span>
                  <strong>{viewPayment.salesOrder}</strong>
                </div>

                <div>
                  <span>Total Due</span>
                  <strong>
                    ₹{viewPayment.totalDue.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Pending</span>
                  <strong>
                    ₹{viewPayment.pending.toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Payment Mode</span>
                  <strong>{viewPayment.paymentMode}</strong>
                </div>

                <div>
                  <span>Payment Date</span>
                  <strong>{viewPayment.paymentDate}</strong>
                </div>

                <div>
                  <span>Reference</span>
                  <strong>{viewPayment.reference}</strong>
                </div>
              </div>
            </div>

            <div className="customer-payment-detail-footer">
              <button
                className="customer-payment-cancel"
                onClick={() => setViewPayment(null)}
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

export default CustomerPayments;