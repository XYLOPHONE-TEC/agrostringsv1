import React, { useState, useEffect, useRef } from "react";
import { FaTractor, FaShoppingCart, FaChevronLeft } from "react-icons/fa";
import { Box, HStack } from "@chakra-ui/react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import MTN from "../assets/images/mtn.jpg";
import AIRTEL from "../assets/images/airtel.jpg";

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
    const fullIntro = "Hello! Welcome to AgroStrings. Are you joining us as a Farmer or a Buyer?";
    setIntroText("");
    typingRef.current = { currentText: "", index: 0, intervalId: null };
    typingRef.current.intervalId = setInterval(() => {
      const idx = typingRef.current.index;
      if (idx < fullIntro.length) {
        typingRef.current.currentText += fullIntro[idx];
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
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateCurrent()) return;
    setError("");
    setStep((s) => Math.min(5, s + 1));
  };
  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  };
  const activate = () => {
    alert(`Welcome ${role}! Your account is now active.`);
    onClose();
  };

  if (!open) return null;

  const handleChange = (field) => (e) => {
    const val = e?.target ? e.target.value : e;
    setValues((v) => ({ ...v, [field]: val }));
  };

  const getOperator = (phone) => {
    const m = phone.match(/^\+256\s*(\d{2})/);
    if (!m) return null;
    const code = m[1];
    if (/^(70|74|75)/.test(code)) return "airtel";
    if (/^(76|77|78|79)/.test(code)) return "mtn";
    return null;
  };
  const operator = getOperator(values.phone);

  const styles = {
    overlay: {
      position: "fixed", inset: 0, display: "flex",
      alignItems: "flex-start", justifyContent: "center",
      zIndex: 1000, paddingTop: "4rem",
    },
    modal: {
      background: "#222", borderRadius: 5, width: "100%",
      maxWidth: 500, maxHeight: "90vh", padding: 32,
      color: "#eee", display: "flex", flexDirection: "column",
      overflow: "hidden", position: "relative",
    },
    closeBtn: { position: "absolute", top: 16, right: 16, fontSize: 20, background: "transparent", border: "none", color: "#aaa", cursor: "pointer" },
    backBtn: { position: "absolute", top: 16, left: 16, fontSize: 18, background: "transparent", border: "none", color: "#eee", cursor: "pointer" },
    introBox: { background: "#2a2a2a", padding: 16, borderRadius: 12, color: "#eee", lineHeight: 2.5, fontSize: 11, whiteSpace: "pre-wrap", minHeight: 40 },
    roleCard: (r) => ({
      flex: 1, margin: "0 12px", padding: 20,
      background: role === r ? "#f4c430" : "#333",
      color: role === r ? "#000" : "#eee",
      borderRadius: 8, textAlign: "center", cursor: "pointer", transition: "transform 0.2s",
    }),
    input: {
      width: "80%", padding: 10, marginTop: 20, marginLeft: "3em",
      borderRadius: 6, border: "1px solid #444", background: "#3b3b41", color: "#fff", fontSize: 13,
    },
    animatedStep: { animation: "slideIn 0.3s ease" },
    infoBox: {
      marginLeft: "3em", width: "80%", display: "flex",
      alignItems: "center", padding: "12px", background: "#444", color: "#fADA25",
      borderRadius: 6, marginBottom: 8, marginTop: 20,
    },
    successBox: {
      background: "#074", color: "#cfc", padding: 20, borderRadius: 8,
      fontSize: 16, textAlign: "center", boxShadow: "0 4px 12px rgba(0,128,0,0.5)",
    },
    activateBtn: {
      background: "#f4c430", color: "#000", padding: "8px 20px",
      border: "none", borderRadius: 4, cursor: "pointer", fontSize: 11,
    },
    stepLines: { display: "flex", gap: 6, justifyContent: "center", marginTop: 16 },
    stepLine: (i) => ({
      height: 4, width: 40, background: i < step ? "#f4c430" : "#555", borderRadius: 2,
    }),
    nextBtn: {
      background: "#f4c430", color: "#000", padding: "8px 16px",
      border: "none", borderRadius: 4, cursor: "pointer",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <h2 style={{ textAlign: "center", fontSize: 16 }}>Create Account</h2>
        {step > 1 && step < 5 && (
          <p style={{ textAlign: "center", fontSize: 11, color: "#ccc" }}>
            {step === 2
              ? "Enter your details to continue"
              : step === 3
              ? "Password must be at least 8 characters"
              : "Secure one-time payment of UGX 5 000 is required to activate your account."
            }
          </p>
        )}

        <button onClick={onClose} style={styles.closeBtn}>×</button>
        {step > 1 && step < 5 && (
          <button onClick={back} style={styles.backBtn}>
            <FaChevronLeft size={11} />
          </button>
        )}

        <form onSubmit={(e) => e.preventDefault()} style={{ flexGrow: 1, overflowY: "auto" }}>
          {step === 1 && (
            <div style={styles.animatedStep}>
              <p style={styles.introBox}>{introText || "\u00A0"}</p>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 24 }}>
                {["Farmer", "Buyer"].map((r) => (
                  <div key={r} style={styles.roleCard(r)} onClick={() => { setRole(r); setStep(2); setError(""); }}>
                    {r === "Farmer" ? <FaTractor size={32} /> : <FaShoppingCart size={32} />}
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={styles.animatedStep}>
              <input style={styles.input} placeholder="Username" value={values.username} onChange={handleChange("username")} autoFocus />
              <Box w="90%" maxW="sm" ml="3em" mt="20px">
                <PhoneInput defaultCountry="UG" placeholder="Phone number" value={values.phone} onChange={handleChange("phone")} international />
              </Box>
              <input style={styles.input} placeholder="District" value={values.district} onChange={handleChange("district")} />
            </div>
          )}

          {step === 3 && (
            <div style={styles.animatedStep}>
              <div style={{ position: "relative", marginBottom: 20 }}>
                <input style={styles.input} type={showPassword ? "text" : "password"} placeholder="Password" value={values.password} onChange={handleChange("password")} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#aaa", cursor: "pointer" }}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <input style={styles.input} type="password" placeholder="Confirm password" value={values.confirmPassword} onChange={handleChange("confirmPassword")} />
            </div>
          )}

          {step === 4 && (
            <div style={styles.animatedStep}>
              {operator && (
                <div style={styles.infoBox}>
                  <img src={operator === "mtn" ? MTN : AIRTEL} alt={operator} style={{ width: 24, marginRight: 8 }} />
                  <span>{values.phone}</span>
                </div>
              )}
              <div style={styles.infoBox}>
                <span>UGX {values.payment}</span>
              </div>
              <Box mt={6} display="flex" justifyContent="center">
                <button onClick={activate} style={styles.activateBtn}>Activate Account</button>
              </Box>
            </div>
          )}

          {step === 5 && (
            <div style={styles.successBox}>
              🎉 Account ready!<br />
              Hello, <b>{role}</b>.<br />
              <Box mt={4} display="flex" justifyContent="center">
                <button onClick={onClose} style={styles.activateBtn}>Go to Dashboard</button>
              </Box>
            </div>
          )}
        </form>

        {error && <div style={{ color: "tomato", textAlign: "center", marginTop: 8 }}>{error}</div>}

        {step < 4 && (
          <>
            <div style={styles.stepLines}>
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} style={styles.stepLine(i + 1)} />
              ))}
            </div>
            <Box mt="auto" pt={2} display="flex" justifyContent="flex-end">
              <button onClick={next} style={styles.nextBtn}>Next</button>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}
