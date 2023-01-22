import { createContext, useContext, useState } from "react";

const Context = createContext({});

export const ContextProvider = ({ children }) => {
  const [rerender, setRerender] = useState(false);
  const ContextProviderValue = { rerender, setRerender };

  return (
    <Context.Provider value={ContextProviderValue}>{children}</Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};
