import { useState } from "react";
import { AiFillCheckCircle, AiOutlineStar } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useMutation, useQueryClient } from "react-query";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { deleteReview, updateReview } from "../../util/api";
import useLocalStorage from "../../util/hooks/useLocalStorage";
import "./ReviewCard.css";

const ReviewCard = ({ review, tour, setIsEditing, manageReviewsPage }) => {
  const [user] = useLocalStorage("user");
  const [editing, setEditing] = useState(false);
  const [newReview, setNewReview] = useState(review.review);
  const [newRating, setNewRating] = useState(review.rating);
  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      toast.success("Your review was deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["allReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", user._id] });
    },
    onError: (err) => {
      console.log(
        "Deleting reciew error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const editReviewMutation = useMutation({
    mutationFn: ({ reviewId, newRating, newReview }) =>
      updateReview(reviewId, newRating, newReview),
    onSuccess: () => {
      toast.success("Your review was edited successfully!");
      setEditing(false);
      queryClient.invalidateQueries({ queryKey: ["allReviews"] });
      queryClient.invalidateQueries({ queryKey: ["reviews", user._id] });
    },
    onError: (err) => {
      console.log(
        "Editing reciew error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    },
  });

  const handleRemoveReviewOrExitEdit = async () => {
    setIsEditing(true);
    if (editing) return setEditing(false);
    deleteReviewMutation.mutate(review._id);
  };

  const handleEditReview = async () => {
    setIsEditing(true);
    editReviewMutation.mutate({ reviewId: review._id, newRating, newReview });
  };

  return (
    <article>
      <div
        className={`review-card__heading ${
          manageReviewsPage && "review-card__heading--manage-tours"
        }`}
      >
        <h3 className="mb-sm">{tour.name} Tour</h3>
        {!manageReviewsPage && (
          <p className="review__avatar--date">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        )}
      </div>

      <div key={review.id} className="reviews__card reviews-card__card">
        {!deleteReviewMutation.isLoading ? (
          <div className="btn--delete" onClick={handleRemoveReviewOrExitEdit}>
            X
          </div>
        ) : (
          <div className="delete-review__spinner--top btn--delete">
            <BeatLoader size={10} />
          </div>
        )}
        {!manageReviewsPage &&
          (!editing ? (
            <div className="btn--edit" onClick={() => setEditing(true)}>
              <FiEdit />
            </div>
          ) : (
            <AiFillCheckCircle
              className="update-reviews__save"
              size={25}
              onClick={handleEditReview}
            />
          ))}
        {manageReviewsPage && (
          <div className="reviews__avatar">
            <img
              src={`${process.env.REACT_APP_BACKEND}/img/users/${review.user.photo}`}
              alt={review.name}
              className="reviews__avatar--img"
            />
            <div>
              <h6 className="review__avatar--user">{review.user.name}</h6>
              <p className="review__avatar--date">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
        {!deleteReviewMutation.isLoading && !editReviewMutation.isLoading ? (
          editing ? (
            <>
              <textarea
                placeholder="Edit your review..."
                rows={3}
                className="review-form__text"
                onChange={(e) => setNewReview(e.target.value)}
                value={editing ? newReview : review.review}
              />
            </>
          ) : (
            <p
              className={`reviews__text ${
                !manageReviewsPage && "review-card__text"
              }`}
            >
              {review.review}
            </p>
          )
        ) : (
          <div className="delete-review__spinner--middle ">
            <BeatLoader size={20} />
          </div>
        )}
        {!editing || !editReviewMutation.isLoading ? (
          <div className="reviews__rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <AiOutlineStar
                key={star}
                className={`reviews__star reviews__star--${
                  editing
                    ? newRating >= star
                      ? "active"
                      : "inactive"
                    : review.rating >= star
                    ? "active"
                    : "inactive"
                } ${editing && "pointer"}`}
                onClick={() => editing && setNewRating(star)}
              />
            ))}
          </div>
        ) : (
          <div className="edit-review__spinner--bottom">
            <BeatLoader size={10} />
          </div>
        )}
      </div>
    </article>
  );
};

export default ReviewCard;
