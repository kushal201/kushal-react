import { render, screen } from "@testing-library/react";
import RestaurantCard, { recommended } from "../components/RestaurantCard";
import MOCK_DATA from "../components/mocks/resCardMock.json";
import "@testing-library/jest-dom";

it("should render Restaurant Card component with props data", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByText("NIC Ice Creams");

  // assertion
  expect(name).toBeInTheDocument();
});
