import { LOGO_URL } from "../utils/constant";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

// Header Component
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  // using the context
  const { loggedInUser } = useContext(UserContext);
  console.log(loggedInUser);

  console.log("Header Rendered");

  useEffect(() => {
    console.log("Header useEffect called");
  }, [btnName]);

  return (
    <div className="flex h-50 justify-between bg-orange-100 shadow-lg m-0">
      <div className="logo-container">
        <img className="w-[170px] rounded-sm" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="flex items-center">
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
              <Link to="/grocery">Grocery</Link>
            </button>
          </li>
          {/* <li className="px-4">
            <button type="button">{loggedInUser}</button>
          </li> */}
          <li className="px-4">
            <button
              type="button"
              onClick={() => {
                setBtnName((prevBtnName) =>
                  prevBtnName === "Login" ? loggedInUser : "Login"
                );
              }}
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
