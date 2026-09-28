import { useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  SlidersHorizontal,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  X,
  Package,
  Warehouse,
  ClipboardList,
  Boxes,
} from "lucide-react";

const movementData = [
  {
    id: "MOV-2026-021",
    date: "10 Sep 2026",
    type: "Stock In",
    product: "Steel Sheet",
    code: "RM-001",
    quantity: 500,
    unit: "KG",
    from: "Supplier",
    to: "Main Warehouse",
    batch: "ST-SEP26-01",
    reference: "GRN-2026-014",
    reason: "Purchase receipt",
  },
  {
    id: "MOV-2026-020",
    date: "09 Sep 2026",
    type: "Stock Out",
    product: "Steel Sheet",
    code: "RM-001",
    quantity: 120,
    unit: "KG",
    from: "Main Warehouse",
    to: "Production",
    batch: "ST-SEP26-01",
    reference: "PROD-2026-021",
    reason: "Production consumption",
  },
  {
    id: "MOV-2026-019",
    date: "09 Sep 2026",
    type: "Transfer",
    product: "Aluminium Rod",
    code: "RM-002",
    quantity: 150,
    unit: "KG",
    from: "Raw Material Store",
    to: "Main Warehouse",
    batch: "AL-SEP26-04",
    reference: "TRF-2026-008",
    reason: "Warehouse transfer",
  },
  {
    id: "MOV-2026-018",
    date: "08 Sep 2026",
    type: "Adjustment",
    product: "Lubricant Oil",
    code: "RM-003",
    quantity: 5,
    unit: "Litre",
    from: "Maintenance Store",
    to: "Maintenance Store",
    batch: "LO-SEP26-03",
    reference: "ADJ-2026-004",
    reason: "Physical stock correction",
  },
  {
    id: "MOV-2026-017",
    date: "08 Sep 2026",
    type: "Stock In",
    product: "Industrial Bearing",
    code: "RM-004",
    quantity: 100,
    unit: "PCS",
    from: "Supplier",
    to: "Main Warehouse",
    batch: "IB-SEP26-05",
    reference: "GRN-2026-012",
    reason: "Purchase receipt",
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
];

function StockMovement() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");
  const [showForm, setShowForm] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [form, setForm] = useState({
    movementType: "Stock In",
    product: "",
    quantity: "",
    unit: "",
    fromWarehouse: "",
    toWarehouse: "",
    batch: "",
    reason: "",
    reference: "",
  });

  const filteredMovements = useMemo(() => {
    return movementData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All Types" || item.type === typeFilter;

      const matchesWarehouse =
        warehouseFilter === "All Warehouses" ||
        item.from === warehouseFilter ||
        item.to === warehouseFilter;

      return matchesSearch && matchesType && matchesWarehouse;
    });
  }, [search, typeFilter, warehouseFilter]);

  const updateProduct = (value) => {
    const product = products.find((item) => item.name === value);

    setForm((prev) => ({
      ...prev,
      product: value,
      unit: product?.unit || "",
    }));
  };

  const handleSave = () => {
    if (
      !form.product ||
      !form.quantity ||
      !form.reason ||
      !form.fromWarehouse ||
      !form.toWarehouse
    ) {
      window.alert("Please fill all required fields.");
      return;
    }

    window.alert("Stock movement added successfully.");
    setShowForm(false);

    setForm({
      movementType: "Stock In",
      product: "",
      quantity: "",
      unit: "",
      fromWarehouse: "",
      toWarehouse: "",
      batch: "",
      reason: "",
      reference: "",
    });
  };

  const movementIcon = (type) => {
    if (type === "Stock In") return ArrowDownToLine;
    if (type === "Stock Out") return ArrowUpFromLine;
    if (type === "Transfer") return ArrowRightLeft;
    return SlidersHorizontal;
  };

  const stockInCount = movementData.filter(
    (item) => item.type === "Stock In"
  ).length;

  const stockOutCount = movementData.filter(
    (item) => item.type === "Stock Out"
  ).length;

  const transferCount = movementData.filter(
    (item) => item.type === "Transfer"
  ).length;

  return (
    <div className="movement-page">
      <div className="movement-page-header">
        <div>
          <span className="module-eyebrow">INVENTORY MANAGEMENT</span>
          <h1>Stock Movement</h1>
          <p>Track every stock-in, stock-out, transfer and adjustment.</p>
        </div>

        <button
          className="movement-add-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Movement
        </button>
      </div>

      <div className="movement-summary-grid">
        <div className="movement-summary-card">
          <div className="movement-summary-icon blue">
            <Boxes size={21} />
          </div>
          <div>
            <span>Total Movements</span>
            <strong>{movementData.length}</strong>
            <small>Recorded transactions</small>
          </div>
        </div>

        <div className="movement-summary-card">
          <div className="movement-summary-icon green">
            <ArrowDownToLine size={21} />
          </div>
          <div>
            <span>Stock In</span>
            <strong>{stockInCount}</strong>
            <small>Incoming movements</small>
          </div>
        </div>

        <div className="movement-summary-card">
          <div className="movement-summary-icon orange">
            <ArrowUpFromLine size={21} />
          </div>
          <div>
            <span>Stock Out</span>
            <strong>{stockOutCount}</strong>
            <small>Outgoing movements</small>
          </div>
        </div>

        <div className="movement-summary-card">
          <div className="movement-summary-icon purple">
            <ArrowRightLeft size={21} />
          </div>
          <div>
            <span>Transfers</span>
            <strong>{transferCount}</strong>
            <small>Warehouse transfers</small>
          </div>
        </div>
      </div>

      <div className="movement-container">
        <div className="movement-toolbar">
          <div className="movement-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search movement, product or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="movement-filters">
            <div className="movement-filter">
              <SlidersHorizontal size={16} />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option>All Types</option>
                <option>Stock In</option>
                <option>Stock Out</option>
                <option>Transfer</option>
                <option>Adjustment</option>
              </select>
            </div>

            <div className="movement-filter">
              <Warehouse size={15} />
              <select
                value={warehouseFilter}
                onChange={(e) => setWarehouseFilter(e.target.value)}
              >
                <option>All Warehouses</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse}>{warehouse}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="movement-result-bar">
          <span>
            Showing <strong>{filteredMovements.length}</strong> movements
          </span>
        </div>

        <div className="movement-table-wrapper">
          <table className="movement-table">
            <thead>
              <tr>
                <th>Movement</th>
                <th>Type</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>From</th>
                <th>To</th>
                <th>Reference</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredMovements.map((item) => {
                const Icon = movementIcon(item.type);

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="movement-id">
                        <div className="movement-id-icon">
                          <ClipboardList size={17} />
                        </div>
                        <div>
                          <strong>{item.id}</strong>
                          <span>{item.reason}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`movement-type movement-${item.type
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        <Icon size={13} />
                        {item.type}
                      </span>
                    </td>

                    <td>
                      <div className="movement-product">
                        <strong>{item.product}</strong>
                        <span>{item.code}</span>
                      </div>
                    </td>

                    <td>
                      <div className="movement-quantity">
                        <strong>{item.quantity.toLocaleString()}</strong>
                        <span>{item.unit}</span>
                      </div>
                    </td>

                    <td>
                      <span className="movement-location">{item.from}</span>
                    </td>

                    <td>
                      <span className="movement-location">{item.to}</span>
                    </td>

                    <td>
                      <span className="movement-reference">
                        {item.reference}
                      </span>
                    </td>

                    <td>
                      <span className="movement-date">{item.date}</span>
                    </td>

                    <td>
                      <div className="movement-action-area">
                        <button
                          className="movement-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.id ? null : item.id
                            )
                          }
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === item.id && (
                          <div className="movement-action-menu">
                            <button
                              onClick={() => {
                                setSelectedMovement(item);
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
                );
              })}
            </tbody>
          </table>

          {filteredMovements.length === 0 && (
            <div className="movement-empty">
              <ClipboardList size={32} />
              <h3>No movements found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div className="movement-footer">
          <span>Latest inventory activity</span>
          <button className="movement-page-number">1</button>
        </div>
      </div>

      {showForm && (
        <div className="movement-modal-overlay">
          <div className="movement-form-modal">
            <div className="movement-modal-header">
              <div>
                <span className="module-eyebrow">INVENTORY TRANSACTION</span>
                <h2>Add Stock Movement</h2>
                <p>Record a new inventory movement.</p>
              </div>

              <button
                className="movement-close-button"
                onClick={() => setShowForm(false)}
              >
                <X size={19} />
              </button>
            </div>

            <div className="movement-form-grid">
              <div className="movement-form-field">
                <label>Movement Type *</label>
                <select
                  value={form.movementType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      movementType: e.target.value,
                    })
                  }
                >
                  <option>Stock In</option>
                  <option>Stock Out</option>
                  <option>Transfer</option>
                  <option>Adjustment</option>
                </select>
              </div>

              <div className="movement-form-field">
                <label>Product *</label>
                <select
                  value={form.product}
                  onChange={(e) => updateProduct(e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map((product) => (
                    <option key={product.code}>{product.name}</option>
                  ))}
                </select>
              </div>

              <div className="movement-form-field">
                <label>Quantity *</label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>

              <div className="movement-form-field">
                <label>Unit</label>
                <input
                  value={form.unit}
                  placeholder="Auto-filled"
                  readOnly
                />
              </div>

              <div className="movement-form-field">
                <label>From Warehouse *</label>
                <select
                  value={form.fromWarehouse}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fromWarehouse: e.target.value,
                    })
                  }
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse}>{warehouse}</option>
                  ))}
                </select>
              </div>

              <div className="movement-form-field">
                <label>To Warehouse *</label>
                <select
                  value={form.toWarehouse}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      toWarehouse: e.target.value,
                    })
                  }
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse}>{warehouse}</option>
                  ))}
                </select>
              </div>

              <div className="movement-form-field">
                <label>Batch Number</label>
                <input
                  placeholder="Enter batch / lot number"
                  value={form.batch}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      batch: e.target.value,
                    })
                  }
                />
              </div>

              <div className="movement-form-field">
                <label>Reference</label>
                <input
                  placeholder="PO / Production / Sales Order"
                  value={form.reference}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      reference: e.target.value,
                    })
                  }
                />
              </div>

              <div className="movement-form-field full">
                <label>Reason *</label>
                <textarea
                  placeholder="Enter reason for stock movement"
                  value={form.reason}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      reason: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="movement-form-actions">
              <button
                className="movement-cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="movement-save-button"
                onClick={handleSave}
              >
                <Plus size={16} />
                Save Movement
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedMovement && (
        <div
          className="movement-modal-overlay"
          onClick={() => setSelectedMovement(null)}
        >
          <div
            className="movement-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="movement-modal-header">
              <div>
                <span className="module-eyebrow">MOVEMENT DETAILS</span>
                <h2>{selectedMovement.id}</h2>
                <p>{selectedMovement.date}</p>
              </div>

              <button
                className="movement-close-button"
                onClick={() => setSelectedMovement(null)}
              >
                <X size={19} />
              </button>
            </div>

            <div className="movement-detail-product">
              <div className="movement-detail-icon">
                <Package size={22} />
              </div>
              <div>
                <strong>{selectedMovement.product}</strong>
                <span>{selectedMovement.code}</span>
              </div>
            </div>

            <div className="movement-detail-grid">
              <div>
                <span>Movement Type</span>
                <strong>{selectedMovement.type}</strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>
                  {selectedMovement.quantity} {selectedMovement.unit}
                </strong>
              </div>

              <div>
                <span>From</span>
                <strong>{selectedMovement.from}</strong>
              </div>

              <div>
                <span>To</span>
                <strong>{selectedMovement.to}</strong>
              </div>

              <div>
                <span>Batch Number</span>
                <strong>{selectedMovement.batch}</strong>
              </div>

              <div>
                <span>Reference</span>
                <strong>{selectedMovement.reference}</strong>
              </div>
            </div>

            <div className="movement-reason-box">
              <span>Reason</span>
              <strong>{selectedMovement.reason}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockMovement;