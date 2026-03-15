import { useState } from "react";
import "./StockModal.css";

function StockModal({ product, closeModal, updateStock }) {

  const [stock,setStock] = useState(product.stock);

  const submitHandler = () => {

    updateStock(product._id,stock);
    closeModal();

  };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h3>Update Stock</h3>

        <input
          value={stock}
          onChange={(e)=>setStock(e.target.value)}
        />

        <div className="modal-buttons">

          <button onClick={submitHandler}>
            Update
          </button>

          <button onClick={closeModal}>
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default StockModal;