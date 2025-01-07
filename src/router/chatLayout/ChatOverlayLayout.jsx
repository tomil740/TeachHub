import { Outlet, useNavigate } from "react-router-dom";

const ChatOverlayLayout = () => {
  const navigate = useNavigate();

  // Close the modal when the close button is clicked
  const closeModal = () => {
    navigate("/"); // Go back to the previous screen
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-4 h-[80%] w-full max-w-sm overflow-hidden rounded-lg bg-white p-0 shadow-lg sm:mx-6 sm:h-[70%] sm:max-w-md md:h-[60%] md:max-w-lg lg:max-w-xl">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-500 focus:outline-none"
        >
          <span className="text-lg font-bold">X</span>
        </button>

        {/* Modal content */}
        <div className="h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ChatOverlayLayout;
