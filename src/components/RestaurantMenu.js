import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {

    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    if(resInfo === null) return <Shimmer />

    const {name, cuisines, cloudinaryImageId, costForTwoMessage, avgRatingString, uniqueId} = resInfo?.cards[0]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.categories[1];
    console.log(itemCards);

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines.join(", ")} - {costForTwoMessage}</h3>
            <h4>{avgRatingString}</h4>
            <ul>
                {itemCards.map((item) => (<li key = {itemCards[0]?.card?.info?.uniqueId}>{item.card?.info?.name} - {item?.card?.info?.price/100} Rs.</li>))}
            </ul>
        </div>
    );
}

export default RestaurantMenu;