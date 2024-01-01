import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";

const Body = () => {
  // State variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");


  // Introducing useEffect hook
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Body useEffect called");
  }, [filteredRestaurant])

  console.log("Body Rendered")
  // Logic to fetch data from Swiggy API
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4973049&lng=78.5384005&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();

      const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

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


  return listOfRestaurants.length === 0 ? 
  (
    <Shimmer/>
  ) : 
  
  (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type = "text" className="search-box" value = {searchText} onChange={(e) => {
            setSearchText(e.target.value)
            }}/>
          <button className = "input-button" onClick={
            () => {
              // Filter the restaurants as per input given
            let filteredRestaurant = listOfRestaurants.filter((res) => 
              res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}>Search</button>
        </div>
        <button className="filter-btn" onClick={filterTopRatedRestaurants}>
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
          key={restaurant.info.id}
          to = {"/restaurants/" + restaurant.info.id}
          >
          <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
