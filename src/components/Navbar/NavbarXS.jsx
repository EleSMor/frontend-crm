import { useState, useMemo, useContext } from "react";
import { UserContext } from "../Context/AuthUser";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import { GvreLogo, User } from "../../icons/index.js";
import "./NavbarXS.scss";
import ContentXS from "./ContentXS.jsx";

const NavbarXS = ({ title }) => {
  const [openHam, setOpenHam] = useState(false);
  const { user } = useContext(UserContext);

  const handleHamClick = () => {
    setTimeout(() => {
      setOpenHam(!openHam);
    }, 100);
  };

  const handleLinkClick = (pathname) => {
    if (pathname === window.location.pathname) {
      setOpenHam(false);
    }
  };

  return (
    <>
      <nav className="NavbarXS">
        <div className="NavbarXS--logoHam">
          <GvreLogo className="NavbarXS--logoHam--logo" />
          <HamburgerMenu
            isOpen={openHam}
            menuClicked={() => handleHamClick()}
            color="#fff"
            width={18}
            height={12}
            strokeWidth={2}
            animationDuration={0.6}
          />
        </div>

        <h4 className="NavbarXS--title">{title}</h4>

        <div className="NavbarXS--user">
          <div className="NavbarXS--user-circle1">
            <div className="NavbarXS--user-circle1-circle2">
              {user.avatar ? (
                <NavLink to="/">
                  <img src={user.avatar} alt={user.fullName} className="NavbarXS--user-circle1-circle2-avatar" />
                </NavLink>
              ) : (
                <NavLink to="/">
                  <User className="" />
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
      {openHam && <ContentXS onClick={handleLinkClick} />}
    </>
  );
};

export default NavbarXS;
