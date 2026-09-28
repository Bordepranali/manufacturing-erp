import { useMemo, useState } from "react";
import {
  Boxes,
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  X,
  Trash2,
  Layers3,
  Settings2,
  Factory,
  CheckCircle2,
  FileText,
} from "lucide-react";

const initialBoms = [
  {
    id: "BOM-2026-001",
    product: "Industrial Pump",
    code: "FG-001",
    productionQty: 1,
    expectedOutput: 1,
    materials: [
      { product: "Steel Sheet", quantity: 18, unit: "KG" },
      { product: "Aluminium Rod", quantity: 6, unit: "KG" },
      { product: "Industrial Bearing", quantity: 2, unit: "PCS" },
      { product: "Lubricant Oil", quantity: 1, unit: "Litre" },
    ],
    steps: [
      { name: "Frame Fabrication", area: "CNC & Fabrication" },
      { name: "Component Assembly", area: "Assembly Line" },
      { name: "Testing", area: "Quality Work Area" },
    ],
    status: "Approved",
    updated: "10 Sep 2026",
    notes: "Standard BOM for industrial pump production.",
  },
  {
    id: "BOM-2026-002",
    product: "Machine Frame",
    code: "SF-001",
    productionQty: 1,
    expectedOutput: 1,
    materials: [
      { product: "Steel Sheet", quantity: 25, unit: "KG" },
      { product: "Aluminium Rod", quantity: 4, unit: "KG" },
      { product: "Welding Electrode", quantity: 8, unit: "PCS" },
    ],
    steps: [
      { name: "Cutting", area: "Fabrication Area" },
      { name: "Welding", area: "Welding Bay" },
      { name: "Surface Finishing", area: "Finishing Area" },
    ],
    status: "Approved",
    updated: "08 Sep 2026",
    notes: "Frame assembly BOM.",
  },
  {
    id: "BOM-2026-003",
    product: "Hydraulic Pump Assembly",
    code: "FG-002",
    productionQty: 1,
    expectedOutput: 1,
    materials: [
      { product: "Steel Sheet", quantity: 12, unit: "KG" },
      { product: "Industrial Bearing", quantity: 3, unit: "PCS" },
      { product: "Lubricant Oil", quantity: 2, unit: "Litre" },
    ],
    steps: [
      { name: "Component Preparation", area: "Production Floor" },
      { name: "Assembly", area: "Assembly Line" },
      { name: "Performance Testing", area: "Testing Area" },
    ],
    status: "Draft",
    updated: "07 Sep 2026",
    notes: "New hydraulic pump assembly configuration.",
  },
  {
    id: "BOM-2026-004",
    product: "Motor Mount",
    code: "SF-003",
    productionQty: 1,
    expectedOutput: 1,
    materials: [
      { product: "Steel Sheet", quantity: 8, unit: "KG" },
      { product: "Welding Electrode", quantity: 4, unit: "PCS" },
    ],
    steps: [
      { name: "Sheet Cutting", area: "Fabrication Area" },
      { name: "Welding", area: "Welding Bay" },
    ],
    status: "Inactive",
    updated: "03 Sep 2026",
    notes: "Older configuration retained for reference.",
  },
];

const finishedProducts = [
  { name: "Industrial Pump", code: "FG-001" },
  { name: "Hydraulic Pump Assembly", code: "FG-002" },
  { name: "Machine Frame", code: "SF-001" },
  { name: "Motor Mount", code: "SF-003" },
];

const materialOptions = [
  { name: "Steel Sheet", unit: "KG" },
  { name: "Aluminium Rod", unit: "KG" },
  { name: "Industrial Bearing", unit: "PCS" },
  { name: "Lubricant Oil", unit: "Litre" },
  { name: "Welding Electrode", unit: "PCS" },
  { name: "Machine Belt", unit: "PCS" },
];

const workAreas = [
  "Fabrication Area",
  "CNC & Fabrication",
  "Welding Bay",
  "Assembly Line",
  "Production Floor",
  "Finishing Area",
  "Testing Area",
  "Quality Work Area",
];

function BOM() {
  const [boms, setBoms] = useState(initialBoms);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBom, setSelectedBom] = useState(null);

  const [form, setForm] = useState({
    finishedProduct: "",
    productionQty: "1",
    expectedOutput: "1",
    materials: [
      {
        product: "",
        quantity: "",
        unit: "",
      },
    ],
    steps: [
      {
        name: "",
        area: "",
      },
    ],
    notes: "",
  });

  const filteredBoms = useMemo(() => {
    return boms.filter((bom) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        bom.id.toLowerCase().includes(searchValue) ||
        bom.product.toLowerCase().includes(searchValue) ||
        bom.code.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || bom.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [boms, search, statusFilter]);

  const summary = {
    total: boms.length,
    approved: boms.filter((bom) => bom.status === "Approved").length,
    draft: boms.filter((bom) => bom.status === "Draft").length,
    inactive: boms.filter((bom) => bom.status === "Inactive").length,
  };

  const updateMaterial = (index, field, value) => {
    const updated = [...form.materials];
    updated[index][field] = value;

    if (field === "product") {
      const selected = materialOptions.find(
        (item) => item.name === value
      );
      updated[index].unit = selected?.unit || "";
    }

    setForm({
      ...form,
      materials: updated,
    });
  };

  const addMaterial = () => {
    setForm({
      ...form,
      materials: [
        ...form.materials,
        {
          product: "",
          quantity: "",
          unit: "",
        },
      ],
    });
  };

  const removeMaterial = (index) => {
    if (form.materials.length === 1) return;

    setForm({
      ...form,
      materials: form.materials.filter((_, i) => i !== index),
    });
  };

  const updateStep = (index, field, value) => {
    const updated = [...form.steps];
    updated[index][field] = value;

    setForm({
      ...form,
      steps: updated,
    });
  };

  const addStep = () => {
    setForm({
      ...form,
      steps: [
        ...form.steps,
        {
          name: "",
          area: "",
        },
      ],
    });
  };

  const removeStep = (index) => {
    if (form.steps.length === 1) return;

    setForm({
      ...form,
      steps: form.steps.filter((_, i) => i !== index),
    });
  };

  const resetForm = () => {
    setForm({
      finishedProduct: "",
      productionQty: "1",
      expectedOutput: "1",
      materials: [
        {
          product: "",
          quantity: "",
          unit: "",
        },
      ],
      steps: [
        {
          name: "",
          area: "",
        },
      ],
      notes: "",
    });
  };

  const createBom = (status) => {
    const validMaterials = form.materials.filter(
      (item) => item.product && item.quantity
    );

    const validSteps = form.steps.filter(
      (item) => item.name && item.area
    );

    if (!form.finishedProduct) {
      window.alert("Please select a finished product.");
      return;
    }

    if (validMaterials.length === 0) {
      window.alert("Please add at least one raw material or component.");
      return;
    }

    if (validSteps.length === 0) {
      window.alert("Please add at least one production step.");
      return;
    }

    const product = finishedProducts.find(
      (item) => item.name === form.finishedProduct
    );

    const newBom = {
      id: `BOM-2026-${String(boms.length + 1).padStart(3, "0")}`,
      product: form.finishedProduct,
      code: product?.code || "",
      productionQty: Number(form.productionQty),
      expectedOutput: Number(form.expectedOutput),
      materials: validMaterials,
      steps: validSteps,
      status,
      updated: "11 Sep 2026",
      notes: form.notes,
    };

    setBoms([newBom, ...boms]);
    setShowModal(false);
    resetForm();

    window.alert(
      status === "Approved"
        ? "BOM created and approved successfully."
        : "BOM saved as draft successfully."
    );
  };

  const editBom = (bom) => {
    setForm({
      finishedProduct: bom.product,
      productionQty: String(bom.productionQty),
      expectedOutput: String(bom.expectedOutput),
      materials: bom.materials,
      steps: bom.steps,
      notes: bom.notes || "",
    });

    setOpenMenu(null);
    setShowModal(true);
  };

  return (
    <div className="bom-page">
      <div className="bom-heading">
        <div>
          <div className="module-eyebrow">PRODUCTION MANAGEMENT</div>
          <h1>Bill of Materials</h1>
          <p>
            Define the materials and production steps required to manufacture
            each product.
          </p>
        </div>

        <button
          className="bom-add-button"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <Plus size={18} />
          Create BOM
        </button>
      </div>

      <div className="bom-summary-grid">
        <div className="bom-summary-card">
          <div className="bom-summary-icon blue">
            <Layers3 size={21} />
          </div>
          <div>
            <span>Total BOMs</span>
            <strong>{summary.total}</strong>
          </div>
        </div>

        <div className="bom-summary-card">
          <div className="bom-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Approved</span>
            <strong>{summary.approved}</strong>
          </div>
        </div>

        <div className="bom-summary-card">
          <div className="bom-summary-icon orange">
            <FileText size={21} />
          </div>
          <div>
            <span>Draft</span>
            <strong>{summary.draft}</strong>
          </div>
        </div>

        <div className="bom-summary-card">
          <div className="bom-summary-icon gray">
            <Settings2 size={21} />
          </div>
          <div>
            <span>Inactive</span>
            <strong>{summary.inactive}</strong>
          </div>
        </div>
      </div>

      <div className="bom-container">
        <div className="bom-toolbar">
          <div className="bom-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search BOM, product or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bom-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Draft">Draft</option>
            <option value="Inactive">Inactive</option>
          </select>

          <span className="bom-result-count">
            {filteredBoms.length} BOMs
          </span>
        </div>

        <div className="bom-table-wrapper">
          <table className="bom-table">
            <thead>
              <tr>
                <th>BOM</th>
                <th>Finished Product</th>
                <th>Production Qty</th>
                <th>Materials</th>
                <th>Steps</th>
                <th>Expected Output</th>
                <th>Updated</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredBoms.map((bom) => (
                <tr key={bom.id}>
                  <td>
                    <div className="bom-id">
                      <div className="bom-id-icon">
                        <Boxes size={16} />
                      </div>
                      <div>
                        <strong>{bom.id}</strong>
                        <span>{bom.code}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="bom-product">
                      <div className="bom-product-icon">
                        <Factory size={17} />
                      </div>
                      <div>
                        <strong>{bom.product}</strong>
                        <span>Finished Product</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong>{bom.productionQty}</strong>
                  </td>

                  <td>
                    <span className="bom-count">
                      {bom.materials.length} components
                    </span>
                  </td>

                  <td>
                    <span className="bom-count">
                      {bom.steps.length} steps
                    </span>
                  </td>

                  <td>
                    <strong>{bom.expectedOutput}</strong>
                  </td>

                  <td>{bom.updated}</td>

                  <td>
                    <span
                      className={`bom-status ${bom.status.toLowerCase()}`}
                    >
                      {bom.status}
                    </span>
                  </td>

                  <td>
                    <div className="bom-action-area">
                      <button
                        className="bom-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === bom.id ? null : bom.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === bom.id && (
                        <div className="bom-action-menu">
                          <button
                            onClick={() => {
                              setSelectedBom(bom);
                              setOpenMenu(null);
                            }}
                          >
                            <Eye size={15} />
                            View Details
                          </button>

                          <button onClick={() => editBom(bom)}>
                            <Pencil size={15} />
                            Edit BOM
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBoms.length === 0 && (
            <div className="bom-empty-state">
              <Boxes size={34} />
              <h3>No BOMs found</h3>
              <p>Try changing your search or status filter.</p>
            </div>
          )}
        </div>

        <div className="bom-footer">
          Showing {filteredBoms.length} of {boms.length} BOMs
        </div>
      </div>

      {showModal && (
        <div
          className="bom-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bom-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bom-modal-header">
              <div>
                <span>PRODUCTION</span>
                <h2>Create Bill of Materials</h2>
              </div>

              <button onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="bom-form">
              <div className="bom-section-title">
                <div className="bom-section-number">01</div>
                <div>
                  <h3>Product Information</h3>
                  <p>Define the product this BOM will manufacture.</p>
                </div>
              </div>

              <div className="bom-form-row">
                <div className="bom-field">
                  <label>BOM Number</label>
                  <input
                    type="text"
                    value={`BOM-2026-${String(boms.length + 1).padStart(
                      3,
                      "0"
                    )}`}
                    readOnly
                  />
                </div>

                <div className="bom-field">
                  <label>Finished Product *</label>
                  <select
                    value={form.finishedProduct}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        finishedProduct: e.target.value,
                      })
                    }
                  >
                    <option value="">Select finished product</option>
                    {finishedProducts.map((product) => (
                      <option key={product.code} value={product.name}>
                        {product.name} ({product.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bom-form-row">
                <div className="bom-field">
                  <label>Production Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    value={form.productionQty}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        productionQty: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="bom-field">
                  <label>Expected Output *</label>
                  <input
                    type="number"
                    min="1"
                    value={form.expectedOutput}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        expectedOutput: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="bom-section-title bom-section-spacing">
                <div className="bom-section-number">02</div>
                <div>
                  <h3>Raw Materials & Components</h3>
                  <p>Add the materials required for production.</p>
                </div>
              </div>

              <div className="bom-items-header">
                <span>Product / Component</span>
                <span>Quantity</span>
                <span>Unit</span>
                <span></span>
              </div>

              {form.materials.map((material, index) => (
                <div className="bom-item-row" key={index}>
                  <select
                    value={material.product}
                    onChange={(e) =>
                      updateMaterial(
                        index,
                        "product",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select material</option>
                    {materialOptions.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="0"
                    placeholder="Qty"
                    value={material.quantity}
                    onChange={(e) =>
                      updateMaterial(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="text"
                    value={material.unit}
                    placeholder="Unit"
                    readOnly
                  />

                  <button
                    className="bom-remove-row"
                    onClick={() => removeMaterial(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button className="bom-add-row" onClick={addMaterial}>
                <Plus size={15} />
                Add Material
              </button>

              <div className="bom-section-title bom-section-spacing">
                <div className="bom-section-number">03</div>
                <div>
                  <h3>Production Steps</h3>
                  <p>Define the main production sequence and work area.</p>
                </div>
              </div>

              <div className="bom-items-header step-header">
                <span>Step Name</span>
                <span>Machine / Work Area</span>
                <span></span>
              </div>

              {form.steps.map((step, index) => (
                <div className="bom-step-row" key={index}>
                  <input
                    type="text"
                    placeholder="e.g. Frame Fabrication"
                    value={step.name}
                    onChange={(e) =>
                      updateStep(index, "name", e.target.value)
                    }
                  />

                  <select
                    value={step.area}
                    onChange={(e) =>
                      updateStep(index, "area", e.target.value)
                    }
                  >
                    <option value="">Select work area</option>
                    {workAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>

                  <button
                    className="bom-remove-row"
                    onClick={() => removeStep(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button className="bom-add-row" onClick={addStep}>
                <Plus size={15} />
                Add Production Step
              </button>

              <div className="bom-section-title bom-section-spacing">
                <div className="bom-section-number">04</div>
                <div>
                  <h3>Additional Information</h3>
                  <p>Add notes related to this BOM.</p>
                </div>
              </div>

              <div className="bom-field">
                <label>Notes</label>
                <textarea
                  rows="4"
                  placeholder="Add production notes or special instructions..."
                  value={form.notes}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="bom-modal-footer">
              <button
                className="bom-cancel-button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="bom-draft-button"
                onClick={() => createBom("Draft")}
              >
                Save Draft
              </button>

              <button
                className="bom-approve-button"
                onClick={() => createBom("Approved")}
              >
                <CheckCircle2 size={16} />
                Save & Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedBom && (
        <div
          className="bom-modal-overlay"
          onClick={() => setSelectedBom(null)}
        >
          <div
            className="bom-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bom-modal-header">
              <div>
                <span>BOM DETAILS</span>
                <h2>{selectedBom.id}</h2>
              </div>

              <button onClick={() => setSelectedBom(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="bom-details-content">
              <div className="bom-detail-product">
                <div className="bom-detail-product-icon">
                  <Factory size={22} />
                </div>

                <div>
                  <span>FINISHED PRODUCT</span>
                  <h3>{selectedBom.product}</h3>
                  <p>{selectedBom.code}</p>
                </div>

                <span
                  className={`bom-status ${selectedBom.status.toLowerCase()}`}
                >
                  {selectedBom.status}
                </span>
              </div>

              <div className="bom-detail-stats">
                <div>
                  <span>Production Quantity</span>
                  <strong>{selectedBom.productionQty}</strong>
                </div>

                <div>
                  <span>Expected Output</span>
                  <strong>{selectedBom.expectedOutput}</strong>
                </div>

                <div>
                  <span>Materials</span>
                  <strong>{selectedBom.materials.length}</strong>
                </div>

                <div>
                  <span>Production Steps</span>
                  <strong>{selectedBom.steps.length}</strong>
                </div>
              </div>

              <div className="bom-detail-section">
                <div className="bom-detail-section-heading">
                  <Layers3 size={17} />
                  <h3>Required Raw Materials</h3>
                </div>

                <div className="bom-detail-list">
                  {selectedBom.materials.map((material, index) => (
                    <div key={index}>
                      <span>{material.product}</span>
                      <strong>
                        {material.quantity} {material.unit}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bom-detail-section">
                <div className="bom-detail-section-heading">
                  <Settings2 size={17} />
                  <h3>Production Steps</h3>
                </div>

                <div className="bom-step-list">
                  {selectedBom.steps.map((step, index) => (
                    <div key={index}>
                      <div className="bom-step-number">
                        {index + 1}
                      </div>

                      <div>
                        <strong>{step.name}</strong>
                        <span>{step.area}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedBom.notes && (
                <div className="bom-notes-box">
                  <span>NOTES</span>
                  <p>{selectedBom.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BOM;