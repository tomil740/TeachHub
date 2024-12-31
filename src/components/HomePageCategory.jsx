import { cards } from "../data/categories";
import { useState, useEffect } from "react";
import FilterCard from "./FilterCard";

const HomePageCategory = ({
  padding,
  category,
  filterFunc = function () {},
  disabled = false, // New prop to disable/enable the menu
}) => {
  const [isMoreShown, setIsMoreShown] = useState(false);
  const [visibleCards, setVisibleCards] = useState(null);

  const showMore = () => {
    setIsMoreShown(!isMoreShown);
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1536) {
        setVisibleCards(8);
      } else if (screenWidth >= 1280) {
        setVisibleCards(6);
      } else if (screenWidth >= 1024) {
        setVisibleCards(5);
      } else if (screenWidth >= 768) {
        setVisibleCards(4);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  return (
    <div>
      {/* Display header and matched message if disabled */}
      {disabled ? (
        <div className="flex flex-col gap-4 text-center">
          <h2 className="mb-4 text-lg font-bold md:text-xl">
            Categories are disabled
          </h2>
          <p className="text-sm font-medium text-gray-500">
            The categories menu is currently disabled.
          </p>
        </div>
      ) : (
        <div className={`flex flex-col gap-4 ${padding}`}>
          <h2 className="mb-4 text-lg font-bold md:text-xl">
            Filter By Category
          </h2>

          <div className="flex flex-wrap gap-4">
            {cards
              .slice(0, isMoreShown ? cards.length : visibleCards)
              .map((card, index) => {
                const { img, text } = card;
                return (
                  <FilterCard
                    key={index}
                    img={img}
                    text={text}
                    filter={filterFunc}
                    category={category}
                  />
                );
              })}
          </div>

          <span
            className="cursor-pointer pb-4 text-right text-xs font-bold"
            onClick={showMore}
          >
            {isMoreShown ? "View Less" : "View More"}
          </span>
        </div>
      )}
    </div>
  );
};

export default HomePageCategory;
