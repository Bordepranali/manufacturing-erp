import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  Power,
  UserRound,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  CheckCircle2,
  Clock3
} from "lucide-react";

const customerData = [
  {
    id: "CUS-001",
    name: "Apex Engineering Pvt. Ltd.",
    contact: "Rohit Mehta",
    phone: "+91 98765 21430",
    email: "purchase@apexengineering.com",
    city: "Pune",
    type: "Industrial",
    orders: 24,
    status: "Active"
  },
  {
    id: "CUS-002",
    name: "Shree Auto Components",
    contact: "Sanjay Patil",
    phone: "+91 98234 51890",
    email: "orders@shreeauto.com",
    city: "Nashik",
    type: "Manufacturer",
    orders: 18,
    status: "Active"
  },
  {
    id: "CUS-003",
    name: "MechPro Solutions",
    contact: "Anjali Kulkarni",
    phone: "+91 97654 12876",
    email: "sales@mechpro.com",
    city: "Mumbai",
    type: "Distributor",
    orders: 15,
    status: "Active"
  },
  {
    id: "CUS-004",
    name: "Precision Works",
    contact: "Kunal Shah",
    phone: "+91 99887 45210",
    email: "contact@precisionworks.com",
    city: "Aurangabad",
    type: "Industrial",
    orders: 9,
    status: "Inactive"
  },
  {
    id: "CUS-005",
    name: "Nova Machinery",
    contact: "Priya Joshi",
    phone: "+91 98989 67432",
    email: "purchase@novamachinery.com",
    city: "Ahmednagar",
    type: "Manufacturer",
    orders: 21,
    status: "Active"
  }
];

function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customerData.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.id.toLowerCase().includes(search.toLowerCase()) ||
        customer.contact.toLowerCase().includes(search.toLowerCase()) ||
        customer.city.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const activeCount = customerData.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCount = customerData.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const totalOrders = customerData.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  return (
    <div className="customers-page">
      <div className="customers-heading">
        <div>
          <div className="module-eyebrow">MASTER DATA / CUSTOMERS</div>
          <h1>Customers</h1>
          <p>Manage customer profiles, contacts and order relationships.</p>
        </div>

        <button className="customers-add-button">
          <Plus size={18} />
          Add Customer
        </button>
      </div>

      <div className="customer-summary-grid">
        <div className="customer-summary-card">
          <div className="customer-summary-icon blue">
            <UserRound size={21} />
          </div>
          <div>
            <span>Total Customers</span>
            <strong>{customerData.length}</strong>
            <small>Registered customers</small>
          </div>
        </div>

        <div className="customer-summary-card">
          <div className="customer-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Active Customers</span>
            <strong>{activeCount}</strong>
            <small>Currently active</small>
          </div>
        </div>

        <div className="customer-summary-card">
          <div className="customer-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Inactive</span>
            <strong>{inactiveCount}</strong>
            <small>Currently disabled</small>
          </div>
        </div>

        <div className="customer-summary-card">
          <div className="customer-summary-icon violet">
            <ShoppingBag size={21} />
          </div>
          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
            <small>Orders linked to customers</small>
          </div>
        </div>
      </div>

      <div className="customers-container">
        <div className="customers-toolbar">
          <div className="customers-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search customers, contact or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="customer-filter">
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

          <div className="customer-result-count">
            {filteredCustomers.length} customers
          </div>
        </div>

        <div className="customers-table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact Person</th>
                <th>Contact Details</th>
                <th>Location</th>
                <th>Customer Type</th>
                <th>Orders</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-main-info">
                      <div className="customer-avatar">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <strong>{customer.name}</strong>
                        <span>{customer.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="customer-contact-person">
                      {customer.contact}
                    </div>
                  </td>

                  <td>
                    <div className="customer-contact-details">
                      <span>
                        <Phone size={13} />
                        {customer.phone}
                      </span>
                      <span>
                        <Mail size={13} />
                        {customer.email}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="customer-location">
                      <MapPin size={14} />
                      {customer.city}
                    </div>
                  </td>

                  <td>
                    <span className="customer-type">
                      {customer.type}
                    </span>
                  </td>

                  <td>
                    <div className="customer-orders">
                      <ShoppingBag size={15} />
                      {customer.orders}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`customer-status ${
                        customer.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      <span></span>
                      {customer.status}
                    </span>
                  </td>

                  <td>
                    <div className="customer-action-area">
                      <button
                        className="customer-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === customer.id ? null : customer.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === customer.id && (
                        <div className="customer-action-menu">
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
                            {customer.status === "Active"
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

          {filteredCustomers.length === 0 && (
            <div className="customer-empty-state">
              <UserRound size={34} />
              <strong>No customers found</strong>
              <span>Try changing your search or filter.</span>
            </div>
          )}
        </div>

        <div className="customers-footer">
          <span>
            Showing {filteredCustomers.length} of {customerData.length} customers
          </span>

          <div className="customer-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;