function SortFilter({ value, onChange }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="default">Sort By</option>
      <option value="price-low">Price: Low → High</option>
      <option value="price-high">Price: High → Low</option>
      <option value="name-a-z">Name: A → Z</option>
      <option value="name-z-a">Name: Z → A</option>
    </select>
  );
}

export default SortFilter;
