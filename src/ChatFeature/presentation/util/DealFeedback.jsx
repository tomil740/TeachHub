import React from "react";
import "../style/dealFeadback.css"; 

function DealFeedback({ isSuccess, dealPrice }) {
  return (
    <div className={`deal-feedback ${isSuccess ? "success" : "failure"}`}>
      {isSuccess ? (
        <p>🎉 Deal completed successfully! -{dealPrice} coins</p>
      ) : (
        <p>❌ Deal failed. Please try again.</p>
      )}
    </div>
  );
}

export default DealFeedback;
