import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Context, { ShopContext } from "../context/Context";
import SingleItem from "../components/SingleItem";
import images from "../products/images";

const singleItemPropsInStock = {
  id: 1,
  name: "Lorem Ipsum Dolor",
  price: 3000,
  description: "Lorem ipsum sit amet dolor",
  image: images[0],
  inStock: true,
  sale: false,
};
const singleItemPropsOutOfStock = {
  id: 2,
  name: "Lorem Ipsum Dolor",
  price: 4000,
  description: "Lorem ipsum sit amet dolor",
  image: images[1],
  inStock: false,
  sale: false,
};

const renderWithContext = (component) => {
  return { ...render(<Context value={ShopContext}>{component}</Context>) };
};

describe("SingleItem component", () => {
  const setup = () => {
    // next line resolves error "Not implemented: HTMLCanvasElement.prototype.getContext"
    window.HTMLCanvasElement.prototype.getContext = () => {};
    renderWithContext(<SingleItem item={singleItemPropsInStock} />);
  };

  test("should show name of the item", () => {
    setup();
    expect(
      screen.getByRole("heading", { name: "Lorem Ipsum Dolor" })
    ).toBeInTheDocument();
  });

  test("should show image of the item", () => {
    setup();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should toggle 'Add To Bag' and 'Remove From Bag' buttons", () => {
    setup();
    const addToBagButton = screen.getByRole("button", { name: "Add To Bag" });
    expect(addToBagButton).toBeInTheDocument();
    userEvent.click(addToBagButton);
    expect(addToBagButton).not.toBeInTheDocument();
    const removeFromBag = screen.getByRole("button", {
      name: "Remove From Bag",
    });
    expect(removeFromBag).toBeInTheDocument();
    userEvent.click(removeFromBag);
    expect(removeFromBag).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add To Bag" })
    ).toBeInTheDocument();
  });

  test("should show 'Out of stock' for item that is out of stock", () => {
    renderWithContext(<SingleItem item={singleItemPropsOutOfStock} />);
    expect(
      screen.queryByRole("button", { name: "Add To Bag" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  test("should call dispatch when 'Add to Bag' button is clicked", () => {
    const dispatch = jest.fn();
    render(
      <ShopContext.Provider value={{ state: { cart: [] }, dispatch }}>
        <SingleItem item={singleItemPropsInStock} />
      </ShopContext.Provider>
    );
    userEvent.click(screen.getByRole("button", { name: "Add To Bag" }));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "addToBag",
      payload: {
        id: singleItemPropsInStock.id,
        name: singleItemPropsInStock.name,
        image: singleItemPropsInStock.image,
        price: singleItemPropsInStock.price,
      },
    });
  });

  test("should call dispatch when 'Remove From Bag' button is clicked", () => {
    const dispatch = jest.fn();
    render(
      <ShopContext.Provider
        value={{
          state: {
            cart: [
              {
                id: 1,
                name: "Lorem Ipsum Dolor",
                image: images[0],
                price: 3000,
                quantity: 1,
              },
            ],
          },
          dispatch,
        }}
      >
        <SingleItem item={singleItemPropsInStock} />
      </ShopContext.Provider>
    );
    userEvent.click(screen.getByRole("button", { name: "Remove From Bag" }));
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "removeFromBag",
      payload: singleItemPropsInStock.id,
    });
  });
});
