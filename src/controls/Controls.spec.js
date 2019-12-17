// Test away!
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Controls from "./Controls";

test("provide buttons for toggling closed and locked states", () => {
  const provideToggle = jest.fn();

  const { getByText } = render(
    <Controls toggleLocked={provideToggle} locked={true} closed={true} />
  );

  fireEvent.click(getByText(/lock gate/i));
  expect(provideToggle).toHaveBeenCalledTimes(1);
});

// toHaveBeenCalledTimes()  https://jestjs.io/docs/en/expect#tohavebeencalled

test("button's text changes according to the state of the door when clicked", () => {
  const textButtons = jest.fn();

  const { getByText } = render(
    <Controls closed={false} locked={false} toggleClosed={textButtons} />
  );

  expect(textButtons).toHaveBeenCalledTimes(0);
});

test(`closed toggle button is disabled if gate is locked`, () => {
  const buttonClosed = jest.fn();

  const { getByText } = render(
    <Controls closed={true} locked={true} toggleClosed={buttonClosed} />
  );

  const openGateButton = getByText(/open gate/i);
  fireEvent.click(openGateButton);
  expect(buttonClosed).not.toHaveBeenCalled();
});

test(`locked toggle button is disabled if gate is open`, () => {
  const buttonToggle = jest.fn();

  const { getByText } = render(
    <Controls closed={true} locked={true} toggleClosed={buttonToggle} />
  );

  const lockedButton = getByText(/lock gate/i);
  fireEvent.click(lockedButton);
  expect(buttonToggle).not.toHaveBeenCalled();
});