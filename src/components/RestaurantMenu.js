import { useState, useContext } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useParams } from "react-router-dom";
import UserContext from "../utils/UserContext";
import ShimmerMenu from "./ShimmerMenu";

const RestaurantMenu = () => {
  const [searchItems, setSearchItems] = useState("");

  // using useParams to get "resId" from url
  const { resId } = useParams();

  // using the customised hook
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);

  // function to check whether the desired category is open or closed
  const toggleShowIndex = (index) => {
    setShowIndex((prevIndex) => (prevIndex === index ? null : index));

    //prevIndex is current state value of showIndex and index is the desired state value
  };

  if (resInfo === null) return <ShimmerMenu />;

  const { loggedInUser } = useContext(UserContext);

  // destructuring to get following properties
  const { name, cuisines, areaName, avgRating, totalRatingsString } =
    resInfo?.cards[2]?.card?.card?.info;

  const { deliveryTime } = resInfo?.cards[2]?.card?.card?.info.sla;

  // destructuring to obtain the list of items from each restaurant
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card ||
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  console.log(itemCards);

  // filtering out the cards which have food items listed
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(categories);

  // function to filter the category while searching
  const filteredCategories = categories.filter((c) =>
    c?.card?.card?.title.toLowerCase().includes(searchItems.toLowerCase())
  );

  return (
    <div className="m-5 justify-between">
      <div className="flex justify-between items-center">
        <div>
          <p>{loggedInUser}</p>
          <h1 className="font-bold text-xl my-2">{name}</h1>
          <span className="text-xs text-gray-700">
            {cuisines.join(", ")} | {areaName}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-bold mx-7">{totalRatingsString}</span>
          <span className="bg-green-600 text-white rounded-lg font-medium p-1">
            {avgRating} ☆
          </span>
        </div>
      </div>
      <span className="text-xs text-gray-700">⏱ - {deliveryTime} minutes</span>
      <div className="my-5 border-t border-dashed border-black w-full"></div>
      <input
        type="text"
        onChange={(e) => setSearchItems(e.target.value)}
        value={searchItems}
        className="mx-3 place-items-center border border-black"
      ></input>

      {filteredCategories.map((category, index) => (
        //controlled component below
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => toggleShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
