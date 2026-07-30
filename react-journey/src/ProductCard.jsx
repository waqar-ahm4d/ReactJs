function ProductCard({
  image,
  title,
  price,
  comparePrice,
  category,
  inStock,
  onSale,
}) {
  return (
    <div>
      <div>
        {image && <img src={image} alt="" style={{width: 'auto', height: '100px'}} />}
        {comparePrice && (
          <span
            className="sale_badge"
            style={{ color: "red", textAlign: "right" }}
          >
            SALE
          </span>
        )}
        <h2 style={{fontSize: '12px'}}>{title}</h2>
        <p>
          ${price} <del>{comparePrice}</del>
        </p>
        <p>{category}</p>
        {inStock && (
          <div>{inStock > 0 ? <p>In Stock ✅</p> : <p>Out of Stock ❌</p>}</div>
        )}
      </div>
      <br />
    </div>
  );
}

export default ProductCard;
