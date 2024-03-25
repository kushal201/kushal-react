import { createContext } from "react";

const UserContext = createContext({
    loggedInUser: "Hello Kushal",
    greet: "Kushal"
});

export default UserContext;