import { useMemo, useState } from "react";
import {
  Activity,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  X,
  Factory,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
  PackageCheck,
} from "lucide-react";

const trackingData = [
  {
    id: "TRK-2026-021",
    orderNo: "PROD-2026-021",
    product: "Industrial Pump",
    plannedQty: 50,
    completedQty: 32,
    rejectedQty: 2,
    stage: "Assembly",
    operator: "Rahul Deshmukh",
    startDate: "10 Sep 2026",
    targetDate: "13 Sep 2026",
    status: "In Progress",
  },
  {
    id: "TRK-2026-020",
    orderNo: "PROD-2026-020",
    product: "Machine Frame",
    plannedQty: 30,
    completedQty: 30,
    rejectedQty: 1,
    stage: "Quality Check",
    operator: "Amit Kulkarni",
    startDate: "08 Sep 2026",
    targetDate: "10 Sep 2026",
    status: "Completed",
  },
  {
    id: "TRK-2026-019",
    orderNo: "PROD-2026-019",
    product: "Hydraulic Pump Assembly",
    plannedQty: 40,
    completedQty: 12,
    rejectedQty: 0,
    stage: "Machining",
    operator: "Vikram Shinde",
    startDate: "09 Sep 2026",
    targetDate: "15 Sep 2026",
    status: "In Progress",
  },
  {
    id: "TRK-2026-018",
    orderNo: "PROD-2026-018",
    product: "Motor Mount",
    plannedQty: 75,
    completedQty: 0,
    rejectedQty: 0,
    stage: "Not Started",
    operator: "Rahul Deshmukh",
    startDate: "12 Sep 2026",
    targetDate: "18 Sep 2026",
    status: "Planned",
  },
  {
    id: "TRK-2026-017",
    orderNo: "PROD-2026-017",
    product: "Industrial Pump",
    plannedQty: 25,
    completedQty: 25,
    rejectedQty: 0,
    stage: "Finished Goods",
    operator: "Sneha Patil",
    startDate: "05 Sep 2026",
    targetDate: "09 Sep 2026",
    status: "Completed",
  },
  {
    id: "TRK-2026-016",
    orderNo: "PROD-2026-016",
    product: "Machine Housing",
    plannedQty: 60,
    completedQty: 42,
    rejectedQty: 3,
    stage: "Finishing",
    operator: "Amit Kulkarni",
    startDate: "07 Sep 2026",
    targetDate: "14 Sep 2026",
    status: "Delayed",
  },
];

const stages = [
  "Not Started",
  "Machining",
  "Assembly",
  "Finishing",
  "Quality Check",
  "Finished Goods",
];

function ProductionTracking() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const filteredData = useMemo(() => {
    return trackingData.filter((item) => {
      const searchMatch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.orderNo.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.operator.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All" || item.status === statusFilter;

      const stageMatch =
        stageFilter === "All" || item.stage === stageFilter;

      return searchMatch && statusMatch && stageMatch;
    });
  }, [search, statusFilter, stageFilter]);

  const totalOrders = trackingData.length;
  const inProgress = trackingData.filter(
    (item) => item.status === "In Progress"
  ).length;
  const completed = trackingData.filter(
    (item) => item.status === "Completed"
  ).length;
  const delayed = trackingData.filter(
    (item) => item.status === "Delayed"
  ).length;

  const totalPlanned = trackingData.reduce(
    (sum, item) => sum + item.plannedQty,
    0
  );

  const totalCompleted = trackingData.reduce(
    (sum, item) => sum + item.completedQty,
    0
  );

  const overallProgress = Math.round(
    (totalCompleted / totalPlanned) * 100
  );

  const getProgress = (item) => {
    if (!item.plannedQty) return 0;
    return Math.min(
      100,
      Math.round((item.completedQty / item.plannedQty) * 100)
    );
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "tracking-status completed";
    if (status === "In Progress") return "tracking-status progress";
    if (status === "Delayed") return "tracking-status delayed";
    return "tracking-status planned";
  };

  const getStageClass = (stage) => {
    if (stage === "Finished Goods") return "tracking-stage finished";
    if (stage === "Quality Check") return "tracking-stage quality";
    if (stage === "Assembly") return "tracking-stage assembly";
    if (stage === "Machining") return "tracking-stage machining";
    if (stage === "Finishing") return "tracking-stage finishing";
    return "tracking-stage not-started";
  };

  return (
    <div className="production-tracking-page">
      <div className="tracking-heading">
        <div>
          <div className="module-eyebrow">PRODUCTION CONTROL</div>
          <h1>Production Tracking</h1>
          <p>
            Monitor production progress, quantities, stages and shop-floor
            activity.
          </p>
        </div>

        <div className="tracking-live-badge">
          <span className="tracking-live-dot"></span>
          Live Production View
        </div>
      </div>

      <div className="tracking-summary-grid">
        <div className="tracking-summary-card">
          <div className="tracking-summary-icon blue">
            <Activity size={21} />
          </div>
          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
            <small>Production orders tracked</small>
          </div>
        </div>

        <div className="tracking-summary-card">
          <div className="tracking-summary-icon orange">
            <PlayCircle size={21} />
          </div>
          <div>
            <span>In Progress</span>
            <strong>{inProgress}</strong>
            <small>Currently on shop floor</small>
          </div>
        </div>

        <div className="tracking-summary-card">
          <div className="tracking-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completed}</strong>
            <small>Orders completed</small>
          </div>
        </div>

        <div className="tracking-summary-card">
          <div className="tracking-summary-icon red">
            <AlertTriangle size={21} />
          </div>
          <div>
            <span>Delayed</span>
            <strong>{delayed}</strong>
            <small>Needs attention</small>
          </div>
        </div>
      </div>

      <div className="tracking-overview-panel">
        <div className="tracking-overview-left">
          <div className="tracking-panel-label">OVERALL PRODUCTION</div>
          <h2>{overallProgress}%</h2>
          <p>
            {totalCompleted} completed out of {totalPlanned} planned units
          </p>
        </div>

        <div className="tracking-overview-progress">
          <div className="tracking-progress-header">
            <span>Production Completion</span>
            <strong>{overallProgress}%</strong>
          </div>

          <div className="tracking-progress-bar">
            <div
              className="tracking-progress-fill"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>

          <div className="tracking-progress-footer">
            <span>{totalCompleted} units completed</span>
            <span>{totalPlanned - totalCompleted} units remaining</span>
          </div>
        </div>

        <div className="tracking-factory-icon">
          <Factory size={34} />
        </div>
      </div>

      <div className="tracking-stage-panel">
        <div className="tracking-section-heading">
          <div>
            <span className="tracking-panel-label">SHOP FLOOR</span>
            <h2>Production Stage Overview</h2>
          </div>
          <span>{trackingData.length} active records</span>
        </div>

        <div className="tracking-stage-list">
          {stages.map((stage) => {
            const count = trackingData.filter(
              (item) => item.stage === stage
            ).length;

            return (
              <button
                key={stage}
                className={`tracking-stage-card ${
                  stageFilter === stage ? "selected" : ""
                }`}
                onClick={() =>
                  setStageFilter(stageFilter === stage ? "All" : stage)
                }
              >
                <div className={getStageClass(stage)}>
                  {stage === "Not Started" && <Clock3 size={17} />}
                  {stage === "Machining" && <Activity size={17} />}
                  {stage === "Assembly" && <Factory size={17} />}
                  {stage === "Finishing" && <PackageCheck size={17} />}
                  {stage === "Quality Check" && <CheckCircle2 size={17} />}
                  {stage === "Finished Goods" && <PackageCheck size={17} />}
                </div>
                <div>
                  <strong>{stage}</strong>
                  <span>{count} order{count !== 1 ? "s" : ""}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="tracking-table-container">
        <div className="tracking-toolbar">
          <div className="tracking-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search order, product or operator..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="tracking-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>

          <div className="tracking-filter">
            <Factory size={17} />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            >
              <option value="All">All Stages</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="tracking-result-count">
            {filteredData.length} records
          </div>
        </div>

        <div className="tracking-table-wrapper">
          <table className="tracking-table">
            <thead>
              <tr>
                <th>Tracking / Order</th>
                <th>Product</th>
                <th>Production Progress</th>
                <th>Stage</th>
                <th>Operator</th>
                <th>Target Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => {
                const progress = getProgress(item);

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="tracking-order-cell">
                        <div className="tracking-order-icon">
                          <Activity size={17} />
                        </div>
                        <div>
                          <strong>{item.id}</strong>
                          <span>{item.orderNo}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="tracking-product-cell">
                        <strong>{item.product}</strong>
                        <span>{item.plannedQty} units planned</span>
                      </div>
                    </td>

                    <td>
                      <div className="tracking-progress-cell">
                        <div className="tracking-progress-numbers">
                          <strong>{item.completedQty}</strong>
                          <span>/ {item.plannedQty}</span>
                          <em>{progress}%</em>
                        </div>

                        <div className="tracking-row-progress">
                          <div
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>

                        {item.rejectedQty > 0 && (
                          <small>
                            {item.rejectedQty} rejected
                          </small>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className={getStageClass(item.stage)}>
                        {item.stage}
                      </span>
                    </td>

                    <td>
                      <div className="tracking-operator">
                        <div className="tracking-operator-avatar">
                          {item.operator.charAt(0)}
                        </div>
                        <span>{item.operator}</span>
                      </div>
                    </td>

                    <td>
                      <div className="tracking-date">
                        <strong>{item.targetDate}</strong>
                        <span>Start: {item.startDate}</span>
                      </div>
                    </td>

                    <td>
                      <span className={getStatusClass(item.status)}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="tracking-action-area">
                        <button
                          className="tracking-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.id ? null : item.id
                            )
                          }
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === item.id && (
                          <div className="tracking-action-menu">
                            <button
                              onClick={() => {
                                setSelectedTracking(item);
                                setOpenMenu(null);
                              }}
                            >
                              <Eye size={15} />
                              View Details
                            </button>

                            <button
                              onClick={() => {
                                window.alert(
                                  `Production update for ${item.orderNo}`
                                );
                                setOpenMenu(null);
                              }}
                            >
                              <Activity size={15} />
                              Update Progress
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="tracking-empty-state">
              <Activity size={34} />
              <h3>No production records found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div className="tracking-footer">
          <span>
            Showing {filteredData.length} of {trackingData.length} records
          </span>

          <div className="tracking-pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {selectedTracking && (
        <div
          className="tracking-modal-overlay"
          onClick={() => setSelectedTracking(null)}
        >
          <div
            className="tracking-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tracking-modal-header">
              <div>
                <span className="tracking-panel-label">
                  PRODUCTION TRACKING
                </span>
                <h2>{selectedTracking.orderNo}</h2>
                <p>{selectedTracking.product}</p>
              </div>

              <button
                className="tracking-close-button"
                onClick={() => setSelectedTracking(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="tracking-detail-progress">
              <div className="tracking-detail-progress-top">
                <span>Production Progress</span>
                <strong>{getProgress(selectedTracking)}%</strong>
              </div>

              <div className="tracking-progress-bar large">
                <div
                  className="tracking-progress-fill"
                  style={{
                    width: `${getProgress(selectedTracking)}%`,
                  }}
                ></div>
              </div>

              <div className="tracking-detail-quantity">
                <div>
                  <span>Planned</span>
                  <strong>{selectedTracking.plannedQty}</strong>
                </div>

                <div>
                  <span>Completed</span>
                  <strong>{selectedTracking.completedQty}</strong>
                </div>

                <div>
                  <span>Rejected</span>
                  <strong>{selectedTracking.rejectedQty}</strong>
                </div>

                <div>
                  <span>Remaining</span>
                  <strong>
                    {selectedTracking.plannedQty -
                      selectedTracking.completedQty}
                  </strong>
                </div>
              </div>
            </div>

            <div className="tracking-detail-grid">
              <div>
                <span>Tracking ID</span>
                <strong>{selectedTracking.id}</strong>
              </div>

              <div>
                <span>Current Stage</span>
                <strong>{selectedTracking.stage}</strong>
              </div>

              <div>
                <span>Operator</span>
                <strong>{selectedTracking.operator}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedTracking.status}</strong>
              </div>

              <div>
                <span>Start Date</span>
                <strong>{selectedTracking.startDate}</strong>
              </div>

              <div>
                <span>Target Date</span>
                <strong>{selectedTracking.targetDate}</strong>
              </div>
            </div>

            <div className="tracking-timeline">
              <div className="tracking-timeline-heading">
                <h3>Production Flow</h3>
                <span>Current Stage: {selectedTracking.stage}</span>
              </div>

              <div className="tracking-timeline-items">
                {stages.map((stage, index) => {
                  const currentIndex = stages.indexOf(
                    selectedTracking.stage
                  );

                  const completedStage = index < currentIndex;
                  const currentStage = index === currentIndex;

                  return (
                    <div
                      className={`tracking-timeline-item ${
                        completedStage
                          ? "completed"
                          : currentStage
                          ? "current"
                          : ""
                      }`}
                      key={stage}
                    >
                      <div className="tracking-timeline-marker">
                        {completedStage ? (
                          <CheckCircle2 size={16} />
                        ) : currentStage ? (
                          <PlayCircle size={16} />
                        ) : (
                          <Clock3 size={16} />
                        )}
                      </div>

                      <div>
                        <strong>{stage}</strong>
                        <span>
                          {completedStage
                            ? "Completed"
                            : currentStage
                            ? "Currently active"
                            : "Pending"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="tracking-modal-actions">
              <button
                className="tracking-secondary-button"
                onClick={() => setSelectedTracking(null)}
              >
                Close
              </button>

              <button
                className="tracking-primary-button"
                onClick={() =>
                  window.alert(
                    `Production progress update for ${selectedTracking.orderNo}`
                  )
                }
              >
                <Activity size={17} />
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductionTracking;