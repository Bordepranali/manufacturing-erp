import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <header className="top-header">
      <div className="header-search">
        <Search size={18} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-right">
        <button className="notification-button">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        <div className="header-user">
          <div className="header-avatar">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="header-user-info">
            <strong>{user?.name || "Admin User"}</strong>
            <span>{user?.role || "Admin"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;