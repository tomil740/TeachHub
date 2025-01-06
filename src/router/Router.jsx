import { createBrowserRouter } from "react-router-dom";
import { Landing, MarketPlace, RootLayout } from "../pages";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import ProfilePage from "../userPage/ProfilePage.jsx";
import ChatManager from "../ChatManger/presentation/ChatManger.jsx";
import ChatComponent from "../ChatFeature/presentation/ChatComponent.jsx";
import ChatOverlayLayout from "./chatLayout/ChatOverlayLayout";


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
      // Modal layout for chat
      {
        path: "/chat",
        element: <ChatOverlayLayout />,
        children: [
          {
            path: "/chat/ChatManger",
            element: <ChatManager />,
          },
          {
            path: "/chat/:id",
            element: <ChatComponent />,
          },
        ],
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