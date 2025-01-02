import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MotivationBox from "../components/MotivationBox";

const RootLayout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MotivationBox />
      <Footer />
    </div>
  );
};

export default RootLayout;
