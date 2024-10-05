import { LOGO_URL } from "../utils/constant";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useGlobal } from "../utils/UserContext";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

// Header Component
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // using the context
  const { loggedInUser, dark, setDark } = useGlobal();
  console.log(loggedInUser);

  console.log("Header Rendered");

  useEffect(() => {
    console.log("Header useEffect called");
  }, [btnName]);

  const toggle = () => setDark(!dark);

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      dispatch(removeUser())
      navigate("/")
    });
  };

  // Subscribing to the store using useSelector hook
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div
      className={`${
        dark
          ? "bg-gray-800 text-white border-b border-white"
          : "bg-orange-100 text-black"
      } z-20 sticky top-0 flex h-50 justify-between shadow-lg m-0 transition-colors duration-500`}
    >
      <div className="logo-container">
        <img className="w-[170px] rounded-sm" src={LOGO_URL} alt="Logo" />
      </div>
      <div className={"flex items-center"}>
        <ul className="flex p-4 m-4">
          <li className="px-4">
            <button type="button">
              Online Status: {onlineStatus ? "🟢" : "🔴"}
            </button>
          </li>
          <li className="px-4">
            <button type="button">
              <Link to="/">Home</Link>
            </button>
          </li>
          <li className="px-4">
            <button type="button">
              <Link to="/about">About Us</Link>
            </button>
          </li>
          <li className="px-4">
            <button type="button">
              <Link to="/contact">Contact Us</Link>
            </button>
          </li>
          <li className="px-4">
            <button type="button">
              <Link to="/cart">Cart - ({cartItems.length} items)</Link>
            </button>
          </li>
          <li className="px-4">
            <button onClick={toggle}>
              {dark ? " Light Mode" : "Dark Mode"}
            </button>
          </li>
          <li className="px-4">
            <button onClick={handleSignOut}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
