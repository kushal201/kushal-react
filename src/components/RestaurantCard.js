import { CDN_URL } from "../utils/constant.js";

const RestaurantCard = (props) => {
    const { resData } = props;
    const {cloudinaryImageId, name, avgRating, cuisines, costForTwo, areaName}  = resData.info;
    const {slaString} = resData.info.sla;

    return (
        <div className="m-4 p-4 w-[220px] rounded-lg bg-gray-100 hover:bg-gray-300 shadow-xl"> 
            <img className = "rounded-lg"
            alt = "res-logo" 
            src={
                  CDN_URL+ cloudinaryImageId}
                 />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4 className="py-2">{areaName}</h4>
            <span className="bg-green-600 text-white rounded-lg font-semibold m-30 p-1">{avgRating} ☆</span>
            <h4 className="py-2">{costForTwo}</h4>
            <h4>{slaString}</h4>
        </div>
    );
};

export const recommended = (RestaurantCard) => {
    return(props) => {
        return (
            <div>
                <label className="absolute bg-orange-400 text-white m-2 p-2 rounded-lg">
                    Recommended
                </label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard;