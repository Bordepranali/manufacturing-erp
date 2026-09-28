import { useMemo, useState } from "react";
import {
  ShoppingCart,
  Download,
  Search,
  Eye,
  X,
  PackageCheck,
  Clock3,
  CreditCard
} from "lucide-react";

const initialData = [
  {
    poNo: "PO-2026-041",
    date: "2026-09-10",
    supplier: "ABC Steel Suppliers",
    warehouse: "Main Warehouse",
    items: 4,
    amount: 124500,
    received: "Pending",
    payment: "Pending"
  },
  {
    poNo: "PO-2026-040",
    date: "2026-09-09",
    supplier: "Maharashtra Metals",
    warehouse: "Raw Material Store",
    items: 3,
    amount: 86200,
    received: "Received",
    payment: "Paid"
  },
  {
    poNo: "PO-2026-039",
    date: "2026-09-08",
    supplier: "Prime Industrial",
    warehouse: "Main Warehouse",
    items: 5,
    amount: 54800,
    received: "Partially Received",
    payment: "Partially Paid"
  },
  {
    poNo: "PO-2026-038",
    date: "2026-09-06",
    supplier: "Shree Components",
    warehouse: "Component Store",
    items: 6,
    amount: 73500,
    received: "Received",
    payment: "Paid"
  },
  {
    poNo: "PO-2026-037",
    date: "2026-09-04",
    supplier: "Universal Hardware",
    warehouse: "Main Warehouse",
    items: 8,
    amount: 42100,
    received: "Pending",
    payment: "Pending"
  },
  {
    poNo: "PO-2026-036",
    date: "2026-09-02",
    supplier: "ABC Steel Suppliers",
    warehouse: "Raw Material Store",
    items: 4,
    amount: 98500,
    received: "Received",
    payment: "Paid"
  }
];

function PurchaseReport() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [supplier, setSupplier] = useState("All");
  const [status, setStatus] = useState("All");
  const [dateFrom, setDateFrom] = useState("2026-09-01");
  const [dateTo, setDateTo] = useState("2026-09-30");
  const [selectedRow, setSelectedRow] = useState(null);

  const suppliers = [
    "All",
    ...new Set(initialData.map((item) => item.supplier))
  ];

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.poNo.toLowerCase().includes(search.toLowerCase()) ||
        item.supplier.toLowerCase().includes(search.toLowerCase()) ||
        item.warehouse.toLowerCase().includes(search.toLowerCase());

      const matchesSupplier =
        supplier === "All" || item.supplier === supplier;

      const matchesStatus =
        status === "All" ||
        item.received === status ||
        item.payment === status;

      const matchesDate =
        item.date >= dateFrom && item.date <= dateTo;

      return (
        matchesSearch &&
        matchesSupplier &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [data, search, supplier, status, dateFrom, dateTo]);

  const totalPurchase = filteredData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const receivedOrders = filteredData.filter(
    (item) => item.received === "Received"
  ).length;

  const pendingOrders = filteredData.filter(
    (item) => item.received === "Pending"
  ).length;

  const pendingPayment = filteredData
    .filter((item) => item.payment !== "Paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const exportReport = () => {
  const headers = [
    "PO Number",
    "Date",
    "Supplier",
    "Warehouse",
    "Items",
    "Amount",
    "Receipt Status",
    "Payment Status"
  ];

  const rows = filteredData.map((item) => [
    item.poNo,
    item.date,
    item.supplier,
    item.warehouse,
    item.items,
    item.amount,
    item.received,
    item.payment
  ]);

  const csv = [
    headers,
    ...rows
  ]
    .map((row) =>
      row
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `Purchase_Report_${dateFrom}_to_${dateTo}.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

  const deleteReportRow = (poNo) => {
    setData((current) =>
      current.filter((item) => item.poNo !== poNo)
    );
    setSelectedRow(null);
  };

  return (
    <div className="purchase-report-page">
      <section className="purchase-report-hero">
        <div>
          <span className="purchase-report-eyebrow">
            REPORTS / PURCHASE
          </span>

          <h1>Purchase Report</h1>

          <p>
            Analyze purchase orders, received materials and supplier
            payment activity.
          </p>
        </div>

        <div className="purchase-report-hero-icon">
          <ShoppingCart size={32} />
        </div>
      </section>

      <section className="purchase-report-summary">
        <div className="purchase-report-stat">
          <div className="purchase-report-stat-icon">
            <ShoppingCart size={20} />
          </div>

          <div>
            <span>Total Purchase</span>
            <strong>{formatCurrency(totalPurchase)}</strong>
          </div>
        </div>

        <div className="purchase-report-stat">
          <div className="purchase-report-stat-icon">
            <PackageCheck size={20} />
          </div>

          <div>
            <span>Received Orders</span>
            <strong>{receivedOrders}</strong>
          </div>
        </div>

        <div className="purchase-report-stat">
          <div className="purchase-report-stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Pending Orders</span>
            <strong>{pendingOrders}</strong>
          </div>
        </div>

        <div className="purchase-report-stat">
          <div className="purchase-report-stat-icon">
            <CreditCard size={20} />
          </div>

          <div>
            <span>Pending Payments</span>
            <strong>{formatCurrency(pendingPayment)}</strong>
          </div>
        </div>
      </section>

      <section className="purchase-report-filter">
        <div className="purchase-report-filter-heading">
          <div>
            <h2>Filter Purchase Report</h2>
            <p>Refine the report using date, supplier and status.</p>
          </div>

          <button
            className="purchase-report-export"
            onClick={exportReport}
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>

        <div className="purchase-report-filter-grid">
          <div className="purchase-report-field purchase-report-search">
            <label>Search</label>

            <div className="purchase-report-search-box">
              <Search size={17} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="PO number, supplier..."
              />
            </div>
          </div>

          <div className="purchase-report-field">
            <label>Supplier</label>

            <select
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            >
              {suppliers.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="purchase-report-field">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All</option>
              <option>Received</option>
              <option>Pending</option>
              <option>Partially Received</option>
              <option>Paid</option>
              <option>Partially Paid</option>
            </select>
          </div>

          <div className="purchase-report-field">
            <label>Date From</label>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          <div className="purchase-report-field">
            <label>Date To</label>

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="purchase-report-table-card">
        <div className="purchase-report-table-header">
          <div>
            <span>PURCHASE ACTIVITY</span>
            <h2>Purchase Orders</h2>
          </div>

          <div className="purchase-report-count">
            {filteredData.length} Records
          </div>
        </div>

        <div className="purchase-report-table-wrapper">
          <table className="purchase-report-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Date</th>
                <th>Supplier</th>
                <th>Warehouse</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Receipt Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.poNo}>
                  <td>
                    <strong>{item.poNo}</strong>
                  </td>

                  <td>{item.date}</td>

                  <td>{item.supplier}</td>

                  <td>{item.warehouse}</td>

                  <td>{item.items}</td>

                  <td>
                    <strong>{formatCurrency(item.amount)}</strong>
                  </td>

                  <td>
                    <span
                      className={`purchase-status ${
                        item.received
                          .toLowerCase()
                          .replaceAll(" ", "-")
                      }`}
                    >
                      {item.received}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`purchase-payment-status ${
                        item.payment
                          .toLowerCase()
                          .replaceAll(" ", "-")
                      }`}
                    >
                      {item.payment}
                    </span>
                  </td>

                  <td>
                    <button
                      className="purchase-report-view"
                      onClick={() => setSelectedRow(item)}
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="purchase-report-empty">
            <ShoppingCart size={38} />
            <h3>No purchase records found</h3>
            <p>Try changing your search or filters.</p>
          </div>
        )}
      </section>

      {selectedRow && (
        <div
          className="purchase-report-modal-overlay"
          onClick={() => setSelectedRow(null)}
        >
          <div
            className="purchase-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="purchase-report-modal-header">
              <div>
                <span>Purchase Order</span>
                <h2>{selectedRow.poNo}</h2>
              </div>

              <button
                className="purchase-report-close"
                onClick={() => setSelectedRow(null)}
              >
                <X size={19} />
              </button>
            </div>

            <div className="purchase-report-detail-grid">
              <div>
                <span>PO Number</span>
                <strong>{selectedRow.poNo}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{selectedRow.date}</strong>
              </div>

              <div>
                <span>Supplier</span>
                <strong>{selectedRow.supplier}</strong>
              </div>

              <div>
                <span>Warehouse</span>
                <strong>{selectedRow.warehouse}</strong>
              </div>

              <div>
                <span>Total Items</span>
                <strong>{selectedRow.items}</strong>
              </div>

              <div>
                <span>Total Amount</span>
                <strong>{formatCurrency(selectedRow.amount)}</strong>
              </div>

              <div>
                <span>Receipt Status</span>
                <strong>{selectedRow.received}</strong>
              </div>

              <div>
                <span>Payment Status</span>
                <strong>{selectedRow.payment}</strong>
              </div>
            </div>

            <div className="purchase-report-modal-footer">
              <button
                className="purchase-report-delete"
                onClick={() => deleteReportRow(selectedRow.poNo)}
              >
                Delete Record
              </button>

              <button
                className="purchase-report-secondary"
                onClick={() => setSelectedRow(null)}
              >
                Close
              </button>

              <button
                className="purchase-report-primary"
                onClick={() => exportReport()}
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseReport;