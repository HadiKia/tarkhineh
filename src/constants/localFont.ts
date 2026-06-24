import LocalFont from "next/font/local";

const estedadFont = LocalFont({
  src: [
    {
      path: "../assets/fonts/Estedad-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/Estedad-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  style: "normal",
  display: "swap",
});

export default estedadFont;
