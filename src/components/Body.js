import RestaurantCard, { recommended } from "./RestaurantCard";
import { useEffect, useState } from "react";
import { RESTAURANT_LIST_URL } from "../utils/constant";
import { useGlobal } from "../utils/UserContext";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // State variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { dark } = useGlobal();

  // Higher Order Component
  const RestaurantCardRecommended = recommended(RestaurantCard);

  console.log("Body Rendered", listOfRestaurants);

  // Introducing useEffect hook
  // called only at inital render while the restaurant list is obtained
  useEffect(() => {
    fetchData();
    console.log("Restaurants fetched");
  }, []);

  useEffect(() => {
    console.log("Body useEffect called");
  }, [filteredRestaurant]);

  // logic to filtering restaurants as per input given in
  useEffect(() => {
    let filteredList = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    // if(!filteredList.length) {
    //   return <h1>No Such Restaurants Found!</h1>
    // }
    setFilteredRestaurant(filteredList);
  }, [searchText, listOfRestaurants]);

  // Logic to fetch data from Swiggy API
  const fetchData = async () => {
    try {
      const data = await fetch(RESTAURANT_LIST_URL);

      const json = await data.json();

      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      const restaurants2 =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      // const restaurants = [...restaurants1, ...restaurants2];

      // updating filtered restaurants and list of restaurants
      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Filtering logic
  const filterTopRatedRestaurants = () => {
    const filteredList = listOfRestaurants.filter(
      (res) => parseFloat(res.info.avgRating) >= 4.5
    );
    setFilteredRestaurant(filteredList);
  };

  // quick delivery feature
  const quickDelivery = () => {
    const nearbyRestaurants = listOfRestaurants.filter(
      (rest) => rest.info.sla.deliveryTime <= 20
    );
    setFilteredRestaurant(nearbyRestaurants);
    console.log("quick");
  };

  const onlineStatus = useOnlineStatus();

  // const restaurantList = useRestaurantList();

  if (!onlineStatus) return <h1>You're Offline!, Please Check Your Internet Connection</h1>;

  return listOfRestaurants.length === 0 ? (
    <Shimmer listOfRestaurants={listOfRestaurants} />
  ) : (
    <div className={`${dark ? "bg-gray-800" : "bg-white"} body`}>
      <div className="flex place-items-center">
        <div className="search m-4 p-4 flex items-center">
          <input
            type="text"
            placeholder="Search for Restaurants"
            className="border border-black w-full py-2 px-1"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => setSearchText("")}
            className="bg-orange-400 text-white p-2 mx-5 rounded-md"
          >
            Clear
          </button>
        </div>

        <div className="search m-4 p-4 flex items-center"></div>

        <div className="flex ml-auto">
          <button
            className="px-4 py-2 text-white bg-orange-400 m-4 flex items-center rounded-lg shadow-lg"
            onClick={filterTopRatedRestaurants}
          >
            Top Rated Restaurants
          </button>

          <button
            className="mx-3 bg-yellow-500 text-white rounded-lg shadow-lg"
            onClick={quickDelivery}
          >
            Nearby Restaurants
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {restaurant.info.avgRating >= 4.5 ? (
              <RestaurantCardRecommended resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
