import { Link } from "react-router-dom";

function ProductCard({
  id,
  image,
  title,
  price,
  comparePrice,
  category,
  inStock,
  onSale,
}) {
  return (
    <div className="relative rounded-lg z-0">
      <Link to={`/products/${id}`} className="flex flex-col ">
        {image && <img className="mb-2 w-full rounded-lg object-contain bg-gray-100" src={image} alt="" style={{width: 'auto', height: '100px'}} />}
        {comparePrice = true && (
          <span
            className="absolute top-1 right-2 font-semibold font-italic text-white bg-red-500 px-2 rounded"
          >
            SALE
          </span>
        )}
        <p>{category}</p>
        <h2 className="text-3xl mt-2">{title}</h2>
        <p className="text-2xl mt-2">
          ${price} <del className="text-xl">{comparePrice}</del>
        </p>
        {inStock && (
          <div>{inStock > 0 ? <p>In Stock ✅</p> : <p>Out of Stock ❌</p>}</div>
        )}
      </Link>
    </div>
  );
}

export default ProductCard;
