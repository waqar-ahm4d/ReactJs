function ErrorState({message, onRetry}) {
  return (
    <>
      <div className="error-state">
        <h3>{message}</h3>
        <button onClick={onRetry}>Retry</button>
      </div>
    </>
  );
}

export default ErrorState;
