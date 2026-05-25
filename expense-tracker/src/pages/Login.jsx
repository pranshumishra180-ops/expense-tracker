import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import api from "../services/api";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

   async function handleSubmit(e) {
    e.preventDefault();
try{
    const response = await api.post("/users/login", formData);
    console.log(response.data);
    localStorage.setItem(
  "token",
  response.data.token
);

    alert("Login Successful");

    // redirect to dashboard
    navigate("/dashboard");

}catch(err){
    console.log(err);
    alert(
      err.response.data.message
    )
}
    
  }

  return (
    <div className="login-page">
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit"> Login  </button>
        <p className="switch-text">
  Don't have an account?
  <Link to="/register"> Register </Link>
</p>
      </form>
    </div>
  );
}

export default Login;