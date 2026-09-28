import { useMemo, useState } from "react";
import { ArrowLeft, Download, Eye, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    orderNo: "SO-2026-031",
    date: "2026-09-12",
    customer: "Tata Industrial Solutions",
    items: 4,
    amount: 248000,
    dispatch: "Pending",
    invoice: "Generated",
    payment: "Pending"
  },
  {
    orderNo: "SO-2026-030",
    date: "2026-09-11",
    customer: "Shree Engineering Works",
    items: 3,
    amount: 156500,
    dispatch: "Dispatched",
    invoice: "Generated",
    payment: "Paid"
  },
  {
    orderNo: "SO-2026-029",
    date: "2026-09-09",
    customer: "Maharashtra Auto Parts",
    items: 6,
    amount: 324800,
    dispatch: "Dispatched",
    invoice: "Generated",
    payment: "Partially Paid"
  },
  {
    orderNo: "SO-2026-028",
    date: "2026-09-08",
    customer: "Prime Manufacturing",
    items: 2,
    amount: 98500,
    dispatch: "Pending",
    invoice: "Pending",
    payment: "Pending"
  },
  {
    orderNo: "SO-2026-027",
    date: "2026-09-06",
    customer: "Universal Machinery",
    items: 5,
    amount: 412000,
    dispatch: "Dispatched",
    invoice: "Generated",
    payment: "Paid"
  },
  {
    orderNo: "SO-2026-026",
    date: "2026-09-04",
    customer: "Shivam Engineering",
    items: 3,
    amount: 187400,
    dispatch: "Dispatched",
    invoice: "Generated",
    payment: "Paid"
  },
  {
    orderNo: "SO-2026-025",
    date: "2026-09-02",
    customer: "Sai Industrial Components",
    items: 7,
    amount: 276900,
    dispatch: "Pending",
    invoice: "Generated",
    payment: "Partially Paid"
  }
];

function SalesReport() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [dispatchFilter, setDispatchFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.orderNo.toLowerCase().includes(search.toLowerCase()) ||
        item.customer.toLowerCase().includes(search.toLowerCase());

      const matchesDispatch =
        dispatchFilter === "All" ||
        item.dispatch === dispatchFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        item.payment === paymentFilter;

      return matchesSearch && matchesDispatch && matchesPayment;
    });
  }, [data, search, dispatchFilter, paymentFilter]);

  const totalSales = filteredData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalOrders = filteredData.length;

  const paidAmount = filteredData
    .filter((item) => item.payment === "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingAmount = filteredData
    .filter((item) => item.payment !== "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const dispatchedOrders = filteredData.filter(
    (item) => item.dispatch === "Dispatched"
  ).length;

  const deleteOrder = (orderNo) => {
    if (
      window.confirm(
        "Are you sure you want to delete this sales record?"
      )
    ) {
      setData((current) =>
        current.filter((item) => item.orderNo !== orderNo)
      );
    }
  };

  const exportReport = () => {
    const headers = [
      "Sales Order",
      "Date",
      "Customer",
      "Items",
      "Order Amount",
      "Dispatch Status",
      "Invoice Status",
      "Payment Status"
    ];

    const rows = filteredData.map((item) => [
      item.orderNo,
      item.date,
      item.customer,
      item.items,
      item.amount,
      item.dispatch,
      item.invoice,
      item.payment
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
    link.download = "Sales_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="sales-report-page">
      <section className="sales-report-hero">
        <div>
          <button
            className="sales-report-back"
            onClick={() => navigate("/reports")}
          >
            <ArrowLeft size={17} />
            Back to Reports
          </button>

          <span className="sales-report-eyebrow">
            SALES ANALYTICS
          </span>

          <h1>Sales Report</h1>

          <p>
            Track customer orders, sales value, dispatch progress,
            invoices and customer payment status.
          </p>
        </div>

        <button
          className="sales-report-export"
          onClick={exportReport}
        >
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="sales-report-summary">
        <div className="sales-report-card">
          <span>Total Sales</span>
          <strong>₹{totalSales.toLocaleString("en-IN")}</strong>
          <small>Value of filtered orders</small>
        </div>

        <div className="sales-report-card">
          <span>Total Orders</span>
          <strong>{totalOrders}</strong>
          <small>Customer orders</small>
        </div>

        <div className="sales-report-card">
          <span>Paid Sales</span>
          <strong>₹{paidAmount.toLocaleString("en-IN")}</strong>
          <small>Orders fully paid</small>
        </div>

        <div className="sales-report-card warning">
          <span>Pending Amount</span>
          <strong>₹{pendingAmount.toLocaleString("en-IN")}</strong>
          <small>Payment yet to be completed</small>
        </div>
      </section>

      <section className="sales-report-status-strip">
        <div>
          <span>Dispatch Progress</span>
          <strong>
            {dispatchedOrders} / {totalOrders}
          </strong>
        </div>

        <div className="sales-report-status-bar">
          <div
            style={{
              width:
                totalOrders > 0
                  ? `${(dispatchedOrders / totalOrders) * 100}%`
                  : "0%"
            }}
          />
        </div>
      </section>

      <section className="sales-report-panel">
        <div className="sales-report-panel-header">
          <div>
            <h2>Customer Sales Orders</h2>
            <span>{filteredData.length} records found</span>
          </div>
        </div>

        <div className="sales-report-filters">
          <div className="sales-report-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search order or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={dispatchFilter}
            onChange={(e) => setDispatchFilter(e.target.value)}
          >
            <option value="All">All Dispatch</option>
            <option value="Pending">Pending</option>
            <option value="Dispatched">Dispatched</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="All">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Partially Paid">Partially Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="sales-report-table-wrapper">
          <table className="sales-report-table">
            <thead>
              <tr>
                <th>Sales Order</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Dispatch</th>
                <th>Invoice</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.orderNo}>
                  <td>
                    <div className="sales-order-cell">
                      <div className="sales-order-icon">
                        {item.orderNo.slice(-3)}
                      </div>

                      <div>
                        <strong>{item.orderNo}</strong>
                        <span>Customer Order</span>
                      </div>
                    </div>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <strong>{item.customer}</strong>
                  </td>

                  <td>{item.items}</td>

                  <td>
                    <strong>
                      ₹{item.amount.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`sales-report-badge ${
                        item.dispatch === "Dispatched"
                          ? "success"
                          : "pending"
                      }`}
                    >
                      {item.dispatch}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`sales-report-badge ${
                        item.invoice === "Generated"
                          ? "success"
                          : "pending"
                      }`}
                    >
                      {item.invoice}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`sales-report-badge ${
                        item.payment === "Paid"
                          ? "success"
                          : item.payment === "Partially Paid"
                          ? "partial"
                          : "pending"
                      }`}
                    >
                      {item.payment}
                    </span>
                  </td>

                  <td>
                    <div className="sales-report-actions">
                      <button
                        onClick={() => setSelectedOrder(item)}
                        title="View"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        className="danger"
                        onClick={() => deleteOrder(item.orderNo)}
                        title="Delete"
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
                    <div className="sales-report-empty">
                      No sales records found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedOrder && (
        <div
          className="sales-report-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="sales-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sales-report-modal-header">
              <div>
                <span>SALES ORDER DETAILS</span>
                <h2>{selectedOrder.orderNo}</h2>
              </div>

              <button onClick={() => setSelectedOrder(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="sales-report-detail-grid">
              <div>
                <span>Customer</span>
                <strong>{selectedOrder.customer}</strong>
              </div>

              <div>
                <span>Order Date</span>
                <strong>{selectedOrder.date}</strong>
              </div>

              <div>
                <span>Items</span>
                <strong>{selectedOrder.items}</strong>
              </div>

              <div>
                <span>Order Amount</span>
                <strong>
                  ₹{selectedOrder.amount.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Dispatch Status</span>
                <strong>{selectedOrder.dispatch}</strong>
              </div>

              <div>
                <span>Invoice Status</span>
                <strong>{selectedOrder.invoice}</strong>
              </div>

              <div>
                <span>Payment Status</span>
                <strong>{selectedOrder.payment}</strong>
              </div>

              <div>
                <span>Order Number</span>
                <strong>{selectedOrder.orderNo}</strong>
              </div>
            </div>

            <button
              className="sales-report-close"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesReport;