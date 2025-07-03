import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login Form</h2>
        <Form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icon" />
            <Form.Control
              type="text"
              placeholder="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="text-end mb-3">
            <a href="/Forgot" className="forgot-link">Forgot Password?</a>
          </div>

          <Button type="submit" className="btn-login w-100">LOGIN</Button>
          <div className="text-center mt-4">
            <span className="text-white">Don't have account? </span>
            <a href="/Register" className="signup-link">Sign Up Now</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
