import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "../globalNotification/useSnackbar";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <RecoilRoot>
      <SnackbarProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={2000} pauseOnHover />
      </SnackbarProvider>
    </RecoilRoot>
  );
}
