import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  Power,
  Building2,
  Phone,
  Mail,
  MapPin,
  Package,
  CheckCircle2,
  Clock3
} from "lucide-react";

const supplierData = [
  {
    id: "SUP-001",
    name: "Tata Steel Industries",
    contact: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "purchase@tatasteel.com",
    city: "Pune",
    category: "Raw Materials",
    products: 18,
    status: "Active"
  },
  {
    id: "SUP-002",
    name: "Hindalco Metals",
    contact: "Amit Sharma",
    phone: "+91 98234 56120",
    email: "sales@hindalco.com",
    city: "Mumbai",
    category: "Metal",
    products: 12,
    status: "Active"
  },
  {
    id: "SUP-003",
    name: "SKF Industrial Supplies",
    contact: "Neha Patil",
    phone: "+91 97654 32109",
    email: "orders@skfindustrial.com",
    city: "Nashik",
    category: "Components",
    products: 9,
    status: "Active"
  },
  {
    id: "SUP-004",
    name: "Castrol Manufacturing",
    contact: "Vikram Joshi",
    phone: "+91 99887 66554",
    email: "supply@castrol.com",
    city: "Aurangabad",
    category: "Consumables",
    products: 6,
    status: "Inactive"
  },
  {
    id: "SUP-005",
    name: "Industrial Tools Co.",
    contact: "Pooja Deshmukh",
    phone: "+91 98989 45454",
    email: "contact@industrialtools.com",
    city: "Ahmednagar",
    category: "Tools",
    products: 15,
    status: "Active"
  }
];

function Suppliers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredSuppliers = useMemo(() => {
    return supplierData.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        supplier.id.toLowerCase().includes(search.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(search.toLowerCase()) ||
        supplier.city.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || supplier.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const activeCount = supplierData.filter(
    (supplier) => supplier.status === "Active"
  ).length;

  const inactiveCount = supplierData.filter(
    (supplier) => supplier.status === "Inactive"
  ).length;

  const totalProducts = supplierData.reduce(
    (total, supplier) => total + supplier.products,
    0
  );

  return (
    <div className="suppliers-page">
      <div className="suppliers-heading">
        <div>
          <div className="module-eyebrow">MASTER DATA / SUPPLIERS</div>
          <h1>Suppliers</h1>
          <p>Manage supplier information, contacts and material sources.</p>
        </div>

        <button className="suppliers-add-button">
          <Plus size={18} />
          Add Supplier
        </button>
      </div>

      <div className="supplier-summary-grid">
        <div className="supplier-summary-card">
          <div className="supplier-summary-icon blue">
            <Building2 size={21} />
          </div>
          <div>
            <span>Total Suppliers</span>
            <strong>{supplierData.length}</strong>
            <small>Registered vendors</small>
          </div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Active Suppliers</span>
            <strong>{activeCount}</strong>
            <small>Currently available</small>
          </div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Inactive</span>
            <strong>{inactiveCount}</strong>
            <small>Temporarily disabled</small>
          </div>
        </div>

        <div className="supplier-summary-card">
          <div className="supplier-summary-icon violet">
            <Package size={21} />
          </div>
          <div>
            <span>Linked Products</span>
            <strong>{totalProducts}</strong>
            <small>Across all suppliers</small>
          </div>
        </div>
      </div>

      <div className="suppliers-container">
        <div className="suppliers-toolbar">
          <div className="suppliers-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search suppliers, contact or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="supplier-filter">
            <SlidersHorizontal size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="supplier-result-count">
            {filteredSuppliers.length} suppliers
          </div>
        </div>

        <div className="suppliers-table-wrapper">
          <table className="suppliers-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Contact Person</th>
                <th>Contact Details</th>
                <th>Location</th>
                <th>Category</th>
                <th>Products</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>
                    <div className="supplier-main-info">
                      <div className="supplier-avatar">
                        {supplier.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{supplier.name}</strong>
                        <span>{supplier.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="supplier-contact-person">
                      {supplier.contact}
                    </div>
                  </td>

                  <td>
                    <div className="supplier-contact-details">
                      <span>
                        <Phone size={13} />
                        {supplier.phone}
                      </span>
                      <span>
                        <Mail size={13} />
                        {supplier.email}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="supplier-location">
                      <MapPin size={14} />
                      {supplier.city}
                    </div>
                  </td>

                  <td>
                    <span className="supplier-category">
                      {supplier.category}
                    </span>
                  </td>

                  <td>
                    <div className="supplier-products">
                      <Package size={15} />
                      {supplier.products}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`supplier-status ${
                        supplier.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      <span></span>
                      {supplier.status}
                    </span>
                  </td>

                  <td>
                    <div className="supplier-action-area">
                      <button
                        className="supplier-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === supplier.id ? null : supplier.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === supplier.id && (
                        <div className="supplier-action-menu">
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
                            {supplier.status === "Active"
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

          {filteredSuppliers.length === 0 && (
            <div className="supplier-empty-state">
              <Building2 size={34} />
              <strong>No suppliers found</strong>
              <span>Try changing your search or filter.</span>
            </div>
          )}
        </div>

        <div className="suppliers-footer">
          <span>
            Showing {filteredSuppliers.length} of {supplierData.length} suppliers
          </span>

          <div className="supplier-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Suppliers;