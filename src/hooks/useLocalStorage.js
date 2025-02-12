import { useState } from "react";

export function useLocalStorage(key, initialValue = []) {
  const [stateValue, setStateValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  function setValue(value) {
    try {
      setStateValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing ${key}`, error);
    }
  }
  //return stateStorageValue , setStorageValue
  return [stateValue, setValue];
}
