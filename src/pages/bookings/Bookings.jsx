import "./Bookings.css";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import { useGlobalContext } from "../../context/UserContext";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import { getMyBookings } from "../../util/api";

const Bookings = () => {
  const [user] = useLocalStorage("user");
  const { rerender } = useGlobalContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const bookedTours = bookings
    .map((booking) => booking.tour)
    .filter(
      (tour, index, toursArray) =>
        index === toursArray.findIndex((t) => t.id === tour.id)
    );

  const fetchMyBookings = useCallback(async () => {
    setLoading(true);
    try {
      const bookings = await getMyBookings(user._id);
      setBookings(bookings);
    } catch (err) {
      console.log(
        "Error trying to fetch user bookings: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    }
    setLoading(false);
  }, [user._id]);

  useEffect(() => {
    fetchMyBookings();
  }, [rerender]);

  return loading ? (
    <Spinner />
  ) : (
    <main className="main">
      {bookedTours.length === 0 ? (
        <div className="no-data">
          <p>You do not have any booked tours yet</p>
          <br />
          <Link to="/" className="browse-tours">
            Browse tours
          </Link>
        </div>
      ) : (
        <div className="card-container">
          {bookedTours.map((bookedTour) => (
            <Card
              key={bookedTour.slug}
              tour={bookedTour}
              myBookingsPage
              booking={bookings.find(
                (booking) => booking.tour._id === bookedTour._id
              )}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Bookings;
