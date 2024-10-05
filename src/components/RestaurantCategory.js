import { useGlobal } from "../utils/UserContext";
import ItemList from "./ItemList";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const { dark } = useGlobal();
  const handleClick = () => {
    setShowIndex();
  };

  // to toggle icon based on showItems state
  const toggleIcon = showItems ? <FaChevronUp/> : <FaChevronDown />;

  return (
    <div>
      <div
        className={`${
          dark ? "bg-gray-800 text-white border border-white rounded-lg" : "bg-white text-black"
        } w-6/12 my-5 mx-auto bg-gray-50 shadow-lg rounded-lg p-4`}
      >
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span className="relative top-2">{toggleIcon}</span> {/* Using the toggleIcon variable */}
        </div>

        {/* if showItems is true, it will render ItemList component */}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
