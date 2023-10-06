import { toast, Flip } from "react-toastify";
import { closeIcon } from "../../icons/mobileMenuIcons";

const showToast = (message, type = "success") => {
  const CloseButton = ({ closeToast }) => (
    <i className="absolute top-[18px] left-2.5" onClick={closeToast}>
      {closeIcon}
    </i>
  );
  const config = {
    position: "top-center",
    theme: "colored",
    style: {
      textAlign: "right",
    },
    icon: false,
    transition: Flip,
    closeButton: CloseButton,
    autoClose: 2500,
  };
  if (type === "success") {
    toast.success(message, {
      ...config,
      style: { ...config.style, background: "#417F56", color: "#fff" },
    });
  } else if (type === "error") {
    toast.error(message, { ...config });
  }
};

export default showToast;
