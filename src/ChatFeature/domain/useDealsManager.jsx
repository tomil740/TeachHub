import { useState, useEffect } from "react";
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

    const updateDeals = (dealsData, type) => {
      setDeals((prevDeals) => {
        const updatedDeals = { ...prevDeals };
        if (type === "buyer") {
          updatedDeals.buyerRequests = dealsData.filter(
            (deal) => deal.isPending,
          );
          updatedDeals.doneDeals = [
            ...prevDeals.doneDeals,
            ...dealsData.filter((deal) => (!deal.isPending)),
          ];
        } else if (type === "seller") {
          updatedDeals.yourRequests = dealsData.filter(
            (deal) => deal.isPending,
          );
          updatedDeals.doneDeals = [
            ...prevDeals.doneDeals,
            ...dealsData.filter((deal) => (!deal.isPending)),
          ];
        }
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
