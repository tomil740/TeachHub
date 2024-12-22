import { useState, useEffect } from "react";
import CategoryTitle from "../components/CategoryTitle";
import HomePageCategory from "../components/HomePageCategory";
import { cards } from "../data/categories";
import Card from "./../components/card/Card";

import categorizeUsers from "./../FirebaseFunctions/FetchFilteredData";

const MarketPlace = () => {
  // const [selectedCategory, setSelectedCategory] = useState("all");

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const categorizedData = await categorizeUsers();
        setCategories(categorizedData);
        const allUsers = Object.values(categorizedData).flat();
        setAllUsers(allUsers);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching and categorizing users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="pagePadding container mx-auto flex flex-col">
      {/* Filter By Category */}

      <HomePageCategory padding="pt-20" />

      {/* Categories */}

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <span>Loading...</span>{" "}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {allUsers.map((user, userIndex) => (
            <Card
              key={userIndex}
              name={user.name}
              profession={user.profession}
              description={user.bio}
              image={user.imgUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
