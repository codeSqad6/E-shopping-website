import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FaLock, FaKey } from "react-icons/fa";
import { resetPassword } from "../authApi";

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email || "";
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await resetPassword({ email, code, newPassword });
      navigate("/login");
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Reset failed. Please try again."
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Reset Password</h2>
        {errorMsg && (
          <div className="alert alert-danger text-center py-2">{errorMsg}</div>
        )}
        <Form onSubmit={handleReset}>
          <div className="input-group">
            <FaKey className="icon" />
            <Form.Control
              type="text"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <Form.Control
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="btn-register w-100">Reset Password</Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
