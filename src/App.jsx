import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "../globalNotification/useSnackbar";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./components/ThemeProvider";
import { ThemeToggleButton } from "./components/ThemeProvider";

export default function App() {
  return (
    <RecoilRoot>
      <SnackbarProvider>
      <ThemeProvider>
        <div className="App">
            <ThemeToggleButton /> 
        </div>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={2000} pauseOnHover />
      </ThemeProvider>
      </SnackbarProvider>
    </RecoilRoot>
  );
}
