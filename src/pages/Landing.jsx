import {
  ArrowRight,
  Boxes,
  Factory,
  ShieldCheck,
  ShoppingCart,
  BarChart3,
  Users,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: ShoppingCart,
    title: "Purchase Management",
    text: "Manage purchase requests, purchase orders, goods receipts and supplier payments.",
  },
  {
    icon: Boxes,
    title: "Inventory Management",
    text: "Track stock levels, stock movements, warehouse transfers and batch information.",
  },
  {
    icon: Factory,
    title: "Production Management",
    text: "Manage BOMs, production orders and monitor production progress.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Management",
    text: "Record quality checks, rejected items and quarantine stock with ease.",
  },
  {
    icon: CreditCard,
    title: "Sales & Payments",
    text: "Manage customer orders, dispatch, invoices and customer payments.",
  },
  {
    icon: Users,
    title: "HR & Payroll",
    text: "Manage employees, attendance, wages and payroll operations.",
  },
];

const workflow = [
  "Purchase",
  "Inventory",
  "Production",
  "Quality",
  "Sales",
];

function Landing() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-logo">
          <div className="landing-logo-mark">
            <Factory size={21} />
          </div>

          <div>
            <strong>ManufactureX</strong>
            <span>Manufacturing ERP</span>
          </div>
        </Link>

        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#about">About</a>
        </nav>

        <div className="landing-header-actions">
          <Link to="/login" className="landing-login">
            Login
          </Link>

          <Link to="/signup" className="landing-signup">
            Get Started
            <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-content">
            <div className="landing-badge">
              <span></span>
              Manufacturing ERP Platform
            </div>

            <h1>
              Run your manufacturing
              <span> operations with clarity.</span>
            </h1>

            <p>
              ManufactureX connects purchasing, inventory, production,
              quality, sales, payments and workforce operations in one
              centralized platform.
            </p>

            <div className="landing-hero-actions">
              <Link to="/signup" className="landing-primary-btn">
                Get Started
                <ArrowRight size={17} />
              </Link>

              <a href="#features" className="landing-secondary-btn">
                Explore Features
              </a>
            </div>

            <div className="landing-trust">
              <div>
                <CheckCircle2 size={16} />
                <span>Connected Operations</span>
              </div>

              <div>
                <CheckCircle2 size={16} />
                <span>Centralized Data</span>
              </div>

              <div>
                <CheckCircle2 size={16} />
                <span>Simple Workflow</span>
              </div>
            </div>
          </div>

          <div className="landing-visual">
            <div className="landing-dashboard-card">
              <div className="landing-dashboard-header">
                <div className="landing-dashboard-brand">
                  <div className="landing-mini-logo">
                    <Factory size={14} />
                  </div>

                  <strong>ManufactureX</strong>
                </div>

                <div className="landing-profile"></div>
              </div>

              <div className="landing-dashboard-body">
                <div className="landing-mini-sidebar">
                  <span className="mini-active"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="landing-dashboard-content">
                  <div className="landing-dashboard-title">
                    <div>
                      <small>MANUFACTURING OVERVIEW</small>
                      <h3>Dashboard</h3>
                    </div>

                    <div className="landing-today">
                      Today
                    </div>
                  </div>

                  <div className="landing-stat-grid">
                    <div className="landing-stat">
                      <small>Total Products</small>
                      <strong>248</strong>
                      <span>+12</span>
                    </div>

                    <div className="landing-stat">
                      <small>Inventory Value</small>
                      <strong>₹24.8L</strong>
                      <span>+8.4%</span>
                    </div>

                    <div className="landing-stat">
                      <small>Active Production</small>
                      <strong>24</strong>
                      <span>+4.2%</span>
                    </div>

                    <div className="landing-stat">
                      <small>Low Stock Items</small>
                      <strong>18</strong>
                      <span>Attention</span>
                    </div>
                  </div>

                  <div className="landing-dashboard-lower">
                    <div className="landing-production-card">
                      <div className="landing-card-heading">
                        <div>
                          <small>PRODUCTION</small>
                          <strong>Production Overview</strong>
                        </div>

                        <span>6 Months</span>
                      </div>

                      <div className="landing-chart">
                        <i style={{ height: "52%" }}></i>
                        <i style={{ height: "67%" }}></i>
                        <i style={{ height: "47%" }}></i>
                        <i style={{ height: "76%" }}></i>
                        <i style={{ height: "61%" }}></i>
                        <i style={{ height: "88%" }}></i>
                      </div>
                    </div>

                    <div className="landing-operation-card">
                      <div className="landing-card-heading">
                        <div>
                          <small>QUICK STATUS</small>
                          <strong>Operations</strong>
                        </div>
                      </div>

                      <div className="landing-operation">
                        <div className="landing-operation-icon">
                          <Boxes size={12} />
                        </div>

                        <div>
                          <strong>Inventory</strong>
                          <small>Healthy stock</small>
                        </div>

                        <b>92%</b>
                      </div>

                      <div className="landing-operation">
                        <div className="landing-operation-icon">
                          <Factory size={12} />
                        </div>

                        <div>
                          <strong>Production</strong>
                          <small>24 active orders</small>
                        </div>

                        <b>78%</b>
                      </div>

                      <div className="landing-operation">
                        <div className="landing-operation-icon">
                          <Users size={12} />
                        </div>

                        <div>
                          <strong>Attendance</strong>
                          <small>Today's workforce</small>
                        </div>

                        <b>94%</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="landing-floating-card landing-floating-stock">
              <Boxes size={18} />

              <div>
                <strong>Inventory</strong>
                <span>92% healthy</span>
              </div>
            </div>

            <div className="landing-floating-card landing-floating-production">
              <Factory size={18} />

              <div>
                <strong>Production</strong>
                <span>4,860 units today</span>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-features" id="features">
          <div className="landing-section-heading">
            <span>MANUFACTURING MODULES</span>

            <h2>
              Everything connected in one system
            </h2>

            <p>
              ManufactureX brings your core manufacturing processes together
              with simple and organized workflows.
            </p>
          </div>

          <div className="landing-feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div className="landing-feature-card" key={feature.title}>
                  <div className="feature-icon">
                    <Icon size={20} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.text}</p>

                  <ArrowRight
                    size={16}
                    className="feature-arrow"
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="landing-workflow" id="workflow">
          <div className="landing-section-heading">
            <span>CONNECTED WORKFLOW</span>

            <h2>
              One flow from purchase to sales
            </h2>

            <p>
              Manage the complete manufacturing journey through connected
              modules.
            </p>
          </div>

          <div className="workflow-track">
            {workflow.map((item, index) => (
              <div className="workflow-step" key={item}>
                <div className="workflow-number">
                  0{index + 1}
                </div>

                <strong>{item}</strong>

                {index < workflow.length - 1 && (
                  <ArrowRight
                    size={19}
                    className="workflow-arrow"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="landing-cta" id="about">
          <div>
            <span>MANUFACTUREX ERP</span>

            <h2>
              Bring your manufacturing operations together.
            </h2>

            <p>
              Manage your business processes from one centralized platform.
            </p>
          </div>

          <Link to="/signup" className="landing-primary-btn">
            Create Account
            <ArrowRight size={17} />
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <Link to="/" className="landing-logo">
          <div className="landing-logo-mark">
            <Factory size={19} />
          </div>

          <div>
            <strong>ManufactureX</strong>
            <span>Manufacturing ERP</span>
          </div>
        </Link>

        <span>Manufacturing ERP Management System</span>

        <span>© 2026 ManufactureX</span>
      </footer>
    </div>
  );
}

export default Landing;