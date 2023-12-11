import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState } from "react";



const Body = () => {

    // State varaible - super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState(resList);
    
    return(
    <div className="body">
        <div className="filter">
            <button className="filter-btn" onClick={
                () => {
                    // Filtering logic
                    const filteredList = listOfRestaurants.filter(
                        res => parseFloat(res.rating) > 4
                        );
                        setListOfRestaurants(filteredList);
                }
                }>Top Rated Restaurants</button>
        </div>
        <div className="res-container">

            {
                listOfRestaurants.map((restaurant) => <RestaurantCard key = {restaurant.key} resData = {restaurant}/>)
            }


        </div>
    </div>
    );
};

export default Body;