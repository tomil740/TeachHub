import { createContext, useContext, useState, useEffect } from "react";

// Snackbar context and provider
const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [messageData, setMessageData] = useState(null);

  const triggerSnackbar = (msgData) => {
    setMessageData(msgData);
  };

  const closeSnackbar = () => {
    setMessageData(null);
  };

  useEffect(() => {
    if (messageData) {
      const timer = setTimeout(() => setMessageData(null), 4000); // Hide after 4 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [messageData]);

  const renderMessage = () => {
    if (!messageData) return null;

    const { mesType } = messageData;

    let messageContent;
    let messageStyle = "bg-white text-gray-800"; // Default light background

    // Matched message for each type
    let matchedMessage = "";
    switch (mesType) {
      case "done":
        messageContent = (
          <>
            <strong className="font-semibold text-orange-100">
              A deal has been done!
            </strong>
            <div className="mt-2 text-sm text-orange-200">
              Congratulations on completing your deal.
            </div>
          </>
        );
        messageStyle = "bg-orange-600 bg-opacity-90 text-orange-100 shadow-xl"; // Orange emphasis with readable text
        break;

      case "your":
        messageContent = (
          <>
            <strong className="font-semibold text-white">
              Your request is being processed.
            </strong>
            <div className="mt-2 text-sm text-gray-200">
              We're on it! Hang tight.
            </div>
          </>
        );
        messageStyle = "bg-blue-600 bg-opacity-90 text-white"; // Blue background with higher opacity
        break;

      case "buyer":
        messageContent = (
          <>
            <strong className="font-semibold text-white">
              Buyer request received!
            </strong>
            <div className="mt-2 text-sm text-gray-200">
              We're reviewing the request and will get back to you soon.
            </div>
          </>
        );
        messageStyle = "bg-yellow-600 bg-opacity-90 text-white"; // Yellow background with higher opacity
        break;

      case "message":
        messageContent = (
          <>
            <strong className="font-semibold text-white">
              New message received!
            </strong>
            <div className="mt-2 text-sm text-white">
              Open your chat to reply.
            </div>
          </>
        );
        messageStyle = "bg-orange-600 bg-opacity-90 text-white shadow-2xl"; // Strong orange background with good opacity and shadow
        break;

      default:
        messageContent = <span>Unknown event type</span>;
        messageStyle = "bg-gray-600 text-white"; // Fallback for unknown type
    }

    return (
      <div
        className={`z-70 fixed left-1/2 top-4 flex w-full max-w-md -translate-x-1/2 transform items-center justify-between space-x-3 rounded-lg border border-gray-200 p-4 shadow-2xl sm:left-1/4 sm:space-x-4 sm:p-6 sm:px-8 ${messageStyle}`}
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)", // Enhanced shadow
        }}
      >
        <div className="flex-1 text-center">{messageContent}</div>
        <button
          onClick={closeSnackbar}
          className="ml-3 bg-transparent text-lg font-bold text-white focus:outline-none sm:ml-4"
        >
          &times;
        </button>
      </div>
    );
  };

  return (
    <SnackbarContext.Provider value={{ triggerSnackbar }}>
      {children}
      {renderMessage()}
    </SnackbarContext.Provider>
  );
};
