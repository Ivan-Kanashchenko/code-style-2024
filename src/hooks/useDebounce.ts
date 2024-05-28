import { isMatch } from "helpers/dataHelpers";
import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (isMatch(value, debouncedValue)) {
      return;
    }

    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
