import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomePageCategory from "../components/HomePageCategory";
import Card from "./../components/card/Card";
import { Link } from "react-router-dom";
import categorizeUsers from "./../FirebaseFunctions/FetchFilteredData";
import Pagination from "../components/Pagination";
import MatchingView from "../MatchingFeature/presentation/MatchingView";
import PerfectMatchedDialog from "../MatchingFeature/presentation/PerfectMatchedDialog";
import { useRecoilValue } from "recoil";
import { AuthenticatedUserState } from "../AuthenticatedUserState";
import { data } from "autoprefixer";

const MarketPlace = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const [filterd, setFilterd] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const loggedUser = useRecoilValue(AuthenticatedUserState)[1];
  const [categories, setCategories] = useState({
    "Basic Programming": [],
    "Full-Stack Development": [],
    "Front-End Development": [],
    "Back-End Development": [],
    "Mobile Development": [],
    "Data Analysis": [],
    "UI/UX Design": [], 
    "Graphic Design": [],
    "Video Editing": [],
    "Digital Marketing": [],
  });
  const [allUsers, setAllUsers] = useState([]);
  const [isMatchingView, setIsMatchingView] = useState(false); // State for toggle

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const categorizedData = await categorizeUsers();
        setCategories(categorizedData);
        const uniqueUsers = Object.values(categorizedData)
          .flat()
          .reduce((acc, user) => {
            if (!acc.some((existingUser) => existingUser.id === user.id)) {
              acc.push(user);
            }
            return acc;
          }, []);
        setAllUsers(uniqueUsers);
        setLoading(false);

        if (category) {
          setFilterd(new Set([category]));
        }
      } catch (error) {
        console.error("Error fetching and categorizing users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [category]);

  const lastPostInx = currentPage * postPerPage;
  const firstPostInx = lastPostInx - postPerPage;

  const currentPosts = allUsers.slice(firstPostInx, lastPostInx);

 const filteredUsers =
   filterd.length === 0
     ? Object.values(categories)
         .flat()
         .filter((user) => user.id !== loggedUser)
     : [...filterd].reduce((acc, title) => {
         const users = categories[title] || [];
         users.forEach((user) => {
           if (
             !acc.some((existingUser) => existingUser.id === user.id) &&
             user.id !== loggedUser
           ) {
             acc.push(user);
           }
         });
         return acc;
       }, []);

 

  function setPerefectMatch(data){
    setIsMatchingView(true)
    setAllUsers(data)
  }

  return (
    <div className="pagePadding container mx-auto flex flex-col items-center gap-5">
      <HomePageCategory
        padding="pt-20"
        filterFunc={Filter}
        category={category}
        disabled={(isMatchingView)}
      />

      {/* Animated Two-Way Switch with Transparency */}
      <div className="relative flex w-full max-w-md">
        <button
          onClick={() => setIsMatchingView(false)}
          className={`flex-1 rounded-l-lg py-3 text-center transition-all duration-300 ${
            !isMatchingView
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-500 opacity-50"
          }`}
        >
          Show All Users
        </button>
        <button
          onClick={() => setIsMatchingView(true)}
          className={`flex-1 rounded-r-lg py-3 text-center transition-all duration-300 ${
            isMatchingView
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-500 opacity-50"
          }`}
        >
          Show Matched View
        </button>
        <div
          className={`absolute left-0 top-0 h-full w-1/2 rounded-lg bg-blue-600 transition-transform duration-300 ease-in-out ${
            isMatchingView ? "translate-x-full" : "translate-x-0"
          }`}
          style={{
            zIndex: -1,
          }}
        ></div>
      </div>

      <PerfectMatchedDialog 
        userCollection={allUsers.filter((user) => user.id !== loggedUser)}
        setCallback={setPerefectMatch}
        isMatchingView={isMatchingView}
      />

      {isMatchingView ? (
        loading ? (
          <div className="flex h-48 items-center justify-center">
            <span>Loading...</span>
          </div>
        ) : (
          <MatchingView
            userCollection={allUsers.filter((user) => user.id !== loggedUser)}
          />
        )
      ) : (
        <>
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <span>Loading...</span>
            </div>
          ) : filterd.size === 0 ? (
            <div className="flex flex-wrap gap-4">
              {currentPosts.map((user) => (
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
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filteredUsers.map((user) => (
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
            </div>
          )}
          {filterd.size === 0 && !loading && (
            <Pagination
              totalPosts={allUsers.length}
              postsPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MarketPlace;
