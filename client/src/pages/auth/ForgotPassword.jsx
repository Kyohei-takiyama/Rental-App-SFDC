import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      // request to server
      const { data } = await axios.post(`/auth/forgot-password`, {
        email,
      });
      console.log(data);
      if (!data?.ok) {
        setLoading(false);
        console.log(data?.error);
        toast.error("ユーザがいません...");
        return;
      }
      toast.success(
        "パスワードリセットメールを送信しました！\nメールのリンクをクリックして、パスワードリセットをお願いします！"
      );
      setEmail("");
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
      <h1 className="display-1 bg-primary text-light p-5">Forgot password</h1>
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
              <button className="btn btn-primary col-12" disabled={loading}>
                {loading ? "Wating..." : "Submit"}
              </button>
            </form>
            <Link className="text-danger" to="/login">
              ログイン画面に戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
