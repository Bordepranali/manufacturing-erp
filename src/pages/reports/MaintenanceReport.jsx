import { useMemo, useState } from "react";
import {
  Wrench,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Search,
  Eye,
  Trash2,
  Download,
  X
} from "lucide-react";

const initialMaintenanceData = [
  {
    maintenanceNo: "MNT-2026-041",
    date: "2026-09-12",
    machine: "CNC Lathe Machine",
    type: "Preventive",
    technician: "Vikram Shinde",
    problem: "Routine scheduled maintenance",
    workDone: "Lubrication, alignment and safety inspection completed",
    cost: 8500,
    downtime: 3,
    nextDate: "2026-10-12",
    status: "Completed"
  },
  {
    maintenanceNo: "MNT-2026-040",
    date: "2026-09-11",
    machine: "Hydraulic Press",
    type: "Breakdown",
    technician: "Vikram Shinde",
    problem: "Hydraulic pressure dropping",
    workDone: "Replaced pressure valve and checked hydraulic lines",
    cost: 18500,
    downtime: 7,
    nextDate: "2026-10-11",
    status: "Completed"
  },
  {
    maintenanceNo: "MNT-2026-039",
    date: "2026-09-10",
    machine: "CNC Milling Machine",
    type: "Repair",
    technician: "Rohit Jadhav",
    problem: "Spindle vibration detected",
    workDone: "Spindle bearing replaced and machine recalibrated",
    cost: 12400,
    downtime: 5,
    nextDate: "2026-10-10",
    status: "Completed"
  },
  {
    maintenanceNo: "MNT-2026-038",
    date: "2026-09-09",
    machine: "Power Press",
    type: "Preventive",
    technician: "Vikram Shinde",
    problem: "Scheduled inspection",
    workDone: "Oil change and electrical connection inspection",
    cost: 6200,
    downtime: 2,
    nextDate: "2026-10-09",
    status: "Completed"
  },
  {
    maintenanceNo: "MNT-2026-037",
    date: "2026-09-08",
    machine: "Gear Hobbing Machine",
    type: "Breakdown",
    technician: "Rohit Jadhav",
    problem: "Drive motor overheating",
    workDone: "Motor cooling system inspected",
    cost: 9800,
    downtime: 6,
    nextDate: "2026-10-08",
    status: "In Progress"
  },
  {
    maintenanceNo: "MNT-2026-036",
    date: "2026-09-06",
    machine: "Surface Grinding Machine",
    type: "Preventive",
    technician: "Vikram Shinde",
    problem: "Scheduled preventive maintenance",
    workDone: "Grinding wheel and coolant system checked",
    cost: 5400,
    downtime: 2,
    nextDate: "2026-10-06",
    status: "Completed"
  },
  {
    maintenanceNo: "MNT-2026-035",
    date: "2026-09-05",
    machine: "Drilling Machine",
    type: "Repair",
    technician: "Rohit Jadhav",
    problem: "Chuck alignment issue",
    workDone: "Chuck aligned and fastening mechanism repaired",
    cost: 4300,
    downtime: 3,
    nextDate: "2026-10-05",
    status: "Completed"
  },
  {
    maintenanceNo: "MNT-2026-034",
    date: "2026-09-03",
    machine: "Industrial Compressor",
    type: "Breakdown",
    technician: "Vikram Shinde",
    problem: "Air pressure leakage",
    workDone: "Leak identified and hose connection replaced",
    cost: 7600,
    downtime: 4,
    nextDate: "2026-10-03",
    status: "Completed"
  }
];

function MaintenanceReport() {
  const [maintenanceData, setMaintenanceData] = useState(
    initialMaintenanceData
  );
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredData = useMemo(() => {
    return maintenanceData.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.maintenanceNo.toLowerCase().includes(searchText) ||
        item.machine.toLowerCase().includes(searchText) ||
        item.technician.toLowerCase().includes(searchText) ||
        item.problem.toLowerCase().includes(searchText);

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [maintenanceData, search, typeFilter, statusFilter]);

  const totalRecords = maintenanceData.length;

  const preventiveRecords = maintenanceData.filter(
    (item) => item.type === "Preventive"
  ).length;

  const breakdownRecords = maintenanceData.filter(
    (item) => item.type === "Breakdown"
  ).length;

  const activeMaintenance = maintenanceData.filter(
    (item) => item.status === "In Progress"
  ).length;

  const totalCost = maintenanceData.reduce(
    (sum, item) => sum + item.cost,
    0
  );

  const totalDowntime = maintenanceData.reduce(
    (sum, item) => sum + item.downtime,
    0
  );

  const handleDelete = (maintenanceNo) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this maintenance record?"
    );

    if (!confirmed) return;

    setMaintenanceData((current) =>
      current.filter(
        (item) => item.maintenanceNo !== maintenanceNo
      )
    );
  };

  const exportCSV = () => {
    const headers = [
      "Maintenance Number",
      "Maintenance Date",
      "Machine",
      "Maintenance Type",
      "Technician",
      "Problem",
      "Work Done",
      "Maintenance Cost",
      "Downtime Hours",
      "Next Maintenance Date",
      "Status"
    ];

    const rows = filteredData.map((item) => [
      item.maintenanceNo,
      item.date,
      item.machine,
      item.type,
      item.technician,
      item.problem,
      item.workDone,
      item.cost,
      item.downtime,
      item.nextDate,
      item.status
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "maintenance-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="maintenance-report-page">
      <section className="maintenance-report-hero">
        <div>
          <span className="maintenance-report-eyebrow">
            MACHINE MAINTENANCE
          </span>

          <h1>Maintenance Report</h1>

          <p>
            Monitor machine maintenance, breakdowns, repair costs,
            downtime and upcoming maintenance activities.
          </p>
        </div>

        <button
          className="maintenance-report-export-button"
          onClick={exportCSV}
        >
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="maintenance-report-summary-grid">
        <div className="maintenance-report-summary-card">
          <div className="maintenance-report-summary-icon">
            <Wrench size={21} />
          </div>

          <div>
            <span>Total Records</span>
            <strong>{totalRecords}</strong>
          </div>
        </div>

        <div className="maintenance-report-summary-card">
          <div className="maintenance-report-summary-icon">
            <Settings size={21} />
          </div>

          <div>
            <span>Preventive</span>
            <strong>{preventiveRecords}</strong>
          </div>
        </div>

        <div className="maintenance-report-summary-card">
          <div className="maintenance-report-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Breakdowns</span>
            <strong>{breakdownRecords}</strong>
          </div>
        </div>

        <div className="maintenance-report-summary-card">
          <div className="maintenance-report-summary-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{activeMaintenance}</strong>
          </div>
        </div>
      </section>

      <section className="maintenance-report-insight-grid">
        <div className="maintenance-report-insight-card">
          <div className="maintenance-report-insight-heading">
            <div>
              <span>Total Maintenance Cost</span>
              <strong>
                ₹{totalCost.toLocaleString("en-IN")}
              </strong>
            </div>

            <span className="maintenance-report-insight-label">
              Maintenance
            </span>
          </div>

          <p>
            Total recorded maintenance expenditure across the
            current report data.
          </p>
        </div>

        <div className="maintenance-report-insight-card">
          <div className="maintenance-report-insight-heading">
            <div>
              <span>Total Downtime</span>
              <strong>{totalDowntime} hrs</strong>
            </div>

            <span className="maintenance-report-insight-label">
              Machine Hours
            </span>
          </div>

          <p>
            Combined machine downtime recorded across maintenance
            activities.
          </p>
        </div>
      </section>

      <section className="maintenance-report-content-card">
        <div className="maintenance-report-toolbar">
          <div className="maintenance-report-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search machine, technician, maintenance..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Preventive">Preventive</option>
            <option value="Breakdown">Breakdown</option>
            <option value="Repair">Repair</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="maintenance-report-table-header">
          <div>
            <h2>Maintenance Records</h2>

            <p>
              Showing {filteredData.length} of {maintenanceData.length} records
            </p>
          </div>
        </div>

        <div className="maintenance-report-table-wrapper">
          <table className="maintenance-report-table">
            <thead>
              <tr>
                <th>Maintenance</th>
                <th>Date</th>
                <th>Machine</th>
                <th>Type</th>
                <th>Technician</th>
                <th>Cost</th>
                <th>Downtime</th>
                <th>Next Maintenance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.maintenanceNo}>
                  <td>
                    <strong>{item.maintenanceNo}</strong>
                  </td>

                  <td>{item.date}</td>

                  <td>{item.machine}</td>

                  <td>
                    <span className="maintenance-report-type-badge">
                      {item.type}
                    </span>
                  </td>

                  <td>{item.technician}</td>

                  <td>
                    ₹{item.cost.toLocaleString("en-IN")}
                  </td>

                  <td>{item.downtime} hrs</td>

                  <td>{item.nextDate}</td>

                  <td>
                    <span
                      className={`maintenance-report-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="maintenance-report-actions">
                      <button
                        onClick={() => setSelectedRecord(item)}
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item.maintenanceNo)
                        }
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    className="maintenance-report-empty"
                  >
                    No maintenance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedRecord && (
        <div
          className="maintenance-report-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="maintenance-report-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="maintenance-report-modal-header">
              <div>
                <span>Maintenance Details</span>

                <h2>{selectedRecord.maintenanceNo}</h2>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="maintenance-report-details-grid">
              <div>
                <span>Maintenance Date</span>
                <strong>{selectedRecord.date}</strong>
              </div>

              <div>
                <span>Machine</span>
                <strong>{selectedRecord.machine}</strong>
              </div>

              <div>
                <span>Maintenance Type</span>
                <strong>{selectedRecord.type}</strong>
              </div>

              <div>
                <span>Technician</span>
                <strong>{selectedRecord.technician}</strong>
              </div>

              <div>
                <span>Cost</span>
                <strong>
                  ₹{selectedRecord.cost.toLocaleString("en-IN")}
                </strong>
              </div>

              <div>
                <span>Downtime</span>
                <strong>{selectedRecord.downtime} hours</strong>
              </div>

              <div>
                <span>Next Maintenance</span>
                <strong>{selectedRecord.nextDate}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedRecord.status}</strong>
              </div>

              <div className="maintenance-report-detail-wide">
                <span>Problem</span>
                <strong>{selectedRecord.problem}</strong>
              </div>

              <div className="maintenance-report-detail-wide">
                <span>Work Done</span>
                <strong>{selectedRecord.workDone}</strong>
              </div>
            </div>

            <div className="maintenance-report-modal-footer">
              <button onClick={() => setSelectedRecord(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MaintenanceReport;