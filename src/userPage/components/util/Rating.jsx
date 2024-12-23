import PropTypes from "prop-types";

function Rating({ rating }) {
  // Ensure rating is a valid number and between 0 and 5
  const clampedRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

  return (
    <div className="flex items-center justify-center gap-2 text-amber-500">
      <i className="fa-solid fa-star md:text-lg"></i>
      <span className="font-bold md:text-lg">{clampedRating.toFixed(1)}</span>
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number,
};

Rating.defaultProps = {
  rating: 0,
};

export default Rating;
