import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import DealsManager from "../ChatFeature/presentation/DealsManager";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthenticatedUserState } from "../AuthenticatedUserState";
import NavItem from "./NavItem";
import { chatsUnreadState } from "../chatsUnreadState";



const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coins, setCoins] = useState(0);
  const [userId, setUserId] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useRecoilState(
    AuthenticatedUserState,
  );
  const unreadChatsCounter = useRecoilValue(chatsUnreadState);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCoins(userDoc.data().coins || 0);
          setAuthenticatedUser([userDoc.data(), user.uid]);
        }
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setAuthenticatedUser([null, null]);
      console.log("Logged out!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
  };

  const hideMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const links = [
    { text: "Home", linkTo: "/" },
    { text: "Marketplace", linkTo: "/marketplace" },
  ];

  const IconButton = ({ icon }) => {
    return (
      <div className="relative inline-block">
        <Link to={"chatContainer/ChatManger"}>
          <button className="rounded-full bg-blue-500 p-2 text-white shadow-md hover:bg-blue-600">
            {icon}
          </button>
        </Link>

        {unreadChatsCounter > 0 && (
          <div
            className="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            style={{ fontSize: "10px", lineHeight: "14px" }}
          >
            {unreadChatsCounter}
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <div className="userTopBar">
        {/* DealsManager Component */}
        <DealsManager userId={userId} />

      {/* IconButton Component */}
      <div className="ChatBut">
        <IconButton
          icon={<span className="material-icons">Chats</span>}
        />
      </div>
    </div>
      <nav className="pagePadding flex h-20 w-full items-center justify-between border-b py-2 text-white">
        {/* Logo */}
        <NavLink className="text-2xl font-bold text-black" to="/">
          <img src="/images/Logo.png" className="h-24 w-24" alt="Logo" />
        </NavLink>

        {/* Desktop Navbar */}
        <ul className="hidden items-center justify-center gap-4 md:flex">
          {links.map((link, index) => (
            <NavItem
              key={index}
              text={link.text}
              link={link.linkTo}
              color="text-black"
            />
          ))}
        </ul>

        <div className="hidden gap-6 md:flex">
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <div>
                <i className="fa-brands fa-bitcoin transform text-3xl text-amber-500"></i>
                <span className="ml-1 text-2xl font-semibold tracking-wider text-amber-500">
                  {coins}
                </span>
              </div>
              <button
                onClick={handleProfileClick}
                className="text-xl text-black"
              >
                <i className="fa-solid fa-user text-2xl text-blue-500 transition-all duration-300 hover:text-blue-600"></i>
              </button>
              <button
                onClick={handleLogout}
                className="rounded bg-blue-500 px-6 py-1 font-bold text-white transition-all duration-300 hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          )}

          {!isLoggedIn && (
            <button className="rounded bg-blue-500 px-6 py-1 font-bold text-white transition-all duration-300 hover:bg-blue-600">
              <NavLink to="/login">Login</NavLink>
            </button>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <span className="text-2xl">&#10005;</span>
            ) : (
              <span className="text-3xl">&#9776;</span>
            )}
          </button>
        </div>

        <ul
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } pagePadding absolute left-0 top-[150px] z-[100] w-full flex-col gap-4 bg-white py-4 shadow-md md:hidden`}
        >
          {links.map((link, index) => (
            <NavItem
              key={index}
              text={link.text}
              link={link.linkTo}
              color="text-black"
              hideMenu={hideMenu}
            />
          ))}

          <div className="w-full border"></div>

          {isLoggedIn ? (
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center">
                <i className="fa-brands fa-bitcoin transform text-3xl text-amber-500"></i>
                <span className="ml-1 text-2xl font-semibold tracking-wider text-amber-500">
                  {coins}
                </span>
              </div>
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 text-xl text-black"
              >
                <i className="fa-solid fa-user text-2xl text-blue-500"></i>
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="rounded bg-blue-500 px-2 py-1 font-bold text-white transition-all duration-300 hover:bg-blue-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="rounded bg-blue-500 px-2 py-1 font-bold text-white transition-all duration-300 hover:bg-blue-600">
              <NavLink to="/login" onClick={hideMenu}>
                Login
              </NavLink>
            </button>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
