import React, { useState } from "react";
import FeedbackDialog from "./FeadbackDialog";
import DealDialog from "./DealDialog";
import { useDealsManager } from "../domain/useDealsManager";
import "./style/dealsManger.css";
import DoneDealItem from "./DoneDealItem";
import YourRequestItem from "./util/YourRequestItem";

function DealsManager({ userId }) {
  const {
    deals: { doneDeals, buyerRequests, yourRequests },
    loading,
    error,
    acceptDeal,
    leaveFeedback,
  } = useDealsManager(userId);

  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? null : tab));
  };

  return (
    <div className="deals-manager border-b">
      <div className="deals-manager-bar">
        <div className="deals-manager-buttons">
          <button
            className={`done ${activeTab === "done" ? "active" : ""}`}
            onClick={() => toggleTab("done")}
          >
            <span className="icon">✔</span> Done Deals
            {activeTab === "done" && <span>✔</span>}
          </button>
          <button
            className={`buyer ${activeTab === "buyer" ? "active" : ""}`}
            onClick={() => toggleTab("buyer")}
          >
            <span className="icon">🔽</span> Buyer Requests
            {activeTab === "buyer" && <span>✔</span>}
          </button>
          <button
            className={`your ${activeTab === "your" ? "active" : ""}`}
            onClick={() => toggleTab("your")}
          >
            <span className="icon">👤</span> Your Requests
            {activeTab === "your" && <span>✔</span>}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <p>Loading deals...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-state">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Deal Container */}
      {!loading && !error && activeTab && (
        <div className="deals-manager-container">
          {activeTab === "done" &&
            doneDeals.map((deal) => (
              <DoneDealItem
                key={deal.id}
                deal={deal}
                userId={userId}
                onFeedback={() => leaveFeedback(deal.id)}
              />
            ))}
          {activeTab === "your" &&
            buyerRequests.map((deal) => (
              <YourRequestItem key={deal.id} deal={deal} userId={userId} />
            ))}
          {activeTab === "buyer" &&
            yourRequests.map((deal) => (
              <DealDialog
                key={deal.id}
                deal={deal}
                onDealDone={() => acceptDeal(deal.id)}
                closeDialog={() => console.log("Dialog closed")}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default DealsManager;
