import { useMemo, useState } from "react";
import {
  ShieldAlert,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
  Package,
  RotateCcw,
  Trash2,
} from "lucide-react";

const rejectedData = [
  {
    id: "RQ-2026-006",
    inspection: "QC-2026-013",
    product: "Industrial Pump",
    batch: "IP-SEP26-06",
    reference: "PROD-2026-021",
    quantity: 2,
    unit: "PCS",
    reason: "Dimension out of tolerance",
    action: "Quarantine",
    date: "10 Sep 2026",
    status: "Quarantine",
  },
  {
    id: "RQ-2026-005",
    inspection: "QC-2026-009",
    product: "Aluminium Rod",
    batch: "AL-SEP26-04",
    reference: "GRN-2026-010",
    quantity: 15,
    unit: "KG",
    reason: "Surface quality failed",
    action: "Rejected",
    date: "07 Sep 2026",
    status: "Rejected",
  },
  {
    id: "RQ-2026-004",
    inspection: "QC-2026-008",
    product: "Machine Frame",
    batch: "MF-SEP26-02",
    reference: "PROD-2026-018",
    quantity: 3,
    unit: "PCS",
    reason: "Welding defect",
    action: "Quarantine",
    date: "06 Sep 2026",
    status: "Quarantine",
  },
  {
    id: "RQ-2026-003",
    inspection: "QC-2026-006",
    product: "Steel Sheet",
    batch: "ST-AUG26-09",
    reference: "GRN-2026-006",
    quantity: 25,
    unit: "KG",
    reason: "Material thickness mismatch",
    action: "Rejected",
    date: "04 Sep 2026",
    status: "Rejected",
  },
  {
    id: "RQ-2026-002",
    inspection: "QC-2026-005",
    product: "Industrial Bearing",
    batch: "IB-SEP26-01",
    reference: "GRN-2026-005",
    quantity: 4,
    unit: "PCS",
    reason: "Bearing noise during inspection",
    action: "Quarantine",
    date: "03 Sep 2026",
    status: "Quarantine",
  },
];

function RejectedQuarantine() {
  const [items, setItems] = useState(rejectedData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchMatch =
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.batch.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.inspection.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      const actionMatch =
        actionFilter === "All" || item.action === actionFilter;

      return searchMatch && statusMatch && actionMatch;
    });
  }, [items, search, statusFilter, actionFilter]);

  const totalItems = items.length;
  const quarantineItems = items.filter(
    (item) => item.status === "Quarantine"
  ).length;
  const rejectedItems = items.filter(
    (item) => item.status === "Rejected"
  ).length;
  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleResolve = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Resolved" }
          : item
      )
    );
    setMenuOpen(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this quality issue?"
    );

    if (confirmed) {
      setItems((current) => current.filter((item) => item.id !== id));
      setMenuOpen(null);
    }
  };

  return (
    <div className="quality-rejected-page">
      <div className="quality-rejected-heading">
        <div>
          <div className="module-eyebrow">QUALITY CONTROL</div>
          <h1>Rejected & Quarantine</h1>
          <p>
            Track failed inspection items and manage their disposition.
          </p>
        </div>

        <div className="quality-rejected-header-icon">
          <ShieldAlert size={24} />
        </div>
      </div>

      <div className="quality-rejected-summary-grid">
        <div className="quality-rejected-summary-card">
          <div className="quality-rejected-summary-icon blue">
            <Package size={20} />
          </div>
          <div>
            <span>Total Issues</span>
            <strong>{totalItems}</strong>
          </div>
        </div>

        <div className="quality-rejected-summary-card">
          <div className="quality-rejected-summary-icon orange">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span>Quarantine</span>
            <strong>{quarantineItems}</strong>
          </div>
        </div>

        <div className="quality-rejected-summary-card">
          <div className="quality-rejected-summary-icon red">
            <ShieldAlert size={20} />
          </div>
          <div>
            <span>Rejected</span>
            <strong>{rejectedItems}</strong>
          </div>
        </div>

        <div className="quality-rejected-summary-card">
          <div className="quality-rejected-summary-icon green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Affected Quantity</span>
            <strong>{totalQuantity}</strong>
          </div>
        </div>
      </div>

      <div className="quality-rejected-info">
        <div className="quality-rejected-info-icon">
          <ShieldAlert size={19} />
        </div>
        <div>
          <strong>Quality issues need action</strong>
          <p>
            Quarantine items are held separately until inspection,
            rework, return or final disposition is completed.
          </p>
        </div>
      </div>

      <div className="quality-rejected-container">
        <div className="quality-rejected-toolbar">
          <div className="quality-rejected-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search product, batch or inspection..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="quality-rejected-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Quarantine">Quarantine</option>
              <option value="Rejected">Rejected</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="quality-rejected-filter">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
            >
              <option value="All">All Actions</option>
              <option value="Quarantine">Quarantine</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <span className="quality-rejected-result-count">
            {filteredItems.length} records
          </span>
        </div>

        <div className="quality-rejected-table-wrapper">
          <table className="quality-rejected-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Product / Batch</th>
                <th>Reference</th>
                <th>Quantity</th>
                <th>Reason</th>
                <th>Action</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="quality-rejected-id">
                      <strong>{item.id}</strong>
                      <span>{item.inspection}</span>
                    </div>
                  </td>

                  <td>
                    <div className="quality-rejected-product">
                      <div className="quality-rejected-product-icon">
                        <Package size={17} />
                      </div>
                      <div>
                        <strong>{item.product}</strong>
                        <span>{item.batch}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="quality-rejected-reference">
                      {item.reference}
                    </span>
                  </td>

                  <td>
                    <strong>
                      {item.quantity} {item.unit}
                    </strong>
                  </td>

                  <td>
                    <span className="quality-rejected-reason">
                      {item.reason}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`quality-rejected-action ${item.action
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.action}
                    </span>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <span
                      className={`quality-rejected-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span></span>
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="quality-rejected-action-area">
                      <button
                        className="quality-rejected-more-button"
                        onClick={() =>
                          setMenuOpen(
                            menuOpen === item.id ? null : item.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {menuOpen === item.id && (
                        <div className="quality-rejected-action-menu">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setMenuOpen(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          {item.status !== "Resolved" && (
                            <button
                              onClick={() => handleResolve(item.id)}
                            >
                              <RotateCcw size={15} />
                              Resolve Issue
                            </button>
                          )}

                          <button
                            className="danger"
                            onClick={() => handleDelete(item.id)}
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

          {filteredItems.length === 0 && (
            <div className="quality-rejected-empty">
              <ShieldAlert size={34} />
              <h3>No quality issues found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div className="quality-rejected-footer">
          <span>
            Showing {filteredItems.length} of {items.length} records
          </span>

          <div className="quality-rejected-pagination">
            <button>‹</button>
            <button className="active">1</button>
            <button>›</button>
          </div>
        </div>
      </div>

      {selectedItem && (
        <div
          className="quality-rejected-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="quality-rejected-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quality-rejected-modal-header">
              <div>
                <span>QUALITY ISSUE</span>
                <h2>{selectedItem.id}</h2>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="quality-rejected-detail-status">
              <span
                className={`quality-rejected-status ${selectedItem.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <span></span>
                {selectedItem.status}
              </span>

              <span
                className={`quality-rejected-action ${selectedItem.action
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {selectedItem.action}
              </span>
            </div>

            <div className="quality-rejected-detail-grid">
              <div>
                <span>Inspection Number</span>
                <strong>{selectedItem.inspection}</strong>
              </div>

              <div>
                <span>Reference</span>
                <strong>{selectedItem.reference}</strong>
              </div>

              <div>
                <span>Product</span>
                <strong>{selectedItem.product}</strong>
              </div>

              <div>
                <span>Batch Number</span>
                <strong>{selectedItem.batch}</strong>
              </div>

              <div>
                <span>Affected Quantity</span>
                <strong>
                  {selectedItem.quantity} {selectedItem.unit}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{selectedItem.date}</strong>
              </div>
            </div>

            <div className="quality-rejected-reason-box">
              <span>Rejection Reason</span>
              <strong>{selectedItem.reason}</strong>
            </div>

            <div className="quality-rejected-modal-actions">
              {selectedItem.status !== "Resolved" && (
                <button
                  className="quality-rejected-resolve-button"
                  onClick={() => {
                    handleResolve(selectedItem.id);
                    setSelectedItem(null);
                  }}
                >
                  <CheckCircle2 size={17} />
                  Mark as Resolved
                </button>
              )}

              <button
                className="quality-rejected-close-button"
                onClick={() => setSelectedItem(null)}
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

export default RejectedQuarantine;