import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Boxes, 
  Factory, 
  ClipboardCheck, 
  Users, 
  Wrench, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  LogOut,
  Truck,
  UserRound,
  FileText,
  PackageCheck,
  CreditCard,
  ArrowRightLeft,
   Layers3,
  ClipboardList,
  ShieldAlert,
  ShoppingBag,
  CalendarDays,
WalletCards,
Banknote,
UsersRound,
  ShieldCheck,
  Building2
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const menuGroups = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
      }
    ]
  },
  {
    title: "Masters",
    items: [
      {
        label: "Products",
        path: "/masters/products",
        icon: Package
      },
      {
        label: "Suppliers",
        path: "/masters/suppliers",
        icon: Truck
      },
      {
        label: "Customers",
        path: "/masters/customers",
        icon: UserRound
      },
      {
        label: "Employees",
        path: "/masters/employees",
        icon: Users
      },
      {
        label: "Warehouses",
        path: "/masters/warehouses",
        icon: Boxes
      },
      {
        label: "Machines",
        path: "/masters/machines",
        icon: Factory
      }
    ]
  },
  {
    title: "Purchase",
    items: [
      {
        label: "Purchase Request",
        path: "/purchase/request",
        icon: FileText
      },
      {
        label: "Purchase Order",
        path: "/purchase/order",
        icon: ShoppingCart
      },
      {
        label: "Goods Receipt",
        path: "/purchase/goods-receipt",
        icon: PackageCheck
      },
      {
        label: "Supplier Payments",
        path: "/purchase/supplier-payments",
        icon: CreditCard
      }
    ]
  },
  {
    title: "Inventory",
    items: [
      {
        label: "Stock Overview",
        path: "/inventory/stock-overview",
        icon: Boxes
      },
      {
        label: "Stock Movement",
        path: "/inventory/stock-movement",
        icon: ArrowRightLeft
      },
      {
        label: "Warehouse Transfer",
        path: "/inventory/warehouse-transfer",
        icon: ArrowRightLeft
      }
    ]
  },
  {
    title: "Production",
    items: [
      {
        label: "BOM",
        path: "/production/bom",
        icon: Layers3
      },
      {
        label: "Production Order",
        path: "/production/order",
        icon: ClipboardList
      },
      {
        label: "Production Tracking",
        path: "/production/tracking",
        icon: Factory
      }
    ]
  },
  {
    title: "Quality",
    items: [
      {
        label: "Quality Check",
        path: "/quality/check",
        icon: ClipboardCheck
      },
      {
        label: "Rejected / Quarantine",
        path: "/quality/rejected",
        icon: ShieldAlert
      }
    ]
  },
  {
    title: "Sales",
    items: [
      {
        label: "Customer Orders",
        path: "/sales/customer-orders",
        icon: ShoppingBag
      },
      {
        label: "Dispatch",
        path: "/sales/dispatch",
        icon: Truck
      },
      {
        label: "Sales Invoice",
        path: "/sales/invoice",
        icon: FileText
      },
      {
        label: "Customer Payments",
        path: "/sales/customer-payments",
        icon: CreditCard
      }
    ]
  },
  {
    title: "HR & Payroll",
    items: [
      {
        label: "Attendance",
        path: "/hr/attendance",
        icon: CalendarDays
      },
      {
        label: "Salary / Wages",
        path: "/hr/salary-wages",
        icon: WalletCards
      },
      {
        label: "Payroll",
        path: "/hr/payroll",
        icon: Banknote
      }
    ]
  },
  {
    title: "Maintenance",
    items: [
      {
        label: "Maintenance Records",
        path: "/maintenance/records",
        icon: Wrench
      }
    ]
  },
  {
    title: "Reports",
    items: [
      {
        label: "Reports Overview",
        path: "/reports",
        icon: BarChart3
      }
    ]
  },
  {
    title: "Settings",
    items: [
      {
        label: "Users",
        path: "/settings/users",
        icon: UsersRound
      },
      {
        label: "Roles",
        path: "/settings/roles",
        icon: ShieldCheck
      },
      {
        label: "Company Settings",
        path: "/settings/company",
        icon: Building2
      }
    ]
  }
];

function Sidebar() {
  const [openGroups, setOpenGroups] = useState({
    Masters: true,
    Operations: true,
    Management: true,
  });

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <Factory size={22} />
        </div>

        <div>
          <h2>ManufactureX</h2>
          <span>Manufacturing ERP</span>
        </div>
      </div>

      <div className="sidebar-menu">
        {menuGroups.map((group) => (
          <div className="menu-group" key={group.title}>
            {group.title !== "Main" && (
              <button
                className="menu-group-title"
                onClick={() => toggleGroup(group.title)}
              >
                <span>{group.title}</span>
                <ChevronDown
                  size={15}
                  className={openGroups[group.title] ? "" : "rotate"}
                />
              </button>
            )}

            {(group.title === "Main" || openGroups[group.title]) && (
              <div className="menu-items">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                      }
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>

        <div className="user-info">
          <strong>{user?.name || "Admin User"}</strong>
          <span>{user?.role || "Admin"}</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;