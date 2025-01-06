import React, { useState, useEffect,useRef } from "react";
import DealDialog from "./DealDialog";import { useDealsManager } from "../domain/useDealsManager";
import './style/dealsManger.css'
import DoneDealItem from "./DoneDealItem";
import YourRequestItem from './util/YourRequestItem';
import useUnreadDeals from "../domain/useUnreadDeals";
import { chatsUnreadState } from "../../chatsUnreadState";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";




function DealsManager ({ userId }){

  const { 
    deals: { doneDeals, buyerRequests, yourRequests },
    loading,
    error,
    acceptDeal,
    leaveFeedback,
  } = useDealsManager(userId);

  const [activeTab, setActiveTab] = useState(null);
  const { unreadDeals, resetUnreadDeals, unreadChats } = useUnreadDeals(userId);
  const [chatsUnread, setChatsUnread] = useRecoilState(chatsUnreadState);

  // Keep track of the previous unreadChats count
  const prevUnreadChatsRef = useRef(0);

  useEffect(() => {
    // Access the previous unreadChats value
    const prevUnreadChats = prevUnreadChatsRef.current;

    // Update the current chatsUnread state
    setChatsUnread(unreadChats);

    // Trigger toast if unreadChats increases
    if (unreadChats > prevUnreadChats) {
      toast.apply("You have new unread messages!");
    }

    // Update the ref to the current unreadChats for the next comparison
    prevUnreadChatsRef.current = unreadChats;
  }, [unreadChats, setChatsUnread]);

  const toggleTab = (tab) => {
    const prevTab = activeTab;
    //closing the tab
    if (prevTab === tab) {
      setActiveTab(null);
    } else {
      //open new tab:
      //I will rest the unread counter
      setActiveTab(tab);
      resetUnreadDeals(tab);
    }
  };

  return (
    <div className="deals-manager">
      <div className="matched-deals-manager">
        <div className="deals-manager-bar">
          <div className="deals-manager-buttons">
            <button
              className={`done ${activeTab === "done" ? "active" : ""}`}
              onClick={() => toggleTab("done")}
            >
              <span className="icon">✔</span> Done Deals
              {unreadDeals.done > 0 && (
                <span className="notification-badge">{unreadDeals.done}</span>
              )}
            </button>
            <button
              className={`buyer ${activeTab === "buyer" ? "active" : ""}`}
              onClick={() => toggleTab("buyer")}
            >
              <span className="icon">🔽</span> Buyer Requests
              {unreadDeals.buyer > 0 && (
                <span className="notification-badge">{unreadDeals.buyer}</span>
              )}
            </button>
            <button
              className={`your ${activeTab === "your" ? "active" : ""}`}
              onClick={() => toggleTab("your")}
            >
              <span className="icon">👤</span> Your Requests
              {unreadDeals.your > 0 && (
                <span className="notification-badge">{unreadDeals.your}</span>
              )}
            </button>
          </div>
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
