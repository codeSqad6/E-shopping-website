import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ دالة تحقق كلمة المرور
  const isValidPassword = (password) => {
    const regex = /[^a-zA-Z0-9]/; // يجب أن تحتوي على رمز
    return regex.test(password);
  };

  // ✅ دالة إرسال بيانات التسجيل
  const handleShowDialog = async (e) => {
    e.preventDefault();

    if (!isValidPassword(form.password)) {
      alert("Password must contain at least one special character (e.g. @, #, !)");
      return;
    }

    const newUsername = `${form.firstName}${form.lastName}`.replace(/\s/g, "").toLowerCase();
    const dataToSend = { ...form, username: newUsername };

    try {
      console.log("📤 Data sent to API:", dataToSend);
      await registerUser(dataToSend);
      setShowDialog(true);
    } catch (err) {
      console.log("❌ API Error:", err.response?.data);
      setErrorMsg(err.response?.data?.message || "Registration failed");
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSendOtp = async () => {
    const code = otp.join("");
    try {
      await sendVerificationCode({ email: form.email, code });
      navigate("/");
    } catch (err) {
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Create Account</h2>

        {errorMsg && (
          <div className="alert alert-danger text-center py-2">{errorMsg}</div>
        )}

        <Form onSubmit={handleShowDialog}>
          <div className="input-group">
            <FaUser className="icon" />
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaUser className="icon" />
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="icon" />
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>

          <Button type="submit" className="btn-register w-100">Register</Button>

          <div className="text-center mt-4">
            <span className="text-white">Already have an account? </span>
            <a href="/login" className="signup-link">Login Now</a>
          </div>
        </Form>
      </div>

      {/* Dialog التحقق */}
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
          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendOtp}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
