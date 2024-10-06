import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkValidData } from "../utils/validate";
import { useGlobal } from "../utils/UserContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { LOGIN_IMAGES } from "../utils/constant";

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user, setUser } = useGlobal();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === LOGIN_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? LOGIN_IMAGES.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state based on authentication state
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
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
        const { uid, displayName, email: userEmail } = newUser;

        await updateProfile(newUser, {
          displayName: name.current.value,
        });

        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: userEmail,
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
    <>
      <div className="w-screen h-screen overflow-hidden">
        <img
          src={LOGIN_IMAGES[currentIndex]}
          alt={`carousel image ${currentIndex}`}
          className="object-cover w-full h-full transition-transform duration-500"
        />
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
          onClick={prevImage}
        >
          Prev
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full"
          onClick={nextImage}
        >
          Next
        </button>

          <div className="absolute mright-[40px] z-100 w-[300px] h-[400px] border border-black flex">
            <form onSubmit={(e) => e.preventDefault()}>
              {!signIn && (
                <input
                  ref={name}
                  className="p-3 m-3 border border-black"
                  type="text"
                  placeholder="Name"
                />
              )}
              <input
                ref={email}
                className="p-3 m-3 border border-black"
                type="text"
                placeholder="Email"
              />
              <input
                ref={password}
                className="p-3 m-3 border border-black"
                type="password"
                placeholder="Password"
              />
              <button
                onClick={handleButtonClick}
                className="p-3 m-3 bg-orange-400 text-white rounded-lg"
              >
                {signIn ? "Sign In" : "Sign Up"}
              </button>
              <p className="mt-3 text-red-600">{errorMessage}</p>
              <p
                onClick={() => setSignIn(!signIn)}
                className="m-4 hover:underline cursor-pointer"
              >
                {signIn ? "No Account? Sign Up Today!" : "Sign in"}
              </p>
            </form>
          </div>
        </div>
    </>
  );
};

export default Login;
