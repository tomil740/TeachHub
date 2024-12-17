import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import { userAccountState } from "../authenticationFeature/states/userAccountState";
import { useRecoilState} from "recoil";
import AccountMenuItem from "../authenticationFeature/components/AccountMenuItem"; 

const Navbar = () => {
  const [LoginState,setLoginState] = useRecoilState(userAccountState);

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

      <AccountMenuItem
        isLogin={LoginState.isAuthenticated}
        name={LoginState.name}
        coins={LoginState.coins}
        onLogout={()=>
          setLoginState(   {     
            userId:null,
            name:"Guest",
            coins:0,
            isLoading:false,
            isAuthenticated:false
          }
          )
        }
      />
    </nav>
  );
};

export default Navbar;

