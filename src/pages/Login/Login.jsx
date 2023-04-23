import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setIsAuthenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "http://127.0.0.1:8000/api/login";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.status === 200) {
        let loginData = await response.json();
        setToken(loginData.token);
        setIsAuthenticate(true);
        navigate("/");
      } else {
        alert("Invalid Credential");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <label> Email Address </label>
          <input
            type="email"
            name="email"
            required="required"
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label> Password </label>
          <input
            type="password"
            name="password"
            required="required"
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>

        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
