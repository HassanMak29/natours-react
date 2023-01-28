import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import Spinner from "../../components/spinner/Spinner";
import { getAllReviews } from "../../util/api";
import "./ManageReviews.css";

const ManageReviews = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: getAllReviews,
    cacheTime: 1000 * 60 * 20,
  });

  if (error) {
    console.log(
      "Getting all reviews error: ",
      error.response ? error.response.data : error
    );
    toast.error(error.response ? error.response.data.message : error.message);
  }

  return isLoading && !isEditing ? (
    <Spinner />
  ) : (
    <main className="main">
      <section className="section-allRviews">
        <h2 className="heading-secondary mb-xlg">Manage all reviews</h2>
        <div className="section-myReviews">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              tour={review.tour}
              setIsEditing={setIsEditing}
              manageReviewsPage
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ManageReviews;
