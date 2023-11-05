// GlobalContext.js

import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [globalArray, setGlobalArray] = useState([]);
  const newArray = [...globalArray];
  const updateGlobalArrayAtIndex = (index, newValue) => {
    if (index >= 0 && index < globalArray.length) {
      
      newArray[index] = newValue;
      setGlobalArray(newArray);
    }
  };

  return (
    <GlobalContext.Provider value={{ globalArray, updateGlobalArrayAtIndex }}>
      {children}
    </GlobalContext.Provider>
  );
}
