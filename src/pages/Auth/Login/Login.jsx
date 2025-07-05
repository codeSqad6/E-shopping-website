import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../authApi";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });

      // حفظ التوكن في localStorage
      localStorage.setItem("token", res.data.token);
      console.log('res',res);
      
      // إعادة التوجيه للصفحة الرئيسية
      // navigate("/");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login Form</h2>
        {errorMsg && (
          <div className="alert alert-danger text-center py-2">{errorMsg}</div>
        )}
        <Form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icons" />
            <Form.Control
              type="text"
              placeholder="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icons" />
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
            <a href="/Forgot" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <Button type="submit" className="btn-login w-100">
            LOGIN
          </Button>
          <div className="text-center mt-4">
            <span className="text-white">Don't have account? </span>
            <a href="/Register" className="signup-link">
              Sign Up Now
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
