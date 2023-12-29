import { LOGO_URL } from "../utils/constant";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Header Component
const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  console.log("Header Rendered");

  useEffect(() => {
    console.log("useEffect called");
  }, [btnName]);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <button type="button">
                <Link to="/">Home</Link>
                </button>
          </li>
          <li>
            <button type="button">
              <Link to="/about">About Us</Link>
            </button>
          </li>
          <li>
            <button type="button">
              <Link to="/contact">Contact Us</Link>
            </button>
          </li>
          <li>
            <button type="button">Cart</button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setBtnName((prevBtnName) =>
                  prevBtnName === "Login" ? "Logout" : "Login"
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
