import { useState } from "react";
import FeedbackDialog from "./FeadbackDialog"; 
import "./style/doneDealItem.css"

function DoneDealItem({ deal, userId, onFeedback }) {
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);

  const isBuyer = deal.buyerUserId === userId;
  const feedbackAvailable = isBuyer && !deal.isAllDone;

  // Toggle feedback dialog visibility
  const handleFeedback = () => {
    setIsFeedbackDialogOpen(!isFeedbackDialogOpen);
  };

  return (
    <div className="done-deal-item">
      <div className="deal-info">
        <p className="deal-price" style={{ color: isBuyer ? "red" : "green" }}>
          {isBuyer ? "-" : "+"}${deal.dealPrice}
        </p>
        <p className="deal-description">
          {isBuyer ? "You bought this deal." : "You sold this deal."}
        </p>
      </div>
      {feedbackAvailable && (
        <button className="done-deal-feedback-button" onClick={handleFeedback}>
          Leave Feedback
        </button>
      )}

      {/* Render the FeedbackDialog if it's open */}
      {isFeedbackDialogOpen && (
        <div className="done-deal-feedback-dialog-overlay">
          <div className="done-deal-feedback-dialog-container">
            <FeedbackDialog
              userIdtoFeadBack={isBuyer ? deal.sellerUserId : deal.buyerUserId}
              myId={userId}
              onDealFeadbackDone={onFeedback}
              onSubmit={() => setIsFeedbackDialogOpen(false)}
            />
            <button
              className="done-deal-close-dialog-button"
              onClick={() => setIsFeedbackDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoneDealItem;
