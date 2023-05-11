import { useEffect } from "react";

function Popup({ name, isOpen, onClose, children }) {
  useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen, onClose]);

  function closeAllPopupsByClickOnOverlay(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`popup popup_type_${name} ${isOpen && "popup_is-opened"}`}
      onMouseDown={closeAllPopupsByClickOnOverlay}
    >
      {children}
    </section>
  );
}

export default Popup;
