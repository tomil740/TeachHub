import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "../globalNotification/useSnackbar";

export default function App() {
  return (
    <RecoilRoot>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </RecoilRoot>
  );
}
