import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Package,
  SlidersHorizontal,
  Boxes,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    code: "RM-001",
    name: "Steel Sheet",
    type: "Raw Material",
    category: "Steel",
    unit: "KG",
    stock: 2450,
    minimumStock: 500,
    purchasePrice: 82,
    sellingPrice: 95,
    status: "Active",
  },
  {
    id: 2,
    code: "RM-002",
    name: "Aluminium Rod",
    type: "Raw Material",
    category: "Metal",
    unit: "KG",
    stock: 380,
    minimumStock: 500,
    purchasePrice: 210,
    sellingPrice: 245,
    status: "Low Stock",
  },
  {
    id: 3,
    code: "SF-001",
    name: "Machine Frame",
    type: "Semi-Finished",
    category: "Components",
    unit: "PCS",
    stock: 125,
    minimumStock: 50,
    purchasePrice: 1450,
    sellingPrice: 1750,
    status: "Active",
  },
  {
    id: 4,
    code: "FG-001",
    name: "Industrial Pump",
    type: "Finished Product",
    category: "Pumps",
    unit: "PCS",
    stock: 68,
    minimumStock: 20,
    purchasePrice: 8200,
    sellingPrice: 10500,
    status: "Active",
  },
  {
    id: 5,
    code: "RM-003",
    name: "Lubricant Oil",
    type: "Consumable",
    category: "Maintenance",
    unit: "Litre",
    stock: 42,
    minimumStock: 60,
    purchasePrice: 320,
    sellingPrice: 380,
    status: "Low Stock",
  },
];

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredProducts = products.filter((product) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchValue) ||
      product.code.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue);

    const matchesType =
      typeFilter === "All" || product.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const totalProducts = products.length;
  const lowStock = products.filter(
    (product) => product.status === "Low Stock"
  ).length;
  const activeProducts = products.filter(
    (product) => product.status === "Active"
  ).length;

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this product?"
    );

    if (confirmed) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id
            ? { ...product, status: "Inactive" }
            : product
        )
      );
    }
  };

  return (
    <div className="products-page">
      <div className="products-heading">
        <div>
          <span className="module-eyebrow">MASTER DATA</span>
          <h1>Products</h1>
          <p>Manage products, materials and inventory items.</p>
        </div>

        <button className="products-add-button">
          <Plus size={17} />
          Add Product
        </button>
      </div>

      <div className="product-summary-grid">
        <div className="product-summary-card">
          <div className="product-summary-icon violet">
            <Package size={19} />
          </div>
          <div>
            <span>Total Products</span>
            <strong>{totalProducts}</strong>
          </div>
        </div>

        <div className="product-summary-card">
          <div className="product-summary-icon green">
            <CheckCircle2 size={19} />
          </div>
          <div>
            <span>Active Products</span>
            <strong>{activeProducts}</strong>
          </div>
        </div>

        <div className="product-summary-card">
          <div className="product-summary-icon orange">
            <AlertTriangle size={19} />
          </div>
          <div>
            <span>Low Stock</span>
            <strong>{lowStock}</strong>
          </div>
        </div>

        <div className="product-summary-card">
          <div className="product-summary-icon blue">
            <Boxes size={19} />
          </div>
          <div>
            <span>Categories</span>
            <strong>12</strong>
          </div>
        </div>
      </div>

      <div className="products-container">
        <div className="products-toolbar">
          <div className="products-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search by name, code or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="products-toolbar-right">
            <div className="products-filter">
              <SlidersHorizontal size={15} />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Raw Material">Raw Material</option>
                <option value="Semi-Finished">Semi-Finished</option>
                <option value="Finished Product">Finished Product</option>
                <option value="Consumable">Consumable</option>
                <option value="Spare Part">Spare Part</option>
              </select>
            </div>

            <span className="product-result-count">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>TYPE</th>
                <th>CATEGORY</th>
                <th>STOCK</th>
                <th>PRICES</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const stockPercentage = Math.min(
                  (product.stock / (product.minimumStock * 4)) * 100,
                  100
                );

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="product-main-info">
                        <div className="product-image-placeholder">
                          <Package size={17} />
                        </div>

                        <div>
                          <strong>{product.name}</strong>
                          <span>{product.code}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="product-type">
                        {product.type}
                      </span>
                    </td>

                    <td>
                      <span className="product-category">
                        {product.category}
                      </span>
                    </td>

                    <td>
                      <div className="stock-info">
                        <div>
                          <strong>{product.stock.toLocaleString()}</strong>
                          <span>{product.unit}</span>
                        </div>

                        <div className="stock-progress">
                          <div
                            style={{ width: `${stockPercentage}%` }}
                          ></div>
                        </div>

                        <small>
                          Min. {product.minimumStock.toLocaleString()}
                        </small>
                      </div>
                    </td>

                    <td>
                      <div className="price-info">
                        <strong>
                          ₹{product.sellingPrice.toLocaleString()}
                        </strong>
                        <span>
                          Buy ₹{product.purchasePrice.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`product-status ${
                          product.status === "Low Stock"
                            ? "low"
                            : product.status === "Inactive"
                            ? "inactive"
                            : "active"
                        }`}
                      >
                        <span></span>
                        {product.status}
                      </span>
                    </td>

                    <td>
                      <div className="product-actions">
                        <button title="View">
                          <Eye size={15} />
                        </button>

                        <button title="Edit">
                          <Pencil size={15} />
                        </button>

                        <button
                          className="danger-action"
                          title="Deactivate"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" className="products-empty">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="products-footer">
          <span>
            Showing {filteredProducts.length} of {products.length} products
          </span>

          <div className="pagination">
            <button disabled>Previous</button>
            <button className="pagination-active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;