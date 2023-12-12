import { CDN_URL } from "../utils/constant.js";

const styleCard = {
    backgroundColor: "#f0f0f0",

}


const RestaurantCard = (props) => {
    const { resData } = props;
    // console.log(props);

    const {imageId, name, rating, cuisine, cost, area, deliveryTime}  = resData;
    



    return (
        <div className="res-card" style={styleCard}> 
            <img className = "res-logo"
            alt = "res-logo" 
            src={
                  CDN_URL+ imageId}
                 />
            <h3>{name}</h3>
            <h3>{area}</h3>
            <h4>{cuisine}</h4>
            <h4>{rating}</h4>
            <h4>{deliveryTime}</h4>
            <h4>{cost}</h4>
        </div>
    );
};

export default RestaurantCard;