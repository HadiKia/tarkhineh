"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import SendOTPFormContainer from "./SendOTPFormContainer";
import CheckOTPFormContainer from "./CheckOTPFormContainer";
import { RESEND_OTP_TIME } from "@/constants/auth";
import { useCallback, useEffect } from "react";
import Image from "next/image";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [time, setTime] = useState(RESEND_OTP_TIME);
  const [isTimerActive, setIsTimerActive] = useState(false);

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

  const startTimer = useCallback(() => {
    setTime(RESEND_OTP_TIME);
    setIsTimerActive(true);
  }, []);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setPhoneNumber("");
      setIsTimerActive(false);
      setTime(RESEND_OTP_TIME);
    }, 300);
  };

  const renderStep = () => {
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
            onSuccess={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-full h-full md:md:w-98 md:h-fit max-w-full sm:max-w-full rounded-none md:rounded-lg gap-0">
        <DialogHeader className=" bg-transparent grid place-items-center py-0 md:pt-6 md:pb-4!">
          <div className="relative w-37 h-17.75 md:w-25.5 md:h-8">
            <Image src="/images/logo/logo.svg" fill alt="logo" />
          </div>
        </DialogHeader>
        <div className="px-5 -mt-20 md:mt-0 md:pb-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
