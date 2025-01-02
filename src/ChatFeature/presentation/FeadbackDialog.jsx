import React, { useState } from "react";
import { useFeedback } from "../domain/useFeadback"; // Custom hook to manage feedback submission
import "../presentation/style/feadbackDiaog.css";
import { toast } from "react-toastify";

function FeedbackDialog({
  userIdtoFeadBack,
  myId,
  onDealFeadbackDone,
  onSubmit,
}) {
  const [rating, setRating] = useState(0); // Rating input
  const [comment, setComment] = useState(""); // Comment box input

  const { submitFeedback, loading, error } = useFeedback(
    myId,
    userIdtoFeadBack,
  );

  const handleSubmit = async () => {
    if (!rating || !comment.trim()) {
      toast.error("Please provide a rating and a comment!");
      return;
    }

    try {
      const success = await submitFeedback({ rating, comment });
      if (success) {
        const feedbackDoneSuccess = await onDealFeadbackDone();
        if (feedbackDoneSuccess) {
          toast.success("Feedback submitted successfully!");
          await onSubmit();
          window.location.reload();
        } else {
          toast.error("Failed to finalize the feedback process.");
        }
      } else {
        toast.error("Failed to submit feedback.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div className="feedback-dialog">
      <h2 className="feedback-dialog-title">Leave Feedback</h2>
      <div className="feedback-dialog-rating">
        <label className="feedback-dialog-rating-label">Rating:</label>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= rating
                ? "feedback-dialog-star feedback-dialog-star-selected"
                : "feedback-dialog-star"
            }
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="feedback-dialog-textarea"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave your feedback here..."
      />
      <button
        className="feedback-dialog-submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
      {error && <p className="feedback-dialog-error">{error}</p>}
    </div>
  );
}

export default FeedbackDialog;
