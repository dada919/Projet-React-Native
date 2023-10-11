import React, { createContext, useContext, useState } from 'react';

const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [updateAccount, setUpdateAccount] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  return (
    <UpdateContext.Provider value={{ updateAccount, setUpdateAccount, updateList,  setUpdateList}}>
      {children}
    </UpdateContext.Provider>
  );
};

export const useUpdate = () => {
  return useContext(UpdateContext);
};
