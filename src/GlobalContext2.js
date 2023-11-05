// GlobalContext2.js

import React, { createContext, useContext, useState } from 'react';

const GlobalContext2 = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext2);
}

export function GlobalProvider({ children }) {
  const [globalArray2, setGlobalArray] = useState([]);
  const newArray = [...globalArray2];
  const updateGlobalArrayAtIndex = (index, newValue) => {
    if (index >= 0 && index < globalArray2.length) {
      
      newArray[index] = newValue;
      setGlobalArray(newArray);
    }
  };

  return (
    <GlobalContext2.Provider value={{ globalArray2, updateGlobalArrayAtIndex }}>
      {children}
    </GlobalContext2.Provider>
  );
}
