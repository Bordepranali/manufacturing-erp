import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Package,
  Warehouse,
  AlertTriangle,
  Boxes,
  MoreHorizontal,
  History,
  Layers3,
  X,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
} from "lucide-react";

const stockData = [
  {
    code: "RM-001",
    name: "Steel Sheet",
    type: "Raw Material",
    category: "Steel",
    warehouse: "Main Warehouse",
    current: 2450,
    reserved: 350,
    available: 2100,
    minimum: 500,
    unit: "KG",
    status: "Healthy",
    batch: "ST-SEP26-01",
  },
  {
    code: "RM-002",
    name: "Aluminium Rod",
    type: "Raw Material",
    category: "Metal",
    warehouse: "Raw Material Store",
    current: 380,
    reserved: 120,
    available: 260,
    minimum: 500,
    unit: "KG",
    status: "Low Stock",
    batch: "AL-SEP26-04",
  },
  {
    code: "SF-001",
    name: "Machine Frame",
    type: "Semi-Finished",
    category: "Components",
    warehouse: "Components Store",
    current: 125,
    reserved: 40,
    available: 85,
    minimum: 50,
    unit: "PCS",
    status: "Healthy",
    batch: "MF-SEP26-02",
  },
  {
    code: "FG-001",
    name: "Industrial Pump",
    type: "Finished Product",
    category: "Pumps",
    warehouse: "Finished Goods Store",
    current: 68,
    reserved: 18,
    available: 50,
    minimum: 20,
    unit: "PCS",
    status: "Healthy",
    batch: "IP-SEP26-08",
  },
  {
    code: "RM-003",
    name: "Lubricant Oil",
    type: "Consumable",
    category: "Maintenance",
    warehouse: "Maintenance Store",
    current: 42,
    reserved: 15,
    available: 27,
    minimum: 60,
    unit: "Litre",
    status: "Low Stock",
    batch: "LO-SEP26-03",
  },
  {
    code: "RM-004",
    name: "Industrial Bearing",
    type: "Spare Part",
    category: "Components",
    warehouse: "Main Warehouse",
    current: 185,
    reserved: 35,
    available: 150,
    minimum: 50,
    unit: "PCS",
    status: "Healthy",
    batch: "IB-SEP26-05",
  },
];

const movementData = [
  {
    type: "Stock In",
    quantity: "+500 KG",
    date: "10 Sep 2026",
    reference: "GRN-2026-014",
    icon: ArrowDownRight,
  },
  {
    type: "Stock Out",
    quantity: "-120 KG",
    date: "09 Sep 2026",
    reference: "PROD-2026-021",
    icon: ArrowUpRight,
  },
  {
    type: "Transfer",
    quantity: "300 KG",
    date: "08 Sep 2026",
    reference: "TRF-2026-008",
    icon: ArrowRightLeft,
  },
];

function StockOverview() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [type, setType] = useState("All Types");
  const [warehouse, setWarehouse] = useState("All Warehouses");
  const [selectedStock, setSelectedStock] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const filteredStock = useMemo(() => {
    return stockData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All Categories" || item.category === category;

      const matchesType =
        type === "All Types" || item.type === type;

      const matchesWarehouse =
        warehouse === "All Warehouses" || item.warehouse === warehouse;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesWarehouse
      );
    });
  }, [search, category, type, warehouse]);

  const totalItems = stockData.length;
  const lowStock = stockData.filter((item) => item.status === "Low Stock").length;
  const totalUnits = stockData.reduce((sum, item) => sum + item.current, 0);
  const availableUnits = stockData.reduce(
    (sum, item) => sum + item.available,
    0
  );

  const categories = [
    "All Categories",
    ...new Set(stockData.map((item) => item.category)),
  ];

  const types = [
    "All Types",
    ...new Set(stockData.map((item) => item.type)),
  ];

  const warehouses = [
    "All Warehouses",
    ...new Set(stockData.map((item) => item.warehouse)),
  ];

  return (
    <div className="stock-page">
      <div className="stock-page-header">
        <div>
          <span className="module-eyebrow">INVENTORY MANAGEMENT</span>
          <h1>Stock Overview</h1>
          <p>Monitor current inventory levels across all warehouses.</p>
        </div>

        <div className="stock-header-badge">
          <Boxes size={18} />
          <span>{totalItems} Items Tracked</span>
        </div>
      </div>

      <div className="stock-summary-grid">
        <div className="stock-summary-card">
          <div className="stock-summary-icon blue">
            <Package size={21} />
          </div>
          <div>
            <span>Total Items</span>
            <strong>{totalItems}</strong>
            <small>Active inventory items</small>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon indigo">
            <Boxes size={21} />
          </div>
          <div>
            <span>Total Stock</span>
            <strong>{totalUnits.toLocaleString()}</strong>
            <small>Across all warehouses</small>
          </div>
        </div>

        <div className="stock-summary-card">
          <div className="stock-summary-icon green">
            <Warehouse size={21} />
          </div>
          <div>
            <span>Available Stock</span>
            <strong>{availableUnits.toLocaleString()}</strong>
            <small>Ready for use</small>
          </div>
        </div>

        <div className="stock-summary-card warning-card">
          <div className="stock-summary-icon orange">
            <AlertTriangle size={21} />
          </div>
          <div>
            <span>Low Stock</span>
            <strong>{lowStock}</strong>
            <small>Items need attention</small>
          </div>
        </div>
      </div>

      <div className="stock-container">
        <div className="stock-toolbar">
          <div className="stock-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search product or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="stock-filters">
            <div className="stock-filter">
              <SlidersHorizontal size={16} />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="stock-filter">
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {types.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="stock-filter">
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
              >
                {warehouses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="stock-toolbar-bottom">
          <span>
            Showing <strong>{filteredStock.length}</strong> of{" "}
            <strong>{totalItems}</strong> inventory items
          </span>

          {(search ||
            category !== "All Categories" ||
            type !== "All Types" ||
            warehouse !== "All Warehouses") && (
            <button
              className="clear-stock-filters"
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setType("All Types");
                setWarehouse("All Warehouses");
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="stock-table-wrapper">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Warehouse</th>
                <th>Current Stock</th>
                <th>Reserved / Used</th>
                <th>Available</th>
                <th>Minimum</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredStock.map((item) => {
                const stockPercentage = Math.min(
                  (item.available / item.minimum) * 100,
                  100
                );

                return (
                  <tr key={item.code}>
                    <td>
                      <div className="stock-product">
                        <div className="stock-product-icon">
                          <Package size={18} />
                        </div>
                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.code}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="stock-type">{item.type}</span>
                    </td>

                    <td>
                      <div className="stock-warehouse">
                        <Warehouse size={15} />
                        <span>{item.warehouse}</span>
                      </div>
                    </td>

                    <td>
                      <div className="stock-number">
                        <strong>{item.current.toLocaleString()}</strong>
                        <span>{item.unit}</span>
                      </div>
                    </td>

                    <td>
                      <span className="reserved-value">
                        {item.reserved.toLocaleString()} {item.unit}
                      </span>
                    </td>

                    <td>
                      <div className="available-stock">
                        <strong>{item.available.toLocaleString()}</strong>
                        <div className="available-progress">
                          <span style={{ width: `${stockPercentage}%` }}></span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="minimum-stock">
                        {item.minimum.toLocaleString()} {item.unit}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`stock-status ${
                          item.status === "Low Stock" ? "low" : "healthy"
                        }`}
                      >
                        <span></span>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="stock-action-area">
                        <button
                          className="stock-more-button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === item.code ? null : item.code
                            )
                          }
                        >
                          <MoreHorizontal size={19} />
                        </button>

                        {openMenu === item.code && (
                          <div className="stock-action-menu">
                            <button
                              onClick={() => {
                                setSelectedStock(item);
                                setOpenMenu(null);
                              }}
                            >
                              <History size={15} />
                              View Stock History
                            </button>

                            <button
                              onClick={() => {
                                setSelectedStock(item);
                                setOpenMenu(null);
                              }}
                            >
                              <Layers3 size={15} />
                              View Batch Information
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

          {filteredStock.length === 0 && (
            <div className="stock-empty">
              <Package size={32} />
              <h3>No inventory found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div className="stock-footer">
          <span>Inventory updated today</span>
          <div className="stock-page-number">
            <button className="active">1</button>
          </div>
        </div>
      </div>

      {selectedStock && (
        <div
          className="stock-modal-overlay"
          onClick={() => setSelectedStock(null)}
        >
          <div
            className="stock-history-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="stock-modal-header">
              <div>
                <span className="module-eyebrow">INVENTORY DETAILS</span>
                <h2>{selectedStock.name}</h2>
                <p>{selectedStock.code} · {selectedStock.warehouse}</p>
              </div>

              <button
                className="stock-modal-close"
                onClick={() => setSelectedStock(null)}
              >
                <X size={19} />
              </button>
            </div>

            <div className="stock-detail-grid">
              <div>
                <span>Current Stock</span>
                <strong>
                  {selectedStock.current.toLocaleString()} {selectedStock.unit}
                </strong>
              </div>

              <div>
                <span>Available</span>
                <strong>
                  {selectedStock.available.toLocaleString()}{" "}
                  {selectedStock.unit}
                </strong>
              </div>

              <div>
                <span>Reserved / Used</span>
                <strong>
                  {selectedStock.reserved.toLocaleString()}{" "}
                  {selectedStock.unit}
                </strong>
              </div>

              <div>
                <span>Minimum Stock</span>
                <strong>
                  {selectedStock.minimum.toLocaleString()}{" "}
                  {selectedStock.unit}
                </strong>
              </div>
            </div>

            <div className="stock-batch-box">
              <Layers3 size={18} />
              <div>
                <span>Batch / Lot</span>
                <strong>{selectedStock.batch}</strong>
              </div>
            </div>

            <div className="movement-section">
              <div className="movement-heading">
                <div>
                  <h3>Stock Movement History</h3>
                  <p>Recent inventory transactions</p>
                </div>
              </div>

              <div className="movement-list">
                {movementData.map((movement, index) => {
                  const MovementIcon = movement.icon;

                  return (
                    <div className="movement-item" key={index}>
                      <div className="movement-icon">
                        <MovementIcon size={17} />
                      </div>

                      <div className="movement-info">
                        <strong>{movement.type}</strong>
                        <span>
                          {movement.reference} · {movement.date}
                        </span>
                      </div>

                      <strong className="movement-quantity">
                        {movement.quantity}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockOverview;