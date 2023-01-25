import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import Spinner from "../../components/spinner/Spinner";
import { useGlobalContext } from "../../context/UserContext";
import { getReviews } from "../../util/api";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import "./Reviews.css";

const Reviews = () => {
  const [user] = useLocalStorage("user");
  const { rerender } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);

  const {
    isLoading,
    error,
    data: reviews,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user._id],
    queryFn: () => getReviews(user._id),
    cacheTime: 1000 * 60 * 20,
  });

  if (error) {
    console.log("Error getting reviews of user: ", error);
    toast.error(error.response ? error.response.data.message : error.message);
  }

  useEffect(() => {
    refetch();
  }, [refetch, rerender]);

  return isLoading && !isEditing ? (
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
