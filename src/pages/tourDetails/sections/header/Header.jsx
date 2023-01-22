import "./Header.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";

const Header = ({ tour }) => {
  return (
    <section id="header" className="section-header">
      <div className="header__hero">
        <div className="header__hero--overlay"></div>
        <img
          className="header__hero--img"
          src={`${process.env.REACT_APP_BACKEND}/img/tours/${tour.imageCover}`}
          alt={tour.name}
        />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{tour.name} tour</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__details">
            <AiOutlineClockCircle className="heading-box__icon" />
            <span className="heading-box__text">{tour.duration} days</span>
          </div>
          <div className="heading-box__details">
            <FiMapPin className="heading-box__icon" />
            <span className="heading-box__text">
              {tour.startLocation.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
