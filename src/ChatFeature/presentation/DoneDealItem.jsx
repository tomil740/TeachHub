import { useState } from "react";
import FeedbackDialog from "./FeadbackDialog"; 
import "./style/doneDealItem.css"
import UserHeader from "./userHeader";

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
      {/* Transaction Header */}
      <div
        className="deal-header"
        style={{
          backgroundColor: isBuyer ? "#e6f7ff" : "#f6ffe6",
          padding: "10px",
          borderRadius: "5px",
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            color: isBuyer ? "#1890ff" : "#52c41a",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {isBuyer
            ? `Purchase Transaction from`
            : `Sale Transaction to`}
        </h2>
        <UserHeader userId={isBuyer ? deal.sellerUserId : deal.buyerUserId} />
      </div>

      {/* Deal Info */}
      <div className="deal-info">
        <p className="deal-price" style={{ color: isBuyer ? "red" : "green" }}>
          {isBuyer ? "-" : "+"}${deal.dealPrice}
        </p>
        <p className="deal-description">
          {isBuyer ? "You bought this deal." : "You sold this deal."}
        </p>
      </div>

      {/* Feedback Button */}
      {feedbackAvailable && (
        <button className="done-deal-feedback-button" onClick={handleFeedback}>
          Leave Feedback
        </button>
      )}

      {/* Feedback Dialog */}
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
