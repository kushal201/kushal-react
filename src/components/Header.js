import { LOGO_URL } from "../utils/constant";
import { useState } from "react";

// Header Component
const Header = () => {

    const[btnName, setBtnName] = useState("Login");
    console.log("Header Rendered");


    return (
        <div className="header">
            <div className="logo-container">
                <img className = "logo" src = {LOGO_URL}/>

            </div>
            <div className="nav-items">
                <ul>
                    <button type="primary">Home</button>
                    <button type="primary">About Us</button>
                    <button type="primary">Contact Us</button>
                    <button type="primary">Cart</button>
                    <button type="primary" onClick={
                        () => {
                            btnName === "Login" 
                            ? setBtnName("Logout") 
                            : setBtnName("Login");
                        }
                        }>{btnName}</button>
                </ul>
            </div>
        </div>
    )
};

export default Header;