import "./ProductTable.css";

function ProductTable({ products, updateStock, deleteProduct }) {

  if (!Array.isArray(products)) return null;

  return (

    <div className="product-table-wrapper">

      <table className="product-table">

        <thead className="product-table-head">
          <tr>
            <th className="table-header">Product</th>
            <th className="table-header">Stock</th>
            <th className="table-header">Unit</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>

        <tbody className="product-table-body">

          {products.map((p) => (

            <tr className="product-row" key={p._id}>

              <td className="table-data">{p.name}</td>
              <td className="table-data">{p.stock}</td>
              <td className="table-data">{p.unit}</td>

              <td className="table-data action-cell">

                <button
                  className="update-btn"
                  onClick={() => updateStock(p._id)}
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ProductTable;