function ProductImage({ image, title }) {
  return (
    <>
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
    </>
  );
}

export default ProductImage;
