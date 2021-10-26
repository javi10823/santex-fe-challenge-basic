import { useState } from 'react';

const useStateWithStorage: <T>(
  key: string,
  value?: T
) => [stored: T, updateStore: (newValue: T) => void] = (key, value) => {
  const [stored, setStored] = useState(() => {
    try {
      const storageValue = JSON.parse(localStorage.getItem(key)!);
      return storageValue || value;
    } catch (error) {
      return value;
    }
  });

  const updateStorage = (newValue: typeof value) => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setStored(newValue);
    } catch (error) {
      console.log(error);
    }
  };

  return [stored, updateStorage];
};

export default useStateWithStorage;
