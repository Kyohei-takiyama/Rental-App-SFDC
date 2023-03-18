import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API } from "../config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  // get context value from sessionstorage used useEffect
  useEffect(() => {
    const authInfoGetBySS = sessionStorage.getItem("auth");
    if (authInfoGetBySS) {
      setAuth(JSON.parse(authInfoGetBySS));
    }
  }, []);

  // configure axios
  axios.defaults.baseURL = API;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
