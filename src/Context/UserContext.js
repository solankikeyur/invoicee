import { createContext, useState } from "react";

const UserContext = createContext({
  token: null,
  setToken: () => {},
  loader: null,
  setLoader: () => {},
});

export const UserContextProvider = ({children}) => {
  const [token, setStateToken] = useState(localStorage.getItem("token"));
  const [loader, setLoader] = useState(false);
  const setToken = (myToken) => {
    setStateToken(myToken);
    if(myToken) {
      localStorage.setItem("token", myToken);
    } else {
      localStorage.removeItem("token");
    }
  }

  return <UserContext.Provider value={{token, setToken, loader, setLoader}}>
    {children}
  </UserContext.Provider>
}


export default UserContext;
 