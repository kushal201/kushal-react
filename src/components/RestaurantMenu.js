import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    // using useParams to get "resId" from url
    const {resId} = useParams();
    

    // using the customised hook
    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(0);

    // function to check whether the desired category is open or closed
    const toggleShowIndex = (index) => {
        setShowIndex(prevIndex => (prevIndex === index ? null : index));
        
        //prevIndex is current state value of showIndex and index is the desired state value
    };

    if(resInfo === null) return <Shimmer />

    // destructuring to get name, cuisines and cost for two
    const {name, cuisines, costForTwoMessage} = resInfo?.cards[0]?.card?.card?.info;

    // destructuring to obtain the list of items from each restaurant
    const {itemCards} = 
        resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || 
        resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    console.log(itemCards);

    // filtering out the cards which have food items listed  
    const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (c) => c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    console.log(categories);


    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
            {categories.map((category, index) => (
                //controlled component below

                <RestaurantCategory
                key={category?.card?.card?.title}
                data = {category?.card?.card}
                showItems={index === showIndex ? true : false}
                setShowIndex = {() => toggleShowIndex(index)}
                />
            ))}
        </div>
    );
}

export default RestaurantMenu;