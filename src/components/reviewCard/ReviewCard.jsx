import { useState } from "react";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { useGlobalContext } from "../../context/UserContext";
import { deleteReview, updateReview } from "../../util/api";
import "./ReviewCard.css";
import { AiFillCheckCircle, AiOutlineStar } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const ReviewCard = ({ review, tour, setIsEditing }) => {
  const { rerender, setRerender } = useGlobalContext();
  const [isDeletingReview, setIsDeletingReview] = useState(false);
  const [isSendingUpdatedReview, setIsSendingUpdatedReview] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newReview, setNewReview] = useState(review.review);
  const [newRating, setNewRating] = useState(review.rating);

  const handleRemoveReviewOrExitEdit = async () => {
    if (editing) return setEditing(false);
    setIsEditing(true);
    setIsDeletingReview(true);
    try {
      await deleteReview(review._id);
      toast.success("Your review was deleted successfully!");
      setRerender(!rerender);
    } catch (err) {
      console.log(
        "Deleting reciew error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    }
    setIsDeletingReview(false);
  };

  const handleEditReview = async () => {
    setIsEditing(true);
    setIsSendingUpdatedReview(true);
    try {
      await updateReview(review._id, newRating, newReview);
      toast.success("Your review was deleted successfully!");
      setRerender(!rerender);
    } catch (err) {
      console.log(
        "Deleting reciew error: ",
        err.response ? err.response.data : err
      );
      toast.error(err.response ? err.response.data.message : err.message);
    }
    setIsSendingUpdatedReview(false);
    setEditing(false);
  };

  return (
    <article>
      <div className="review-card__heading">
        <h3 className="mb-sm">{tour.name} Tour</h3>
        <p className="review__avatar--date">
          {new Date(review.createdAt).toLocaleString()}
        </p>
      </div>

      <div key={review.id} className="reviews__card reviews-card__card">
        {!isDeletingReview ? (
          <div className="btn--delete" onClick={handleRemoveReviewOrExitEdit}>
            X
          </div>
        ) : (
          <div className="delete-review__spinner--top btn--delete">
            <BeatLoader size={10} />
          </div>
        )}
        {!editing ? (
          <div className="btn--edit" onClick={() => setEditing(true)}>
            <FiEdit />
          </div>
        ) : (
          <AiFillCheckCircle
            className="update-reviews__save"
            size={25}
            onClick={handleEditReview}
          />
        )}
        {!isDeletingReview && !isSendingUpdatedReview ? (
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
            <p className="reviews__text review-card__text">{review.review}</p>
          )
        ) : (
          <div className="delete-review__spinner--middle ">
            <BeatLoader size={20} />
          </div>
        )}
        {!editing || !isSendingUpdatedReview ? (
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
