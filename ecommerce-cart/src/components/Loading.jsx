function Loading({title}) {
  return (
    <>
      <div
        className="loading-state"
        style={{ textAlign: "center", padding: "40px", fontSize: "24px" }}
      >
        <div className="spinner"></div>
        <p>{title}</p>
      </div>
    </>
  );
}

export default Loading;
