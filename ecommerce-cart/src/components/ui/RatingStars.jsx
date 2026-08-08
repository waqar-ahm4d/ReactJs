import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function RatingStars({ rating }) {
  return (
    <>
      <div className="flex items-center gap-1 text-yellow-500">
        {[1, 2, 3, 4, 5].map((star) => {
          if (rating >= star) return <FaStar key={star} />;
          if (rating >= star - 0.5) return <FaStarHalfAlt key={star} />;
          return <FaRegStar key={star} />;
        })}
      </div>
    </>
  );
}

export default RatingStars;
