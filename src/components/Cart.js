import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useGlobal } from "../utils/UserContext"
import CartItems from "./CartItems";
import { clearCart } from "../utils/cartSlice";
const Cart = () => {

  const {dark} = useGlobal();

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={`text-center p-4 ${dark ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        {cartItems.length !== 0 && <button
          onClick={handleClearCart}
          className="my-6 p-2 bg-orange-400 text-white rounded-lg shadow-lg"
        >
          Clear Cart
        </button>}
        {!cartItems.length && <h1 className="mt-4">Your cart is Empty ☹</h1>}
        <CartItems items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
