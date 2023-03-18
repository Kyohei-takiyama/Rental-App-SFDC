import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // request to server
      const { data } = await axios.post(`/auth/pre-register`, {
        email,
        password,
      });
      console.log(data);
      if (!data?.ok) {
        setLoading(false);
        toast.error("メールアドレスとパスワードに入力の誤りがあります");
        return;
      }
      setLoading(false);
      navigate("/");
      toast.success(
        "アカウント登録メールを送信しました！\nメールを確認し、アカウントの有効化をお願いします！"
      );
    } catch (e) {
      setLoading(false);
      toast.error("不明なエラーが発生しました");
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Register</h1>
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
                {loading ? "Wating..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
