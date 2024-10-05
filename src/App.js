import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Login from "./components/Login";
import Header from "./components/Header";
import Body from "./components/Body";
import Cart from "./components/Cart";
import Error from "./components/Error";
import Footer from "./components/Footer";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";
import { useGlobal, UserProvider } from "./utils/UserContext"; // ensure correct imports
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

// Lazy-loaded components
const Grocery = lazy(() => import("./components/Grocery"));
const Contact = lazy(() => import("./components/Contact"));
const About = lazy(() => import("./components/About"));

const AppLayout = () => {
  const [userName, setUserName] = useState();
  const { user, setUser } = useGlobal(); // Ensure this is used within the UserProvider context

  useEffect(() => {
    const data = {
      name: "Welcome Kushal",
    };
    setUserName(data.name);
  }, []);

  return (
    <div className="app min-h-screen flex flex-col">
      {user ? (
        <>
          <Header />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer className="mt-auto" />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

// Creating Routes using createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <UserProvider>
      {" "}
      {/* UserProvider wrapping the whole app */}
      <RouterProvider router={appRouter} />
    </UserProvider>
  </Provider>
);
