import {
  Package,
  IndianRupee,
  ShoppingCart,
  Factory,
  ClipboardCheck,
  Users,
  Wrench,
  ArrowUpRight,
  ArrowDownRight,
  Boxes,
  CreditCard,
  AlertTriangle,
  Truck,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "248",
    change: "+12",
    positive: true,
    icon: Package,
    className: "violet",
  },
  {
    title: "Inventory Value",
    value: "₹24.8L",
    change: "+8.4%",
    positive: true,
    icon: IndianRupee,
    className: "blue",
  },
  {
    title: "Low Stock Items",
    value: "18",
    change: "+3",
    positive: false,
    icon: AlertTriangle,
    className: "rose",
  },
  {
    title: "Pending Purchase Orders",
    value: "16",
    change: "-2.1%",
    positive: true,
    icon: ShoppingCart,
    className: "orange",
  },
  {
    title: "Supplier Payments",
    value: "₹4.25L",
    change: "Pending",
    positive: false,
    icon: CreditCard,
    className: "rose",
  },
  {
    title: "Active Production",
    value: "24",
    change: "+4.2%",
    positive: true,
    icon: Factory,
    className: "blue",
  },
  {
    title: "Today's Production",
    value: "4,860",
    change: "+6.8%",
    positive: true,
    icon: Boxes,
    className: "violet",
  },
  {
    title: "Pending Sales Orders",
    value: "16",
    change: "-2.1%",
    positive: true,
    icon: Truck,
    className: "orange",
  },
  {
    title: "Customer Payments",
    value: "₹2.80L",
    change: "Due",
    positive: false,
    icon: IndianRupee,
    className: "rose",
  },
  {
    title: "Employees / Workers",
    value: "86",
    change: "+4",
    positive: true,
    icon: Users,
    className: "violet",
  },
  {
    title: "Today's Attendance",
    value: "94%",
    change: "+2.4%",
    positive: true,
    icon: ClipboardCheck,
    className: "blue",
  },
  {
    title: "Machines Under Maintenance",
    value: "5",
    change: "Attention",
    positive: false,
    icon: Wrench,
    className: "orange",
  },
];

const productionData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 78 },
  { month: "Mar", value: 58 },
  { month: "Apr", value: 84 },
  { month: "May", value: 72 },
  { month: "Jun", value: 92 },
];

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <div>
          <span className="dashboard-eyebrow">MANUFACTURING OVERVIEW</span>
          <h1>Good afternoon 👋</h1>
          <p>
            Here’s what is happening across your manufacturing operations today.
          </p>
        </div>

        <button className="dashboard-date">
          <span>Today</span>
          <strong>11 Sep 2026</strong>
        </button>
      </div>

      <div className="stats-grid modern-stats">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className="modern-stat-card" key={item.title}>
              <div className={`modern-stat-icon ${item.className}`}>
                <Icon size={20} />
              </div>

              <div className="modern-stat-content">
                <span>{item.title}</span>
                <strong>{item.value}</strong>

                <div
                  className={`stat-change ${
                    item.positive ? "positive" : "negative"
                  }`}
                >
                  {item.positive ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}
                  {item.change}
                  <span>vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-main-grid">
        <div className="dashboard-panel production-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-label">PRODUCTION</span>
              <h2>Production Overview</h2>
              <p>Monthly production performance</p>
            </div>

            <select className="dashboard-select">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="production-highlight">
            <div>
              <span>Total Production</span>
              <strong>28,640 Units</strong>
            </div>

            <div className="target-info">
              <span>Target</span>
              <strong>32,000</strong>
            </div>

            <div className="target-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <span>89.5% achieved</span>
            </div>
          </div>

          <div className="production-chart">
            {productionData.map((item) => (
              <div className="chart-column" key={item.month}>
                <div className="chart-value">{item.value}%</div>
                <div className="chart-track">
                  <div
                    className="chart-bar"
                    style={{ height: `${item.value}%` }}
                  ></div>
                </div>
                <span>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel quick-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-label">QUICK STATUS</span>
              <h2>Operations</h2>
              <p>Current operational status</p>
            </div>
          </div>

          <div className="operation-list">
            <div className="operation-item">
              <div className="operation-icon green">
                <Boxes size={18} />
              </div>
              <div>
                <strong>Inventory</strong>
                <span>Healthy stock level</span>
              </div>
              <b>92%</b>
            </div>

            <div className="operation-item">
              <div className="operation-icon blue">
                <Factory size={18} />
              </div>
              <div>
                <strong>Production</strong>
                <span>24 active orders</span>
              </div>
              <b>78%</b>
            </div>

            <div className="operation-item">
              <div className="operation-icon orange">
                <Truck size={18} />
              </div>
              <div>
                <strong>Dispatch</strong>
                <span>12 orders pending</span>
              </div>
              <b>64%</b>
            </div>

            <div className="operation-item">
              <div className="operation-icon violet">
                <Users size={18} />
              </div>
              <div>
                <strong>Attendance</strong>
                <span>Today's workforce</span>
              </div>
              <b>94%</b>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-label">FINANCE</span>
              <h2>Payment Summary</h2>
            </div>
          </div>

          <div className="finance-cards">
            <div className="finance-card supplier">
              <div className="finance-icon">
                <CreditCard size={18} />
              </div>
              <span>Supplier Payments</span>
              <strong>₹4.25L</strong>
              <small>Pending payments</small>
            </div>

            <div className="finance-card customer">
              <div className="finance-icon">
                <IndianRupee size={18} />
              </div>
              <span>Customer Payments</span>
              <strong>₹2.80L</strong>
              <small>Amount due</small>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-label">ATTENTION</span>
              <h2>Alerts</h2>
            </div>
            <span className="alert-count">3 alerts</span>
          </div>

          <div className="dashboard-alert">
            <div className="alert-dot warning"></div>
            <div>
              <strong>18 items below minimum stock</strong>
              <span>Review inventory and create purchase requests.</span>
            </div>
          </div>

          <div className="dashboard-alert">
            <div className="alert-dot danger"></div>
            <div>
              <strong>5 machines under maintenance</strong>
              <span>Check expected completion dates.</span>
            </div>
          </div>

          <div className="dashboard-alert">
            <div className="alert-dot info"></div>
            <div>
              <strong>16 customer orders pending</strong>
              <span>Review dispatch and sales orders.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;