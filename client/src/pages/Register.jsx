import { useState } from "react";
import axios from "axios";
import { API } from "../config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // request to server
      const res = await axios.post(`/auth/pre-register`, {
        email,
        password,
      });
      console.log(res);
    } catch {}
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
              <button className="btn btn-primary col-12">登録</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
