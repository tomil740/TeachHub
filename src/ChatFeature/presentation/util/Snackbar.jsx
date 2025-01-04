import React, { useEffect } from "react";

function Snackbar({ message, open, closeSnackbar }){
  useEffect(() => {
    if (open) {
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        closeSnackbar();
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [open, closeSnackbar]);

  return (
    <div
      className={`fixed top-[3%] left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-lg shadow-2xl max-w-lg w-full text-white transition-opacity duration-300 z-50 ${
        open ? "opacity-100" : "opacity-0"
      } ${message.type === "error" ? "bg-red-500" : "bg-green-500"}`}
      style={{ transition: "all 0.5s ease" }}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">{message.text}</span>
        <button
          onClick={closeSnackbar}
          className="text-white hover:text-gray-200 ml-4 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
