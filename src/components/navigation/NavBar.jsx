import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../util/api";
import "./NavBar.css";

const NavBar = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [, setUserExists] = useState(!!user);
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.removeItem("user");

      // this setter is used only for re-rendering the component
      setUserExists(!!user);

      navigate("/");
    } catch (err) {
      console.log("Logout error: ", err);
      toast.error(err.response ? err.response.data.message : err.message);
    }
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li className="header__home">
            <NavLink to="/" className="header__link">
              All Tours
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="header__logo">
              <img
                src={`${process.env.REACT_APP_BACKEND}/img/logo-white.png`}
                alt="Natours logo"
                className="header__logo--img"
              />
            </NavLink>
          </li>
          <li className="header__cta">
            {user ? (
              <NavLink
                to="/login"
                className="header__link header__link--logout"
                onClick={logoutHandler}
              >
                Log Out
              </NavLink>
            ) : (
              <NavLink to="/login" className="header__link header__link--login">
                Sign In
              </NavLink>
            )}

            {user ? (
              <NavLink
                to="/user/account"
                className="header__link header__link--user"
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND}/img/users/${user?.photo}`}
                  alt={`${user.name}`}
                  className="header__link--user-img"
                />
                <span className="header__link--username">
                  {user?.name?.split(" ")[0]}
                </span>
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className="header__link header__link--signup"
              >
                Sign Up
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
