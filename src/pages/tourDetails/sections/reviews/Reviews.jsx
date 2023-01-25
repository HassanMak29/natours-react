import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AiFillCheckCircle, AiOutlineStar } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../context/UserContext";
import { deleteReview, updateReview } from "../../../../util/api";
import useLocalStorage from "../../../../util/hooks/useLocalStorage";
import "./Reviews.css";

const Reviews = ({ tour }) => {
  const [user] = useLocalStorage("user");
  const { rerender, setRerender } = useGlobalContext();
  const queryClient = useQueryClient();

  const reviewRating = tour.reviews.find(
    (review) => review.user?._id === user?._id
  )?.rating;
  const oldReview = tour.reviews.find(
    (review) => review.user?._id === user?._id
  )?.review;

  const [newReview, setNewReview] = useState(oldReview);
  const [newRating, setNewRating] = useState(reviewRating || null);
  const [editing, setEditing] = useState(false);

  const reviewId = tour.reviews.find(
    (review) => review.user?._id === user?._id
  )?._id;

  const isReviewer = (review) => review.user?._id === user?._id;

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      toast.success("Your review was deleted successfully!");
      setRerender(!rerender);
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
      setRerender(!rerender);
      setEditing(false);
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
    if (editing) return setEditing(false);
    deleteReviewMutation.mutate(reviewId);
  };

  const handleEditReview = async () => {
    editReviewMutation.mutate({ reviewId, newRating, newReview });
  };

  return (
    <section className="section-reviews">
      <div className="reviews">
        {tour.reviews.map((review) => {
          return (
            <div key={review.id} className="reviews__card">
              {isReviewer(review) &&
                (!deleteReviewMutation.isLoading ? (
                  <div
                    className="btn--delete"
                    onClick={handleRemoveReviewOrExitEdit}
                  >
                    X
                  </div>
                ) : (
                  <div className="delete-review__spinner--top btn--delete">
                    <BeatLoader size={10} />
                  </div>
                ))}
              {isReviewer(review) &&
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
              {!isReviewer(review) ||
              (!deleteReviewMutation.isLoading &&
                !editReviewMutation.isLoading) ? (
                isReviewer(review) && editing ? (
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
                  <p className="reviews__text">{review.review}</p>
                )
              ) : (
                <div className="delete-review__spinner--middle ">
                  <BeatLoader size={20} />
                </div>
              )}
              {!isReviewer(review) ||
              !editing ||
              !editReviewMutation.isLoading ? (
                <div className="reviews__rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AiOutlineStar
                      key={star}
                      className={`reviews__star reviews__star--${
                        isReviewer(review) && editing
                          ? newRating >= star
                            ? "active"
                            : "inactive"
                          : review.rating >= star
                          ? "active"
                          : "inactive"
                      } ${isReviewer(review) && editing && "pointer"}`}
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
          );
        })}
      </div>
    </section>
  );
};

export default Reviews;
