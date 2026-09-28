import { useMemo, useState } from "react";
import {
  ClipboardCheck,
  Download,
  Eye,
  Search,
  ShieldAlert,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  PackageCheck
} from "lucide-react";

const initialChecks = [
  {
    inspectionNo: "QC-2026-021",
    date: "2026-09-12",
    reference: "GRN-2026-041",
    type: "Incoming",
    product: "Mild Steel Sheet",
    batch: "MS-SEP-26-041",
    inspector: "Sneha Patil",
    parameters: 5,
    passed: 5,
    result: "Passed",
    action: "Released"
  },
  {
    inspectionNo: "QC-2026-020",
    date: "2026-09-11",
    reference: "PROD-2026-021",
    type: "In Process",
    product: "Industrial Gearbox",
    batch: "IG-SEP-26-021",
    inspector: "Sneha Patil",
    parameters: 6,
    passed: 5,
    result: "Conditional",
    action: "Review"
  },
  {
    inspectionNo: "QC-2026-019",
    date: "2026-09-10",
    reference: "GRN-2026-040",
    type: "Incoming",
    product: "Stainless Steel Rod",
    batch: "SSR-SEP-26-040",
    inspector: "Amit Kulkarni",
    parameters: 5,
    passed: 3,
    result: "Failed",
    action: "Quarantine"
  },
  {
    inspectionNo: "QC-2026-018",
    date: "2026-09-09",
    reference: "PROD-2026-019",
    type: "Final",
    product: "Gear Housing",
    batch: "GH-SEP-26-019",
    inspector: "Sneha Patil",
    parameters: 7,
    passed: 7,
    result: "Passed",
    action: "Released"
  },
  {
    inspectionNo: "QC-2026-017",
    date: "2026-09-08",
    reference: "GRN-2026-038",
    type: "Incoming",
    product: "Aluminium Coil",
    batch: "AC-SEP-26-038",
    inspector: "Amit Kulkarni",
    parameters: 5,
    passed: 4,
    result: "Conditional",
    action: "Review"
  },
  {
    inspectionNo: "QC-2026-016",
    date: "2026-09-07",
    reference: "PROD-2026-017",
    type: "Final",
    product: "Steel Coupling",
    batch: "SC-SEP-26-017",
    inspector: "Sneha Patil",
    parameters: 6,
    passed: 6,
    result: "Passed",
    action: "Released"
  },
  {
    inspectionNo: "QC-2026-015",
    date: "2026-09-06",
    reference: "GRN-2026-037",
    type: "Incoming",
    product: "Bearing 6205",
    batch: "BR-SEP-26-037",
    inspector: "Amit Kulkarni",
    parameters: 5,
    passed: 2,
    result: "Failed",
    action: "Quarantine"
  },
  {
    inspectionNo: "QC-2026-014",
    date: "2026-09-05",
    reference: "PROD-2026-016",
    type: "In Process",
    product: "Industrial Valve",
    batch: "IV-SEP-26-016",
    inspector: "Sneha Patil",
    parameters: 6,
    passed: 6,
    result: "Passed",
    action: "Released"
  }
];

function QualityReport() {
  const [checks, setChecks] = useState(initialChecks);
  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedCheck, setSelectedCheck] = useState(null);

  const filteredChecks = useMemo(() => {
    return checks.filter((item) => {
      const matchesSearch =
        item.inspectionNo.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.batch.toLowerCase().includes(search.toLowerCase()) ||
        item.reference.toLowerCase().includes(search.toLowerCase());

      const matchesResult =
        resultFilter === "All" || item.result === resultFilter;

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      return matchesSearch && matchesResult && matchesType;
    });
  }, [checks, search, resultFilter, typeFilter]);

  const totalChecks = checks.length;
  const passedChecks = checks.filter((item) => item.result === "Passed").length;
  const failedChecks = checks.filter((item) => item.result === "Failed").length;
  const conditionalChecks = checks.filter(
    (item) => item.result === "Conditional"
  ).length;

  const passRate = totalChecks
    ? Math.round((passedChecks / totalChecks) * 100)
    : 0;

  const exportCSV = () => {
    const headers = [
      "Inspection Number",
      "Date",
      "Reference",
      "Check Type",
      "Product",
      "Batch / Lot",
      "Inspector",
      "Parameters",
      "Passed Parameters",
      "Overall Result",
      "Action"
    ];

    const rows = filteredChecks.map((item) => [
      item.inspectionNo,
      item.date,
      item.reference,
      item.type,
      item.product,
      item.batch,
      item.inspector,
      item.parameters,
      item.passed,
      item.result,
      item.action
    ]);

    const csv = [
      headers,
      ...rows
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "quality-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const deleteCheck = (inspectionNo) => {
    if (!window.confirm("Delete this quality inspection record?")) return;

    setChecks((current) =>
      current.filter((item) => item.inspectionNo !== inspectionNo)
    );

    if (selectedCheck?.inspectionNo === inspectionNo) {
      setSelectedCheck(null);
    }
  };

  return (
    <div className="quality-report-page">
      <section className="quality-report-hero">
        <div>
          <div className="quality-report-eyebrow">
            <ClipboardCheck size={16} />
            QUALITY ANALYTICS
          </div>

          <h1>Quality Report</h1>

          <p>
            Monitor inspections, quality results, failed batches and
            quarantine actions across production.
          </p>
        </div>

        <button className="quality-report-export-button" onClick={exportCSV}>
          <Download size={18} />
          Export CSV
        </button>
      </section>

      <section className="quality-report-summary-grid">
        <div className="quality-report-summary-card">
          <div className="quality-report-summary-icon">
            <ClipboardCheck size={20} />
          </div>
          <span>Total Inspections</span>
          <strong>{totalChecks}</strong>
          <small>Recorded quality checks</small>
        </div>

        <div className="quality-report-summary-card">
          <div className="quality-report-summary-icon success">
            <CheckCircle2 size={20} />
          </div>
          <span>Passed</span>
          <strong>{passedChecks}</strong>
          <small>{passRate}% pass rate</small>
        </div>

        <div className="quality-report-summary-card">
          <div className="quality-report-summary-icon warning">
            <AlertTriangle size={20} />
          </div>
          <span>Conditional</span>
          <strong>{conditionalChecks}</strong>
          <small>Needs review</small>
        </div>

        <div className="quality-report-summary-card">
          <div className="quality-report-summary-icon danger">
            <ShieldAlert size={20} />
          </div>
          <span>Failed</span>
          <strong>{failedChecks}</strong>
          <small>Quarantine required</small>
        </div>
      </section>

      <section className="quality-report-insight">
        <div className="quality-report-insight-left">
          <div className="quality-report-insight-icon">
            <PackageCheck size={22} />
          </div>

          <div>
            <strong>Quality pass rate</strong>
            <p>
              {passedChecks} of {totalChecks} inspections passed completely.
            </p>
          </div>
        </div>

        <div className="quality-report-progress">
          <div className="quality-report-progress-top">
            <span>Overall quality performance</span>
            <strong>{passRate}%</strong>
          </div>

          <div className="quality-report-progress-track">
            <div
              className="quality-report-progress-fill"
              style={{ width: `${passRate}%` }}
            ></div>
          </div>
        </div>
      </section>

      <section className="quality-report-panel">
        <div className="quality-report-panel-header">
          <div>
            <h2>Inspection Records</h2>
            <p>Quality inspection history and result status</p>
          </div>

          <span className="quality-report-result-count">
            {filteredChecks.length} records
          </span>
        </div>

        <div className="quality-report-filters">
          <div className="quality-report-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search inspection, product, batch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Check Types</option>
            <option value="Incoming">Incoming</option>
            <option value="In Process">In Process</option>
            <option value="Final">Final</option>
          </select>

          <select
            value={resultFilter}
            onChange={(e) => setResultFilter(e.target.value)}
          >
            <option value="All">All Results</option>
            <option value="Passed">Passed</option>
            <option value="Conditional">Conditional</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="quality-report-table-wrapper">
          <table className="quality-report-table">
            <thead>
              <tr>
                <th>Inspection</th>
                <th>Date</th>
                <th>Reference</th>
                <th>Product</th>
                <th>Batch / Lot</th>
                <th>Type</th>
                <th>Inspector</th>
                <th>Result</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredChecks.map((item) => (
                <tr key={item.inspectionNo}>
                  <td>
                    <strong>{item.inspectionNo}</strong>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <span className="quality-report-reference">
                      {item.reference}
                    </span>
                  </td>

                  <td>
                    <div className="quality-report-product">
                      <strong>{item.product}</strong>
                      <span>
                        {item.passed}/{item.parameters} parameters passed
                      </span>
                    </div>
                  </td>

                  <td>{item.batch}</td>

                  <td>
                    <span className="quality-report-type">
                      {item.type}
                    </span>
                  </td>

                  <td>{item.inspector}</td>

                  <td>
                    <span
                      className={`quality-report-status ${item.result
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {item.result}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`quality-report-action ${item.action
                        .toLowerCase()}`}
                    >
                      {item.action}
                    </span>
                  </td>

                  <td>
                    <div className="quality-report-actions">
                      <button onClick={() => setSelectedCheck(item)}>
                        <Eye size={16} />
                      </button>

                      <button
                        className="danger"
                        onClick={() => deleteCheck(item.inspectionNo)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredChecks.length === 0 && (
                <tr>
                  <td colSpan="10">
                    <div className="quality-report-empty">
                      No quality inspection records found.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedCheck && (
        <div
          className="quality-report-modal-overlay"
          onClick={() => setSelectedCheck(null)}
        >
          <div
            className="quality-report-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quality-report-modal-header">
              <div>
                <span>QUALITY INSPECTION</span>
                <h2>{selectedCheck.inspectionNo}</h2>
              </div>

              <button onClick={() => setSelectedCheck(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="quality-report-detail-grid">
              <div>
                <span>Date</span>
                <strong>{selectedCheck.date}</strong>
              </div>

              <div>
                <span>Reference</span>
                <strong>{selectedCheck.reference}</strong>
              </div>

              <div>
                <span>Check Type</span>
                <strong>{selectedCheck.type}</strong>
              </div>

              <div>
                <span>Product</span>
                <strong>{selectedCheck.product}</strong>
              </div>

              <div>
                <span>Batch / Lot</span>
                <strong>{selectedCheck.batch}</strong>
              </div>

              <div>
                <span>Inspector</span>
                <strong>{selectedCheck.inspector}</strong>
              </div>

              <div>
                <span>Parameters</span>
                <strong>{selectedCheck.parameters}</strong>
              </div>

              <div>
                <span>Passed Parameters</span>
                <strong>
                  {selectedCheck.passed}/{selectedCheck.parameters}
                </strong>
              </div>

              <div>
                <span>Overall Result</span>
                <strong>{selectedCheck.result}</strong>
              </div>

              <div>
                <span>Action</span>
                <strong>{selectedCheck.action}</strong>
              </div>
            </div>

            <div className="quality-report-modal-footer">
              <button onClick={() => setSelectedCheck(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QualityReport;