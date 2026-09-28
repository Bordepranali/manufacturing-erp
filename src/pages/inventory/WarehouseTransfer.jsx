import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  X,
  Package,
  Warehouse,
  CalendarDays,
  Boxes,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

const transferData = [
  {
    id: "TRF-2026-008",
    date: "09 Sep 2026",
    from: "Raw Material Store",
    to: "Main Warehouse",
    product: "Aluminium Rod",
    code: "RM-002",
    quantity: 150,
    unit: "KG",
    batch: "AL-SEP26-04",
    status: "Completed",
  },
  {
    id: "TRF-2026-007",
    date: "08 Sep 2026",
    from: "Main Warehouse",
    to: "Components Store",
    product: "Steel Sheet",
    code: "RM-001",
    quantity: 300,
    unit: "KG",
    batch: "ST-SEP26-01",
    status: "Completed",
  },
  {
    id: "TRF-2026-006",
    date: "07 Sep 2026",
    from: "Components Store",
    to: "Production Floor",
    product: "Machine Frame",
    code: "SF-001",
    quantity: 25,
    unit: "PCS",
    batch: "MF-SEP26-02",
    status: "In Transit",
  },
  {
    id: "TRF-2026-005",
    date: "06 Sep 2026",
    from: "Main Warehouse",
    to: "Maintenance Store",
    product: "Industrial Bearing",
    code: "RM-004",
    quantity: 20,
    unit: "PCS",
    batch: "IB-SEP26-05",
    status: "Completed",
  },
  {
    id: "TRF-2026-004",
    date: "05 Sep 2026",
    from: "Finished Goods Store",
    to: "Main Warehouse",
    product: "Industrial Pump",
    code: "FG-001",
    quantity: 10,
    unit: "PCS",
    batch: "IP-SEP26-08",
    status: "Pending",
  },
];

const products = [
  { name: "Steel Sheet", code: "RM-001", unit: "KG" },
  { name: "Aluminium Rod", code: "RM-002", unit: "KG" },
  { name: "Machine Frame", code: "SF-001", unit: "PCS" },
  { name: "Industrial Pump", code: "FG-001", unit: "PCS" },
  { name: "Lubricant Oil", code: "RM-003", unit: "Litre" },
  { name: "Industrial Bearing", code: "RM-004", unit: "PCS" },
];

const warehouses = [
  "Main Warehouse",
  "Raw Material Store",
  "Components Store",
  "Finished Goods Store",
  "Maintenance Store",
  "Production Floor",
];

function WarehouseTransfer() {
  const [transfers, setTransfers] = useState(transferData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [form, setForm] = useState({
    date: "11 Sep 2026",
    from: "",
    to: "",
    product: "",
    quantity: "",
    unit: "",
    batch: "",
    remarks: "",
  });

  const filteredTransfers = useMemo(() => {
    return transfers.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.from.toLowerCase().includes(search.toLowerCase()) ||
        item.to.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [transfers, search, statusFilter]);

  const summary = {
    total: transfers.length,
    completed: transfers.filter((item) => item.status === "Completed").length,
    transit: transfers.filter((item) => item.status === "In Transit").length,
    pending: transfers.filter((item) => item.status === "Pending").length,
  };

  const handleProductChange = (value) => {
    const product = products.find((item) => item.name === value);

    setForm({
      ...form,
      product: value,
      unit: product?.unit || "",
    });
  };

  const handleCreateTransfer = () => {
    if (
      !form.from ||
      !form.to ||
      !form.product ||
      !form.quantity ||
      !form.batch
    ) {
      window.alert("Please fill all required fields.");
      return;
    }

    if (form.from === form.to) {
      window.alert("From Warehouse and To Warehouse must be different.");
      return;
    }

    const product = products.find((item) => item.name === form.product);

    const newTransfer = {
      id: `TRF-2026-${String(transfers.length + 9).padStart(3, "0")}`,
      date: form.date,
      from: form.from,
      to: form.to,
      product: form.product,
      code: product?.code || "",
      quantity: Number(form.quantity),
      unit: form.unit,
      batch: form.batch,
      status: "Pending",
      remarks: form.remarks,
    };

    setTransfers([newTransfer, ...transfers]);
    setShowModal(false);
    setForm({
      date: "11 Sep 2026",
      from: "",
      to: "",
      product: "",
      quantity: "",
      unit: "",
      batch: "",
      remarks: "",
    });

    window.alert("Warehouse transfer created successfully.");
  };

  return (
    <div className="transfer-page">
      <div className="transfer-heading">
        <div>
          <div className="module-eyebrow">INVENTORY MANAGEMENT</div>
          <h1>Warehouse Transfer</h1>
          <p>Move products and materials between warehouses.</p>
        </div>

        <button
          className="transfer-add-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          New Transfer
        </button>
      </div>

      <div className="transfer-summary-grid">
        <div className="transfer-summary-card">
          <div className="transfer-summary-icon blue">
            <ArrowRightLeft size={21} />
          </div>
          <div>
            <span>Total Transfers</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="transfer-summary-card">
          <div className="transfer-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{summary.completed}</strong>
          </div>
        </div>

        <div className="transfer-summary-card">
          <div className="transfer-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>In Transit</span>
            <strong>{summary.transit}</strong>
          </div>
        </div>

        <div className="transfer-summary-card">
          <div className="transfer-summary-icon red">
            <AlertCircle size={21} />
          </div>
          <div>
            <span>Pending</span>
            <strong>{summary.pending}</strong>
          </div>
        </div>
      </div>

      <div className="transfer-container">
        <div className="transfer-toolbar">
          <div className="transfer-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search transfer, product or warehouse..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="transfer-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Transit">In Transit</option>
            <option value="Pending">Pending</option>
          </select>

          <span className="transfer-result-count">
            {filteredTransfers.length} transfers
          </span>
        </div>

        <div className="transfer-table-wrapper">
          <table className="transfer-table">
            <thead>
              <tr>
                <th>Transfer</th>
                <th>Product</th>
                <th>From Warehouse</th>
                <th>To Warehouse</th>
                <th>Quantity</th>
                <th>Batch</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredTransfers.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="transfer-id">
                      <div className="transfer-id-icon">
                        <ArrowRightLeft size={16} />
                      </div>
                      <div>
                        <strong>{item.id}</strong>
                        <span>{item.code}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="transfer-product">
                      <div className="transfer-product-icon">
                        <Package size={17} />
                      </div>
                      <div>
                        <strong>{item.product}</strong>
                        <span>{item.unit}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="transfer-warehouse">
                      <Warehouse size={15} />
                      <span>{item.from}</span>
                    </div>
                  </td>

                  <td>
                    <div className="transfer-warehouse">
                      <Warehouse size={15} />
                      <span>{item.to}</span>
                    </div>
                  </td>

                  <td>
                    <strong>
                      {item.quantity.toLocaleString()} {item.unit}
                    </strong>
                  </td>

                  <td>
                    <span className="transfer-batch">{item.batch}</span>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <span
                      className={`transfer-status ${item.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="transfer-action-area">
                      <button
                        className="transfer-more-button"
                        onClick={() =>
                          setOpenMenu(openMenu === item.id ? null : item.id)
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === item.id && (
                        <div className="transfer-action-menu">
                          <button
                            onClick={() => {
                              setSelectedTransfer(item);
                              setOpenMenu(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTransfers.length === 0 && (
            <div className="transfer-empty-state">
              <Boxes size={32} />
              <h3>No transfers found</h3>
              <p>Try changing your search or status filter.</p>
            </div>
          )}
        </div>

        <div className="transfer-footer">
          Showing {filteredTransfers.length} of {transfers.length} transfers
        </div>
      </div>

      {showModal && (
        <div
          className="transfer-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="transfer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="transfer-modal-header">
              <div>
                <span>INVENTORY</span>
                <h2>Create Warehouse Transfer</h2>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="transfer-form">
              <div className="transfer-form-row">
                <div className="transfer-field">
                  <label>Transfer Number</label>
                  <input
                    type="text"
                    value={`TRF-2026-${String(transfers.length + 9).padStart(
                      3,
                      "0"
                    )}`}
                    readOnly
                  />
                </div>

                <div className="transfer-field">
                  <label>Date *</label>
                  <div className="transfer-input-icon">
                    <CalendarDays size={17} />
                    <input
                      type="text"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="transfer-form-row">
                <div className="transfer-field">
                  <label>From Warehouse *</label>
                  <select
                    value={form.from}
                    onChange={(e) =>
                      setForm({ ...form, from: e.target.value })
                    }
                  >
                    <option value="">Select warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse} value={warehouse}>
                        {warehouse}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="transfer-field">
                  <label>To Warehouse *</label>
                  <select
                    value={form.to}
                    onChange={(e) =>
                      setForm({ ...form, to: e.target.value })
                    }
                  >
                    <option value="">Select warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse} value={warehouse}>
                        {warehouse}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="transfer-form-row">
                <div className="transfer-field">
                  <label>Product / Material *</label>
                  <select
                    value={form.product}
                    onChange={(e) => handleProductChange(e.target.value)}
                  >
                    <option value="">Search or select product</option>
                    {products.map((product) => (
                      <option key={product.code} value={product.name}>
                        {product.name} ({product.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="transfer-field">
                  <label>Quantity *</label>
                  <div className="quantity-unit-group">
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      value={form.quantity}
                      onChange={(e) =>
                        setForm({ ...form, quantity: e.target.value })
                      }
                    />
                    <input type="text" value={form.unit} placeholder="Unit" readOnly />
                  </div>
                </div>
              </div>

              <div className="transfer-field">
                <label>Batch Number *</label>
                <input
                  type="text"
                  placeholder="Enter batch / lot number"
                  value={form.batch}
                  onChange={(e) =>
                    setForm({ ...form, batch: e.target.value })
                  }
                />
              </div>

              <div className="transfer-field">
                <label>Remarks</label>
                <textarea
                  rows="4"
                  placeholder="Add transfer remarks..."
                  value={form.remarks}
                  onChange={(e) =>
                    setForm({ ...form, remarks: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="transfer-modal-footer">
              <button
                className="transfer-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="transfer-create-button"
                onClick={handleCreateTransfer}
              >
                <ArrowRightLeft size={17} />
                Create Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTransfer && (
        <div
          className="transfer-modal-overlay"
          onClick={() => setSelectedTransfer(null)}
        >
          <div
            className="transfer-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="transfer-modal-header">
              <div>
                <span>TRANSFER DETAILS</span>
                <h2>{selectedTransfer.id}</h2>
              </div>

              <button onClick={() => setSelectedTransfer(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="transfer-details-grid">
              <div>
                <span>Product</span>
                <strong>{selectedTransfer.product}</strong>
              </div>

              <div>
                <span>Product Code</span>
                <strong>{selectedTransfer.code}</strong>
              </div>

              <div>
                <span>From Warehouse</span>
                <strong>{selectedTransfer.from}</strong>
              </div>

              <div>
                <span>To Warehouse</span>
                <strong>{selectedTransfer.to}</strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>
                  {selectedTransfer.quantity.toLocaleString()}{" "}
                  {selectedTransfer.unit}
                </strong>
              </div>

              <div>
                <span>Batch Number</span>
                <strong>{selectedTransfer.batch}</strong>
              </div>

              <div>
                <span>Transfer Date</span>
                <strong>{selectedTransfer.date}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedTransfer.status}</strong>
              </div>
            </div>

            <div className="transfer-route">
              <div>
                <Warehouse size={17} />
                <span>{selectedTransfer.from}</span>
              </div>
              <ArrowRightLeft size={20} />
              <div>
                <Warehouse size={17} />
                <span>{selectedTransfer.to}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WarehouseTransfer;