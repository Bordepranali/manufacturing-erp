import { useMemo, useState } from "react";
import { ArrowLeft, Download, Eye, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    orderNo: "PROD-2026-021",
    product: "Industrial Gearbox",
    quantity: 500,
    produced: 380,
    pending: 120,
    startDate: "2026-09-10",
    expectedDate: "2026-09-18",
    status: "In Progress"
  },
  {
    orderNo: "PROD-2026-020",
    product: "Heavy Duty Motor",
    quantity: 300,
    produced: 300,
    pending: 0,
    startDate: "2026-09-06",
    expectedDate: "2026-09-13",
    status: "Completed"
  },
  {
    orderNo: "PROD-2026-019",
    product: "Gear Housing",
    quantity: 250,
    produced: 175,
    pending: 75,
    startDate: "2026-09-08",
    expectedDate: "2026-09-16",
    status: "In Progress"
  },
  {
    orderNo: "PROD-2026-018",
    product: "Hydraulic Pump",
    quantity: 180,
    produced: 90,
    pending: 90,
    startDate: "2026-09-09",
    expectedDate: "2026-09-20",
    status: "In Progress"
  },
  {
    orderNo: "PROD-2026-017",
    product: "Steel Coupling",
    quantity: 400,
    produced: 400,
    pending: 0,
    startDate: "2026-09-02",
    expectedDate: "2026-09-09",
    status: "Completed"
  },
  {
    orderNo: "PROD-2026-016",
    product: "Industrial Valve",
    quantity: 220,
    produced: 0,
    pending: 220,
    startDate: "2026-09-15",
    expectedDate: "2026-09-24",
    status: "Pending"
  },
  {
    orderNo: "PROD-2026-015",
    product: "Conveyor Roller",
    quantity: 600,
    produced: 420,
    pending: 180,
    startDate: "2026-09-07",
    expectedDate: "2026-09-17",
    status: "In Progress"
  }
];

function ProductionReport() {
  const navigate = useNavigate();

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.orderNo.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const totalPlanned = filteredData.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalProduced = filteredData.reduce(
    (sum, item) => sum + item.produced,
    0
  );

  const totalPending = filteredData.reduce(
    (sum, item) => sum + item.pending,
    0
  );

  const completedOrders = filteredData.filter(
    (item) => item.status === "Completed"
  ).length;

  const productionPercentage =
    totalPlanned > 0
      ? Math.round((totalProduced / totalPlanned) * 100)
      : 0;

  const deleteOrder = (orderNo) => {
    if (
      window.confirm(
        "Are you sure you want to delete this production record?"
      )
    ) {
      setData((current) =>
        current.filter((item) => item.orderNo !== orderNo)
      );
    }
  };

  const exportReport = () => {
    const headers = [
      "Production Order",
      "Product",
      "Planned Quantity",
      "Produced Quantity",
      "Pending Quantity",
      "Start Date",
      "Expected Completion",
      "Status"
    ];

    const rows = filteredData.map((item) => [
      item.orderNo,
      item.product,
      item.quantity,
      item.produced,
      item.pending,
      item.startDate,
      item.expectedDate,
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
    link.download = "Production_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="production-report-page">
      <section className="production-report-hero">
        <div>
          <button
            className="production-report-back"
            onClick={() => navigate("/reports")}
          >
            <ArrowLeft size={17} />
            Back to Reports
          </button>

          <span className="production-report-eyebrow">
            PRODUCTION ANALYTICS
          </span>

          <h1>Production Report</h1>

          <p>
            Track planned production, completed quantities,
            pending work and active production orders.
          </p>
        </div>

        <button
          className="production-report-export"
          onClick={exportReport}
        >
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="production-report-summary">
        <div className="production-report-card">
          <span>Total Planned</span>
          <strong>{totalPlanned.toLocaleString()}</strong>
          <small>Units planned for production</small>
        </div>

        <div className="production-report-card">
          <span>Total Produced</span>
          <strong>{totalProduced.toLocaleString()}</strong>
          <small>{productionPercentage}% of planned quantity</small>
        </div>

        <div className="production-report-card">
          <span>Pending Production</span>
          <strong>{totalPending.toLocaleString()}</strong>
          <small>Units remaining</small>
        </div>

        <div className="production-report-card">
          <span>Completed Orders</span>
          <strong>{completedOrders}</strong>
          <small>Production orders completed</small>
        </div>
      </section>

      <section className="production-report-panel">
        <div className="production-report-panel-header">
          <div>
            <h2>Production Orders</h2>
            <span>{filteredData.length} records found</span>
          </div>
        </div>

        <div className="production-report-filters">
          <div className="production-report-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search order or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="production-report-progress">
          <div>
            <span>Overall Production Progress</span>
            <strong>{productionPercentage}%</strong>
          </div>

          <div className="production-report-progress-bar">
            <div style={{ width: `${productionPercentage}%` }}></div>
          </div>
        </div>

        <div className="production-report-table-wrapper">
          <table className="production-report-table">
            <thead>
              <tr>
                <th>Production Order</th>
                <th>Product</th>
                <th>Planned</th>
                <th>Produced</th>
                <th>Pending</th>
                <th>Start Date</th>
                <th>Expected Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.orderNo}>
                  <td>
                    <div className="production-order-cell">
                      <div className="production-order-icon">
                        {item.orderNo.slice(-3)}
                      </div>

                      <div>
                        <strong>{item.orderNo}</strong>
                        <span>Production Order</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong>{item.product}</strong>
                  </td>

                  <td>{item.quantity}</td>

                  <td>
                    <strong>{item.produced}</strong>
                  </td>

                  <td>{item.pending}</td>

                  <td>{item.startDate}</td>

                  <td>{item.expectedDate}</td>

                  <td>
                    <span
                      className={`production-report-status ${
                        item.status === "Completed"
                          ? "completed"
                          : item.status === "In Progress"
                          ? "progress"
                          : "pending"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="production-report-actions">
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
                    <div className="production-report-empty">
                      No production records found.
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
          className="production-report-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="production-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="production-report-modal-header">
              <div>
                <span>PRODUCTION DETAILS</span>
                <h2>{selectedOrder.orderNo}</h2>
              </div>

              <button onClick={() => setSelectedOrder(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="production-report-detail-grid">
              <div>
                <span>Product</span>
                <strong>{selectedOrder.product}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedOrder.status}</strong>
              </div>

              <div>
                <span>Planned Quantity</span>
                <strong>{selectedOrder.quantity}</strong>
              </div>

              <div>
                <span>Produced Quantity</span>
                <strong>{selectedOrder.produced}</strong>
              </div>

              <div>
                <span>Pending Quantity</span>
                <strong>{selectedOrder.pending}</strong>
              </div>

              <div>
                <span>Start Date</span>
                <strong>{selectedOrder.startDate}</strong>
              </div>

              <div>
                <span>Expected Completion</span>
                <strong>{selectedOrder.expectedDate}</strong>
              </div>

              <div>
                <span>Completion</span>
                <strong>
                  {Math.round(
                    (selectedOrder.produced /
                      selectedOrder.quantity) *
                      100
                  )}
                  %
                </strong>
              </div>
            </div>

            <button
              className="production-report-close"
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

export default ProductionReport;