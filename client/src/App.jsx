import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import Main from "./components/Main";
import AccountActivate from "./pages/auth/AccountActivate";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/auth/account-activate/:token"
            element={<AccountActivate />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
