import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: "Welcome Kushal",
    greet: "Kushal"
});

export default UserContext;