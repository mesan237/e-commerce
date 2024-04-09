import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { TiStarHalfOutline } from "react-icons/ti";

const Rating = ({ rating }) => {
  const count = Math.floor(rating);
  const diff = rating - count;
  const empty = Math.floor(5 - rating);
  // console.log(diff, count, empty);

  return (
    <div className="flex items-center">
      {Array.from({ length: count }, (_, i) => (
        <FaStar key={i} className="text-primary" />
      ))}
      {diff !== 0 && <TiStarHalfOutline className="w-5 h-5 text-primary" />}
      {empty > 0 &&
        Array.from({ length: empty }, (_, i) => (
          <FaRegStar key={i} className="text-primary" />
        ))}
    </div>
  );
};

export default Rating;
