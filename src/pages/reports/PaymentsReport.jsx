import { useMemo, useState } from "react";
import { ArrowLeft, Download, Eye, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    paymentNo: "PAY-2026-041",
    date: "2026-09-12",
    type: "Supplier Payment",
    party: "ABC Steel Suppliers",
    reference: "PO-2026-041",
    amount: 124500,
    mode: "Bank Transfer",
    status: "Paid"
  },
  {
    paymentNo: "PAY-2026-040",
    date: "2026-09-11",
    type: "Customer Payment",
    party: "Tata Industrial Solutions",
    reference: "SO-2026-031",
    amount: 85000,
    mode: "NEFT",
    status: "Paid"
  },
  {
    paymentNo: "PAY-2026-039",
    date: "2026-09-10",
    type: "Supplier Payment",
    party: "Maharashtra Metals",
    reference: "PO-2026-040",
    amount: 86200,
    mode: "Bank Transfer",
    status: "Paid"
  },
  {
    paymentNo: "PAY-2026-038",
    date: "2026-09-09",
    type: "Customer Payment",
    party: "Maharashtra Auto Parts",
    reference: "SO-2026-029",
    amount: 150000,
    mode: "Cheque",
    status: "Partially Paid"
  },
  {
    paymentNo: "PAY-2026-037",
    date: "2026-09-08",
    type: "Supplier Payment",
    party: "Prime Industrial",
    reference: "PO-2026-039",
    amount: 54800,
    mode: "Bank Transfer",
    status: "Pending"
  },
  {
    paymentNo: "PAY-2026-036",
    date: "2026-09-06",
    type: "Customer Payment",
    party: "Universal Machinery",
    reference: "SO-2026-027",
    amount: 210000,
    mode: "NEFT",
    status: "Paid"
  },
  {
    paymentNo: "PAY-2026-035",
    date: "2026-09-05",
    type: "Supplier Payment",
    party: "Shree Components",
    reference: "PO-2026-038",
    amount: 73500,
    mode: "UPI",
    status: "Pending"
  },
  {
    paymentNo: "PAY-2026-034",
    date: "2026-09-03",
    type: "Customer Payment",
    party: "Shivam Engineering",
    reference: "SO-2026-026",
    amount: 187400,
    mode: "Bank Transfer",
    status: "Paid"
  }
];

function PaymentsReport() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.paymentNo.toLowerCase().includes(search.toLowerCase()) ||
        item.party.toLowerCase().includes(search.toLowerCase()) ||
        item.reference.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [data, search, typeFilter, statusFilter]);

  const totalAmount = filteredData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const supplierAmount = filteredData
    .filter((item) => item.type === "Supplier Payment")
    .reduce((sum, item) => sum + item.amount, 0);

  const customerAmount = filteredData
    .filter((item) => item.type === "Customer Payment")
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingAmount = filteredData
    .filter((item) => item.status !== "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const paidCount = filteredData.filter(
    (item) => item.status === "Paid"
  ).length;

  const deletePayment = (paymentNo) => {
    if (
      window.confirm(
        "Are you sure you want to delete this payment record?"
      )
    ) {
      setData((current) =>
        current.filter((item) => item.paymentNo !== paymentNo)
      );
    }
  };

  const exportReport = () => {
    const headers = [
      "Payment Number",
      "Date",
      "Payment Type",
      "Party",
      "Reference",
      "Amount",
      "Payment Mode",
      "Payment Status"
    ];

    const rows = filteredData.map((item) => [
      item.paymentNo,
      item.date,
      item.type,
      item.party,
      item.reference,
      item.amount,
      item.mode,
      item.status
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "Payments_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="payments-report-page">
      <section className="payments-report-hero">
        <div>
          <button
            className="payments-report-back"
            onClick={() => navigate("/reports")}
          >
            <ArrowLeft size={17} />
            Back to Reports
          </button>

          <span className="payments-report-eyebrow">
            PAYMENT ANALYTICS
          </span>

          <h1>Payments Report</h1>

          <p>
            Monitor supplier payments, customer collections,
            payment modes and outstanding payment status.
          </p>
        </div>

        <button
          className="payments-report-export"
          onClick={exportReport}
        >
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="payments-report-summary">
        <div className="payments-report-card">
          <span>Total Payments</span>
          <strong>
            ₹{totalAmount.toLocaleString("en-IN")}
          </strong>
          <small>Filtered payment value</small>
        </div>

        <div className="payments-report-card">
          <span>Supplier Payments</span>
          <strong>
            ₹{supplierAmount.toLocaleString("en-IN")}
          </strong>
          <small>Amount paid to suppliers</small>
        </div>

        <div className="payments-report-card">
          <span>Customer Collections</span>
          <strong>
            ₹{customerAmount.toLocaleString("en-IN")}
          </strong>
          <small>Amount received from customers</small>
        </div>

        <div className="payments-report-card warning">
          <span>Pending Amount</span>
          <strong>
            ₹{pendingAmount.toLocaleString("en-IN")}
          </strong>
          <small>Pending or partially paid</small>
        </div>
      </section>

      <section className="payments-report-status">
        <div className="payments-report-status-info">
          <div>
            <span>Payment Completion</span>
            <strong>
              {paidCount} / {filteredData.length}
            </strong>
          </div>

          <div className="payments-report-progress">
            <div
              style={{
                width:
                  filteredData.length > 0
                    ? `${(paidCount / filteredData.length) * 100}%`
                    : "0%"
              }}
            />
          </div>
        </div>
      </section>

      <section className="payments-report-panel">
        <div className="payments-report-panel-header">
          <div>
            <h2>Payment Transactions</h2>
            <span>{filteredData.length} records found</span>
          </div>
        </div>

        <div className="payments-report-filters">
          <div className="payments-report-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search payment, party or reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Payment Types</option>
            <option value="Supplier Payment">
              Supplier Payment
            </option>
            <option value="Customer Payment">
              Customer Payment
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Partially Paid">
              Partially Paid
            </option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="payments-report-table-wrapper">
          <table className="payments-report-table">
            <thead>
              <tr>
                <th>Payment No.</th>
                <th>Date</th>
                <th>Type</th>
                <th>Party</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.paymentNo}>
                  <td>
                    <div className="payment-number-cell">
                      <div className="payment-number-icon">
                        ₹
                      </div>

                      <div>
                        <strong>{item.paymentNo}</strong>
                        <span>Transaction</span>
                      </div>
                    </div>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <span
                      className={`payment-type ${
                        item.type === "Supplier Payment"
                          ? "supplier"
                          : "customer"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td>
                    <strong>{item.party}</strong>
                  </td>

                  <td>{item.reference}</td>

                  <td>
                    <strong>
                      ₹{item.amount.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>{item.mode}</td>

                  <td>
                    <span
                      className={`payments-report-badge ${
                        item.status === "Paid"
                          ? "success"
                          : item.status === "Partially Paid"
                          ? "partial"
                          : "pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="payments-report-actions">
                      <button
                        title="View"
                        onClick={() =>
                          setSelectedPayment(item)
                        }
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="danger"
                        title="Delete"
                        onClick={() =>
                          deletePayment(item.paymentNo)
                        }
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="9">
                    <div className="payments-report-empty">
                      No payment records found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedPayment && (
        <div
          className="payments-report-modal-overlay"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            className="payments-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="payments-report-modal-header">
              <div>
                <span>PAYMENT DETAILS</span>
                <h2>{selectedPayment.paymentNo}</h2>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="payments-report-detail-grid">
              <div>
                <span>Payment Date</span>
                <strong>{selectedPayment.date}</strong>
              </div>

              <div>
                <span>Payment Type</span>
                <strong>{selectedPayment.type}</strong>
              </div>

              <div>
                <span>Party</span>
                <strong>{selectedPayment.party}</strong>
              </div>

              <div>
                <span>Reference</span>
                <strong>{selectedPayment.reference}</strong>
              </div>

              <div>
                <span>Amount</span>
                <strong>
                  ₹
                  {selectedPayment.amount.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Payment Mode</span>
                <strong>{selectedPayment.mode}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedPayment.status}</strong>
              </div>

              <div>
                <span>Payment Number</span>
                <strong>{selectedPayment.paymentNo}</strong>
              </div>
            </div>

            <button
              className="payments-report-close"
              onClick={() => setSelectedPayment(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentsReport;