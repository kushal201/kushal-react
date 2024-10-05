import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state based on authentication state
    });

    return () => unsubscribe();
  }, []);

  const props = {
    loggedInUser: "Welcome Kushal",
    greet: "Kushal",
    dark,
    setDark,
    user,
    setUser
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};

const useGlobal = () => useContext(UserContext);

export { UserContext, UserProvider, useGlobal };
