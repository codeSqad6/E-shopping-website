import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../authApi";
import "./Forgot.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await forgotPassword(email);
      navigate("/Reset", { state: { email } }); // انتقل للخطوة التالية مع حفظ الإيميل
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Failed to send reset code. Try again."
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Forgot Password</h2>
        {errorMsg && (
          <div className="alert alert-danger text-center py-2">{errorMsg}</div>
        )}
        <Form onSubmit={handleReset}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="btn-register w-100">
            Send Code
          </Button>
          <div className="text-center mt-4">
            <span className="text-white">Remember your password? </span>
            <a href="/Login" className="signup-link">Back to Login</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
