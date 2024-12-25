import { createBrowserRouter } from "react-router-dom";
import { Landing, MarketPlace, RootLayout } from "../pages";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import ProfilePage from "../userPage/ProfilePage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/marketplace/:category",
        element: <MarketPlace />,
      },
      {
        path: "/marketplace",
        element: <MarketPlace />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login/:ProfileTovisit?",
    element: <Login />,
  },
  {
    path: "/signup/:ProfileTovisit?",
    element: <SignUp />,
  },
]);
