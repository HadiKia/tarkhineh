"use client";
import CheckOTPFormContainer from "@/components/features/auth/CheckOTPFormContainer";
import SendOTPFormContainer from "@/components/features/auth/SendOTPFormContainer";
import { RESEND_OTP_TIME } from "@/constants/auth";
import { useCallback, useEffect, useState } from "react";

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [time, setTime] = useState(RESEND_OTP_TIME);

  const startTimer = useCallback(() => {
    setTime(RESEND_OTP_TIME);
    setIsTimerActive(true);
  }, []);

  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPFormContainer
            setStep={setStep}
            setPhoneNumber={setPhoneNumber}
            phoneNumber={phoneNumber}
            onOTPSent={startTimer}
          />
        );
      case 2:
        return (
          <CheckOTPFormContainer
            setStep={setStep}
            phoneNumber={phoneNumber}
            time={time}
            isTimerActive={isTimerActive}
            onResend={startTimer}
          />
        );
      default:
        return null;
    }
  };

  return renderSteps();
}
