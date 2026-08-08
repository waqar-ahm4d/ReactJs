function CategoryFilter({ value, onChange, options }) {
  return (
    <>
      <select value={value} onChange={onChange}>
        <option value="all">All Categories</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </>
  );
}

export default CategoryFilter;
