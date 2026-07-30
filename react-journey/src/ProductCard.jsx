function ProductCard({ title, price, comparePrice, category, inStock, onSale }) {
  return (
    <div>
      <div>
        {comparePrice && <span className="sale_badge" style={{color: 'red', textAlign: 'right'}}>SALE</span>}
        <h2>{title}</h2>
        <p>${price} <del>{comparePrice}</del></p>
        <p>{category}</p>
        {inStock ? <p>In Stock ✅</p> : <p>Out of Stock ❌</p>}
      </div>
      <br />
    </div>
  );
}

export default ProductCard;
