import "./DashboardStats.css";

function DashboardStats({ products = [], shopStatus }) {

  const totalProducts = products.length;

  const totalStock = products.reduce((sum, p) => {
    return sum + Number(p.stock || 0);
  }, 0);

  const lastUpdated = new Date().toLocaleString();

  // FORCE BOOLEAN VALUE
  const isShopOpen = shopStatus === true || shopStatus === "true";

  return (

    <div className="stats-row">

      <div className="stat-box">
        <span className="stat-title">Products</span>
        <span className="stat-value">{totalProducts}</span>
      </div>

      <div className="stat-box">
        <span className="stat-title">Stock</span>
        <span className="stat-value">{totalStock}</span>
      </div>

      <div className="stat-box">
        <span className="stat-title">Shop Status</span>
        <span className={isShopOpen ? "open" : "closed"}>
          {isShopOpen ? "OPEN" : "CLOSED"}
        </span>
      </div>

      <div className="stat-box">
        <span className="stat-title">Last Updated</span>
        <span className="stat-time">{lastUpdated}</span>
      </div>

    </div>

  );

}

export default DashboardStats;