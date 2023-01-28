import { useMutation } from "react-query";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { bookTour } from "../../../../util/api";
import { nextTourDate } from "../../../../util/functions";
import useLocalStorage from "../../../../util/hooks/useLocalStorage";
import "./CTA.css";

const CTA = ({ tour }) => {
  const [user] = useLocalStorage("user");

  const { date, preciseDate } = nextTourDate(tour);

  const bookTourMutation = useMutation({
    mutationFn: ({ tourId, userId, preciseDate }) =>
      bookTour(tourId, userId, preciseDate),
    onSuccess: (sessionInfo) => {
      window.open(sessionInfo.session.url, "_self");
    },
    onError: (err) => {
      console.log(
        "Booking tour error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const handleBookTour = async () => {
    bookTourMutation.mutate({
      tourId: tour._id,
      userId: user._id,
      preciseDate,
    });
  };

  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img
            src={`${process.env.REACT_APP_BACKEND}/img/logo-white.png`}
            alt="Natours logo"
          />
        </div>
        <img
          src={`${process.env.REACT_APP_BACKEND}/img/tours/${tour.images[1]}`}
          alt="Tour"
          className="cta__img cta__img--1"
        />
        <img
          src={`${process.env.REACT_APP_BACKEND}/img/tours/${tour.images[0]}`}
          alt="Tour"
          className="cta__img cta__img--2"
        />
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for ?</h2>
          <p className="cta__text">{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>
          {user ? (
            <button
              className={`${
                date ? "btn btn--green" : "btn-no-hover btn--grey"
              } span-all-rows`}
              id="book-tour"
              onClick={handleBookTour}
              disabled={!date}
            >
              {!bookTourMutation.isLoading ? "Book tour now!" : "Processing..."}
            </button>
          ) : (
            <NavLink to="/login" className="btn btn--green span-all-rows">
              Log in to book a tour
            </NavLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
