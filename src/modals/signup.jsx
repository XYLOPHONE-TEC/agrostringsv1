// src/components/CreateAccountWizard.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaTractor, FaShoppingCart, FaChevronLeft } from "react-icons/fa";
import { Box, HStack } from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function CreateAccountWizard({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [introText, setIntroText] = useState("");
  const [role, setRole] = useState("");
  const [values, setValues] = useState({
    username: "",
    phone: "",
    district: "",
    password: "",
    confirmPassword: "",
    payment: "5000",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const typingRef = useRef({ currentText: "", index: 0, intervalId: null });

  useEffect(() => {
    if (step !== 1) return;
    const fullIntro =
      "Hello! Welcome to AgroStrings. Are you joining us as a Farmer or a Buyer?";
    setIntroText("");
    typingRef.current = { currentText: "", index: 0, intervalId: null };
    typingRef.current.intervalId = setInterval(() => {
      const { index } = typingRef.current;
      if (index < fullIntro.length) {
        typingRef.current.currentText += fullIntro.charAt(index);
        typingRef.current.index++;
        setIntroText(typingRef.current.currentText);
      } else {
        clearInterval(typingRef.current.intervalId);
      }
    }, 40);
    return () => clearInterval(typingRef.current.intervalId);
  }, [step]);

  const validateCurrent = () => {
    setError("");
    if (step === 2) {
      const { username, phone, district } = values;
      if (!username || !phone || !district) {
        setError("All fields required.");
        return false;
      }
    }
    if (step === 3) {
      const { password, confirmPassword } = values;
      if (!password || !confirmPassword) {
        setError("Enter & confirm password.");
        return false;
      }
      if (password !== confirmPassword) {
        setError("Passwords must match.");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (step === 2) {
      const { username, phone, district } = values;
      if (username && phone && district && validateCurrent()) {
        const timeout = setTimeout(() => {
          setStep(3);
          setError("");
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
    if (step === 3) {
      const { password, confirmPassword } = values;
      if (
        password &&
        confirmPassword &&
        password === confirmPassword &&
        validateCurrent()
      ) {
        const timeout = setTimeout(() => {
          setStep(4);
          setError("");
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [values, step]);

  const next = () => {
    if (!validateCurrent()) return;
    setError("");
    setStep((s) => Math.min(5, s + 1));
  };

  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };

  const finish = () => {
    alert(`Welcome ${role}! Your registration is complete.`);
    onClose();
  };

  if (!open) return null;

  const handleChange = (field) => (e) => {
    const value = e && e.target ? e.target.value : e;
    setValues((v) => ({ ...v, [field]: value }));
  };

  const roleCard = (r) => ({
    flex: 1,
    margin: "0 12px",
    padding: "20px",
    background: role === r ? "#f4c430" : "#333",
    color: role === r ? "#000" : "#eee",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  });

  const overlay = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "flex-start",  // Align at top instead of center
  justifyContent: "center",
  zIndex: 1000,
  paddingTop: "4rem",         // Adds space from the top edge
};

const modal = {
  background: "#1a1a1a",
  borderRadius: "5px",
  width: "100%",
  maxWidth: "500px",
  height: "auto",
  maxHeight: "90vh",
  padding: "32px",
  color: "#eee",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",       // Change to relative since overlay handles positioning
  '@media (max-width: 600px)': {
    maxHeight: "70vh",
  },
};


  const input = {
    width: "80%",
    padding: "10px",
    marginTop: "20px",
    marginLeft: "3em",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#3b3b41",
    color: "#fff",
    fontSize: "13px",
  };

  const successBox = {
    background: "#074",
    color: "#cfc",
    padding: "20px",
    borderRadius: "8px",
    fontSize: "16px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,128,0,0.5)",
  };

  const animatedStep = {
    animation: "slideIn 0.3s ease",
  };

  const stepLines = {
    display: "flex",
    gap: "6px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
  };

  const stepLine = (index) => ({
    height: "4px",
    width: "40px",
    background: index < step ? "#f4c430" : "#555",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  });

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div style={overlay}>
        <div style={modal}>
          <h2
            style={{
              margin: 0,
              marginBottom: 16,
              fontWeight: "bold",
              fontSize: "16px",
              color: "#fff",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            Create Account
          </h2>

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              fontSize: "20px",
              background: "transparent",
              border: "none",
              color: "#aaa",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            ×
          </button>

          {step > 1 && step < 5 && (
            <button
              onClick={back}
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                fontSize: "18px",
                background: "transparent",
                border: "none",
                color: "#eee",
                cursor: "pointer",
              }}
              title="Back"
              aria-label="Back"
            >
              <FaChevronLeft size={11} />
            </button>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              step === 5 ? finish() : next();
            }}
            style={{
              overflowY: "auto",
              paddingRight: "8px",
            }}
            noValidate
          >
            {step === 1 && (
              <div style={animatedStep}>
                <p
                  style={{
                    background: "#2a2a2a",
                    padding: "16px",
                    borderRadius: "12px",
                    color: "#eee",
                    lineHeight: 2.5,
                    fontSize: "11px",
                    whiteSpace: "pre-wrap",
                    minHeight: "40px",
                  }}
                >
                  {introText || <span>&nbsp;</span>}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "24px",
                  }}
                >
                  {["Farmer", "Buyer"].map((r) => (
                    <div
                      key={r}
                      style={{
                        ...roleCard(r),
                      }}
                      onClick={() => {
                        setRole(r);
                        setStep(2);
                        setError("");
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setRole(r);
                          setStep(2);
                          setError("");
                        }
                      }}
                      aria-pressed={role === r}
                      aria-label={r}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          fontSize: "11px",
                        }}
                      >
                        {r === "Farmer" ? (
                          <FaTractor size={32} style={{ marginBottom: 8 }} />
                        ) : (
                          <FaShoppingCart
                            size={32}
                            style={{ marginBottom: 8 }}
                          />
                        )}
                        <span>{r}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={animatedStep}>
                <input
                  style={input}
                  placeholder="Username"
                  className="whitePlaceholder"
                  value={values.username}
                  onChange={handleChange("username")}
                  autoFocus
                  aria-label="Username"
                  required
                />
                <Box w="90%" maxW="sm" marginLeft="3em" marginTop="20px">
                  <HStack w="90%" spacing={2} mt={5}>
                    <Box flex="1">
                      <PhoneInput
                        defaultCountry="UG"
                        placeholder="Phone number"
                        value={values.phone}
                        onChange={(value) =>
                          setValues((v) => ({ ...v, phone: value || "" }))
                        }
                        international
                        className="custom-phone-input"
                      />
                    </Box>
                  </HStack>
                </Box>
                <input
                     className="whitePlaceholder"
                  style={input}
                  placeholder="District"
                  value={values.district}
                  onChange={handleChange("district")}
                  aria-label="District"
                  required
                />
              </div>
            )}

            {step === 3 && (
              <div style={animatedStep}>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                  <input
                    style={input}
                         className="whitePlaceholder"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange("password")}
                    aria-label="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#aaa",
                    }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <input
                  style={input}
                  type="password"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  aria-label="Confirm password"
                  required
                />
              </div>
            )}

            {step === 4 && (
              <div style={animatedStep}>
                <input
                  style={input}
                  readOnly
                  value={values.phone}
                  aria-label="Phone (readonly)"
                />
                <input
                  style={input}
                  readOnly
                  value={values.payment}
                  aria-label="Payment (readonly)"
                />
              </div>
            )}

            {step === 5 && (
              <div style={successBox}>
                🎉 Registration complete!
                <br />
                Welcome, <b>{role}</b>!
              </div>
            )}
          </form>

          {error && (
            <div
              style={{
                color: "tomato",
                textAlign: "center",
                marginTop: 8,
                userSelect: "none",
              }}
              role="alert"
            >
              {error}
            </div>
          )}

          {step < 5 && (
            <div style={stepLines}>
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} style={stepLine(i + 1)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
