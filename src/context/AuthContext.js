import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token : null,
  setToken : () => {},
  user : {},
  setUser : () => {}
});

export const AuthProvider = ({ children }) => {
const [token, setToken] = useState(localStorage.getItem("token"));
const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);