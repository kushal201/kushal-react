import { LOGO_URL } from "../utils/constant";

// Header Component
const Header = () => {
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
                </ul>
            </div>
        </div>
    )
};

export default Header;