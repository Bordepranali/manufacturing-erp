import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  CreditCard,
  CheckCircle2,
  Clock3,
  AlertCircle,
  X,
  IndianRupee,
  FileText
} from "lucide-react";

const paymentData = [
  {
    id: "PAY-2026-001",
    supplier: "Tata Steel Industries",
    reference: "PO-2026-001",
    invoice: "TSI-45821",
    dueAmount: 248500,
    paid: 148500,
    pending: 100000,
    dueDate: "10 Oct 2026",
    paymentStatus: "Partially Paid"
  },
  {
    id: "PAY-2026-002",
    supplier: "Hindalco Metals",
    reference: "PO-2026-002",
    invoice: "HM-78214",
    dueAmount: 176800,
    paid: 176800,
    pending: 0,
    dueDate: "24 Sep 2026",
    paymentStatus: "Paid"
  },
  {
    id: "PAY-2026-003",
    supplier: "SKF Industrial Supplies",
    reference: "PO-2026-003",
    invoice: "SKF-23190",
    dueAmount: 94500,
    paid: 0,
    pending: 94500,
    dueDate: "08 Oct 2026",
    paymentStatus: "Pending"
  },
  {
    id: "PAY-2026-004",
    supplier: "Castrol Manufacturing",
    reference: "PO-2026-004",
    invoice: "CM-11984",
    dueAmount: 38400,
    paid: 10000,
    pending: 28400,
    dueDate: "22 Sep 2026",
    paymentStatus: "Partially Paid"
  },
  {
    id: "PAY-2026-005",
    supplier: "Industrial Tools Co.",
    reference: "PO-2026-005",
    invoice: "ITC-55127",
    dueAmount: 126750,
    paid: 126750,
    pending: 0,
    dueDate: "05 Sep 2026",
    paymentStatus: "Paid"
  }
];

const supplierOptions = [
  "Tata Steel Industries",
  "Hindalco Metals",
  "SKF Industrial Supplies",
  "Castrol Manufacturing",
  "Industrial Tools Co."
];

const transactionOptions = [
  {
    id: "PO-2026-001",
    supplier: "Tata Steel Industries",
    invoice: "TSI-45821",
    amount: 248500
  },
  {
    id: "PO-2026-002",
    supplier: "Hindalco Metals",
    invoice: "HM-78214",
    amount: 176800
  },
  {
    id: "PO-2026-003",
    supplier: "SKF Industrial Supplies",
    invoice: "SKF-23190",
    amount: 94500
  },
  {
    id: "PO-2026-004",
    supplier: "Castrol Manufacturing",
    invoice: "CM-11984",
    amount: 38400
  },
  {
    id: "PO-2026-005",
    supplier: "Industrial Tools Co.",
    invoice: "ITC-55127",
    amount: 126750
  }
];

function SupplierPayments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    supplier: "",
    transaction: "",
    paymentDate: "2026-09-11",
    totalDue: 0,
    amountPaid: "",
    paymentMode: "",
    reference: "",
    notes: ""
  });

  const filteredPayments = useMemo(() => {
    return paymentData.filter((payment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        payment.id.toLowerCase().includes(searchText) ||
        payment.supplier.toLowerCase().includes(searchText) ||
        payment.reference.toLowerCase().includes(searchText) ||
        payment.invoice.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        payment.paymentStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalDue = paymentData.reduce(
    (sum, payment) => sum + payment.dueAmount,
    0
  );

  const totalPaid = paymentData.reduce(
    (sum, payment) => sum + payment.paid,
    0
  );

  const totalPending = paymentData.reduce(
    (sum, payment) => sum + payment.pending,
    0
  );

  const paidCount = paymentData.filter(
    (payment) => payment.paymentStatus === "Paid"
  ).length;

  const pendingAmount = Math.max(
    Number(form.totalDue || 0) - Number(form.amountPaid || 0),
    0
  );

  const handleTransactionChange = (value) => {
    const transaction = transactionOptions.find(
      (item) => item.id === value
    );

    setForm((prev) => ({
      ...prev,
      transaction: value,
      supplier: transaction?.supplier || "",
      totalDue: transaction?.amount || 0
    }));
  };

  const handleSavePayment = () => {
    if (
      !form.supplier ||
      !form.transaction ||
      !form.amountPaid ||
      !form.paymentMode
    ) {
      window.alert("Please fill all required payment details.");
      return;
    }

    if (Number(form.amountPaid) > Number(form.totalDue)) {
      window.alert("Amount Paid cannot be greater than Total Due.");
      return;
    }

    window.alert("Supplier payment recorded successfully.");
    setShowModal(false);

    setForm({
      supplier: "",
      transaction: "",
      paymentDate: "2026-09-11",
      totalDue: 0,
      amountPaid: "",
      paymentMode: "",
      reference: "",
      notes: ""
    });
  };

  return (
    <div className="supplier-payments-page">
      <div className="supplier-payments-heading">
        <div>
          <div className="module-eyebrow">
            PURCHASE / SUPPLIER PAYMENTS
          </div>
          <h1>Supplier Payments</h1>
          <p>
            Track supplier dues, payments and outstanding balances.
          </p>
        </div>

        <button
          className="supplier-payment-add-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          Record Payment
        </button>
      </div>

      <div className="supplier-payment-summary-grid">
        <div className="supplier-payment-summary-card">
          <div className="supplier-payment-summary-icon blue">
            <IndianRupee size={21} />
          </div>
          <div>
            <span>Total Due</span>
            <strong>₹{totalDue.toLocaleString("en-IN")}</strong>
            <small>Supplier invoices</small>
          </div>
        </div>

        <div className="supplier-payment-summary-card">
          <div className="supplier-payment-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Total Paid</span>
            <strong>₹{totalPaid.toLocaleString("en-IN")}</strong>
            <small>Payments completed</small>
          </div>
        </div>

        <div className="supplier-payment-summary-card">
          <div className="supplier-payment-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending Amount</span>
            <strong>₹{totalPending.toLocaleString("en-IN")}</strong>
            <small>Outstanding balance</small>
          </div>
        </div>

        <div className="supplier-payment-summary-card">
          <div className="supplier-payment-summary-icon violet">
            <CreditCard size={21} />
          </div>
          <div>
            <span>Paid Transactions</span>
            <strong>{paidCount}</strong>
            <small>Fully paid invoices</small>
          </div>
        </div>
      </div>

      <div className="supplier-payments-container">
        <div className="supplier-payments-toolbar">
          <div className="supplier-payments-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search supplier, invoice or PO..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="supplier-payment-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
          </div>

          <div className="supplier-payment-result-count">
            {filteredPayments.length} payments
          </div>
        </div>

        <div className="supplier-payments-table-wrapper">
          <table className="supplier-payments-table">
            <thead>
              <tr>
                <th>Payment</th>
                <th>Supplier</th>
                <th>Invoice / PO</th>
                <th>Due Amount</th>
                <th>Paid</th>
                <th>Pending</th>
                <th>Due Date</th>
                <th>Payment Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>
                    <div className="supplier-payment-main-info">
                      <div className="supplier-payment-icon">
                        <CreditCard size={16} />
                      </div>

                      <div>
                        <strong>{payment.id}</strong>
                        <span>Supplier Payment</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong className="supplier-payment-supplier">
                      {payment.supplier}
                    </strong>
                  </td>

                  <td>
                    <div className="supplier-payment-reference">
                      <strong>{payment.invoice}</strong>
                      <span>{payment.reference}</span>
                    </div>
                  </td>

                  <td>
                    <strong className="supplier-payment-amount">
                      ₹{payment.dueAmount.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <span className="supplier-payment-paid">
                      ₹{payment.paid.toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        payment.pending > 0
                          ? "supplier-payment-pending"
                          : "supplier-payment-zero"
                      }
                    >
                      ₹{payment.pending.toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td>
                    <span className="supplier-payment-due-date">
                      {payment.dueDate}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`supplier-payment-status ${
                        payment.paymentStatus
                          .toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      <span></span>
                      {payment.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <div className="supplier-payment-action-area">
                      <button
                        className="supplier-payment-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === payment.id
                              ? null
                              : payment.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === payment.id && (
                        <div className="supplier-payment-action-menu">
                          <button>
                            <Eye size={15} />
                            View
                          </button>

                          <button>
                            <Pencil size={15} />
                            Edit
                          </button>

                          {payment.pending > 0 && (
                            <button
                              onClick={() => setShowModal(true)}
                            >
                              <CreditCard size={15} />
                              Pay Balance
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <div className="supplier-payment-empty-state">
              <AlertCircle size={34} />
              <strong>No payments found</strong>
              <span>Try changing your search or filter.</span>
            </div>
          )}
        </div>

        <div className="supplier-payments-footer">
          <span>
            Showing {filteredPayments.length} of {paymentData.length} payments
          </span>

          <div className="supplier-payment-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="supplier-payment-modal-overlay">
          <div className="supplier-payment-modal">
            <div className="supplier-payment-modal-header">
              <div>
                <span>NEW SUPPLIER PAYMENT</span>
                <h2>Record Payment</h2>
                <p>
                  Record a payment against an existing supplier transaction.
                </p>
              </div>

              <button
                className="supplier-payment-close"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="supplier-payment-modal-body">
              <div className="supplier-payment-form-section">
                <div className="supplier-payment-section-title">
                  <span>01</span>
                  <div>
                    <strong>Payment Information</strong>
                    <small>
                      Select the supplier transaction to pay.
                    </small>
                  </div>
                </div>

                <div className="supplier-payment-form-grid">
                  <label>
                    Supplier
                    <select
                      value={form.supplier}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          supplier: e.target.value
                        }))
                      }
                    >
                      <option value="">Select Supplier</option>
                      {supplierOptions.map((supplier) => (
                        <option key={supplier}>{supplier}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Invoice / PO
                    <select
                      value={form.transaction}
                      onChange={(e) =>
                        handleTransactionChange(e.target.value)
                      }
                    >
                      <option value="">
                        Select Invoice / PO
                      </option>
                      {transactionOptions.map((transaction) => (
                        <option
                          key={transaction.id}
                          value={transaction.id}
                        >
                          {transaction.id} — {transaction.invoice}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Payment Date
                    <input
                      type="date"
                      value={form.paymentDate}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          paymentDate: e.target.value
                        }))
                      }
                    />
                  </label>

                  <label>
                    Total Due
                    <div className="supplier-payment-readonly">
                      ₹{Number(form.totalDue).toLocaleString("en-IN")}
                    </div>
                  </label>

                  <label>
                    Amount Paid
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={form.amountPaid}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          amountPaid: e.target.value
                        }))
                      }
                    />
                  </label>

                  <label>
                    Pending Amount
                    <div className="supplier-payment-readonly pending">
                      ₹{pendingAmount.toLocaleString("en-IN")}
                    </div>
                  </label>

                  <label>
                    Payment Mode
                    <select
                      value={form.paymentMode}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          paymentMode: e.target.value
                        }))
                      }
                    >
                      <option value="">Select Payment Mode</option>
                      <option>Cash</option>
                      <option>Bank</option>
                      <option>UPI</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label>
                    Transaction Reference
                    <input
                      type="text"
                      placeholder="UTR / transaction ID"
                      value={form.reference}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          reference: e.target.value
                        }))
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="supplier-payment-form-section">
                <div className="supplier-payment-section-title">
                  <span>02</span>
                  <div>
                    <strong>Payment Notes</strong>
                    <small>Add any additional payment information.</small>
                  </div>
                </div>

                <label className="supplier-payment-notes">
                  Notes
                  <textarea
                    rows="4"
                    placeholder="Enter payment notes..."
                    value={form.notes}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        notes: e.target.value
                      }))
                    }
                  />
                </label>
              </div>

              <div className="supplier-payment-summary-box">
                <div>
                  <FileText size={18} />
                  <span>Payment Summary</span>
                </div>

                <div className="supplier-payment-summary-values">
                  <div>
                    <small>Total Due</small>
                    <strong>
                      ₹{Number(form.totalDue).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <small>Amount Paid</small>
                    <strong>
                      ₹{Number(form.amountPaid || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div>
                    <small>Pending</small>
                    <strong>
                      ₹{pendingAmount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="supplier-payment-modal-footer">
              <button
                className="supplier-payment-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="supplier-payment-save"
                onClick={handleSavePayment}
              >
                <CheckCircle2 size={17} />
                Record Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupplierPayments;