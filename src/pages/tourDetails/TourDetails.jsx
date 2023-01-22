import { useParams } from "react-router-dom";
import { getTour } from "../../util/api";
import "./TourDetails.css";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { useGlobalContext } from "../../context/UserContext";
import { nextTourDate } from "../../util/functions";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import AddReview from "./sections/addReview/AddReview";
import CTA from "./sections/cta/CTA";
import Description from "./sections/description/Description";
import Header from "./sections/header/Header";
import Map from "./sections/map/Map";
import Pictures from "./sections/pictures/Pictures";
import Reviews from "./sections/reviews/Reviews";

const TourDetails = () => {
  const { tourId } = useParams();
  const [user] = useLocalStorage("user");
  const { rerender } = useGlobalContext();
  const [tour, setTour] = useState(null);

  let userHasBookedThisTour = false;
  if (tour) {
    const { index } = tour && nextTourDate(tour);

    if (tour.startDates[index].participants.includes(user._id)) {
      userHasBookedThisTour = true;
    }
  }

  const fetchMyTour = useCallback(async () => {
    try {
      const tour = await getTour(tourId);
      setTour(tour);
    } catch (err) {
      console.log(
        "Error trying to fetch tour: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    }
  }, [tourId]);

  useEffect(() => {
    fetchMyTour();
  }, [fetchMyTour, rerender]);

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
