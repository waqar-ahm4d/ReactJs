function SearchBar({value, onChange, placeholder}) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-box"
      />
    </>
  );
}
export default SearchBar;
