import { toPersianDigits } from "./numberFormatter";

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${toPersianDigits(minutes)}:${toPersianDigits(
    remainingSeconds.toString().padStart(2, "0"),
  )}`;
};
