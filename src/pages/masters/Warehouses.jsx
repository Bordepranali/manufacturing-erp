import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  Power,
  Warehouse,
  CheckCircle2,
  Package,
  MapPin,
  UserRound
} from "lucide-react";

const warehouseData = [
  {
    id: "WH-001",
    name: "Main Raw Material Store",
    location: "Loni",
    manager: "Rajesh Kumar",
    type: "Raw Material",
    capacity: "10,000 KG",
    items: 128,
    status: "Active"
  },
  {
    id: "WH-002",
    name: "Finished Goods Warehouse",
    location: "Pune",
    manager: "Sneha Patil",
    type: "Finished Goods",
    capacity: "6,000 PCS",
    items: 86,
    status: "Active"
  },
  {
    id: "WH-003",
    name: "Component Store",
    location: "Nashik",
    manager: "Amit Kulkarni",
    type: "Components",
    capacity: "4,500 PCS",
    items: 64,
    status: "Active"
  },
  {
    id: "WH-004",
    name: "Packaging Store",
    location: "Ahmednagar",
    manager: "Priya Joshi",
    type: "Packaging",
    capacity: "3,000 BOX",
    items: 42,
    status: "Active"
  },
  {
    id: "WH-005",
    name: "Maintenance Store",
    location: "Loni",
    manager: "Vikram Shinde",
    type: "Spare Parts",
    capacity: "2,000 PCS",
    items: 31,
    status: "Inactive"
  }
];

function Warehouses() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredWarehouses = useMemo(() => {
    return warehouseData.filter((warehouse) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        warehouse.name.toLowerCase().includes(searchValue) ||
        warehouse.id.toLowerCase().includes(searchValue) ||
        warehouse.location.toLowerCase().includes(searchValue) ||
        warehouse.manager.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || warehouse.status === statusFilter;

      const matchesType =
        typeFilter === "All" || warehouse.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  const activeCount = warehouseData.filter(
    (warehouse) => warehouse.status === "Active"
  ).length;

  const inactiveCount = warehouseData.filter(
    (warehouse) => warehouse.status === "Inactive"
  ).length;

  const totalItems = warehouseData.reduce(
    (total, warehouse) => total + warehouse.items,
    0
  );

  return (
    <div className="warehouses-page">
      <div className="warehouses-heading">
        <div>
          <div className="module-eyebrow">MASTER DATA / WAREHOUSES</div>
          <h1>Warehouses</h1>
          <p>Manage storage locations, warehouse capacity and inventory areas.</p>
        </div>

        <button className="warehouses-add-button">
          <Plus size={18} />
          Add Warehouse
        </button>
      </div>

      <div className="warehouse-summary-grid">
        <div className="warehouse-summary-card">
          <div className="warehouse-summary-icon blue">
            <Warehouse size={21} />
          </div>
          <div>
            <span>Total Warehouses</span>
            <strong>{warehouseData.length}</strong>
            <small>Registered storage locations</small>
          </div>
        </div>

        <div className="warehouse-summary-card">
          <div className="warehouse-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Active Warehouses</span>
            <strong>{activeCount}</strong>
            <small>Currently operational</small>
          </div>
        </div>

        <div className="warehouse-summary-card">
          <div className="warehouse-summary-icon orange">
            <Package size={21} />
          </div>
          <div>
            <span>Total Items</span>
            <strong>{totalItems}</strong>
            <small>Items across warehouses</small>
          </div>
        </div>

        <div className="warehouse-summary-card">
          <div className="warehouse-summary-icon violet">
            <Warehouse size={21} />
          </div>
          <div>
            <span>Inactive</span>
            <strong>{inactiveCount}</strong>
            <small>Currently inactive</small>
          </div>
        </div>
      </div>

      <div className="warehouses-container">
        <div className="warehouses-toolbar">
          <div className="warehouses-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search warehouse, location or manager..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="warehouse-filter">
            <SlidersHorizontal size={17} />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Raw Material">Raw Material</option>
              <option value="Finished Goods">Finished Goods</option>
              <option value="Components">Components</option>
              <option value="Packaging">Packaging</option>
              <option value="Spare Parts">Spare Parts</option>
            </select>
          </div>

          <div className="warehouse-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="warehouse-result-count">
            {filteredWarehouses.length} warehouses
          </div>
        </div>

        <div className="warehouses-table-wrapper">
          <table className="warehouses-table">
            <thead>
              <tr>
                <th>Warehouse</th>
                <th>Type</th>
                <th>Location</th>
                <th>Manager</th>
                <th>Capacity</th>
                <th>Items</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredWarehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>
                    <div className="warehouse-main-info">
                      <div className="warehouse-icon">
                        <Warehouse size={18} />
                      </div>

                      <div>
                        <strong>{warehouse.name}</strong>
                        <span>{warehouse.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="warehouse-type">
                      {warehouse.type}
                    </span>
                  </td>

                  <td>
                    <div className="warehouse-location">
                      <MapPin size={14} />
                      {warehouse.location}
                    </div>
                  </td>

                  <td>
                    <div className="warehouse-manager">
                      <UserRound size={14} />
                      {warehouse.manager}
                    </div>
                  </td>

                  <td>
                    <span className="warehouse-capacity">
                      {warehouse.capacity}
                    </span>
                  </td>

                  <td>
                    <strong className="warehouse-items">
                      {warehouse.items}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`warehouse-status ${
                        warehouse.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      <span></span>
                      {warehouse.status}
                    </span>
                  </td>

                  <td>
                    <div className="warehouse-action-area">
                      <button
                        className="warehouse-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === warehouse.id
                              ? null
                              : warehouse.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === warehouse.id && (
                        <div className="warehouse-action-menu">
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
                            {warehouse.status === "Active"
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

          {filteredWarehouses.length === 0 && (
            <div className="warehouse-empty-state">
              <Warehouse size={34} />
              <strong>No warehouses found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>

        <div className="warehouses-footer">
          <span>
            Showing {filteredWarehouses.length} of {warehouseData.length} warehouses
          </span>

          <div className="warehouse-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warehouses;