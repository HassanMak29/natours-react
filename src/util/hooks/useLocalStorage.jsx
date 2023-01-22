import { useState } from "react";

function useLocalStorage(key, value = null) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return value;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : value;
    } catch (error) {
      console.log(error);
      return value;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        console.log(key, JSON.stringify(value));
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
