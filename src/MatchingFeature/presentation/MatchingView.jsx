import { useState } from "react";
import MatchingItem from "./MatchingItem";
import { useRecoilValue } from "recoil";
import { AuthenticatedUserState } from '../../AuthenticatedUserState';

function MatchingView({ userCollection }) {
  const logedUser = useRecoilValue(AuthenticatedUserState)[0]
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < userCollection.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("No more profiles to browse.");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      alert("You're already at the first profile.");
    }
  };

  const currentUser = userCollection[currentIndex];

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
