import React, { useState } from "react";
import { useADeal } from "../domain/useADeal";
import "../presentation/style/dealDialog.css"
import updateUnreadStateById from "../data/updateUnreadStateById";
import UserHeader from "./userHeader";
import { toast } from "react-toastify";

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
      await onDealDone();
            console.log("deal done",deal.sellerUserId);

      //update the unread counter
      //as the current user
      await updateUnreadStateById({
        userId: deal.sellerUserId,
        keyIncrement: "done",
      });
      //for the other end
      await updateUnreadStateById({
        userId: deal.buyerUserId,
        keyIncrement: "done",
        key2: "your",
      });
      onDealDone();
      toast.success("🎉 Deal has been made, check out doneDeals!");
    } else {
      toast.error("❌ Error: Insufficient coins or process failed.");
    }
  };

  return (
    <div className="deal-dialog">
      {/* Deal Header */}
      <div className="deal-dialog-header">
        <UserHeader userId={deal.buyerUserId}/>
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
