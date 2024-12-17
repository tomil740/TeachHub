import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";

const Navbar = () => {
  const links = [
    { text: "Home", linkTo: "/" },
    { text: "Marketplace", linkTo: "/marketplace" },
  ];

  return (
    <nav className="pagePadding mx-auto flex h-20 w-full items-center justify-between py-2 text-white shadow-md">
      <NavLink className="text-2xl font-bold text-black" to="/">
        <span>Barter</span>
      </NavLink>

      <ul className="flex items-center justify-center gap-4">
        {links.map((link, index) => {
          const { text, linkTo } = link;
          return <NavItem key={index} text={text} link={linkTo} />;
        })}
      </ul>

      <button className="rounded bg-gradient-to-b from-gray-700 to-gray-900 px-2 py-1 font-bold text-white transition-all duration-300 hover:to-gray-800">
        <NavLink to="/">Get Started</NavLink>
      </button>
    </nav>
  );
};

export default Navbar;
