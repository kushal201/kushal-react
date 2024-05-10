import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should render Header with Login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const loginButton = screen.getByRole("button", {name: "Login"});
  const cartButton = screen.getByText("Cart - (0 items)");
  expect(cartButton).toBeInTheDocument();

  fireEvent.click(loginButton);

  const logoutButton = screen.getByText("Welcome Kushal");

  expect(logoutButton).toBeInTheDocument();

});

