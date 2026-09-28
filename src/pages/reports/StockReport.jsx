import { useMemo, useState } from "react";
import { ArrowLeft, Download, Eye, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    code: "RM-001",
    product: "Mild Steel Sheet",
    type: "Raw Material",
    warehouse: "Main Warehouse",
    currentStock: 820,
    reserved: 120,
    available: 700,
    minimumStock: 300,
    status: "Healthy"
  },
  {
    code: "RM-002",
    product: "Stainless Steel Rod",
    type: "Raw Material",
    warehouse: "Raw Material Store",
    currentStock: 210,
    reserved: 60,
    available: 150,
    minimumStock: 200,
    status: "Low Stock"
  },
  {
    code: "RM-003",
    product: "Aluminium Coil",
    type: "Raw Material",
    warehouse: "Main Warehouse",
    currentStock: 460,
    reserved: 80,
    available: 380,
    minimumStock: 250,
    status: "Healthy"
  },
  {
    code: "SFG-001",
    product: "Gear Housing",
    type: "Semi-Finished",
    warehouse: "Production Store",
    currentStock: 145,
    reserved: 35,
    available: 110,
    minimumStock: 100,
    status: "Healthy"
  },
  {
    code: "FG-001",
    product: "Industrial Gearbox",
    type: "Finished Product",
    warehouse: "Finished Goods",
    currentStock: 86,
    reserved: 42,
    available: 44,
    minimumStock: 50,
    status: "Low Stock"
  },
  {
    code: "FG-002",
    product: "Heavy Duty Motor",
    type: "Finished Product",
    warehouse: "Finished Goods",
    currentStock: 124,
    reserved: 28,
    available: 96,
    minimumStock: 60,
    status: "Healthy"
  },
  {
    code: "CON-001",
    product: "Cutting Oil",
    type: "Consumable",
    warehouse: "Maintenance Store",
    currentStock: 72,
    reserved: 10,
    available: 62,
    minimumStock: 40,
    status: "Healthy"
  },
  {
    code: "SP-001",
    product: "Bearing 6205",
    type: "Spare Part",
    warehouse: "Maintenance Store",
    currentStock: 18,
    reserved: 8,
    available: 10,
    minimumStock: 25,
    status: "Low Stock"
  }
];

function StockReport() {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      const matchesWarehouse =
        warehouseFilter === "All" || item.warehouse === warehouseFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesWarehouse &&
        matchesStatus
      );
    });
  }, [data, search, typeFilter, warehouseFilter, statusFilter]);

  const totalStock = filteredData.reduce(
    (sum, item) => sum + item.currentStock,
    0
  );

  const totalAvailable = filteredData.reduce(
    (sum, item) => sum + item.available,
    0
  );

  const lowStockCount = filteredData.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const totalReserved = filteredData.reduce(
    (sum, item) => sum + item.reserved,
    0
  );

  const deleteItem = (code) => {
    if (window.confirm("Are you sure you want to delete this stock record?")) {
      setData((current) =>
        current.filter((item) => item.code !== code)
      );
    }
  };

  const exportReport = () => {
    const headers = [
      "Product Code",
      "Product Name",
      "Type",
      "Warehouse",
      "Current Stock",
      "Reserved / Used",
      "Available Stock",
      "Minimum Stock",
      "Status"
    ];

    const rows = filteredData.map((item) => [
      item.code,
      item.product,
      item.type,
      item.warehouse,
      item.currentStock,
      item.reserved,
      item.available,
      item.minimumStock,
      item.status
    ]);

    const csv = [
      headers,
      ...rows
    ]
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
    link.download = "Stock_Report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="stock-report-page">
      <section className="stock-report-hero">
        <div>
          <button
            className="stock-report-back"
            onClick={() => navigate("/reports")}
          >
            <ArrowLeft size={17} />
            Back to Reports
          </button>

          <span className="stock-report-eyebrow">
            INVENTORY ANALYTICS
          </span>

          <h1>Stock Report</h1>

          <p>
            Monitor current inventory, reserved quantities,
            available stock and low-stock items across warehouses.
          </p>
        </div>

        <button
          className="stock-report-export"
          onClick={exportReport}
        >
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="stock-report-summary">
        <div className="stock-report-summary-card">
          <span>Total Stock</span>
          <strong>{totalStock.toLocaleString()}</strong>
          <small>Units in filtered records</small>
        </div>

        <div className="stock-report-summary-card">
          <span>Available Stock</span>
          <strong>{totalAvailable.toLocaleString()}</strong>
          <small>Ready for use or dispatch</small>
        </div>

        <div className="stock-report-summary-card warning">
          <span>Low Stock Items</span>
          <strong>{lowStockCount}</strong>
          <small>Items below minimum level</small>
        </div>

        <div className="stock-report-summary-card">
          <span>Reserved / Used</span>
          <strong>{totalReserved.toLocaleString()}</strong>
          <small>Allocated inventory</small>
        </div>
      </section>

      <section className="stock-report-panel">
        <div className="stock-report-filter-header">
          <div>
            <h2>Inventory Stock</h2>
            <span>
              {filteredData.length} records found
            </span>
          </div>
        </div>

        <div className="stock-report-filters">
          <div className="stock-report-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search product or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Raw Material">Raw Material</option>
            <option value="Semi-Finished">Semi-Finished</option>
            <option value="Finished Product">Finished Product</option>
            <option value="Consumable">Consumable</option>
            <option value="Spare Part">Spare Part</option>
          </select>

          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
          >
            <option value="All">All Warehouses</option>
            <option value="Main Warehouse">Main Warehouse</option>
            <option value="Raw Material Store">Raw Material Store</option>
            <option value="Production Store">Production Store</option>
            <option value="Finished Goods">Finished Goods</option>
            <option value="Maintenance Store">Maintenance Store</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Low Stock">Low Stock</option>
          </select>
        </div>

        <div className="stock-report-table-wrapper">
          <table className="stock-report-table">
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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.code}>
                  <td>
                    <div className="stock-product-cell">
                      <div className="stock-product-icon">
                        {item.product.charAt(0)}
                      </div>

                      <div>
                        <strong>{item.product}</strong>
                        <span>{item.code}</span>
                      </div>
                    </div>
                  </td>

                  <td>{item.type}</td>

                  <td>{item.warehouse}</td>

                  <td>
                    <strong>{item.currentStock}</strong>
                  </td>

                  <td>{item.reserved}</td>

                  <td>
                    <strong>{item.available}</strong>
                  </td>

                  <td>{item.minimumStock}</td>

                  <td>
                    <span
                      className={`stock-report-status ${
                        item.status === "Low Stock"
                          ? "low"
                          : "healthy"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="stock-report-actions">
                      <button
                        onClick={() => setSelectedItem(item)}
                        title="View"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => deleteItem(item.code)}
                        title="Delete"
                        className="danger"
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
                    <div className="stock-report-empty">
                      No stock records found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedItem && (
        <div
          className="stock-report-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="stock-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="stock-report-modal-header">
              <div>
                <span>STOCK DETAILS</span>
                <h2>{selectedItem.product}</h2>
              </div>

              <button onClick={() => setSelectedItem(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="stock-report-detail-grid">
              <div>
                <span>Product Code</span>
                <strong>{selectedItem.code}</strong>
              </div>

              <div>
                <span>Type</span>
                <strong>{selectedItem.type}</strong>
              </div>

              <div>
                <span>Warehouse</span>
                <strong>{selectedItem.warehouse}</strong>
              </div>

              <div>
                <span>Current Stock</span>
                <strong>{selectedItem.currentStock}</strong>
              </div>

              <div>
                <span>Reserved / Used</span>
                <strong>{selectedItem.reserved}</strong>
              </div>

              <div>
                <span>Available Stock</span>
                <strong>{selectedItem.available}</strong>
              </div>

              <div>
                <span>Minimum Stock</span>
                <strong>{selectedItem.minimumStock}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{selectedItem.status}</strong>
              </div>
            </div>

            <button
              className="stock-report-close"
              onClick={() => setSelectedItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockReport;