function PriceFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) {
  return (
    <>
      <div className="flex">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={onMinPriceChange}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={onMaxPriceChange}
        />
      </div>
    </>
  );
}

export default PriceFilter;
