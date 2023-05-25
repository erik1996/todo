import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Item } from ".";
import { StatusEnum } from "../../type";
describe("Item", () => {
  const mockItem = {
    id: 1,
    title: "New Item",
    status: StatusEnum.TO_DO,
    handleUpdate: jest.fn(),
    handleRemove: jest.fn(),
  };

  describe("Snapshot testing for TO_DO status", () => {
    test("renders correctly", () => {
      const component = renderer.create(
        <Item
          title={mockItem.title}
          status={StatusEnum.TO_DO}
          id={mockItem.id}
          handleRemove={() => {}}
          handleUpdate={() => {}}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("Snapshot testing for IN_PROGRESS status", () => {
    test("renders correctly", () => {
      const component = renderer.create(
        <Item
          title={mockItem.title}
          status={StatusEnum.IN_PROGRESS}
          id={mockItem.id}
          handleRemove={() => {}}
          handleUpdate={() => {}}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  test("should render the item with correct title and background color", () => {
    render(
      <Item
        title={mockItem.title}
        status={mockItem.status}
        id={mockItem.id}
        handleRemove={mockItem.handleRemove}
        handleUpdate={mockItem.handleUpdate}
      />
    );

    const item = screen.getByText(mockItem.title);
    expect(item).toBeInTheDocument();

    const itemContainer = screen.getByRole("listitem");
    expect(itemContainer).toHaveStyle(`background: yellow;`);
  });

  test("should have yellow background color when status is TO_DO", () => {
    render(
      <Item
        title={mockItem.title}
        status={StatusEnum.TO_DO}
        id={mockItem.id}
        handleRemove={() => {}}
        handleUpdate={() => {}}
      />
    );

    const itemContainer = screen.getByRole("listitem");
    expect(itemContainer).toHaveStyle("background: yellow;");
  });

  test("should have yellow background color when status is IN_PROGRESS", () => {
    render(
      <Item
        title={mockItem.title}
        status={StatusEnum.IN_PROGRESS}
        id={mockItem.id}
        handleRemove={() => {}}
        handleUpdate={() => {}}
      />
    );

    const itemContainer = screen.getByRole("listitem");
    expect(itemContainer).toHaveStyle("background: blue;");
  });

  test("should have green background color when status is DONE", () => {
    render(
      <Item
        title={mockItem.title}
        status={StatusEnum.DONE}
        id={mockItem.id}
        handleRemove={() => {}}
        handleUpdate={() => {}}
      />
    );

    const itemContainer = screen.getByRole("listitem");
    expect(itemContainer).toHaveStyle("background: green;");
  });

  test("should call handleUpdate when the status is changed", () => {
    render(
      <Item
        title={mockItem.title}
        status={mockItem.status}
        id={mockItem.id}
        handleRemove={mockItem.handleRemove}
        handleUpdate={mockItem.handleUpdate}
      />
    );

    const selectElement = screen.getByLabelText("status");
    fireEvent.change(selectElement, {
      target: { value: StatusEnum.IN_PROGRESS },
    });

    expect(mockItem.handleUpdate).toHaveBeenCalledWith(
      mockItem.id,
      StatusEnum.IN_PROGRESS
    );
  });

  test("should call handleRemove when click remove button", () => {
    render(
      <Item
        title={mockItem.title}
        status={mockItem.status}
        id={mockItem.id}
        handleRemove={mockItem.handleRemove}
        handleUpdate={mockItem.handleUpdate}
      />
    );

    const selectElement = screen.getByText("Remove");
    fireEvent.click(selectElement);

    expect(mockItem.handleRemove).toHaveBeenCalledWith(mockItem.id);
  });
});
