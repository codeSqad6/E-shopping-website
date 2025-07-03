import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import "./Forgot.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset password for:", email);

    // بعد الربط بـ API:
    // fetch('/forgot-password', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // }).then(res => res.json()).then(data => console.log(data));
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Forgot Password</h2>
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
            Send Reset Link
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
