// Test away!
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Controls from "../controls/Controls";
import Display from "../display/Display";

test("Display renders without crashing to death", () => {
  render(<Display />);
});

test("Shows 'closed' if the 'close' prop is true", () => {
  const gateClosed = jest.fn();

  const { getByText } = render(<Display closed={true} />);

  fireEvent.click(getByText(/Closed/i));
  expect(gateClosed).toHaveBeenCalledTimes(0);
});

test("Shows 'locked' if the locked prop is true", () => {
  const gateLocked = jest.fn();

  const { getByText } = render(<Display locked={true} />);

  fireEvent.click(getByText(/Locked/i));
  expect(gateLocked).toHaveBeenCalledTimes(0);
});

test("when locked or closed- the red-led class is used", () => {
  // const closedOrLocked = jest.fn();

  const { container } = render(<Display closed={true} />);

  expect(container.firstChild.classList.contains(/red-led/i));
});

test("when locked or closed - the red-led class is used", () => {
  // const closedOrLocked = jest.fn();

  const { container } = render(<Display closed={false} />);

  expect(container.firstChild.classList.contains(/red-led/i));
});