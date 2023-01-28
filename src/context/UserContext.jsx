import { createContext, useContext, useState } from "react";

const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [rerender, setRerender] = useState(false);
  const [tours, setTours] = useState([]);
  const ContextProviderValue = { rerender, setRerender, tours, setTours };

  return (
    <Context.Provider value={ContextProviderValue}>{children}</Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};
