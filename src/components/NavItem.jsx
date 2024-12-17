import { NavLink } from "react-router-dom";

const NavItem = ({ text, link, color, hideMenu }) => {
  return (
    <li className={`font-bold ${color}`}>
      <NavLink
        onClick={hideMenu}
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
