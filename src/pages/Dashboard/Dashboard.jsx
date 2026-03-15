import React, { useEffect, useState } from "react";
import API from "../../services/Api";
import Navbar from "../../components/Navbar/Navbar";
import ProductTable from "../../components/ProductTabel/ProductTable";
import DashboardStats from "../../components/DashboardStats/DashboardStats";
import "./Dashboard.css";

function Dashboard() {

  const [shopStatus, setShopStatus] = useState(false);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location = "/admin";
      return;
    }

    loadData();

  }, []);

  const loadData = async () => {
  try {

    const shop = await API.get("/shop");
    const product = await API.get("/products");

    // Correctly set shop status
    setShopStatus(shop.data.shop?.isOpen || false);

    // Correctly set products
    setProducts(product.data.products || []);

  } catch (error) {
    console.log(error);
  }
};

  const updateShop = async (status) => {

  try {

    const token = localStorage.getItem("adminToken");

    await API.put(
      "/shop",
      { isOpen: status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // update UI instantly
    setShopStatus(status);

  } catch (error) {
    console.log(error);
  }

};

  const updateStock = async (id) => {

    const newStock = prompt("Enter new stock");

    if (!newStock) return;

    try {

      const token = localStorage.getItem("adminToken");

      await API.put(
        `/products/${id}`,
        { stock: newStock },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadData();

    } catch (error) {
      console.log(error);
    }

  };

  const addProduct = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("adminToken");

      await API.post(
        "/products",
        { name, stock, unit },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setName("");
      setStock("");
      setUnit("");

      loadData();

    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }

  };

  const deleteProduct = async (id) => {

    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("adminToken");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      loadData();

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="dashboard-page">

      <Navbar />

      <div className="dashboard-container">

        {/* Stats Row */}
        <DashboardStats
          products={products}
          shopStatus={shopStatus}
        />

        {/* Shop Status + Add Product Row */}
        <div className="dashboard-row">

          <div className="shop-section">

            <h3 className="section-title">Shop Status</h3>

            <p className="shop-status">
              {shopStatus ? "OPEN NOW" : "CLOSED"}
            </p>

            <div className="shop-buttons">

              <button
                className="open-btn"
                onClick={() => updateShop(true)}
              >
                Open
              </button>

              <button
                className="close-btn"
                onClick={() => updateShop(false)}
              >
                Close
              </button>

            </div>

          </div>

          <div className="product-add-section">

            <h3 className="section-title">Add Product</h3>

            <form
              className="add-product-form"
              onSubmit={addProduct}
            >

              <input
                className="input-field"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="input-field"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />

              <input
                className="input-field"
                placeholder="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />

              <button
                className="add-btn"
                type="submit"
              >
                Add
              </button>

            </form>

          </div>

        </div>

        {/* Product Table */}
        <div className="product-table-section">

          <h3 className="section-title">Product Stock</h3>

          <ProductTable
            products={products}
            updateStock={updateStock}
            deleteProduct={deleteProduct}
          />

        </div>

      </div>

    </div>

  );
}

export default Dashboard;