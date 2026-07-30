function ProductCard({ title, price, category }) {
  return (
    <div>
      <div>
        <h2>{title}</h2>
        <p>${price}</p>
        <p>{category}</p>
      </div>
      <div>----------</div>
    </div>
  );
}

export default ProductCard;
