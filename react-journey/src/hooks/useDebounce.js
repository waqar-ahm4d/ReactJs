import { useEffect, useState } from "react";

function useDebounce(value, delay) {

  const [debouncedQuery, setDebouncedQuery] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(value);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedQuery;
}

export default useDebounce;
