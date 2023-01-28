import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { useGlobalContext } from "../../context/UserContext";
import { getTour } from "../../util/api";
import { nextTourDate } from "../../util/functions";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import AddReview from "./sections/addReview/AddReview";
import CTA from "./sections/cta/CTA";
import Description from "./sections/description/Description";
import Header from "./sections/header/Header";
import Map from "./sections/map/Map";
import Pictures from "./sections/pictures/Pictures";
import Reviews from "./sections/reviews/Reviews";
import "./TourDetails.css";

const getTourId = (tours, slug) => {
  let tourId;
  if (!localStorage.getItem(`${slug}-id`)) {
    tourId = tours.filter((tour) => tour.slug === slug)[0]._id;
    localStorage.setItem(`${slug}-id`, JSON.stringify(tourId));
  } else {
    tourId = JSON.parse(localStorage.getItem(`${slug}-id`));
  }
  return tourId;
};

const TourDetails = () => {
  const { tours } = useGlobalContext();
  const { tourSlug } = useParams();
  const [user] = useLocalStorage("user");

  let tourId = getTourId(tours, tourSlug);

  const { error, data: tour } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTour(tourId),
    cacheTime: 1000 * 60 * 20,
  });

  if (error) {
    console.log("Error getting tour: ", error);
    toast.error(error.response ? error.response.data.message : error.message);
  }

  let userHasBookedThisTour = false;
  if (tour && user) {
    const { index } = tour && nextTourDate(tour);

    if (tour.startDates[index].participants.includes(user._id)) {
      userHasBookedThisTour = true;
    }
  }

  return !tour ? (
    <Spinner />
  ) : (
    <>
      <Header tour={tour} />
      <Description tour={tour} />
      <Pictures tour={tour} />
      <Map tour={tour} />
      <Reviews tour={tour} />
      {!userHasBookedThisTour ? <CTA tour={tour} /> : <AddReview tour={tour} />}
    </>
  );
};

export default TourDetails;
