import { useState } from "react";

export function addToLocalStorage(key, initialValue = []) {
  const [stateValue, setStateValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  function setValue(value) {
    try {
      const existingData = JSON.parse(localStorage.getItem(key)) || [];

      const newData = [...existingData, ...value]

      setStateValue(newData);

      localStorage.setItem(key, JSON.stringify(newData));
    } catch (error) {
      console.error(`Error storing ${key}`, error);
    }
  }

  return [stateValue, setValue];
}