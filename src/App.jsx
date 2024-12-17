
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import React from "react";
import { logUsers } from "./FirebaseUtiles/Utils";

export default function App() {
  return <RouterProvider router={router} />;
}

