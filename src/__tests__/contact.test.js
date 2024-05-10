import { screen, render } from "@testing-library/react";
import Contact from "../components/Contact";

test("Contact component should have input boxes", () => {
    render(<Contact/>);

    const inputBoxes = screen.getAllByRole("textbox");

    // assertion
    expect(inputBoxes.length).toBe(2);
});