import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../context/UserContext";
import { addReview } from "../../../../util/api";
import "./AddReview.css";

const AddReview = ({ tour }) => {
  const { rerender, setRerender } = useGlobalContext();
  const [rating, setRating] = useState("choose_a_rating");
  const [reviewText, setReviewText] = useState("");
  const queryClient = useQueryClient();

  const addReviewMutation = useMutation({
    mutationFn: ({ tourId, reviewText, rating }) =>
      addReview(tourId, reviewText, rating),
    onSuccess: () => {
      setRerender(!rerender);
      toast.success("Your review was added successfully!");
      queryClient.invalidateQueries({ queryKey: ["tours", tour._id] });
    },
    onError: (err) => {
      console.log(
        "Adding reciew error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
    onSettled: () => {
      setRating("choose_a_rating");
      setReviewText("");
    },
  });

  const handleSubmitreview = async (e) => {
    e.preventDefault();
    if (rating === "choose_a_rating") {
      return toast.warn("Please add a rating");
    }
    addReviewMutation.mutate({ tourId: tour._id, reviewText, rating });
  };

  return (
    <section className="section-review">
      <div className="section-review__cta">
        <h2 className="heading-secondary mb-md">Add a review</h2>
        <form className="review-form" onSubmit={handleSubmitreview}>
          <label htmlFor="email" className="review-form__label">
            Rating
          </label>
          <select
            className="review-form__select"
            name="review-rating"
            id="review-rating"
            onChange={(e) => setRating(e.target.value)}
            required
            value={rating}
          >
            <option value="choose_a_rating">Choose a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label htmlFor="email" className="review-form__label">
            Review
          </label>
          <textarea
            className="review-form__text"
            rows="5"
            placeholder="Add a review..."
            onChange={(e) => setReviewText(e.target.value)}
            required
            value={reviewText}
          />
          <button
            type="submit"
            className="btn btn--green btn--small review-form__button"
          >
            {addReviewMutation.isLoading ? "Adding your review..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddReview;
