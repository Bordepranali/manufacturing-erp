import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  Factory,
  ShoppingCart,
  ReceiptText,
  CreditCard,
  Users,
  WalletCards,
  ShieldCheck,
  Wrench,
  Search,
  Download,
  Eye,
  X,
  CalendarDays,
  TrendingUp
} from "lucide-react";

const reports = [
  {
    id: "purchase",
    title: "Purchase Reports",
    category: "Purchase",
    description: "Purchase orders, received materials and supplier payments.",
    icon: ShoppingCart,
    metrics: [
      ["Purchase Orders", "42"],
      ["Received Materials", "118"],
      ["Pending POs", "9"]
    ],
    rows: [
      ["PO-2026-041", "ABC Steel Suppliers", "₹1,24,500", "Pending"],
      ["PO-2026-040", "Maharashtra Metals", "₹86,200", "Received"],
      ["PO-2026-039", "Prime Industrial", "₹54,800", "Partially Received"]
    ]
  },
  {
    id: "stock",
    title: "Stock Reports",
    category: "Inventory",
    description: "Current stock, low stock, warehouse stock and movements.",
    icon: Boxes,
    metrics: [
      ["Total Items", "286"],
      ["Low Stock", "14"],
      ["Stock Value", "₹18.6L"]
    ],
    rows: [
      ["RM-001", "MS Steel Sheet", "420 KG", "Healthy"],
      ["RM-014", "Copper Wire", "85 KG", "Low Stock"],
      ["FG-021", "Gear Housing", "164 PCS", "Healthy"]
    ]
  },
  {
    id: "production",
    title: "Production Reports",
    category: "Production",
    description: "Daily production, planned vs actual and rejected production.",
    icon: Factory,
    metrics: [
      ["Produced Today", "1,248"],
      ["Achievement", "94%"],
      ["Rejected", "38"]
    ],
    rows: [
      ["Gear Housing", "500", "480", "96%"],
      ["Shaft Assembly", "400", "382", "95.5%"],
      ["Mounting Plate", "350", "326", "93.1%"]
    ]
  },
  {
    id: "sales",
    title: "Sales Reports",
    category: "Sales",
    description: "Customer sales, products, pending orders and dispatches.",
    icon: ReceiptText,
    metrics: [
      ["Sales Orders", "68"],
      ["Dispatched", "51"],
      ["Pending Orders", "17"]
    ],
    rows: [
      ["SO-2026-088", "Tata Engineering", "₹2,48,000", "Dispatched"],
      ["SO-2026-087", "Shree Industries", "₹1,64,500", "Pending"],
      ["SO-2026-086", "Kinetic Works", "₹98,400", "Partially Dispatched"]
    ]
  },
  {
    id: "payments",
    title: "Payment Reports",
    category: "Payments",
    description: "Supplier dues, customer dues and paid versus pending amounts.",
    icon: CreditCard,
    metrics: [
      ["Supplier Due", "₹4.2L"],
      ["Customer Due", "₹6.8L"],
      ["Paid", "₹12.4L"]
    ],
    rows: [
      ["ABC Steel Suppliers", "Supplier", "₹1,24,500", "Pending"],
      ["Tata Engineering", "Customer", "₹2,48,000", "Partially Paid"],
      ["Prime Industrial", "Supplier", "₹54,800", "Paid"]
    ]
  },
  {
    id: "hr",
    title: "HR Reports",
    category: "HR",
    description: "Employees, attendance, workers and overtime information.",
    icon: Users,
    metrics: [
      ["Employees", "86"],
      ["Present Today", "79"],
      ["Overtime Hours", "126"]
    ],
    rows: [
      ["EMP-001", "Rahul Deshmukh", "Production", "Present"],
      ["EMP-002", "Sneha Patil", "Quality", "Present"],
      ["EMP-003", "Amit Kulkarni", "Inventory", "Absent"]
    ]
  },
  {
    id: "payroll",
    title: "Payroll Reports",
    category: "Payroll",
    description: "Salary, wages, paid payroll and pending payroll.",
    icon: WalletCards,
    metrics: [
      ["Payroll Total", "₹1.79L"],
      ["Paid", "₹90.3K"],
      ["Pending", "₹88.6K"]
    ],
    rows: [
      ["PAY-2026-006", "Rahul Deshmukh", "₹33,300", "Pending"],
      ["PAY-2026-005", "Sneha Patil", "₹30,100", "Paid"],
      ["PAY-2026-004", "Amit Kulkarni", "₹17,200", "Pending"]
    ]
  },
  {
    id: "quality",
    title: "Quality Reports",
    category: "Quality",
    description: "Passed, rejected, quarantine and rejection reasons.",
    icon: ShieldCheck,
    metrics: [
      ["Inspections", "142"],
      ["Passed", "128"],
      ["Rejected", "14"]
    ],
    rows: [
      ["QC-2026-118", "Gear Housing", "Final Inspection", "Passed"],
      ["QC-2026-117", "Shaft Assembly", "Production", "Passed"],
      ["QC-2026-116", "Mounting Plate", "Incoming", "Rejected"]
    ]
  },
  {
    id: "maintenance",
    title: "Maintenance Reports",
    category: "Maintenance",
    description: "Machine status, breakdowns, downtime and maintenance cost.",
    icon: Wrench,
    metrics: [
      ["Machines", "24"],
      ["Under Maintenance", "3"],
      ["Downtime", "18.5 Hrs"]
    ],
    rows: [
      ["MCH-001", "CNC Turning Machine", "Preventive", "Completed"],
      ["MCH-002", "Hydraulic Press", "Breakdown", "In Progress"],
      ["MCH-004", "Surface Grinding Machine", "Repair", "Scheduled"]
    ]
  }
];

const categories = ["All", ...new Set(reports.map((report) => report.category))];

function Reports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dateFrom, setDateFrom] = useState("2026-09-01");
  const [dateTo, setDateTo] = useState("2026-09-30");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(search.toLowerCase()) ||
        report.category.toLowerCase().includes(search.toLowerCase()) ||
        report.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || report.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const exportReport = (report) => {
    const header = report.rows[0].map((_, index) => `Column ${index + 1}`);
    const csv = [
      header.join(","),
      ...report.rows.map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.id}-report.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-page">
      <section className="reports-hero">
        <div>
          <span className="reports-eyebrow">BUSINESS INTELLIGENCE</span>
          <h1>Reports & Analytics</h1>
          <p>
            Track purchasing, inventory, production, sales, payments and
            workforce performance from one place.
          </p>
        </div>

        <div className="reports-hero-icon">
          <BarChart3 size={34} />
        </div>
      </section>

      <section className="reports-summary-grid">
        <div className="report-summary-card">
          <div className="report-summary-icon">
            <BarChart3 size={21} />
          </div>
          <div>
            <span>Total Reports</span>
            <strong>09</strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon">
            <TrendingUp size={21} />
          </div>
          <div>
            <span>Available Categories</span>
            <strong>09</strong>
          </div>
        </div>

        <div className="report-summary-card">
          <div className="report-summary-icon">
            <CalendarDays size={21} />
          </div>
          <div>
            <span>Reporting Period</span>
            <strong>September 2026</strong>
          </div>
        </div>
      </section>

      <section className="reports-filter-card">
        <div className="reports-filter-header">
          <div>
            <h2>Report Filters</h2>
            <p>Choose a period and category to narrow your reports.</p>
          </div>

          <span className="reports-result-badge">
            {filteredReports.length} Reports
          </span>
        </div>

        <div className="reports-filter-grid">
          <div className="report-filter-field report-search-field">
            <label>Search Reports</label>
            <div className="report-search-box">
              <Search size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search report..."
              />
            </div>
          </div>

          <div className="report-filter-field">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="report-filter-field">
            <label>Date From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          <div className="report-filter-field">
            <label>Date To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="reports-section-heading">
        <div>
          <span>REPORT CENTER</span>
          <h2>Available Reports</h2>
        </div>

        <p>
          Showing reports from {dateFrom} to {dateTo}
        </p>
      </section>

      <section className="reports-card-grid">
        {filteredReports.map((report) => {
          const Icon = report.icon;

          return (
            <article className="report-module-card" key={report.id}>
              <div className="report-card-top">
                <div className="report-card-icon">
                  <Icon size={22} />
                </div>

                <span className="report-category">
                  {report.category}
                </span>
              </div>

              <h3>{report.title}</h3>
              <p>{report.description}</p>

              <div className="report-metric-list">
                {report.metrics.map(([label, value]) => (
                  <div className="report-metric" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="report-card-actions">
                <button
                  className="report-view-button"
                  onClick={() => setSelectedReport(report)}
                >
                  <Eye size={17} />
                  View Report
                
                </button>

                <button
                  className="report-export-button"
                  onClick={() => exportReport(report)}
                  title="Export CSV"
                >
                  <Download size={17} />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {filteredReports.length === 0 && (
        <div className="reports-empty-state">
          <BarChart3 size={38} />
          <h3>No reports found</h3>
          <p>Try changing your search or category filter.</p>
        </div>
      )}

      {selectedReport && (
        <div
          className="report-modal-overlay"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="report-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="report-modal-header">
              <div>
                <span>{selectedReport.category} Report</span>
                <h2>{selectedReport.title}</h2>
              </div>

              <button
                className="report-modal-close"
                onClick={() => setSelectedReport(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="report-period-box">
              <CalendarDays size={18} />
              <span>
                {dateFrom} → {dateTo}
              </span>
            </div>

            <div className="report-preview-metrics">
              {selectedReport.metrics.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="report-preview-table-wrapper">
              <table className="report-preview-table">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Name / Details</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedReport.rows.map((row, index) => (
                    <tr key={index}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          {cellIndex === row.length - 1 ? (
                            <span className="report-status-badge">
                              {cell}
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="report-modal-footer">
              <button
                className="report-secondary-button"
                onClick={() => {
                    if (report.id === "purchase") {
                        navigate("/reports/purchase");
                    } else {
                        setSelectedReport(report);
                    }
                }}
              >
                Close
              </button>

              <button
                className="report-primary-button"
                onClick={() => exportReport(selectedReport)}
              >
                <Download size={17} />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;