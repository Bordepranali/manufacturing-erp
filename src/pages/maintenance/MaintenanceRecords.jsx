import { useMemo, useState } from "react";
import {
  Wrench,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  Save,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  Clock3
} from "lucide-react";

const initialRecords = [
  {
    id: 1,
    maintenanceNo: "MNT-2026-018",
    machine: "CNC Turning Machine",
    machineCode: "MC-001",
    maintenanceDate: "2026-09-27",
    type: "Preventive",
    problem: "Routine scheduled maintenance",
    workDone: "Lubrication, alignment and cleaning completed",
    technician: "Vikram Shinde",
    sparePart: "Lubricant Oil",
    spareQty: 2,
    cost: 4500,
    downtime: 2.5,
    nextDate: "2026-10-27",
    status: "Completed",
    remarks: "Machine running normally"
  },
  {
    id: 2,
    maintenanceNo: "MNT-2026-017",
    machine: "Hydraulic Press",
    machineCode: "MC-002",
    maintenanceDate: "2026-09-25",
    type: "Breakdown",
    problem: "Hydraulic pressure dropping",
    workDone: "Pressure valve replaced and system tested",
    technician: "Sanjay More",
    sparePart: "Pressure Valve",
    spareQty: 1,
    cost: 8600,
    downtime: 5,
    nextDate: "2026-10-25",
    status: "Completed",
    remarks: "Pressure restored"
  },
  {
    id: 3,
    maintenanceNo: "MNT-2026-016",
    machine: "Gear Hobbing Machine",
    machineCode: "MC-003",
    maintenanceDate: "2026-09-23",
    type: "Repair",
    problem: "Abnormal vibration during operation",
    workDone: "Bearing inspected and replaced",
    technician: "Vikram Shinde",
    sparePart: "Bearing 6205",
    spareQty: 2,
    cost: 6200,
    downtime: 4,
    nextDate: "2026-10-23",
    status: "Completed",
    remarks: ""
  },
  {
    id: 4,
    maintenanceNo: "MNT-2026-015",
    machine: "CNC Milling Machine",
    machineCode: "MC-004",
    maintenanceDate: "2026-09-22",
    type: "Preventive",
    problem: "Scheduled monthly maintenance",
    workDone: "Coolant replacement and spindle inspection",
    technician: "Ramesh Pawar",
    sparePart: "Coolant",
    spareQty: 10,
    cost: 3800,
    downtime: 2,
    nextDate: "2026-10-22",
    status: "Completed",
    remarks: ""
  },
  {
    id: 5,
    maintenanceNo: "MNT-2026-014",
    machine: "Industrial Compressor",
    machineCode: "MC-005",
    maintenanceDate: "2026-09-28",
    type: "Breakdown",
    problem: "Compressor not starting",
    workDone: "Under inspection",
    technician: "Sanjay More",
    sparePart: "Starter Relay",
    spareQty: 1,
    cost: 2500,
    downtime: 3,
    nextDate: "2026-10-28",
    status: "In Progress",
    remarks: "Replacement part ordered"
  },
  {
    id: 6,
    maintenanceNo: "MNT-2026-013",
    machine: "Laser Cutting Machine",
    machineCode: "MC-006",
    maintenanceDate: "2026-09-18",
    type: "Preventive",
    problem: "Scheduled inspection",
    workDone: "Lens cleaning and calibration",
    technician: "Ramesh Pawar",
    sparePart: "Cleaning Kit",
    spareQty: 1,
    cost: 1800,
    downtime: 1.5,
    nextDate: "2026-10-18",
    status: "Completed",
    remarks: ""
  }
];

const machineList = [
  {
    code: "MC-001",
    name: "CNC Turning Machine"
  },
  {
    code: "MC-002",
    name: "Hydraulic Press"
  },
  {
    code: "MC-003",
    name: "Gear Hobbing Machine"
  },
  {
    code: "MC-004",
    name: "CNC Milling Machine"
  },
  {
    code: "MC-005",
    name: "Industrial Compressor"
  },
  {
    code: "MC-006",
    name: "Laser Cutting Machine"
  }
];

function MaintenanceRecords() {
  const [records, setRecords] = useState(initialRecords);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  const [form, setForm] = useState({
    machine: "",
    machineCode: "",
    maintenanceDate: "2026-09-28",
    type: "Preventive",
    problem: "",
    workDone: "",
    technician: "",
    sparePart: "",
    spareQty: "",
    cost: "",
    downtime: "",
    nextDate: "",
    status: "Completed",
    remarks: ""
  });

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const text = search.toLowerCase();

      const matchesSearch =
        item.maintenanceNo.toLowerCase().includes(text) ||
        item.machine.toLowerCase().includes(text) ||
        item.machineCode.toLowerCase().includes(text) ||
        item.technician.toLowerCase().includes(text);

      const matchesType =
        typeFilter === "All" ||
        item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [records, search, typeFilter, statusFilter]);

  const totalCost = records.reduce(
    (sum, item) => sum + Number(item.cost || 0),
    0
  );

  const totalDowntime = records.reduce(
    (sum, item) => sum + Number(item.downtime || 0),
    0
  );

  const completedCount = records.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgressCount = records.filter(
    (item) => item.status === "In Progress"
  ).length;

  const openCreateModal = () => {
    setEditingRecord(null);

    setForm({
      machine: "",
      machineCode: "",
      maintenanceDate: "2026-09-28",
      type: "Preventive",
      problem: "",
      workDone: "",
      technician: "",
      sparePart: "",
      spareQty: "",
      cost: "",
      downtime: "",
      nextDate: "",
      status: "Completed",
      remarks: ""
    });

    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);

    setForm({
      machine: record.machine,
      machineCode: record.machineCode,
      maintenanceDate: record.maintenanceDate,
      type: record.type,
      problem: record.problem,
      workDone: record.workDone,
      technician: record.technician,
      sparePart: record.sparePart,
      spareQty: record.spareQty,
      cost: record.cost,
      downtime: record.downtime,
      nextDate: record.nextDate,
      status: record.status,
      remarks: record.remarks
    });

    setShowModal(true);
  };

  const handleMachineChange = (machineCode) => {
    const machine = machineList.find(
      (item) => item.code === machineCode
    );

    setForm((current) => ({
      ...current,
      machineCode,
      machine: machine?.name || ""
    }));
  };

  const handleSave = () => {
    if (!form.machineCode) {
      alert("Please select a machine.");
      return;
    }

    if (!form.problem.trim()) {
      alert("Please enter the problem or work description.");
      return;
    }

    const record = {
      id: editingRecord
        ? editingRecord.id
        : Date.now(),
      maintenanceNo: editingRecord
        ? editingRecord.maintenanceNo
        : `MNT-2026-${String(records.length + 19).padStart(3, "0")}`,
      machine: form.machine,
      machineCode: form.machineCode,
      maintenanceDate: form.maintenanceDate,
      type: form.type,
      problem: form.problem,
      workDone: form.workDone,
      technician: form.technician,
      sparePart: form.sparePart,
      spareQty: Number(form.spareQty || 0),
      cost: Number(form.cost || 0),
      downtime: Number(form.downtime || 0),
      nextDate: form.nextDate,
      status: form.status,
      remarks: form.remarks
    };

    if (editingRecord) {
      setRecords((current) =>
        current.map((item) =>
          item.id === editingRecord.id
            ? record
            : item
        )
      );
    } else {
      setRecords((current) => [
        record,
        ...current
      ]);
    }

    setShowModal(false);
    setEditingRecord(null);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this maintenance record?"
    );

    if (!confirmed) return;

    setRecords((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="maintenance-page">
      <section className="maintenance-hero">
        <div>
          <span className="maintenance-eyebrow">
            MAINTENANCE
          </span>

          <h1>Maintenance Records</h1>

          <p>
            Track preventive maintenance, breakdowns,
            repairs, spare parts and machine downtime.
          </p>
        </div>

        <button
          className="maintenance-add-button"
          onClick={openCreateModal}
        >
          <Plus size={18} />
          Add Maintenance Record
        </button>
      </section>

      <section className="maintenance-summary-grid">
        <div className="maintenance-summary-card">
          <div className="maintenance-summary-icon">
            <Wrench size={21} />
          </div>

          <div>
            <span>Total Records</span>
            <strong>{records.length}</strong>
          </div>
        </div>

        <div className="maintenance-summary-card">
          <div className="maintenance-summary-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>

        <div className="maintenance-summary-card">
          <div className="maintenance-summary-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressCount}</strong>
          </div>
        </div>

        <div className="maintenance-summary-card">
          <div className="maintenance-summary-icon">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Total Cost</span>
            <strong>{formatCurrency(totalCost)}</strong>
          </div>
        </div>
      </section>

      <section className="maintenance-insight-grid">
        <div className="maintenance-insight-card">
          <div>
            <span>Total Downtime</span>
            <strong>{totalDowntime.toFixed(1)} hrs</strong>
          </div>

          <p>
            Machine downtime recorded across maintenance
            activities.
          </p>
        </div>

        <div className="maintenance-insight-card">
          <div>
            <span>Maintenance Coverage</span>
            <strong>
              {records.length > 0 ? "Active" : "No Data"}
            </strong>
          </div>

          <p>
            Preventive and breakdown maintenance is being
            tracked.
          </p>
        </div>
      </section>

      <section className="maintenance-content-card">
        <div className="maintenance-toolbar">
          <div className="maintenance-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search machine, record or technician..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option value="All">All Types</option>
            <option value="Preventive">Preventive</option>
            <option value="Breakdown">Breakdown</option>
            <option value="Repair">Repair</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        <div className="maintenance-table-header">
          <div>
            <h2>Maintenance History</h2>

            <p>
              Showing {filteredRecords.length} of{" "}
              {records.length} records
            </p>
          </div>

          <div className="maintenance-date-badge">
            <CalendarDays size={16} />
            September 2026
          </div>
        </div>

        <div className="maintenance-table-wrapper">
          <table className="maintenance-table">
            <thead>
              <tr>
                <th>Maintenance No.</th>
                <th>Machine</th>
                <th>Date</th>
                <th>Type</th>
                <th>Technician</th>
                <th>Downtime</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Next Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong className="maintenance-number">
                      {item.maintenanceNo}
                    </strong>
                  </td>

                  <td>
                    <div className="maintenance-machine">
                      <div className="maintenance-machine-icon">
                        <Wrench size={16} />
                      </div>

                      <div>
                        <strong>{item.machine}</strong>
                        <span>{item.machineCode}</span>
                      </div>
                    </div>
                  </td>

                  <td>{item.maintenanceDate}</td>

                  <td>
                    <span
                      className={`maintenance-type ${item.type.toLowerCase()}`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td>{item.technician}</td>

                  <td>{item.downtime} hrs</td>

                  <td>
                    <strong>
                      {formatCurrency(item.cost)}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`maintenance-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.nextDate || "-"}</td>

                  <td>
                    <div className="maintenance-actions">
                      <button
                        title="View"
                        onClick={() =>
                          setSelectedRecord(item)
                        }
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit"
                        onClick={() =>
                          openEditModal(item)
                        }
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    className="maintenance-empty"
                  >
                    No maintenance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div
          className="maintenance-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="maintenance-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="maintenance-modal-header">
              <div>
                <span>
                  {editingRecord
                    ? "Edit Maintenance"
                    : "Machine Maintenance"}
                </span>

                <h2>
                  {editingRecord
                    ? "Update Maintenance Record"
                    : "Add Maintenance Record"}
                </h2>
              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="maintenance-form">
              <div className="maintenance-form-grid">
                <div className="maintenance-field">
                  <label>Machine</label>

                  <select
                    value={form.machineCode}
                    onChange={(event) =>
                      handleMachineChange(
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      Select machine
                    </option>

                    {machineList.map((machine) => (
                      <option
                        key={machine.code}
                        value={machine.code}
                      >
                        {machine.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="maintenance-field">
                  <label>Machine Code</label>

                  <input
                    value={form.machineCode}
                    readOnly
                    placeholder="Auto-filled"
                  />
                </div>

                <div className="maintenance-field">
                  <label>Maintenance Date</label>

                  <input
                    type="date"
                    value={form.maintenanceDate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        maintenanceDate:
                          event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field">
                  <label>Maintenance Type</label>

                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        type: event.target.value
                      }))
                    }
                  >
                    <option>Preventive</option>
                    <option>Breakdown</option>
                    <option>Repair</option>
                  </select>
                </div>

                <div className="maintenance-field">
                  <label>Technician</label>

                  <input
                    placeholder="Technician name"
                    value={form.technician}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        technician:
                          event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field">
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value
                      }))
                    }
                  >
                    <option>Completed</option>
                    <option>In Progress</option>
                  </select>
                </div>

                <div className="maintenance-field full">
                  <label>Problem</label>

                  <textarea
                    rows="3"
                    placeholder="Describe the problem..."
                    value={form.problem}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        problem: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field full">
                  <label>Work Done</label>

                  <textarea
                    rows="3"
                    placeholder="Describe maintenance or repair work..."
                    value={form.workDone}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        workDone:
                          event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field">
                  <label>Spare Part Used</label>

                  <input
                    placeholder="Product / spare part"
                    value={form.sparePart}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        sparePart:
                          event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field">
                  <label>Spare Quantity</label>

                  <input
                    type="number"
                    min="0"
                    value={form.spareQty}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        spareQty:
                          event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field">
                  <label>Maintenance Cost</label>

                  <input
                    type="number"
                    min="0"
                    value={form.cost}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        cost: event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field">
                  <label>Downtime Hours</label>

                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={form.downtime}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        downtime:
                          event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field">
                  <label>Next Maintenance Date</label>

                  <input
                    type="date"
                    value={form.nextDate}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        nextDate:
                          event.target.value
                      }))
                    }
                  />
                </div>

                <div className="maintenance-field full">
                  <label>Remarks</label>

                  <textarea
                    rows="3"
                    placeholder="Additional remarks..."
                    value={form.remarks}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        remarks:
                          event.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="maintenance-modal-footer">
              <button
                className="maintenance-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="maintenance-save-button"
                onClick={handleSave}
              >
                <Save size={17} />

                {editingRecord
                  ? "Update Record"
                  : "Save Record"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRecord && (
        <div
          className="maintenance-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div
            className="maintenance-view-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="maintenance-modal-header">
              <div>
                <span>
                  {selectedRecord.maintenanceNo}
                </span>

                <h2>{selectedRecord.machine}</h2>
              </div>

              <button
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="maintenance-detail-grid">
              <div>
                <span>Machine Code</span>
                <strong>
                  {selectedRecord.machineCode}
                </strong>
              </div>

              <div>
                <span>Maintenance Date</span>
                <strong>
                  {selectedRecord.maintenanceDate}
                </strong>
              </div>

              <div>
                <span>Maintenance Type</span>
                <strong>
                  {selectedRecord.type}
                </strong>
              </div>

              <div>
                <span>Technician</span>
                <strong>
                  {selectedRecord.technician}
                </strong>
              </div>

              <div>
                <span>Spare Part</span>
                <strong>
                  {selectedRecord.sparePart || "-"}
                </strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>
                  {selectedRecord.spareQty || "-"}
                </strong>
              </div>

              <div>
                <span>Cost</span>
                <strong>
                  {formatCurrency(
                    selectedRecord.cost
                  )}
                </strong>
              </div>

              <div>
                <span>Downtime</span>
                <strong>
                  {selectedRecord.downtime} hrs
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedRecord.status}
                </strong>
              </div>

              <div>
                <span>Next Maintenance</span>
                <strong>
                  {selectedRecord.nextDate || "-"}
                </strong>
              </div>

              <div className="maintenance-detail-wide">
                <span>Problem</span>
                <strong>
                  {selectedRecord.problem}
                </strong>
              </div>

              <div className="maintenance-detail-wide">
                <span>Work Done</span>
                <strong>
                  {selectedRecord.workDone || "-"}
                </strong>
              </div>

              <div className="maintenance-detail-wide">
                <span>Remarks</span>
                <strong>
                  {selectedRecord.remarks || "-"}
                </strong>
              </div>
            </div>

            <div className="maintenance-modal-footer">
              <button
                className="maintenance-cancel-button"
                onClick={() =>
                  setSelectedRecord(null)
                }
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

export default MaintenanceRecords;