import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CartItems from "./CartItems";
import { clearCart } from "../utils/cartSlice";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
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
        {cartItems.length === 0 && <h1>Your cart is Empty ☹</h1>}
        <CartItems items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
