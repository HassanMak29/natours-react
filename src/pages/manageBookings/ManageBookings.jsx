import { AiFillCheckCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { deleteBooking, getAllBookings } from "../../util/api";
import "./ManageBookings.css";

const ManageBookings = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
    cacheTime: 1000 * 60 * 20,
  });

  if (error) {
    console.log("Getting all bookings error: ", error);
    toast.error(error.response ? error.response.data.message : error.message);
  }

  const cancelBookingMutation = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Your bookings was canceled successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      console.log(
        "Deleting booking error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <main className="main">
      <section className="section-bookings">
        <h2 className="heading-secondary mb-xlg">Manage all bookings</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Tour</th>
              <th>Location</th>
              <th>Start date</th>
              <th>duration</th>
              <th>price</th>
              <th>paid</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .filter((booking) => !!booking.user && !!booking.startDate)
              .map((booking) => (
                <tr key={booking._id}>
                  <th>
                    <div className="user-cell">
                      <img
                        src={`${process.env.REACT_APP_BACKEND}/img/users/${booking.user.photo}`}
                        alt={booking.user.name}
                      />
                      <span>{booking.user.name}</span>
                    </div>
                  </th>
                  <th className="tour-name-cell">
                    <span>{booking.tour.name}</span>
                  </th>
                  <th>{booking.tour.startLocation.description}</th>
                  <th>
                    {new Date(booking.startDate).toLocaleDateString("en-us", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </th>
                  <th>{booking.tour.duration} days</th>
                  <th>${booking.price}</th>
                  <th>
                    {booking.paid ? (
                      <AiFillCheckCircle color="#28b487" size={22} />
                    ) : (
                      <RxCross1 color="#d25050" size={22} />
                    )}
                  </th>
                  <th>
                    <RiDeleteBin6Line
                      className="delete-btn"
                      color="#d25050"
                      size={22}
                      onClick={() => cancelBookingMutation.mutate(booking._id)}
                    />
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ManageBookings;
