import { AiOutlineStar } from "react-icons/ai";
import { BiMapAlt } from "react-icons/bi";
import { FiBriefcase, FiCreditCard, FiSettings, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import "./Menu.css";

const Menu = () => {
  const [user] = useLocalStorage("user");

  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li>
          <Link to="/user/account">
            <FiSettings className="side-nav__icon" /> Settings
          </Link>
        </li>
        <li>
          <Link to={`/user/bookings`}>
            <FiBriefcase className="side-nav__icon" /> My bookings
          </Link>
        </li>
        {user?.role !== "admin" && (
          <li>
            <Link to={`/user/reviews`}>
              <AiOutlineStar className="side-nav__icon" /> My reviews
            </Link>
          </li>
        )}
        <li>
          <Link to="#">
            <FiCreditCard className="side-nav__icon" /> Billing
          </Link>
        </li>
      </ul>
      {user?.role === "admin" && (
        <div className="admin-nav">
          <h5 className="admin-nav__heading">Admin</h5>
          <ul className="side-nav">
            <li>
              <Link to="#">
                <BiMapAlt className="side-nav__icon" /> Manage tours
              </Link>
            </li>
            <li>
              <Link to="#">
                <FiUsers className="side-nav__icon" /> Manage users
              </Link>
            </li>
            <li>
              <Link to="#">
                <AiOutlineStar className="side-nav__icon" /> Manage reviews
              </Link>
            </li>
            <li>
              <Link to="#">
                <FiBriefcase className="side-nav__icon" /> Manage bookings
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Menu;
