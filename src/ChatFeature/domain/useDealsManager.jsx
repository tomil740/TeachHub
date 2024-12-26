import { useState, useEffect } from "react";
import getUserNameById from "../data/getUserNameById"
import {
  query,
  collection,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const useDealsManager = (userId) => {
  const [deals, setDeals] = useState({
    doneDeals: [],
    buyerRequests: [],
    yourRequests: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const buyerQuery = query(
      collection(db, "deals"),
      where("buyerUserId", "==", userId),
    );
    const sellerQuery = query(
      collection(db, "deals"),
      where("sellerUserId", "==", userId),
    );

    const unsubscribeBuyer = onSnapshot(buyerQuery, (querySnapshot) => {
      const buyerDeals = [];
      querySnapshot.forEach((doc) =>
        buyerDeals.push({ id: doc.id, ...doc.data() }),
      );
    
      updateDeals(buyerDeals, "buyer");
    });

    const unsubscribeSeller = onSnapshot(sellerQuery, (querySnapshot) => {
      const sellerDeals = [];
      querySnapshot.forEach((doc) =>
        sellerDeals.push({ id: doc.id, ...doc.data() }),
      );
      updateDeals(sellerDeals, "seller");
    });


    const updateDeals = async (dealsData, type) => {
      // Helper function to add buyerName and sellerName to deals
      const enrichDealWithNames = async (deal) => {
        const buyerName = await getUserNameById(deal.buyerUserId);
        const sellerName = await getUserNameById(deal.sellerUserId);
        return { ...deal, buyerName, sellerName }; // Add new fields locally
      };

      // Separate pending and completed deals
      const pendingDeals = [];
      const completedDeals = [];

      dealsData.forEach((deal) => {
        if (deal.isPending) {
          pendingDeals.push(deal);
        } else {
          completedDeals.push(deal);
        }
      });

      // Process all deals with enriched fields
      const enrichedPendingDeals = await Promise.all(
        pendingDeals.map(enrichDealWithNames),
      );
      const enrichedCompletedDeals = await Promise.all(
        completedDeals.map(enrichDealWithNames),
      );

      // Update state
      setDeals((prevDeals) => {
        const updatedDeals = { ...prevDeals };

        if (type === "buyer") {
          updatedDeals.buyerRequests = enrichedPendingDeals;
        } else if (type === "seller") {
          updatedDeals.yourRequests = enrichedPendingDeals;
        }

        updatedDeals.doneDeals = [
          ...prevDeals.doneDeals,
          ...enrichedCompletedDeals,
        ];
        return updatedDeals;
      });
    };


    setLoading(false);

    return () => {
      unsubscribeBuyer();
      unsubscribeSeller();
    };
  }, [userId]);
//this funconalitey avilabel through the spesfic seller chat by useMatchedCaht hook
/*
  const createDeal = async (buyerUserId, sellerUserId, dealPrice) => {
    try {
      const dealRef = collection(db, "deals");
      const newDeal = {
        buyerUserId,
        sellerUserId,
        isPending: true,
        isAllDone: false,
        dealPrice,
        createdAt: new Date(),
      };
      await addDoc(dealRef, newDeal);
    } catch (err) {
      setError(err.message);
    }
  };
  */

  const acceptDeal = async (dealId) => {
    try {
      const dealRef = doc(db, "deals", dealId);
      await updateDoc(dealRef, { isPending: false});
    } catch (err) {
      setError(err.message);
    }
  };
  //will update the matched deal object all doen,means feadbak has been sent
  const leaveFeedback = async (dealId) => {
    try {
      const dealRef = doc(db, "deals", dealId);
      await updateDoc(dealRef, { isAllDone: true });
      return true; // Success
    } catch (err) {
      setError(err.message); // Optionally, you can keep this to display the error
      return false; // Failure
    }
  };


  return { deals, loading, error, acceptDeal, leaveFeedback };
};
