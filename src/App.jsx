
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import React from "react";
import { RecoilRoot } from "recoil";


export default function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

