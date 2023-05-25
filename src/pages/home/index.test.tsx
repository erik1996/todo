import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomePage } from "./index";
import renderer from "react-test-renderer";
import { StatusEnum } from "../../type";

describe("HomePage", () => {
  describe("Jest Snapshot testing suite", () => {
    test("renders correctly", () => {
      const component = renderer.create(<HomePage />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  test("renders input and add button", () => {
    render(<HomePage />);

    const inputElement = screen.getByPlaceholderText("Add New Item");
    expect(inputElement).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();
  });

  test("adds item to the list when form is submitted", () => {
    render(<HomePage />);

    const inputElement = screen.getByPlaceholderText("Add New Item");
    const addButton = screen.getByRole("button", { name: "Add" });

    // Enter text in the input field
    fireEvent.change(inputElement, { target: { value: "New Item" } });

    // Submit the form
    fireEvent.click(addButton);

    // Verify that the item is added to the list
    const addedItem = screen.getByText("New Item");
    expect(addedItem).toBeInTheDocument();
  });

  test("removes item from the list when remove button is clicked", () => {
    render(<HomePage />);

    // Add an item to the list
    const inputElement = screen.getByPlaceholderText("Add New Item");
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.change(inputElement, { target: { value: "New Item" } });
    fireEvent.click(addButton);

    // Find the remove button for the added item
    const removeButton = screen.getByRole("button", { name: "Remove" });

    // Click the remove button
    fireEvent.click(removeButton);

    // Verify that the item is removed from the list
    const removedItem = screen.queryByText("New Item");
    expect(removedItem).not.toBeInTheDocument();
  });

  test("updates item status when we select other option", () => {
    render(<HomePage />);
    // Fill the input field and submit the form to add an item
    const inputField = screen.getByPlaceholderText("Add New Item");
    fireEvent.change(inputField, { target: { value: "Test Item" } });
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    // Find the update button and click it
    fireEvent.change(screen.getByLabelText("status"), {
      target: { value: StatusEnum.DONE },
    });

    // Check if the item's status is updated
    const listItem = screen.queryByText(StatusEnum.DONE);

    expect(listItem).toBeInTheDocument();
  });
});
