import { removeItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const CartItems = ({ items }) => {
  const IMG_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/";

  const dispatch = useDispatch();
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="flex justify-betwee text-left p-2 border-b-2 border-gray-200"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span className="font-bold mx-2">{item?.card?.info?.name}</span>
              <span>
                - ₹{" "}
                {item?.card?.info?.price / 100 ||
                  item?.card?.info?.defaultPrice / 100}
                /-
              </span>
            </div>
            <button
              className="m-2 p-2 bg-orange-400 text-white rounded-lg shadow-lg"
              onClick={handleRemoveItem}
            >
              Remove
            </button>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute"></div>
            <img
              alt="image not available"
              src={IMG_URL + item?.card?.info?.imageId}
              className="w-full"
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
