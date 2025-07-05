import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from "../authApi";
import "./Login.css";

const Login =  ({ setIsLoggedIn })=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
 


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await loginUser({ email, password });

      // حفظ التوكن
      localStorage.setItem("token", res.data.token);
       setIsLoggedIn(true); //
      
      navigate("/");
      toast.success('👋 Welcome back!');
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Incorrect email or password."
      );
    } finally {
      setLoading(false);
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
            <Link to="/Forgot" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="btn-login w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "LOGIN"}
          </Button>

          <div className="text-center mt-4">
            <span className="text-white">Don't have an account? </span>
            <Link to="/Register" className="signup-link">
              Sign Up Now
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
