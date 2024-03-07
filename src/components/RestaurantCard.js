import { CDN_URL } from "../utils/constant.js";

const styleCard = {
    backgroundColor: "#f0f0f0",

}


const RestaurantCard = (props) => {
    const { resData } = props;
    const {cloudinaryImageId, name, avgRating, cuisines, costForTwo, areaName}  = resData.info;
    const {slaString} = resData.info.sla;
    

    return (
        <div className="m-4 p-4 w-[220px] rounded-lg bg-gray-100 hover:bg-gray-300"> 
            <img className = "rounded-lg"
            alt = "res-logo" 
            src={
                  CDN_URL+ cloudinaryImageId}
                 />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{areaName}</h4>
            <h4>{avgRating} ⭐</h4>
            <h4>{costForTwo}</h4>
            <h4>{slaString}</h4>
        </div>
    );
};

export default RestaurantCard;