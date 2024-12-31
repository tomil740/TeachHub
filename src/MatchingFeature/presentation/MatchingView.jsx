import { useState } from "react";
import MatchingItem from "./MatchingItem";
import { useRecoilValue } from "recoil";
import { AuthenticatedUserState } from '../../AuthenticatedUserState';

function MatchingView({
  userCollection,
  matchingViewIndex,
  setMatchingViewIndex,
}) {
  const logedUser = useRecoilValue(AuthenticatedUserState)[0];

  const handleNext = () => {
    if (matchingViewIndex < userCollection.length - 1) {
      setMatchingViewIndex((prev) => prev + 1);
    } else {
      alert("No more profiles to browse.");
    }
  };

  const handlePrevious = () => {
    if (matchingViewIndex > 0) {
      setMatchingViewIndex((prev) => prev - 1);
    } else {
      alert("You're already at the first profile.");
    }
  };

  const currentUser = userCollection[matchingViewIndex];

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      {currentUser && (
        <MatchingItem
          user={logedUser}
          profileData={currentUser}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default MatchingView;
