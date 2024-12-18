import FilterCard from "../components/FilterCard";

const MarketPlace = () => {
  const cards = [
    {
      img: "https://cdn.icon-icons.com/icons2/3251/PNG/512/window_dev_tools_regular_icon_202646.png",
      text: "Full-Stack Development",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/8448/8448908.png",
      text: "UI/UX Design",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/1185/1185316.png",
      text: "Graphic Design",
    },
    {
      img: "https://static.thenounproject.com/png/3315575-200.png",
      text: "Digital Marketing",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/4291/4291172.png",
      text: "Video & Animation",
    },
  ];

  return (
    <div className="pagePadding container mx-auto flex min-h-calc-100dvh-minus-80 flex-col pt-20 lg:min-h-calc-100vh-minus-80">
      <h2 className="mb-8 text-lg font-bold md:text-xl">Filter By Category</h2>
      <div className="flex flex-wrap gap-4">
        {cards.map((card, index) => {
          const { img, text } = card;
          return <FilterCard key={index} img={img} text={text} />;
        })}
      </div>
    </div>
  );
};

export default MarketPlace;
