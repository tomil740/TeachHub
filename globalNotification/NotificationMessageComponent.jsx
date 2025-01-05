import React from "react";
import { useSnackbar } from "./useSnackbar";

const NotificationMessageComponent = () => {
  const { triggerSnackbar } = useSnackbar();

  function handleDealDone() {
    const eventData = {
      mesType: "message", // Example type for "done" event
    };
    triggerSnackbar(eventData);
  }

  return (
    <div className="mt-6 flex justify-center">
      <button
        onClick={handleDealDone}
        className="rounded-lg bg-green-500 px-6 py-2 text-white transition hover:bg-green-600"
      >
        Trigger Deal Done
      </button>
    </div>
  );
};

export default NotificationMessageComponent;
