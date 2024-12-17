import { NavLink } from "react-router-dom";

const NavItem = ({ text, link }) => {
  return (
    <li className="font-bold text-black">
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive
            ? "opacity-100"
            : "opacity-50 transition-all duration-300 hover:opacity-100"
        }
      >
        {text}
      </NavLink>
    </li>
  );
};

export default NavItem;
