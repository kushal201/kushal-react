import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API, MENU_EXTEND_URL } from "../utils/constant";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null); 

    const {resId} = useParams();
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try 
        {
            const data = await fetch(MENU_API + resId + MENU_EXTEND_URL);
            const json = await data.json();
            setResInfo(json.data);
        }
        catch (error) {
            console.error("Error Fetching Menu: ", error);
        }
    };

    if(resInfo === null) return <Shimmer />

    const {name, cuisines, cloudinaryImageId, costForTwoMessage, avgRatingString} = resInfo?.cards[2]?.card?.card?.info;

    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card || resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[5]?.card?.card?.categories[1];
    console.log(itemCards);

    return (
        <div className="menu">
            <h1>{name}</h1>
            <h3>{cuisines.join(", ")} - {costForTwoMessage}</h3>
            <h4>{avgRatingString}</h4>
            <ul>
                {itemCards.map((item) => (<li key = {itemCards[0]?.card?.info?.id}>{item.card?.info?.name} - {item?.card?.info?.price/100} Rs.</li>))}
            </ul>
        </div>
    );
}

export default RestaurantMenu;