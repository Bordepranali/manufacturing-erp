import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Pencil,
  CheckCircle2,
  Clock3,
  PackageCheck,
  AlertTriangle,
  Upload,
  X,
  FileText
} from "lucide-react";

const receiptData = [
  {
    id: "GRN-2026-001",
    po: "PO-2026-001",
    supplier: "Tata Steel Industries",
    date: "10 Sep 2026",
    invoice: "TSI-45821",
    warehouse: "Main Warehouse",
    items: 4,
    received: "450 KG",
    quality: "Passed",
    status: "Completed"
  },
  {
    id: "GRN-2026-002",
    po: "PO-2026-002",
    supplier: "Hindalco Metals",
    date: "09 Sep 2026",
    invoice: "HM-78214",
    warehouse: "Raw Material Store",
    items: 3,
    received: "280 KG",
    quality: "Passed",
    status: "Completed"
  },
  {
    id: "GRN-2026-003",
    po: "PO-2026-003",
    supplier: "SKF Industrial Supplies",
    date: "08 Sep 2026",
    invoice: "SKF-23190",
    warehouse: "Components Store",
    items: 6,
    received: "120 PCS",
    quality: "Pending",
    status: "Pending"
  },
  {
    id: "GRN-2026-004",
    po: "PO-2026-004",
    supplier: "Castrol Manufacturing",
    date: "07 Sep 2026",
    invoice: "CM-11984",
    warehouse: "Maintenance Store",
    items: 2,
    received: "85 Litre",
    quality: "Rejected",
    status: "Rejected"
  },
  {
    id: "GRN-2026-005",
    po: "PO-2026-005",
    supplier: "Industrial Tools Co.",
    date: "05 Sep 2026",
    invoice: "ITC-55127",
    warehouse: "Main Warehouse",
    items: 5,
    received: "96 PCS",
    quality: "Passed",
    status: "Completed"
  }
];

const poData = [
  {
    po: "PO-2026-001",
    supplier: "Tata Steel Industries",
    warehouse: "Main Warehouse"
  },
  {
    po: "PO-2026-002",
    supplier: "Hindalco Metals",
    warehouse: "Raw Material Store"
  },
  {
    po: "PO-2026-003",
    supplier: "SKF Industrial Supplies",
    warehouse: "Components Store"
  },
  {
    po: "PO-2026-004",
    supplier: "Castrol Manufacturing",
    warehouse: "Maintenance Store"
  },
  {
    po: "PO-2026-005",
    supplier: "Industrial Tools Co.",
    warehouse: "Main Warehouse"
  }
];

const productOptions = [
  "Steel Sheet",
  "Aluminium Rod",
  "Industrial Bearing",
  "Lubricant Oil",
  "Machine Belt",
  "Welding Electrode"
];

function GoodsReceipt() {
  const [search, setSearch] = useState("");
  const [qualityFilter, setQualityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    po: "",
    supplier: "",
    receiptDate: "11 Sep 2026",
    invoice: "",
    warehouse: "",
    remarks: "",
    document: null
  });

  const [items, setItems] = useState([
    {
      product: "",
      orderedQty: "",
      receivedQty: "",
      acceptedQty: "",
      rejectedQty: "",
      batch: "",
      quality: "Pending"
    }
  ]);

  const filteredReceipts = useMemo(() => {
    return receiptData.filter((receipt) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        receipt.id.toLowerCase().includes(searchText) ||
        receipt.po.toLowerCase().includes(searchText) ||
        receipt.supplier.toLowerCase().includes(searchText) ||
        receipt.invoice.toLowerCase().includes(searchText);

      const matchesQuality =
        qualityFilter === "All" || receipt.quality === qualityFilter;

      const matchesStatus =
        statusFilter === "All" || receipt.status === statusFilter;

      return matchesSearch && matchesQuality && matchesStatus;
    });
  }, [search, qualityFilter, statusFilter]);

  const completedCount = receiptData.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingCount = receiptData.filter(
    (item) => item.status === "Pending"
  ).length;

  const rejectedCount = receiptData.filter(
    (item) => item.status === "Rejected"
  ).length;

  const passedCount = receiptData.filter(
    (item) => item.quality === "Passed"
  ).length;

  const handlePOChange = (value) => {
    const selectedPO = poData.find((item) => item.po === value);

    setForm((prev) => ({
      ...prev,
      po: value,
      supplier: selectedPO?.supplier || "",
      warehouse: selectedPO?.warehouse || ""
    }));
  };

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
              ...(field === "receivedQty" && {
                acceptedQty: value
              })
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        product: "",
        orderedQty: "",
        receivedQty: "",
        acceptedQty: "",
        rejectedQty: "",
        batch: "",
        quality: "Pending"
      }
    ]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleFileChange = (event) => {
    setForm((prev) => ({
      ...prev,
      document: event.target.files[0]
    }));
  };

  const closeModal = () => {
    setShowModal(false);
    setItems([
      {
        product: "",
        orderedQty: "",
        receivedQty: "",
        acceptedQty: "",
        rejectedQty: "",
        batch: "",
        quality: "Pending"
      }
    ]);
  };

  const handleSave = (action) => {
    if (!form.po || !form.invoice || !form.warehouse) {
      window.alert("Please select PO, enter Invoice / Challan Number and Warehouse.");
      return;
    }

    window.alert(
      action === "save"
        ? "Goods Receipt saved successfully."
        : "Goods Receipt marked as received."
    );

    closeModal();
  };

  return (
    <div className="goods-receipt-page">
      <div className="goods-receipt-heading">
        <div>
          <div className="module-eyebrow">PURCHASE / GOODS RECEIPT</div>
          <h1>Goods Receipt</h1>
          <p>Record incoming materials and verify received quantities.</p>
        </div>

        <button
          className="goods-receipt-add-button"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          Receive Material
        </button>
      </div>

      <div className="goods-receipt-summary-grid">
        <div className="goods-receipt-summary-card">
          <div className="goods-receipt-summary-icon blue">
            <PackageCheck size={21} />
          </div>
          <div>
            <span>Total Receipts</span>
            <strong>{receiptData.length}</strong>
            <small>Material receipts</small>
          </div>
        </div>

        <div className="goods-receipt-summary-card">
          <div className="goods-receipt-summary-icon green">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
            <small>Successfully received</small>
          </div>
        </div>

        <div className="goods-receipt-summary-card">
          <div className="goods-receipt-summary-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending Quality</span>
            <strong>{pendingCount}</strong>
            <small>Awaiting inspection</small>
          </div>
        </div>

        <div className="goods-receipt-summary-card">
          <div className="goods-receipt-summary-icon red">
            <AlertTriangle size={21} />
          </div>
          <div>
            <span>Rejected</span>
            <strong>{rejectedCount}</strong>
            <small>Quality rejected</small>
          </div>
        </div>
      </div>

      <div className="goods-receipt-container">
        <div className="goods-receipt-toolbar">
          <div className="goods-receipt-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search GRN, PO, supplier or invoice..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="goods-receipt-filter">
            <SlidersHorizontal size={17} />
            <select
              value={qualityFilter}
              onChange={(e) => setQualityFilter(e.target.value)}
            >
              <option value="All">All Quality</option>
              <option value="Passed">Passed</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="goods-receipt-filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="goods-receipt-result-count">
            {filteredReceipts.length} receipts
          </div>
        </div>

        <div className="goods-receipt-table-wrapper">
          <table className="goods-receipt-table">
            <thead>
              <tr>
                <th>GRN</th>
                <th>Purchase Order</th>
                <th>Supplier</th>
                <th>Receipt Date</th>
                <th>Invoice / Challan</th>
                <th>Warehouse</th>
                <th>Items</th>
                <th>Received</th>
                <th>Quality</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredReceipts.map((receipt) => (
                <tr key={receipt.id}>
                  <td>
                    <div className="grn-main-info">
                      <div className="grn-icon">
                        <FileText size={17} />
                      </div>
                      <div>
                        <strong>{receipt.id}</strong>
                        <span>Material Receipt</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="grn-po">{receipt.po}</span>
                  </td>

                  <td>
                    <strong className="grn-supplier">
                      {receipt.supplier}
                    </strong>
                  </td>

                  <td>
                    <span className="grn-date">{receipt.date}</span>
                  </td>

                  <td>
                    <span className="grn-invoice">{receipt.invoice}</span>
                  </td>

                  <td>
                    <span className="grn-warehouse">
                      {receipt.warehouse}
                    </span>
                  </td>

                  <td>
                    <span className="grn-items">{receipt.items} items</span>
                  </td>

                  <td>
                    <strong className="grn-received">
                      {receipt.received}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`grn-quality ${receipt.quality
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span></span>
                      {receipt.quality}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`grn-status ${receipt.status.toLowerCase()}`}
                    >
                      <span></span>
                      {receipt.status}
                    </span>
                  </td>

                  <td>
                    <div className="grn-action-area">
                      <button
                        className="grn-more-button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === receipt.id ? null : receipt.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenu === receipt.id && (
                        <div className="grn-action-menu">
                          <button>
                            <Eye size={15} />
                            View
                          </button>

                          <button>
                            <Pencil size={15} />
                            Edit
                          </button>

                          {receipt.status === "Pending" && (
                            <button>
                              <CheckCircle2 size={15} />
                              Complete
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReceipts.length === 0 && (
            <div className="grn-empty-state">
              <PackageCheck size={34} />
              <strong>No goods receipts found</strong>
              <span>Try changing your search or filters.</span>
            </div>
          )}
        </div>

        <div className="goods-receipt-footer">
          <span>
            Showing {filteredReceipts.length} of {receiptData.length} receipts
          </span>

          <div className="grn-pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="grn-modal-overlay">
          <div className="grn-modal">
            <div className="grn-modal-header">
              <div>
                <span>NEW MATERIAL RECEIPT</span>
                <h2>Receive Material</h2>
                <p>Create a Goods Receipt against an existing Purchase Order.</p>
              </div>

              <button className="grn-close-button" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div className="grn-modal-body">
              <div className="grn-form-section">
                <div className="grn-section-title">
                  <div>
                    <span>01</span>
                    <div>
                      <strong>Receipt Information</strong>
                      <small>Link the receipt to the purchase order.</small>
                    </div>
                  </div>
                </div>

                <div className="grn-form-grid">
                  <label>
                    Purchase Order
                    <select
                      value={form.po}
                      onChange={(e) => handlePOChange(e.target.value)}
                    >
                      <option value="">Select Purchase Order</option>
                      {poData.map((po) => (
                        <option key={po.po} value={po.po}>
                          {po.po} — {po.supplier}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Supplier
                    <input
                      type="text"
                      value={form.supplier}
                      placeholder="Auto-filled from PO"
                      readOnly
                    />
                  </label>

                  <label>
                    Receipt Date
                    <input
                      type="date"
                      value="2026-09-11"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          receiptDate: e.target.value
                        }))
                      }
                    />
                  </label>

                  <label>
                    Invoice / Challan Number
                    <input
                      type="text"
                      placeholder="Enter invoice or challan number"
                      value={form.invoice}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          invoice: e.target.value
                        }))
                      }
                    />
                  </label>

                  <label>
                    Warehouse
                    <select
                      value={form.warehouse}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          warehouse: e.target.value
                        }))
                      }
                    >
                      <option value="">Select Warehouse</option>
                      <option>Main Warehouse</option>
                      <option>Raw Material Store</option>
                      <option>Components Store</option>
                      <option>Maintenance Store</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="grn-form-section">
                <div className="grn-section-title">
                  <div>
                    <span>02</span>
                    <div>
                      <strong>Received Materials</strong>
                      <small>Record ordered, received and accepted quantities.</small>
                    </div>
                  </div>

                  <button className="grn-add-row-button" onClick={addItem}>
                    <Plus size={16} />
                    Add Row
                  </button>
                </div>

                <div className="grn-items-table-wrapper">
                  <table className="grn-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Ordered Qty</th>
                        <th>Received Qty</th>
                        <th>Accepted Qty</th>
                        <th>Rejected Qty</th>
                        <th>Batch Number</th>
                        <th>Quality</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <select
                              value={item.product}
                              onChange={(e) =>
                                updateItem(index, "product", e.target.value)
                              }
                            >
                              <option value="">Select Product</option>
                              {productOptions.map((product) => (
                                <option key={product}>{product}</option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <input
                              type="number"
                              placeholder="0"
                              value={item.orderedQty}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "orderedQty",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              placeholder="0"
                              value={item.receivedQty}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "receivedQty",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              placeholder="0"
                              value={item.acceptedQty}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "acceptedQty",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="number"
                              placeholder="0"
                              value={item.rejectedQty}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "rejectedQty",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              placeholder="Batch No."
                              value={item.batch}
                              onChange={(e) =>
                                updateItem(index, "batch", e.target.value)
                              }
                            />
                          </td>

                          <td>
                            <select
                              value={item.quality}
                              onChange={(e) =>
                                updateItem(index, "quality", e.target.value)
                              }
                            >
                              <option>Pending</option>
                              <option>Passed</option>
                              <option>Rejected</option>
                            </select>
                          </td>

                          <td>
                            <button
                              className="grn-remove-row"
                              onClick={() => removeItem(index)}
                            >
                              <X size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grn-form-section">
                <div className="grn-section-title">
                  <div>
                    <span>03</span>
                    <div>
                      <strong>Remarks & Documents</strong>
                      <small>Add supporting information if required.</small>
                    </div>
                  </div>
                </div>

                <div className="grn-bottom-grid">
                  <label>
                    Remarks
                    <textarea
                      rows="4"
                      placeholder="Enter remarks about the received material..."
                      value={form.remarks}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          remarks: e.target.value
                        }))
                      }
                    />
                  </label>

                  <label className="grn-upload-box">
                    <span>Document / Photo</span>

                    <div className="grn-upload-content">
                      <Upload size={21} />
                      <strong>
                        {form.document
                          ? form.document.name
                          : "Upload invoice, challan or photo"}
                      </strong>
                      <small>Click to choose a file</small>
                    </div>

                    <input type="file" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>

            <div className="grn-modal-footer">
              <button className="grn-cancel-button" onClick={closeModal}>
                Cancel
              </button>

              <div>
                <button
                  className="grn-save-button"
                  onClick={() => handleSave("save")}
                >
                  Save Draft
                </button>

                <button
                  className="grn-complete-button"
                  onClick={() => handleSave("complete")}
                >
                  <CheckCircle2 size={17} />
                  Mark as Received
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoodsReceipt;