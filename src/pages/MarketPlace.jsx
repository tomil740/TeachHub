import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomePageCategory from "../components/HomePageCategory";
import Card from "./../components/card/Card";
import { Link } from "react-router-dom";
import MatchingView from "../MatchingFeature/presentation/MatchingView";
import PerfectMatchedDialog from "../MatchingFeature/presentation/PerfectMatchedDialog";
import SwitchButton from '../MatchingFeature/presentation/utilComponents/SwitchButton';
import usePaginatedUsers from '../MatchingFeature/domain/usePaginatedUsers';


const MarketPlace = () => {
  const { category } = useParams();
  const [filterd, setFilterd] = useState(new Set());

  //MatchingView states
  const [isMatchingView, setIsMatchingView] = useState(false); 
  const [matchingViewIndex, setMatchingViewIndex] = useState(0);

  const [isPerfectDialogOpen, setIsPerfectDialogOpen] = useState(false);
  const [perfectSortedData,setPerfectSortedData] = useState([]);


  const { users, setUsers, loading1, hasMore, loadMoreUsers } =
    usePaginatedUsers();

  const handleScroll = useCallback(() => {
    // Trigger loading more users only if not in the matching view
    if (
      !isMatchingView && // Ensure this is false
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      hasMore
    ) {
      loadMoreUsers();
    }
  }, [isMatchingView, loadMoreUsers, hasMore]);

  useEffect(() => {
    if (!isMatchingView) {
      // Attach the scroll event listener only when not in the matching view
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMatchingView, handleScroll]);

  useEffect(() => {
    if (users.length > 1 && matchingViewIndex >= users.length - 1 && hasMore) {
      loadMoreUsers();
      console.log(users)
    }
  }, [matchingViewIndex, users.length, hasMore, loadMoreUsers]);


  const Filter = (text) => {
    setFilterd((prevFilterd) => {
      const newFilterd = new Set(prevFilterd);
      if (newFilterd.has(text)) {
        newFilterd.delete(text);
      } else {
        newFilterd.add(text);
      } 
      return newFilterd;
    }); 
  };

 const filteredUsers = () => {
   if (filterd.size < 1 || isMatchingView) return users; // If no filters are applied, return all users

   const matchedUsers = [];
   const seenUserIds = new Set();

   users.forEach((user) => {
    console.log("the user", user.typeOfService);
  
     if (
       user.typeOfService != undefined &&
       user.typeOfService.some((service) => filterd.has(service)) && // Match user services with filterd state
       !seenUserIds.has(user.id) // Avoid duplicates by checking ID
     ) {
       matchedUsers.push(user);
       seenUserIds.add(user.id);
     }
   }); 

   return matchedUsers;
 };
 

  //MatchingView
  function setPerefectMatch(data){
    setIsMatchingView(true)
    setUsers(data);
  }
  

  return (
    <div className="pagePadding container mx-auto flex flex-col items-center gap-5">
      <HomePageCategory
        padding="pt-20"
        filterFunc={Filter}
        category={category}
        disabled={isMatchingView}
      />

      {/* Animated Two-Way Switch with Transparency */}
      <SwitchButton
        isMatchingView={isMatchingView}
        setIsMatchingView={setIsMatchingView}
        resListIndex={setMatchingViewIndex}
      />

      <PerfectMatchedDialog
        isPerfectDialogOpen={isPerfectDialogOpen}
        setIsPerfectDialogOpen={setIsPerfectDialogOpen}
        setCallback={setPerfectSortedData}
        isMatchingView={isMatchingView}
        setMatchingViewIndex={setMatchingViewIndex}
      />

      {isMatchingView ? (
        loading1 ? (
          <div className="mt-4 flex w-full justify-center">
            <div className="loader h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <MatchingView
            userCollection={
              isPerfectDialogOpen ? perfectSortedData : filteredUsers()
            }
            matchingViewIndex={matchingViewIndex}
            setMatchingViewIndex={setMatchingViewIndex}
          />
        )
      ) : (
        <div className="flex flex-wrap gap-4">
          {filteredUsers().map((user) => (
            <Link to={`/profile/${user.id}`} key={user.id}>
              <Card
                name={user.name}
                typeOfService={user.typeOfService}
                description={user.aboutMe}
                priceOfService={user.priceOfService}
                profileImage={user.imgUrl}
                rating={user.rating}
                backgroundImage={user.backgroundImage}
              />
            </Link>
          ))}

          {/* Loading indicator */}
          {loading1 && (
            <div className="mt-4 flex w-full justify-center">
              <div className="loader h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
            </div>
          )}

          {/* End of pagination message */}
          {!loading1 && hasMore === true && (
            <div className="mt-4 w-full text-center text-gray-600">
              Scroll to load new data...
            </div>
          )}

          {/* End of pagination message */}
          {!loading1 && hasMore === false && filteredUsers().length > 0 && (
            <div className="mt-4 w-full text-center text-gray-600">
              You've reached the end of the list.
            </div>
          )}

          {/* No data message */}
          {!loading1 && hasMore === false && filteredUsers().length === 0 && (
            <div className="mt-4 w-full text-center text-gray-600">
              No matches found. Try adjusting your filters.
            </div>
          )}

          {/* Mini item below the last item */}
          {!loading1 && hasMore === false && (
            <div className="mt-2 w-full text-center text-sm text-gray-500">
              ~ End of Results ~
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
