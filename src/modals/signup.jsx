// src/components/CreateAccountWizard.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaTractor, FaShoppingCart, FaChevronLeft } from "react-icons/fa";
import {
  Box,
  HStack,
  VStack,
  Button,
  useBreakpointValue,
  Input,
  Text,
} from "@chakra-ui/react";
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
  const [error, setError] = useState("");
  const typingRef = useRef({ currentText: "", index: 0, intervalId: null });

  const modalWidth = useBreakpointValue({ base: "100%", sm: "90%", md: "400px" });
  const modalHeight = useBreakpointValue({ base: "80vh", sm: "70vh", md: "60vh" });

  useEffect(() => {
    if (step !== 1) return;
    const fullIntro =
      "Hello! Welcome to AgroStrings. Are you joining us as a Farmer or a Buyer?";
    clearInterval(typingRef.current.intervalId);
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
        const t = setTimeout(() => setStep(3), 500);
        return () => clearTimeout(t);
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
        const t = setTimeout(() => setStep(4), 500);
        return () => clearTimeout(t);
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

  const handleChange = (f) => (e) => {
    const v = e && e.target ? e.target.value : e;
    setValues((p) => ({ ...p, [f]: v }));
  };

  const stepIndicator = (i) => ({
    flex: 1,
    height: "4px",
    bg: i < step ? "yellow.400" : "gray.600",
    borderRadius: "2px",
    mx: 1,
  });

  if (!open) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      bg="rgba(0,0,0,0.6)"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        bg="gray.900"
        borderRadius="md"
        w={modalWidth}
        h={modalHeight}
        p={6}
        position="relative"
        color="white"
        boxShadow="lg"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
          Create Account
        </Text>
        <Button
          size="sm"
          variant="ghost"
          position="absolute"
          top={4}
          right={4}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </Button>
        {step > 1 && step < 5 && (
          <Button
            size="sm"
            variant="ghost"
            position="absolute"
            top={4}
            left={4}
            onClick={back}
            aria-label="Back"
          >
            <FaChevronLeft />
          </Button>
        )}
        <Box flex="1" overflowY="auto" pr={2}>
          {step === 1 && (
            <VStack spacing={6} animation="slideIn 0.3s ease">
              <Box bg="gray.700" p={4} borderRadius="md" w="100%">
                <Text
                  whiteSpace="pre-wrap"
                  fontSize="sm"
                  minH="56px"
                  lineHeight="1.5"
                >
                  {introText || <>&nbsp;</>}
                </Text>
              </Box>
              <HStack spacing={4} w="100%">
                {["Farmer", "Buyer"].map((r) => (
                  <Button
                    key={r}
                    flex="1"
                    py={6}
                    bg={role === r ? "yellow.400" : "gray.700"}
                    color={role === r ? "black" : "gray.200"}
                    fontSize="sm"
                    leftIcon={
                      r === "Farmer" ? <FaTractor /> : <FaShoppingCart />
                    }
                    onClick={() => {
                      setRole(r);
                      setStep(2);
                      setError("");
                    }}
                  >
                    {r}
                  </Button>
                ))}
              </HStack>
            </VStack>
          )}

          {step === 2 && (
            <VStack spacing={4} animation="slideIn 0.3s ease">
              <Input
                placeholder="Username"
                value={values.username}
                onChange={handleChange("username")}
                autoFocus
                bg="gray.800"
                color="white"
              />
              <PhoneInput
                defaultCountry="UG"
                placeholder="Phone number"
                value={values.phone}
                onChange={(v) => setValues((p) => ({ ...p, phone: v || "" }))}
                international
                className="custom-phone-input"
                style={{ width: "100%" }}
              />
              <Input
                placeholder="District"
                value={values.district}
                onChange={handleChange("district")}
                bg="gray.800"
                color="white"
              />
            </VStack>
          )}

          {step === 3 && (
            <VStack spacing={4} animation="slideIn 0.3s ease">
              <Input
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange("password")}
                bg="gray.800"
                color="white"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                bg="gray.800"
                color="white"
              />
            </VStack>
          )}

          {step === 4 && (
            <VStack spacing={4} animation="slideIn 0.3s ease">
              <Input isReadOnly value={values.phone} bg="gray.800" />
              <Input isReadOnly value={values.payment} bg="gray.800" />
            </VStack>
          )}

          {step === 5 && (
            <Box
              bg="green.700"
              color="green.100"
              p={4}
              borderRadius="md"
              textAlign="center"
            >
              🎉 Registration complete!<br />
              Welcome, <strong>{role}</strong>!
            </Box>
          )}
        </Box>

        {error && (
          <Text color="red.400" mt={2} textAlign="center">
            {error}
          </Text>
        )}

        {step < 5 && (
          <HStack mt={4} mb={2}>
            {[...Array(4)].map((_, i) => (
              <Box key={i} sx={stepIndicator(i + 1)} />
            ))}
          </HStack>
        )}

        {step < 5 && (
          <Button
            mt={2}
            colorScheme="yellow"
            onClick={step === 4 ? finish : next}
            isFullWidth
          >
            {step === 4 ? "Finish" : "Next"}
          </Button>
        )}
      </Box>

      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px) }
            to { opacity: 1; transform: translateY(0) }
          }
          .custom-phone-input input {
            background: #2d2d2d !important;
            color: #eee !important;
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            border: none;
          }
        `}
      </style>
    </Box>
  );
}
