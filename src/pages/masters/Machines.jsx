import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  Power,
  Factory,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  MapPin,
  CalendarDays
} from "lucide-react";

const machineData = [
  {
    id: "MCH-001",
    name: "CNC Turning Machine",
    type: "CNC Machine",
    manufacturer: "Mazak",
    model: "QT-250",
    serial: "MZK-24001",
    location: "Production Area A",
    purchaseDate: "15 Feb 2023",
    frequency: "Monthly",
    status: "Running"
  },
  {
    id: "MCH-002",
    name: "Hydraulic Press",
    type: "Press Machine",
    manufacturer: "Schuler",
    model: "HP-500",
    serial: "SCH-23018",
    location: "Production Area B",
    purchaseDate: "22 Jul 2022",
    frequency: "Quarterly",
    status: "Running"
  },
  {
    id: "MCH-003",
    name: "MIG Welding Machine",
    type: "Welding",
    manufacturer: "ESAB",
    model: "Rebel 315",
    serial: "ESA-25012",
    location: "Fabrication Area",
    purchaseDate: "08 Jan 2024",
    frequency: "Monthly",
    status: "Idle"
  },
  {
    id: "MCH-004",
    name: "Surface Grinding Machine",
    type: "Grinding",
    manufacturer: "Micromatic",
    model: "SGL-200",
    serial: "MIC-22045",
    location: "Production Area A",
    purchaseDate: "11 Nov 2022",
    frequency: "Quarterly",
    status: "Maintenance"
  },
  {
    id: "MCH-005",
    name: "Air Compressor",
    type: "Compressor",
    manufacturer: "Atlas Copco",
    model: "GA-30",
    serial: "ATL-21009",
    location: "Utility Area",
    purchaseDate: "19 May 2021",
    frequency: "Monthly",
    status: "Breakdown"
  }
];

function Machines() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredMachines = useMemo(() => {
    return machineData.filter((machine) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        machine.name.toLowerCase().includes(searchValue) ||
        machine.id.toLowerCase().includes(searchValue) ||
        machine.type.toLowerCase().includes(searchValue) ||
        machine.manufacturer.toLowerCase().includes(searchValue) ||
        machine.location.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || machine.status === statusFilter;

      const matchesType =
        typeFilter === "All" || machine.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  const runningCount = machineData.filter(
    (machine) => machine.status === "Running"
  ).length;

  const idleCount = machineData.filter(
    (machine) => machine.status === "Idle"
  ).length;

  const maintenanceCount = machineData.filter(
    (machine) =>
      machine.status === "Maintenance" ||
      machine.status === "Breakdown"
  ).length;

  return (
    <div className="machines-page">
      <div className="machines-heading">
        <div>
          <div className="module-eyebrow">MASTER DATA / MACHINES</div>
          <h1>Machines</h1>
          <p>Monitor machine details, operating status and maintenance schedules.</p>
        </div>

        <button className="machines-add-button">
          <Plus size={18} />
          Add Machine
        </button>
      </div>

      <div className="machine-summary-grid">
        <div className="machine-summary-card">
          <div className="machine-summary-icon blue">
            <Factory size={21} />
          </div>

          <div>
            <span>Total Machines</span>
            <strong>{machineData.length}</strong>
            <small>Registered machines</small>
          </div>
        </div>

        <div className="machine-summary-card">
          <div className="machine-summary-icon green">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Running</span>
            <strong>{runningCount}</strong>
            <small>Currently operational</small>
          </div>
        </div>

        <div className="machine-summary-card">
          <div className="machine-summary-icon orange">
            <Factory size={21} />
          </div>

          <div>
            <span>Idle</span>
            <strong>{idleCount}</strong>
            <small>Available machines</small>
          </div>
        </div>

        <div className="machine-summary-card">
          <div className="machine-summary-icon red">
            <Wrench size={21} />
          </div>

          <div>
            <span>Maintenance Alert</span>
            <strong>{maintenanceCount}</strong>
            <small>Maintenance or breakdown</small>
          </div>
        </div>
      </div>

      <div className="machines-container">
        <div className="machines-toolbar">
          <div className="machines-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search machine, type, manufacturer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="machine-filter">
            <SlidersHorizontal size={17} />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="CNC Machine">CNC Machine</option>
              <option value="Press Machine">Press Machine</option>
              <option value="Welding">Welding</option>
              <option value="Grinding">Grinding</option>
              <option value="Compressor">Compressor</option>
            </select>
          </div>

          <div className="machine-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Running">Running</option>
              <option value="Idle">Idle</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Breakdown">Breakdown</option>
            </select>
          </div>

          <div className="machine-result-count">
            {filteredMachines.length} machines
          </div>
        </div>

        <div className="machines-table-wrapper">
          <table className="machines-table">
            <thead>
              <tr>
                <th>Machine</th>
                <th>Type</th>
                <th>Manufacturer</th>
                <th>Model / Serial</th>
                <th>Location</th>
                <th>Purchase Date</th>
                <th>Maintenance</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredMachines.map((machine) => (
                <tr key={machine.id}>
                  <td>
                    <div className="machine-main-info">
                      <div className="machine-icon">
                        <Factory size={18} />
                      </div>

                      <div>
                        <strong>{machine.name}</strong>
                        <span>{machine.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="machine-type">
                      {machine.type}
                    </span>
                  </td>

                  <td>
                    <span className="machine-manufacturer">
                      {machine.manufacturer}
                    </span>
                  </td>

                  <td>
                    <div className="machine-model">
                      <strong>{machine.model}</strong>
                      <span>{machine.serial}</span>
                    </div>
                  </td>

                  <td>
                    <div className="machine-location">
                      <MapPin size={14} />
                      {machine.location}
                    </div>
                  </td>

                  <td>
                    <div className="machine-date">
                      <CalendarDays size={14} />
                      {machine.purchaseDate}
                    </div>
                  </td>

                  <td>
                    <span className="machine-frequency">
                      {machine.frequency}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`machine-status ${
                        machine.status === "Running"
                          ? "running"
                          : machine.status === "Idle"
                          ? "idle"
                          : machine.status === "Maintenance"
                          ? "maintenance"
                          : "breakdown"
                      }`}
                    >
                      <span></span>
                      {machine.status}
                    </span>
                  </td>

                  <td>
                    <div className="machine-action-area">
                      <button
                        className="machine-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === machine.id ? null : machine.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === machine.id && (
                        <div className="machine-action-menu">
                          <button>
                            <Eye size={15} />
                            View
                          </button>

                          <button>
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button>
                            <Power size={15} />
                            {machine.status === "Running"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMachines.length === 0 && (
            <div className="machine-empty-state">
              <AlertTriangle size={34} />
              <strong>No machines found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>

        <div className="machines-footer">
          <span>
            Showing {filteredMachines.length} of {machineData.length} machines
          </span>

          <div className="machine-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Machines;