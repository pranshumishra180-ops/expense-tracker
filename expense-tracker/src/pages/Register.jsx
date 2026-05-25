import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../styles/Register.scss";
import api from "../services/api";

function Register() {
  //navigate to login page after successful registration
  const navigate = useNavigate();
  //form data state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // handle form input changes
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
// handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

   try{
    const response = await api.post("/users/register",
      formData
    )
    console.log(response.data)
    alert("User Registered Successfully")

    // redirect to login page
  navigate("/")
   }catch(err){
    console.log(err);
    alert(
      err.response.data.message
    )
   }
  }

  return (
    <div className="register-page">
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <h1>Register</h1>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
        />

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

        <button type="submit"> Register </button>
        <p className="switch-text"> Already have an account?<Link to="/">
    Login
  </Link>
</p>
      </form>
    </div>
  );
}

export default Register;