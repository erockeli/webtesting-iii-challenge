// Test away
import React from "react";
import { render, fireEvent } from "@testing-library/react";
//https://testing-library.com/docs/react-testing-library/example-intro
import Dashboard from "./Dashboard";
import Controls from "../controls/Controls";

// Dashboard - shows the controls and display

test("Dashboard Renders Correctly", () => {
  render(<Dashboard />);
});

//https://jestjs.io/docs/en/snapshot-testing
test("Gate default status is unlocked", () => {
  const gateUnlocked = jest.fn();

  const { getByText } = render(<Controls locked={false} closed={false} />);

  fireEvent.click(getByText(/close gate/i));
  expect(gateUnlocked).toHaveBeenCalledTimes(0);
  //**NOTES***/ toHaveBeenCalledTimes()  https://jestjs.io/docs/en/expect#tohavebeencalled
});

test("Can't be closed or opened if gate is locked", () => {
  const lockedGateTrue = jest.fn();

  const { getByText } = render(
    <Controls toggleLocked={lockedGateTrue} locked={true} closed={true} />
  );

  fireEvent.click(getByText(/unlock gate/i));
  expect(lockedGateTrue).toHaveBeenCalledTimes(1);
  expect(lockedGateTrue).toBeTruthy();

  // toBeTruthy()  https://jestjs.io/docs/en/expect#tobetruthy
});

test("can't be closed or opened if gate locked", () => {
  const lockedGateFalse = jest.fn();

  const { getByText } = render(
    <Controls toggleClosed={lockedGateFalse} locked={false} closed={true} />
  );

  fireEvent.click(getByText(/open gate/i));
  expect(lockedGateFalse).toHaveBeenCalledTimes(1);
  expect(lockedGateFalse).toBeTruthy();
});