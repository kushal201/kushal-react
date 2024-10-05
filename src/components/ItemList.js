import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { useGlobal } from "../utils/UserContext";
const ItemList = ({ items }) => {
  // console.log(items);
  const dispatch = useDispatch();

  const { dark } = useGlobal();

  const handleAddItem = (item) => {
    // Dispatching action
    dispatch(addItem(item));
  };

  const IMG_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/";

  return (
    <div className={`${dark ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
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

            <p className={`${dark ? "text-white" : "text-gray-700"} text-xs`}>
              {item?.card?.info?.description}
            </p>
          </div>
          <div className="w-3/12 p-4">
            <div className="absolute">
              <button
                className="p-2 text-green-600 bg-gray-100 shadow-xl"
                onClick={() => handleAddItem(item)}
              >
                Add
              </button>
            </div>
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

export default ItemList;
