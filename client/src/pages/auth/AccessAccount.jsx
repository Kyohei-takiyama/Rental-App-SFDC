import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";

import { useAuth } from "../../context/auth";

const AccessAccount = () => {
  //state
  const { token } = useParams();

  // hooks
  const [, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      requestActivation();
    }
  }, [token]);

  const requestActivation = async () => {
    try {
      const { data } = await axios.post("/auth/access-account", {
        resetCode: token,
      });

      if (!data) {
        toast.error("不明なエラーが発生しました");
      }
      // set local strorage
      sessionStorage.setItem("auth", JSON.stringify(data));
      // save in context
      setAuth(data);
      toast.success("プロファイルページにてパスワードの設定をお願いします！");
      navigate("/");
    } catch (e) {
      console.error("ERROR: ", e);
      toast.error("不明なエラーが発生しました");
    }
  };

  return (
    <div
      className="display-1 d-flex justify-content-center align-items-center vh-100"
      style={{ marginTop: "-5%" }}
    >
      <h1>Please wait ...</h1>
    </div>
  );
};

export default AccessAccount;
