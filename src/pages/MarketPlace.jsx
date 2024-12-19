import { useState, useEffect } from "react";
import CategoryTitle from "../components/CategoryTitle";
import HomePageCategory from "../components/HomePageCategory";
import { cards } from "../data/categories";
import Card from "./../components/card/Card";

import categorizeUsers from "./../FirebaseFunctions/FetchFilteredData";

const MarketPlace = () => {
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const categorizedData = await categorizeUsers();
        setCategories(categorizedData);
      } catch (error) {
        console.log("Error fetching and categorizing users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="pagePadding container mx-auto flex flex-col">
      {/* Filter By Category */}

      <HomePageCategory padding="pt-20" />

      {/* Categories */}
      <div className="flex flex-col">
        {Object.keys(categories).map((category, index) => {
          const usersInCategory = categories[category];

          return (
            <div key={index}>
              <CategoryTitle text={category} />

              <div className="flex flex-wrap gap-4">
                {usersInCategory.map((user, userIndex) => (
                  <Card
                    key={userIndex}
                    name={user.name}
                    profession={user.profession}
                    description={user.bio}
                    image={user.imgUrl}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketPlace;
