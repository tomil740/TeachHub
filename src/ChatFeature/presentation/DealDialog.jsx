import React, { useState } from "react";
import { useADeal } from "../domain/useADeal";
import "../presentation/style/dealDialog.css"

const DealDialog = ({ deal, onDealDone, closeDialog }) => {
  const [dealStatus, setDealStatus] = useState(null); // null, "loading", "success", "error"
  const { initiateDeal } = useADeal();

  const handleDeal = async () => {
    setDealStatus("loading");
    const success = await initiateDeal(
      deal.sellerUserId,
      deal.buyerUserId,
      deal.dealPrice,
    );
    setDealStatus(success ? "success" : "error");

    if (success) {
      onDealDone();
      alert("Deal has been made, check out doneDeals.");
    }
  };

  return (
    <div className="deal-dialog">
      {/* Deal Header */}
      <div className="deal-dialog-header">
        <h1>{`${deal.buyerName} deal request!`}</h1>
      </div>

      {/* Deal Details */}
      <div className="deal-dialog-content">
        <h2>Make a Deal</h2>
        <p className="deal-price">
          <strong>Deal Cost:</strong> <span>{deal.dealPrice} coins</span>
        </p>
        {dealStatus === "success" && (
          <p className="deal-success">Deal completed successfully!</p>
        )}
        {dealStatus === "error" && (
          <p className="deal-error">
            Error: Insufficient coins or process failed.
          </p>
        )}
        {dealStatus === "loading" && (
          <p className="deal-loading">Processing...</p>
        )}
        {dealStatus === null && (
          <div className="deal-dialog-actions">
            <button className="btn-confirm" onClick={handleDeal}>
              Confirm Deal
            </button>
            <button className="btn-cancel" onClick={closeDialog}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealDialog;
