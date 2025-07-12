// File: App.js
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function ThemeSelection({ setSelectedTheme, selectedTheme }) {
  const navigate = useNavigate();
  const themes = [
    { id: "bags", name: "Bags theme", recommended: true, image: "bags.jpg" },
    { id: "flex", name: "Flex theme", image: "flex.jpg" },
    { id: "chic", name: "Chic theme", image: "chic.jpg" }
  ];

  return (
    <div>
      <h2 className="mb-4 fw-bold">Apply a theme</h2>
      <div className="row">
        {themes.map((theme) => (
          <div className="col-md-4 mb-4" key={theme.id}>
            <div className={`theme-card ${selectedTheme === theme.id ? "selected" : ""}`}>
              <img src={`assets/${theme.image}`} alt={theme.name} />
              <h3 className="mt-3 fw-bold">{theme.name}</h3>
              {theme.recommended && <p className="text-muted fw-bold">(recommended)</p>}
              {selectedTheme === theme.id ? (
                <button className="btn btn-outline-success" disabled>✓ Applied</button>
              ) : (
                <button className="btn btn-outline-primary" onClick={() => setSelectedTheme(theme.id)}>Apply</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-end">
        <button className="btn btn-primary" onClick={() => navigate("/category")}>Next</button>
      </div>
    </div>
  );
}

function CategoryForm({ productType, setProductType, category, setCategory, subCategory, setSubCategory }) {
  const navigate = useNavigate();

  return (
    <div className="category-box bg-light row justify-content-center align-items-center p-4" style={{ minHeight: '600px', marginTop: '120px' }}>
      <div className="col-md-6 mb-4">
        <h3 className="fw-bold mb-4">Let's add a type, Category and Sub-category</h3>
        <input className="form-control mb-3" placeholder="Product Type" value={productType} onChange={(e) => setProductType(e.target.value)} />
        <input className="form-control mb-3" placeholder="Category (optional)" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="form-control mb-3" placeholder="Sub-Category (optional)" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
        <div className="d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>Back</button>
          <button className="btn btn-primary" onClick={() => navigate("/product")}>Next</button>
        </div>
      </div>

      <div className="col-md-6">
        <div className="bg-white border rounded p-4 shadow-sm text-center">
          <h3 className="fw-bold mb-3">Details</h3>
          <div className="d-flex flex-column align-items-center">
            <div className="flow-box bg-primary text-white mb-2 fw-bold">{productType || "Product Type"}</div>
            <div className="flow-arrow fw-bold">↓</div>
            <div className="flow-box bg-warning text-dark mb-2 fw-bold">{category || "Category"}</div>
            <div className="flow-arrow fw-bold">↓</div>
            <div className="flow-layout fw-bold">
              <div className="flow-box bg-warning text-dark fw-bold">{subCategory || "Sub-Category"}</div>
              <div className="flow-arrow">→</div>
              <div className="flow-box bg-success text-white">Product</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductForm({ productName, setProductName, productDesc, setProductDesc, sku, setSku, handleFinalSubmit }) {
  const navigate = useNavigate();
  const [netPrice, setNetPrice] = useState("");
  const [gst, setGst] = useState("");
  const [discount, setDiscount] = useState("");
  const [shipping, setShipping] = useState("");
  const [stockLevel, setStockLevel] = useState("1");
  const [productImage, setProductImage] = useState(null);

  const qty = parseInt(stockLevel || 0);
  const net = parseFloat(netPrice || 0);
  const gstRate = parseFloat(gst || 0);
  const shippingCharge = parseFloat(shipping || 0);
  const discountRate = parseFloat(discount || 0);

  const gstAmount = (net * gstRate) / 100;
  const singleGross = net + gstAmount + shippingCharge;
  const singleFinal = singleGross - (singleGross * discountRate / 100);

  const grossPrice = singleGross * qty;
  const finalPrice = singleFinal * qty;

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="scroll-form fw-bold">
          <h3><b>ADD YOUR PRODUCT</b></h3>
          <input className="form-control mb-3" placeholder="Product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <textarea className="form-control mb-3" placeholder="Product Description" value={productDesc} onChange={(e) => setProductDesc(e.target.value)} />
          <div className="mb-3">
            <label className="form-label">Add Image</label>
            <input className="form-control" type="file" accept="image/*" onChange={(e) => setProductImage(URL.createObjectURL(e.target.files[0]))} />
          </div>
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <label className="form-check-label">This product has an SKU code</label>
          </div>
          <input className="form-control mb-4" placeholder="e.g. PROD0001" value={sku} onChange={(e) => setSku(e.target.value)} />
          <hr />
          <h3>Pricing Details</h3>
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <label className="form-check-label">Price inclusive of GST</label>
          </div>
          <div className="row g-2">
            <div className="col-6"><input className="form-control" placeholder="Net Price" value={netPrice} onChange={(e) => setNetPrice(e.target.value)} /></div>
            <div className="col-6"><input className="form-control" placeholder="List Price (read-only)" value={singleGross.toFixed(2)} readOnly /></div>
            <div className="col-6"><input className="form-control" placeholder="Discount %" value={discount} onChange={(e) => setDiscount(e.target.value)} /></div>
            <div className="col-6"><input className="form-control" placeholder="GST Rate (%)" value={gst} onChange={(e) => setGst(e.target.value)} /></div>
            <div className="col-6"><input className="form-control" placeholder="Shipping Charges" value={shipping} onChange={(e) => setShipping(e.target.value)} /></div>
            <div className="col-6"><input className="form-control" placeholder="Stock Level (Qty)" value={stockLevel} onChange={(e) => setStockLevel(e.target.value)} /></div>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/category")}>Back</button>
            <button className="btn btn-primary" onClick={handleFinalSubmit}>Next</button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="preview-card" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <div className="image-box">
            <img src={productImage || "assets/placeholder.png"} alt="Preview" />
          </div>
          <h3>{productName || "Product Title"}</h3>
          <p>{productDesc || "Product description preview will appear here."}</p>
          <p>
            <del>Total: ₹ {grossPrice.toFixed(2)}</del> &nbsp;
            ₹ {finalPrice.toFixed(2)}
          </p>
          {qty > 0 && <p><strong>Qty:</strong> {qty}</p>}
          {sku && <p><strong>SKU:</strong> {sku}</p>}
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("theme") || "bags");
  const [productType, setProductType] = useState(localStorage.getItem("productType") || "");
  const [category, setCategory] = useState(localStorage.getItem("category") || "");
  const [subCategory, setSubCategory] = useState(localStorage.getItem("subCategory") || "");
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [sku, setSku] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleFinalSubmit = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      window.location.href = "/";
    }, 2500);
  };

  useEffect(() => {
    localStorage.setItem("theme", selectedTheme);
    localStorage.setItem("productType", productType);
    localStorage.setItem("category", category);
    localStorage.setItem("subCategory", subCategory);
  }, [selectedTheme, productType, category, subCategory]);

  return (
    <div className="container-fluid p-4">
      <Routes>
        <Route path="/" element={<ThemeSelection selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />} />
        <Route path="/category" element={<CategoryForm productType={productType} setProductType={setProductType} category={category} setCategory={setCategory} subCategory={subCategory} setSubCategory={setSubCategory} />} />
        <Route path="/product" element={<ProductForm productName={productName} setProductName={setProductName} productDesc={productDesc} setProductDesc={setProductDesc} sku={sku} setSku={setSku} handleFinalSubmit={handleFinalSubmit} />} />
      </Routes>

      {showPopup && (
        <div className="popup-success">
          <div className="popup-box">
            <span className="popup-check">✔</span>
            <p>Product added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
