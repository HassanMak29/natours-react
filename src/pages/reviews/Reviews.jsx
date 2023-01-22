import "./Reviews.css";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import Spinner from "../../components/spinner/Spinner";
import { useGlobalContext } from "../../context/UserContext";
import { getReviews } from "../../util/api";
import useLocalStorage from "../../util/hooks/useLocalStorage";

const Reviews = () => {
  const [user] = useLocalStorage("user");
  const { rerender } = useGlobalContext();
  const [reviews, setReviews] = useState([]);
  const [laoding, setLaoding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchMyReviews = useCallback(async () => {
    setLaoding(true);
    try {
      const { data } = await getReviews(user._id);
      setReviews(data);
    } catch (err) {
      console.log(err.response ? err.response.data : err);
      toast.error(err.response ? err.response.data.message : err.message);
    }
    setLaoding(false);
  }, [user._id]);

  useEffect(() => {
    fetchMyReviews();
  }, [fetchMyReviews, rerender]);

  return laoding && !isEditing ? (
    <Spinner />
  ) : (
    <main className="main">
      <section className="section-myReviews">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            tour={review.tour}
            setIsEditing={setIsEditing}
          />
        ))}
      </section>
    </main>
  );
};

export default Reviews;
