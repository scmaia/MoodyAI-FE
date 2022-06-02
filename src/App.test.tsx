import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders page heading text", () => {
  render(<App />);
  const headingElement = screen.getByText(/Moody AI/i);
  expect(headingElement).toBeInTheDocument();
});
