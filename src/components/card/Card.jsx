import "./Card.css";
import { useState } from "react";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import { BsFlag } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context/UserContext";
import { deleteBooking } from "../../util/api";
import { nextTourDate } from "../../util/functions";

const Card = ({ tour, myBookingsPage, booking }) => {
  const { rerender, setRerender } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const { date } = nextTourDate(tour);
  const navigate = useNavigate();

  const handleCancelBooking = async () => {
    setLoading(true);
    try {
      await deleteBooking(booking._id);
      toast.success("Your bookings was canceled successfully");
      setRerender(!rerender);
    } catch (err) {
      console.log(
        "Deleting booking error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    }
    setLoading(false);
  };

  return (
    <article
      className="card"
      onClick={() => navigate(`/tour/${tour.slug}-${tour.id}#header`)}
      title="See more details"
    >
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture--overlay"></div>
          <img
            src={`${process.env.REACT_APP_BACKEND}/img/tours/${tour.imageCover}`}
            alt={tour.name}
            className="card__picture--img"
          />
        </div>
        <h3 className="heading-tertiary">
          <span>{tour.name}</span>
        </h3>
      </div>
      <div className="card__details">
        <h4 className="card__sub--heading">{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
        <p className="card__text">{tour.summary}</p>
        <div className="card__data">
          <div>
            <FiMapPin className="card__icon" />
          </div>
          <span>{tour.startLocation?.description}</span>
        </div>
        <div className="card__data">
          <div>
            <AiOutlineCalendar className="card__icon" />
          </div>
          <span>{date ? date : "Will be announced"}</span>
        </div>
        <div className="card__data">
          <div>
            <BsFlag className="card__icon" />
          </div>
          <span>{tour.locations?.length} stops</span>
        </div>
        <div className="card__data">
          <div>
            <AiOutlineUser className="card__icon" />
          </div>
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>
      <div className="card__footer">
        <p>
          <span className="card__footer--value">${tour.price}</span>
          <span className="card__footer--text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer--value">{tour.ratingsAverage}</span>
          <span className="card__footer--text">
            rating ({tour.ratingsQuantity})
          </span>
        </p>
        {myBookingsPage ? (
          <button
            className="btn btn--small btn--red"
            onClick={handleCancelBooking}
          >
            {loading ? "Cancelling..." : "Cancel"}
          </button>
        ) : (
          <NavLink
            to={`/tour/${tour.slug}-${tour.id}`}
            className="btn btn--small btn--green"
          >
            Details
          </NavLink>
        )}
      </div>
    </article>
  );
};

export default Card;
