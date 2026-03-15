import { useState } from "react";
import API from "../../services/Api";
import { useNavigate } from "react-router-dom";
import './login.css'

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/admin/login", {
        email,
        password
      });

      console.log(res.data);

      // Only if token exists
      if (res.data && res.data.token) {

        localStorage.setItem("adminToken", res.data.token);

        alert("Login Success");

        navigate("/admin/dashboard");

      } else {

        alert("Invalid login");

      }

    } catch (error) {

      alert("Invalid email or password");

    }

  };

  return (
    <div className="login-container">

  <div className="login-card">

    <h2 className="login-title">Ration Shop</h2>

    <form onSubmit={handleLogin} className="login-form">

      <input
        className="login-input"
        type="email"
        placeholder="Email"
        required
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"
        required
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="login-btn" type="submit">
        Login
      </button>

    </form>

  </div>

</div>
  );
}

export default AdminLogin;