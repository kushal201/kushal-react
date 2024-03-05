import { RESTAURANT_LIST_URL } from "./constant";

const useRestaurantList = () => {
// Logic to fetch data from Swiggy API
const fetchData = async () => {
    try {
      const data = await fetch(RESTAURANT_LIST_URL);

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
}

export default useRestaurantList;