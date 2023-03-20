import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

const PrivateRoutes = () => {
  // context
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!auth.token) {
      return;
    }
    getCurrentUser(auth.token);
  }, [auth?.token]);

  const getCurrentUser = async (token) => {
    try {
      const { data } = await axios.get("/auth/current-user", {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      setOk(true);
    } catch {
      setOk(false);
    }
  };
  return ok ? <Outlet /> : "";
};

export default PrivateRoutes;
