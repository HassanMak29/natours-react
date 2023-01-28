import { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { useMutation } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/UserContext";
import { logout } from "../../util/api";
import "./NavBar.css";

const NavBar = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const { rerender, setRerender } = useGlobalContext();
  const [openOptions, setOpenOptions] = useState(null);
  const navigate = useNavigate();

  let activeStyle = {
    color: "#fff",
    backgroundColor: "#55c57a",
    borderRadius: "10rem",
    borderColor: "#55c57a",
    padding: "1rem 2rem",
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("user");
      setRerender(!rerender);
      navigate("/");
    },
    onError: (err) => {
      console.log("Logout error: ", err);
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const logoutHandler = async (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li className="header__home">
            <NavLink
              end
              to="/"
              className="header__link"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              All Tours
            </NavLink>

            {user && (
              <NavLink
                end
                to="/user/bookings"
                className="header__link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                My bookings
              </NavLink>
            )}

            {user && user?.role !== "admin" && (
              <NavLink
                end
                to="/user/reviews"
                className="header__link"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                My reviews
              </NavLink>
            )}

            {user && user?.role === "admin" && (
              <>
                <button
                  className="header__actions"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  More actions{" "}
                  <MdOutlineExpandMore className="header__actions--icon" />
                </button>
                {openOptions && (
                  <AdminOptions
                    isOpen={openOptions}
                    setOpenOptions={setOpenOptions}
                  />
                )}
              </>
            )}
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
                to="/"
                className="header__link header__link--logout"
                onClick={logoutHandler}
              >
                Log Out
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="header__link header__link--login"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Sign In
              </NavLink>
            )}

            {user ? (
              <NavLink
                end
                to="/user/account"
                className="header__link header__link--user"
                style={({ isActive }) =>
                  isActive
                    ? { ...activeStyle, padding: "0.4rem 2rem 0.4rem 1rem" }
                    : undefined
                }
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
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
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

const AdminOptions = ({ isOpen, setOpenOptions }) => {
  let activeStyle = {
    color: "#55c57a",
  };

  const actionsNavLink = (pageName, to) => (
    <NavLink
      end
      to={to}
      className="header__link header__actions--link"
      style={({ isActive }) => (isActive ? { ...activeStyle } : undefined)}
      onClick={() => setOpenOptions(false)}
    >
      {pageName}
    </NavLink>
  );

  return (
    <div
      className={`header__actions--overlay`}
      onClick={() => setOpenOptions(!isOpen)}
    >
      <div
        className={`header__actions--options `}
        onClick={(e) => e.stopPropagation()}
      >
        <nav>
          <ul>
            <li>{actionsNavLink("Manage tours", "/tours")}</li>
            <li>{actionsNavLink("Manage users", "/users")}</li>
            <li>{actionsNavLink("Manage reviews", "/reviews")}</li>
            <li>{actionsNavLink("Manage bookings", "/bookings")}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
