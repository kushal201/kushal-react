import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, removeItem } from "../utils/cartSlice";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = () => {
    dispatch(removeItem());
  };
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          onClick={handleClearCart}
          className="m-2 p-2 bg-orange-400 text-white rounded-lg shadow-lg"
        >
          Clear Cart
        </button>
        <button
          onClick={handleRemoveItem}
          className="m-2 p-2 bg-orange-400 text-white rounded-lg shadow-lg"
        >
          Remove Item
        </button>
        {cartItems.length === 0 && <h1>Your cart is Empty ☹</h1>}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
