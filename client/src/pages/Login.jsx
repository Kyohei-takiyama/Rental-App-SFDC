import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth";

const Login = () => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // request to server
      const { data } = await axios.post(`/auth/login`, {
        email,
        password,
      });
      console.log(data);
      if (!data?.user) {
        setLoading(false);
        console.log(data?.error);
        toast.error("ユーザがいません...");
        return;
      }
      setAuth(data);
      sessionStorage.setItem("auth", JSON.stringify(data));
      toast.success("ログインに成功しました！");
      setLoading(false);
      navigate("/");
    } catch (e) {
      setLoading(false);
      console.log(e.message);
      toast.error("不明なエラーが発生しました");
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Login</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4"
                placeholder="メールアドレスを入力してください"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4"
                placeholder="パスワードを入力してください"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary col-12" disabled={loading}>
                {loading ? "Wating..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
