import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import { useGlobalContext } from "../../context/UserContext";
import { getMyBookings } from "../../util/api";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import "./Bookings.css";

const Bookings = () => {
  const [user] = useLocalStorage("user");
  const { rerender } = useGlobalContext();

  const {
    isLoading,
    error,
    data: bookings,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user._id],
    queryFn: () => getMyBookings(user._id),
    cacheTime: 1000 * 60 * 20,
  });

  let bookedTours;
  if (bookings) {
    bookedTours = bookings
      .map((booking) => booking.tour)
      .filter(
        (tour, index, toursArray) =>
          index === toursArray.findIndex((t) => t.id === tour.id)
      );
  }

  if (error) {
    console.log("Error fetching user bookings: ", error);
    toast.error(error.response ? error.response.data.message : error.message);
  }

  useEffect(() => {
    refetch();
  }, [refetch, rerender]);

  return isLoading || !bookedTours ? (
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
