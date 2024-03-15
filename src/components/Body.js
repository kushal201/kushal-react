import RestaurantCard, { recommended } from "./RestaurantCard";
import { useEffect, useState } from "react";
import { RESTAURANT_LIST_URL } from "../utils/constant";
import useRestaurantList from "../utils/useRestaurantList";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus"; 

const Body = () => {
  // State variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  // Higher Order Component
  const RestaurantCardRecommended = recommended(RestaurantCard);

  console.log("Body Rendered", listOfRestaurants)


  // Introducing useEffect hook
  useEffect(() => {
    fetchData();
    console.log("Restaurants fetched")
  }, []);

  useEffect(() => {
    console.log("Body useEffect called");
  }, [filteredRestaurant])

  // Logic to fetch data from Swiggy API
  const fetchData = async () => {
    try {
      const data = await fetch(RESTAURANT_LIST_URL);

      const json = await data.json();

      const restaurants1 = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      const restaurants2 = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants 

      const restaurants = [...restaurants1, ...restaurants2];

      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } 
      catch (error) {
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
    (rest) => (rest.info.sla.deliveryTime) <= 20
    );
    setFilteredRestaurant(nearbyRestaurants);
    console.log("quick");
  }

  const onlineStatus = useOnlineStatus();

  const restaurantList = useRestaurantList();

  if(onlineStatus === false) return <h1>You're Offline!, Please Check Your Internet Connection</h1>

  return listOfRestaurants.length === 0 ? 
  (
    <Shimmer/>
  ) : 
  
  (
    <div className="body">
      <div className="filter flex place-items-center">
        <div className="search m-4 p-4 flex items-center">
          <input type = "text" className="border border-black" value = {searchText} onChange={(e) => {
            setSearchText(e.target.value)
            }}/>
        </div>

        <div className="search m-4 p-4 flex items-center">
        <button className = "px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={
            () => {
              // Filter the restaurants as per input given
            let filteredRestaurant = listOfRestaurants.filter((res) => 
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}>Search</button>
            </div>
            <button className="px-4 py-2 text-white bg-orange-400 m-4 flex items-center rounded-lg shadow-lg" onClick={filterTopRatedRestaurants}>
             Top Rated Restaurants
            </button>
            <button className="p-2 mx-3 bg-yellow-500 text-white rounded-lg shadow-lg" onClick={quickDelivery}>
              Nearby Restaurants
            </button>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
          key={restaurant.info.id}
          to = {"/restaurants/" + restaurant.info.id}
          >
            {
              restaurant.info.avgRating >= 4.5 ? 
              ( <RestaurantCardRecommended resData = {restaurant}/>) 
              :
              (
              <RestaurantCard resData = {restaurant}/>
              )
            }
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
