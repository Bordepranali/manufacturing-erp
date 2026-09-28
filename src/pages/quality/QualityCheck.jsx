import { useMemo, useState } from "react";
import {
  ClipboardCheck,
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  X,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertTriangle,
  PackageCheck,
  ShieldAlert,
} from "lucide-react";

const qualityData = [
  {
    id: "QC-2026-014",
    checkType: "Raw Material",
    reference: "GRN-2026-014",
    product: "Steel Sheet",
    batch: "ST-SEP26-01",
    inspector: "Sneha Patil",
    date: "10 Sep 2026",
    parameters: 4,
    passed: 4,
    rejectedQty: 0,
    result: "Passed",
    status: "Completed",
  },
  {
    id: "QC-2026-013",
    checkType: "Production",
    reference: "PROD-2026-021",
    product: "Industrial Pump",
    batch: "IP-SEP26-06",
    inspector: "Sneha Patil",
    date: "10 Sep 2026",
    parameters: 5,
    passed: 4,
    rejectedQty: 2,
    result: "Failed",
    status: "Quarantine",
  },
  {
    id: "QC-2026-012",
    checkType: "Raw Material",
    reference: "GRN-2026-012",
    product: "Industrial Bearing",
    batch: "IB-SEP26-05",
    inspector: "Sneha Patil",
    date: "08 Sep 2026",
    parameters: 4,
    passed: 4,
    rejectedQty: 0,
    result: "Passed",
    status: "Completed",
  },
  {
    id: "QC-2026-011",
    checkType: "Finished Product",
    reference: "PROD-2026-017",
    product: "Industrial Pump",
    batch: "IP-SEP26-04",
    inspector: "Sneha Patil",
    date: "09 Sep 2026",
    parameters: 6,
    passed: 6,
    rejectedQty: 0,
    result: "Passed",
    status: "Completed",
  },
  {
    id: "QC-2026-010",
    checkType: "Production",
    reference: "PROD-2026-020",
    product: "Machine Frame",
    batch: "MF-SEP26-02",
    inspector: "Sneha Patil",
    date: "09 Sep 2026",
    parameters: 5,
    passed: 5,
    rejectedQty: 0,
    result: "Passed",
    status: "Completed",
  },
  {
    id: "QC-2026-009",
    checkType: "Raw Material",
    reference: "GRN-2026-010",
    product: "Aluminium Rod",
    batch: "AL-SEP26-04",
    inspector: "Sneha Patil",
    date: "07 Sep 2026",
    parameters: 4,
    passed: 3,
    rejectedQty: 15,
    result: "Failed",
    status: "Rejected",
  },
];

const products = [
  {
    name: "Steel Sheet",
    unit: "KG",
    type: "Raw Material",
  },
  {
    name: "Aluminium Rod",
    unit: "KG",
    type: "Raw Material",
  },
  {
    name: "Industrial Bearing",
    unit: "PCS",
    type: "Raw Material",
  },
  {
    name: "Industrial Pump",
    unit: "PCS",
    type: "Finished Product",
  },
  {
    name: "Machine Frame",
    unit: "PCS",
    type: "Semi-Finished",
  },
];

const initialParameters = [
  {
    parameter: "Dimension",
    expected: "100 ± 2 mm",
    actual: "100 mm",
    result: "Pass",
  },
  {
    parameter: "Surface Finish",
    expected: "Smooth",
    actual: "Smooth",
    result: "Pass",
  },
];

function QualityCheck() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    inspectionNumber: "QC-2026-015",
    checkType: "Production",
    reference: "PROD-2026-021",
    product: "Industrial Pump",
    batchNumber: "IP-SEP26-07",
    inspector: "Sneha Patil",
    rejectedQuantity: "",
    rejectionAction: "Quarantine",
    remarks: "",
  });

  const [parameters, setParameters] = useState(initialParameters);

  const filteredData = useMemo(() => {
    return qualityData.filter((item) => {
      const searchMatch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.reference.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.batch.toLowerCase().includes(search.toLowerCase());

      const typeMatch =
        typeFilter === "All" || item.checkType === typeFilter;

      const resultMatch =
        resultFilter === "All" || item.result === resultFilter;

      return searchMatch && typeMatch && resultMatch;
    });
  }, [search, typeFilter, resultFilter]);

  const totalChecks = qualityData.length;
  const passedChecks = qualityData.filter(
    (item) => item.result === "Passed"
  ).length;
  const failedChecks = qualityData.filter(
    (item) => item.result === "Failed"
  ).length;
  const quarantineChecks = qualityData.filter(
    (item) => item.status === "Quarantine"
  ).length;

  const overallResult = parameters.every(
    (item) => item.result === "Pass"
  )
    ? "Pass"
    : "Fail";

  const updateParameter = (index, field, value) => {
    setParameters((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addParameter = () => {
    setParameters((current) => [
      ...current,
      {
        parameter: "",
        expected: "",
        actual: "",
        result: "Pass",
      },
    ]);
  };

  const removeParameter = (index) => {
    if (parameters.length === 1) return;

    setParameters((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const resetForm = () => {
    setForm({
      inspectionNumber: "QC-2026-015",
      checkType: "Production",
      reference: "PROD-2026-021",
      product: "Industrial Pump",
      batchNumber: "IP-SEP26-07",
      inspector: "Sneha Patil",
      rejectedQuantity: "",
      rejectionAction: "Quarantine",
      remarks: "",
    });

    setParameters(initialParameters);
  };

  const handleSave = () => {
    const invalidParameter = parameters.some(
      (item) =>
        !item.parameter.trim() ||
        !item.expected.trim() ||
        !item.actual.trim()
    );

    if (
      !form.reference ||
      !form.product ||
      !form.batchNumber ||
      invalidParameter
    ) {
      window.alert("Please complete all required quality check fields.");
      return;
    }

    window.alert(
      `${form.inspectionNumber} saved with result: ${overallResult}`
    );

    setShowModal(false);
    resetForm();
  };

  const getResultClass = (result) => {
    if (result === "Passed") {
      return "quality-result passed";
    }

    if (result === "Failed") {
      return "quality-result failed";
    }

    return "quality-result pending";
  };

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "quality-status completed";
    }

    if (status === "Quarantine") {
      return "quality-status quarantine";
    }

    return "quality-status pending";
  };

  return (
    <div className="quality-page">
      <div className="quality-heading">
        <div>
          <div className="module-eyebrow">QUALITY CONTROL</div>
          <h1>Quality Checks</h1>
          <p>
            Inspect raw materials, production output and finished products.
          </p>
        </div>

        <button
          className="quality-add-button"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={17} />
          New Quality Check
        </button>
      </div>

      <div className="quality-summary-grid">
        <div className="quality-summary-card">
          <div className="quality-summary-icon blue">
            <ClipboardCheck size={21} />
          </div>
          <div>
            <span>Total Checks</span>
            <strong>{totalChecks}</strong>
            <small>Inspections recorded</small>
          </div>
        </div>

        <div className="quality-summary-card">
          <div className="quality-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Passed</span>
            <strong>{passedChecks}</strong>
            <small>Quality checks passed</small>
          </div>
        </div>

        <div className="quality-summary-card">
          <div className="quality-summary-icon red">
            <XCircle size={21} />
          </div>
          <div>
            <span>Rejected</span>
            <strong>{failedChecks}</strong>
            <small>Failed inspections</small>
          </div>
        </div>

        <div className="quality-summary-card">
          <div className="quality-summary-icon orange">
            <ShieldAlert size={21} />
          </div>
          <div>
            <span>Quarantine</span>
            <strong>{quarantineChecks}</strong>
            <small>Awaiting decision</small>
          </div>
        </div>
      </div>

      <div className="quality-info-banner">
        <div className="quality-info-icon">
          <PackageCheck size={20} />
        </div>

        <div>
          <strong>Quality control overview</strong>
          <p>
            Record inspection parameters and mark products as passed,
            rejected or quarantined.
          </p>
        </div>

        <div className="quality-banner-stat">
          <span>Pass Rate</span>
          <strong>
            {Math.round((passedChecks / totalChecks) * 100)}%
          </strong>
        </div>
      </div>

      <div className="quality-table-container">
        <div className="quality-toolbar">
          <div className="quality-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search inspection, product or batch..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="quality-filter">
            <SlidersHorizontal size={16} />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Check Types</option>
              <option value="Raw Material">Raw Material</option>
              <option value="Production">Production</option>
              <option value="Finished Product">
                Finished Product
              </option>
            </select>
          </div>

          <div className="quality-filter">
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
            >
              <option value="All">All Results</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="quality-result-count">
            {filteredData.length} records
          </div>
        </div>

        <div className="quality-table-wrapper">
          <table className="quality-table">
            <thead>
              <tr>
                <th>Inspection</th>
                <th>Check Type</th>
                <th>Product / Batch</th>
                <th>Reference</th>
                <th>Inspector</th>
                <th>Parameters</th>
                <th>Result</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="quality-inspection-cell">
                      <div className="quality-inspection-icon">
                        <ClipboardCheck size={17} />
                      </div>
                      <div>
                        <strong>{item.id}</strong>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="quality-type-badge">
                      {item.checkType}
                    </span>
                  </td>

                  <td>
                    <div className="quality-product-cell">
                      <strong>{item.product}</strong>
                      <span>Batch: {item.batch}</span>
                    </div>
                  </td>

                  <td>
                    <span className="quality-reference">
                      {item.reference}
                    </span>
                  </td>

                  <td>
                    <div className="quality-inspector">
                      <div className="quality-avatar">
                        {item.inspector.charAt(0)}
                      </div>
                      <span>{item.inspector}</span>
                    </div>
                  </td>

                  <td>
                    <div className="quality-parameter-count">
                      <strong>
                        {item.passed}/{item.parameters}
                      </strong>
                      <span>Passed</span>
                    </div>
                  </td>

                  <td>
                    <span className={getResultClass(item.result)}>
                      {item.result === "Passed" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <XCircle size={13} />
                      )}
                      {item.result}
                    </span>
                  </td>

                  <td>
                    <span className={getStatusClass(item.status)}>
                      {item.status === "Quarantine" && (
                        <ShieldAlert size={12} />
                      )}
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="quality-action-area">
                      <button
                        className="quality-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.id ? null : item.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === item.id && (
                        <div className="quality-action-menu">
                          <button
                            onClick={() => {
                              setSelectedCheck(item);
                              setOpenMenu(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button
                            onClick={() => {
                              window.alert(
                                `Editing ${item.id}`
                              );
                              setOpenMenu(null);
                            }}
                          >
                            <Pencil size={15} />
                            Edit Check
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="quality-empty-state">
              <ClipboardCheck size={34} />
              <h3>No quality checks found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>

        <div className="quality-footer">
          <span>
            Showing {filteredData.length} of {qualityData.length} records
          </span>

          <div className="quality-pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="quality-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="quality-form-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quality-modal-header">
              <div>
                <div className="module-eyebrow">NEW INSPECTION</div>
                <h2>Create Quality Check</h2>
                <p>Record inspection and quality results.</p>
              </div>

              <button
                className="quality-close-button"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="quality-form-body">
              <div className="quality-form-section">
                <div className="quality-form-section-title">
                  <ClipboardCheck size={17} />
                  <div>
                    <h3>Inspection Information</h3>
                    <span>Basic inspection details</span>
                  </div>
                </div>

                <div className="quality-form-grid">
                  <div className="quality-field">
                    <label>Inspection Number</label>
                    <input
                      value={form.inspectionNumber}
                      readOnly
                    />
                  </div>

                  <div className="quality-field">
                    <label>Check Type *</label>
                    <select
                      value={form.checkType}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          checkType: e.target.value,
                        })
                      }
                    >
                      <option value="Raw Material">
                        Raw Material
                      </option>
                      <option value="Production">Production</option>
                      <option value="Finished Product">
                        Finished Product
                      </option>
                    </select>
                  </div>

                  <div className="quality-field">
                    <label>Reference GRN / Production Order *</label>
                    <input
                      value={form.reference}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          reference: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="quality-field">
                    <label>Product *</label>
                    <select
                      value={form.product}
                      onChange={(e) => {
                        const selected = products.find(
                          (product) =>
                            product.name === e.target.value
                        );

                        setForm({
                          ...form,
                          product: e.target.value,
                          checkType:
                            selected?.type === "Finished Product"
                              ? "Finished Product"
                              : form.checkType,
                        });
                      }}
                    >
                      {products.map((product) => (
                        <option
                          key={product.name}
                          value={product.name}
                        >
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="quality-field">
                    <label>Batch Number *</label>
                    <input
                      value={form.batchNumber}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          batchNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="quality-field">
                    <label>Inspector</label>
                    <input
                      value={form.inspector}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="quality-form-section">
                <div className="quality-form-section-title">
                  <SlidersHorizontal size={17} />
                  <div>
                    <h3>Check Parameters</h3>
                    <span>
                      Compare expected and actual values
                    </span>
                  </div>
                </div>

                <div className="quality-parameter-table">
                  <div className="quality-parameter-header">
                    <span>Parameter</span>
                    <span>Expected Value</span>
                    <span>Actual Value</span>
                    <span>Result</span>
                    <span></span>
                  </div>

                  {parameters.map((item, index) => (
                    <div
                      className="quality-parameter-row"
                      key={index}
                    >
                      <input
                        placeholder="Parameter"
                        value={item.parameter}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "parameter",
                            e.target.value
                          )
                        }
                      />

                      <input
                        placeholder="Expected"
                        value={item.expected}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "expected",
                            e.target.value
                          )
                        }
                      />

                      <input
                        placeholder="Actual"
                        value={item.actual}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "actual",
                            e.target.value
                          )
                        }
                      />

                      <select
                        value={item.result}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "result",
                            e.target.value
                          )
                        }
                      >
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                      </select>

                      <button
                        className="quality-remove-row"
                        onClick={() =>
                          removeParameter(index)
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="quality-add-row-button"
                  onClick={addParameter}
                >
                  <Plus size={15} />
                  Add Parameter
                </button>
              </div>

              <div className="quality-result-section">
                <div>
                  <span>Overall Result</span>

                  <strong
                    className={
                      overallResult === "Pass"
                        ? "form-result-pass"
                        : "form-result-fail"
                    }
                  >
                    {overallResult === "Pass" ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <XCircle size={18} />
                    )}

                    {overallResult === "Pass"
                      ? "PASS"
                      : "FAIL"}
                  </strong>
                </div>

                {overallResult === "Fail" && (
                  <div className="quality-rejection-warning">
                    <AlertTriangle size={17} />

                    <div>
                      <strong>Quality failure detected</strong>
                      <span>
                        Rejected quantity can be moved to
                        quarantine.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {overallResult === "Fail" && (
                <div className="quality-form-section">
                  <div className="quality-form-section-title">
                    <ShieldAlert size={17} />
                    <div>
                      <h3>Rejected / Quarantine</h3>
                      <span>Handle failed material</span>
                    </div>
                  </div>

                  <div className="quality-form-grid">
                    <div className="quality-field">
                      <label>Rejected Quantity</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Enter quantity"
                        value={form.rejectedQuantity}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            rejectedQuantity: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="quality-field">
                      <label>Action</label>
                      <select
                        value={form.rejectionAction}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            rejectionAction: e.target.value,
                          })
                        }
                      >
                        <option value="Quarantine">
                          Move to Quarantine
                        </option>
                        <option value="Reject">
                          Mark as Rejected
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="quality-form-section">
                <div className="quality-field">
                  <label>Remarks</label>
                  <textarea
                    rows="3"
                    placeholder="Enter inspection remarks..."
                    value={form.remarks}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        remarks: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="quality-modal-actions">
              <button
                className="quality-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="quality-save-button"
                onClick={handleSave}
              >
                <ClipboardCheck size={17} />
                Save Quality Check
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCheck && (
        <div
          className="quality-modal-overlay"
          onClick={() => setSelectedCheck(null)}
        >
          <div
            className="quality-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="quality-modal-header">
              <div>
                <div className="module-eyebrow">
                  QUALITY INSPECTION
                </div>
                <h2>{selectedCheck.id}</h2>
                <p>{selectedCheck.product}</p>
              </div>

              <button
                className="quality-close-button"
                onClick={() => setSelectedCheck(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="quality-details-content">
              <div className="quality-detail-result-card">
                <div
                  className={
                    selectedCheck.result === "Passed"
                      ? "quality-large-result pass"
                      : "quality-large-result fail"
                  }
                >
                  {selectedCheck.result === "Passed" ? (
                    <CheckCircle2 size={25} />
                  ) : (
                    <XCircle size={25} />
                  )}
                </div>

                <div>
                  <span>Overall Result</span>
                  <strong>{selectedCheck.result}</strong>
                  <small>
                    {selectedCheck.passed} of{" "}
                    {selectedCheck.parameters} parameters passed
                  </small>
                </div>
              </div>

              <div className="quality-detail-grid">
                <div>
                  <span>Check Type</span>
                  <strong>{selectedCheck.checkType}</strong>
                </div>

                <div>
                  <span>Reference</span>
                  <strong>{selectedCheck.reference}</strong>
                </div>

                <div>
                  <span>Product</span>
                  <strong>{selectedCheck.product}</strong>
                </div>

                <div>
                  <span>Batch Number</span>
                  <strong>{selectedCheck.batch}</strong>
                </div>

                <div>
                  <span>Inspector</span>
                  <strong>{selectedCheck.inspector}</strong>
                </div>

                <div>
                  <span>Inspection Date</span>
                  <strong>{selectedCheck.date}</strong>
                </div>
              </div>

              {selectedCheck.rejectedQty > 0 && (
                <div className="quality-rejected-detail">
                  <ShieldAlert size={19} />

                  <div>
                    <strong>
                      {selectedCheck.rejectedQty} units rejected
                    </strong>
                    <span>
                      Material is currently marked for
                      quarantine/rejection handling.
                    </span>
                  </div>
                </div>
              )}

              <div className="quality-detail-timeline">
                <div className="quality-timeline-item done">
                  <div>
                    <CheckCircle2 size={15} />
                  </div>
                  <span>Inspection Created</span>
                </div>

                <div className="quality-timeline-item done">
                  <div>
                    <ClipboardCheck size={15} />
                  </div>
                  <span>Parameters Checked</span>
                </div>

                <div
                  className={`quality-timeline-item ${
                    selectedCheck.result === "Passed"
                      ? "done"
                      : "failed"
                  }`}
                >
                  <div>
                    {selectedCheck.result === "Passed" ? (
                      <CheckCircle2 size={15} />
                    ) : (
                      <XCircle size={15} />
                    )}
                  </div>
                  <span>
                    {selectedCheck.result === "Passed"
                      ? "Quality Passed"
                      : "Quality Failed"}
                  </span>
                </div>
              </div>
            </div>

            <div className="quality-modal-actions">
              <button
                className="quality-cancel-button"
                onClick={() => setSelectedCheck(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QualityCheck;