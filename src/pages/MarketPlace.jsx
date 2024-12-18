import { useEffect, useState } from "react";
import FilterCard from "../components/FilterCard";
import { cards } from "../data/categories";
import CategoryTitle from "../components/CategoryTitle";

const MarketPlace = () => {
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
    <div className="pagePadding container mx-auto flex flex-col">
      {/* Filter By Category */}
      <div className="flex flex-col gap-4">
        <h2 className="mb-4 pt-20 text-lg font-bold md:text-xl">
          Filter By Category
        </h2>

        <div className="flex flex-wrap gap-4">
          {cards
            .slice(0, isMoreShown ? cards.length : visibleCards)
            .map((card, index) => {
              const { img, text } = card;
              return <FilterCard key={index} img={img} text={text} />;
            })}
        </div>

        <span
          className="cursor-pointer pb-4 text-right text-xs font-bold"
          onClick={showMore}
        >
          {isMoreShown ? "View Less" : "View More"}
        </span>
      </div>

      {/* Categories */}
      <div className="flex flex-col">
        {cards.map((category, index) => {
          const { text } = category;
          return <CategoryTitle key={index} text={text} />;
        })}
      </div>
    </div>
  );
};

export default MarketPlace;
