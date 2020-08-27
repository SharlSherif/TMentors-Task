import React, { useEffect, useState } from "react";
import "../App.css";
function ProductCard({ product }) {
  return (
    <div className="product">
      <div className="product-image">
        <img src={product.image} />
      </div>
      <div className="content">
        <p className="title">{product.name}</p>
        <p className="price">${product.price}</p>
      </div>
      <span className="brand">{product.brand.name}</span>
    </div>
  );
}

export default ProductCard;
