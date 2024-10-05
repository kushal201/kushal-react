import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkValidData, checkName } from "../utils/validate";
import { useGlobal } from "../utils/UserContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { user, setUser } = useGlobal();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state based on authentication state
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setErrorMessage(null)
    // validating email and password
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    try {
      // Sign up logic
      if (!signIn) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const newUser = userCredential.user;
        const {uid, displayName, email} = newUser;

        await updateProfile(newUser, {
          displayName: name.current.value,
        });

        // Use newUser instead of user
        dispatch(
          addUser(
            {
            uid: uid,
            displayName: displayName,
            email: email,
          })
        );

        navigate("/"); // Redirect after successful sign-up
      }
      // Sign in logic
      else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        setUser(userCredential.user);
        navigate("/"); // Redirect after successful sign-in
      }
    } catch (error) {
      setErrorMessage(error.message); // Display error message
    }
  };

  return (
    <div className="bg-yellow-300 h-[700px]">
      <form onSubmit={(e) => e.preventDefault()} className="">
        {!signIn && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-3 m-3"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-3 m-3"
        ></input>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 m-3"
        ></input>
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="ml-3 p-3 bg-gray-100 border border-black rounded-lg"
        >
          {signIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={() => setSignIn(!signIn)}>
          {signIn ? "Sign Up Now!" : "Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
