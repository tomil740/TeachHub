import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomePageCategory from "../components/HomePageCategory";
import Card from "./../components/card/Card";
import { Link } from "react-router-dom";
import categorizeUsers from "./../FirebaseFunctions/FetchFilteredData";
import Pagination from "../components/Pagination";

const MarketPlace = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const [filterd, setFilterd] = useState(new Set());
  const [loading, setLoading] = useState(true);
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

  const filteredUsers = [...filterd].reduce((acc, title) => {
    const users = categories[title] || [];
    users.forEach((user) => {
      if (!acc.some((existingUser) => existingUser.id === user.id)) {
        acc.push(user);
      }
    });
    return acc;
  }, []);

  return (
    <div className="pagePadding container mx-auto flex flex-col items-center gap-5">
      <HomePageCategory
        padding="pt-20"
        filterFunc={Filter}
        category={category}
      />
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <span>Loading...</span>
        </div>
      ) : filterd.size === 0 ? (
        <div className="flex flex-wrap gap-4">
          {currentPosts.map((user) => (
            <Link to={`/profile/${user.id}`} key={user.id}>
              <Card
                userId={user.id}
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
                userId={user.id}
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
    </div>
  );
};

export default MarketPlace;
