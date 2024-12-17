const FilterCard = ({ img, text }) => {
  return (
    <div className="shadow-xAndY hover:shadow-hoverXandY flex h-40 w-40 cursor-pointer flex-col justify-center gap-4 rounded-lg p-4 transition-all duration-300">
      <div id="imgContainer" className="h-10 w-10 object-cover">
        <img className="h-full w-full" src={img} alt={text} />
      </div>
      <h3 className="text-lg font-bold leading-6">{text}</h3>
    </div>
  );
};

export default FilterCard;
