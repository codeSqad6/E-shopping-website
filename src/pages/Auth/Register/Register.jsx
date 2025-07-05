import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { registerUser, sendVerificationCode } from "../authApi";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false); 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // reset error on change
  };

  const handleShowDialog = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const username = `${form.firstName}${form.lastName}`.replace(/\s/g, "").toLowerCase();
    const dataToSend = { ...form, username };

    try {
      await registerUser(dataToSend);
      setShowDialog(true);
  toast.success("🎉 Account created successfully! Please verify your email.");

    } catch (err) {
      const apiErrors = err.response?.data || {};
      const fieldErrors = {};

      if (typeof apiErrors === "string") {
        // error message is one string
        if (apiErrors.toLowerCase().includes("email")) {
          fieldErrors.email = apiErrors;
        } else if (apiErrors.toLowerCase().includes("username")) {
          fieldErrors.firstName = apiErrors;
          fieldErrors.lastName = apiErrors;
        } else if (apiErrors.toLowerCase().includes("password")) {
          fieldErrors.password = apiErrors;
        }
      } else if (Array.isArray(apiErrors)) {
        apiErrors.forEach((msg) => {
          if (msg.toLowerCase().includes("email")) fieldErrors.email = msg;
          else if (msg.toLowerCase().includes("username")) {
            fieldErrors.firstName = msg;
            fieldErrors.lastName = msg;
          } else if (msg.toLowerCase().includes("password")) fieldErrors.password = msg;
        });
      }

      setErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSendOtp = async () => {
    const code = otp.join("");
    try {
      await sendVerificationCode({ email: form.email, code });
      toast.success("🎉 Registration successfully");
      navigate("/");
    } catch (err) {
      toast.error("Verification failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>
        <Form onSubmit={handleShowDialog}>
          <div className="input-group">
            <FaUser className="icons" />
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </div>

          <div className="input-group">
            <FaUser className="icons" />
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
                            value={form.lastName}
              onChange={handleChange}
              required
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </div>

          <div className="input-group">
            <FaEnvelope className="icons" />
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </div>

          <div className="input-group">
            <FaLock className="icons" />
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>

          <Button type="submit" className="btn-register w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </Button>

          <div className="text-center mt-4">
            <span className="text-white">Already have an account? </span>
            <Link to="/login" className="signup-link">Login Now</Link>
          </div>
        </Form>
      </div>

      {/* Modal for OTP Verification */}
      <Modal show={showDialog} onHide={() => setShowDialog(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verification code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the 6-digit verification code</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                style={{
                  width: "40px",
                  height: "45px",
                  fontSize: "20px",
                  textAlign: "center",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSendOtp}>Send</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;

