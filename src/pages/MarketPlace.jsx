import CategoryTitle from "../components/CategoryTitle";
import HomePageCategory from "../components/HomePageCategory";
import { cards } from "../data/categories";
import Card from "./../components/card/Card";

const MarketPlace = () => {
  return (
    <div className="pagePadding container mx-auto flex flex-col">
      {/* TEST CARD */}
      <Card />

      {/* Filter By Category */}
      <HomePageCategory padding="pt-20" />

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
