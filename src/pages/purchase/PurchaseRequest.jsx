import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  Send,
  FileText,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Package
} from "lucide-react";

const purchaseRequestData = [
  {
    id: "PR-2026-001",
    date: "10 Sep 2026",
    requestedBy: "Rahul Deshmukh",
    department: "Production",
    requiredDate: "15 Sep 2026",
    items: 3,
    itemSummary: "Steel Sheet, Aluminium Rod",
    priority: "Urgent",
    status: "Pending"
  },
  {
    id: "PR-2026-002",
    date: "09 Sep 2026",
    requestedBy: "Amit Kulkarni",
    department: "Inventory",
    requiredDate: "18 Sep 2026",
    items: 5,
    itemSummary: "Lubricant Oil, Bearings",
    priority: "High",
    status: "Approved"
  },
  {
    id: "PR-2026-003",
    date: "08 Sep 2026",
    requestedBy: "Sneha Patil",
    department: "Quality",
    requiredDate: "20 Sep 2026",
    items: 2,
    itemSummary: "Testing Gauges, Calipers",
    priority: "Normal",
    status: "Draft"
  },
  {
    id: "PR-2026-004",
    date: "07 Sep 2026",
    requestedBy: "Priya Joshi",
    department: "Maintenance",
    requiredDate: "12 Sep 2026",
    items: 4,
    itemSummary: "Machine Oil, Spare Parts",
    priority: "High",
    status: "Pending"
  },
  {
    id: "PR-2026-005",
    date: "05 Sep 2026",
    requestedBy: "Vikram Shinde",
    department: "Maintenance",
    requiredDate: "10 Sep 2026",
    items: 2,
    itemSummary: "Motor Belt, Bearing",
    priority: "Urgent",
    status: "Approved"
  }
];

function PurchaseRequest() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredRequests = useMemo(() => {
    return purchaseRequestData.filter((request) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        request.id.toLowerCase().includes(searchValue) ||
        request.requestedBy.toLowerCase().includes(searchValue) ||
        request.department.toLowerCase().includes(searchValue) ||
        request.itemSummary.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" || request.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [search, statusFilter, priorityFilter]);

  const pendingCount = purchaseRequestData.filter(
    (request) => request.status === "Pending"
  ).length;

  const approvedCount = purchaseRequestData.filter(
    (request) => request.status === "Approved"
  ).length;

  const draftCount = purchaseRequestData.filter(
    (request) => request.status === "Draft"
  ).length;

  const urgentCount = purchaseRequestData.filter(
    (request) => request.priority === "Urgent"
  ).length;

  return (
    <div className="purchase-request-page">
      <div className="purchase-request-heading">
        <div>
          <div className="module-eyebrow">PURCHASE / REQUESTS</div>
          <h1>Purchase Requests</h1>
          <p>Create and track material requests raised by different departments.</p>
        </div>

        <button className="purchase-request-add-button">
          <Plus size={18} />
          Add Request
        </button>
      </div>

      <div className="purchase-request-summary-grid">
        <div className="purchase-request-summary-card">
          <div className="purchase-request-summary-icon blue">
            <FileText size={21} />
          </div>

          <div>
            <span>Total Requests</span>
            <strong>{purchaseRequestData.length}</strong>
            <small>All purchase requests</small>
          </div>
        </div>

        <div className="purchase-request-summary-card">
          <div className="purchase-request-summary-icon orange">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Pending Approval</span>
            <strong>{pendingCount}</strong>
            <small>Waiting for approval</small>
          </div>
        </div>

        <div className="purchase-request-summary-card">
          <div className="purchase-request-summary-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Approved</span>
            <strong>{approvedCount}</strong>
            <small>Ready for purchase order</small>
          </div>
        </div>

        <div className="purchase-request-summary-card">
          <div className="purchase-request-summary-icon red">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Urgent Requests</span>
            <strong>{urgentCount}</strong>
            <small>High priority attention</small>
          </div>
        </div>
      </div>

      <div className="purchase-request-container">
        <div className="purchase-request-toolbar">
          <div className="purchase-request-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search request, employee or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="purchase-request-filter">
            <SlidersHorizontal size={17} />

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priority</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="purchase-request-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>

          <div className="purchase-request-result-count">
            {filteredRequests.length} requests
          </div>
        </div>

        <div className="purchase-request-table-wrapper">
          <table className="purchase-request-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Requested By</th>
                <th>Department</th>
                <th>Required Date</th>
                <th>Items</th>
                <th>Priority</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div className="purchase-request-main-info">
                      <div className="purchase-request-icon">
                        <FileText size={17} />
                      </div>

                      <div>
                        <strong>{request.id}</strong>
                        <span>{request.date}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="purchase-request-user">
                      <strong>{request.requestedBy}</strong>
                    </div>
                  </td>

                  <td>
                    <span className="purchase-request-department">
                      {request.department}
                    </span>
                  </td>

                  <td>
                    <span className="purchase-request-date">
                      {request.requiredDate}
                    </span>
                  </td>

                  <td>
                    <div className="purchase-request-items">
                      <strong>
                        <Package size={14} />
                        {request.items} items
                      </strong>
                      <span>{request.itemSummary}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`purchase-request-priority ${
                        request.priority === "Urgent"
                          ? "urgent"
                          : request.priority === "High"
                          ? "high"
                          : "normal"
                      }`}
                    >
                      {request.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`purchase-request-status ${
                        request.status === "Approved"
                          ? "approved"
                          : request.status === "Pending"
                          ? "pending"
                          : "draft"
                      }`}
                    >
                      <span></span>
                      {request.status}
                    </span>
                  </td>

                  <td>
                    <div className="purchase-request-action-area">
                      <button
                        className="purchase-request-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === request.id ? null : request.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === request.id && (
                        <div className="purchase-request-action-menu">
                          <button>
                            <Eye size={15} />
                            View
                          </button>

                          <button>
                            <Pencil size={15} />
                            Edit
                          </button>

                          {request.status === "Draft" && (
                            <button>
                              <Send size={15} />
                              Submit
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

          {filteredRequests.length === 0 && (
            <div className="purchase-request-empty-state">
              <FileText size={34} />
              <strong>No purchase requests found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>

        <div className="purchase-request-footer">
          <span>
            Showing {filteredRequests.length} of {purchaseRequestData.length} requests
          </span>

          <div className="purchase-request-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseRequest;