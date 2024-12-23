import React, { useState } from "react";
import { useADeal } from "../domain/useADeal";
import "../presentation/style/dealDialog.css"

function DealDialog({
  user1Id = "2SP0OZ6QHwQkosr2BHqMvsJZK4u1",
  user2Id = "LLSbAg2TO6XWGxSgxayeplS6xj93",
  price = 1,
  closeDialog,
}) {
  const [dealStatus, setDealStatus] = useState(null); // null, "loading", "success", "error"
  const { initiateDeal } = useADeal();

  const handleDeal = async () => {
    setDealStatus("loading");
    const success = await initiateDeal(user1Id, user2Id, price);
    setDealStatus(success ? "success" : "error");
  };

  return (
    <div className="deal-dialog">
      <h2>Make a Deal</h2>
      <p>Deal Cost: {price} coins</p>
      {dealStatus === "success" && (
        <p>Error: Insufficient coins or process failed.</p>
      )}
      {dealStatus === "error" && (
        <p>Error: Insufficient coins or process failed.</p>
      )}
      {dealStatus === "loading" && <p>Processing...</p>}
      {dealStatus === null && (
        <div>
          <button onClick={handleDeal}>Confirm Deal</button>
          <button onClick={closeDialog}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default DealDialog;
