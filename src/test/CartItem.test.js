import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "../components/CartItem";
import { ShopContext } from "../context/Context";
import images from "../products/images";

const cartItemProps = {
  id: 1,
  name: "Lorem Ipsum Dolor",
  image: images[0],
  price: 3000,
  quantity: 1,
};

const mockFullCart = {
  state: {
    cart: [
      {
        ...cartItemProps,
      },
    ],
  },
  dispatch: jest.fn(),
};

const renderWithContext = (component, mock) => {
  return {
    ...render(
      <ShopContext.Provider value={{ ...mock }}>
        {component}
      </ShopContext.Provider>
    ),
  };
};

describe("SingleItem component", () => {
  test("should show item card", () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  test("should show item name", () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    expect(screen.getByText(cartItemProps.name)).toBeInTheDocument();
  });

  test("should show item image", () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  test("should show item quantity", () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    expect(screen.getByTestId("quantity")).toHaveTextContent(
      cartItemProps.quantity
    );
  });

  test("should show increase and decrease buttons", async () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    expect(screen.getByRole("button", { name: "−" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
  });

  test("should call dispatch when item quantity is increased", () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    userEvent.click(screen.getByRole("button", { name: "+" }));
    expect(mockFullCart.dispatch).toHaveBeenCalledTimes(1);
    expect(mockFullCart.dispatch).toHaveBeenCalledWith({
      type: "updateQuantity",
      payload: {
        id: mockFullCart.state.cart[0].id,
        newQuantity: mockFullCart.state.cart[0].quantity + 1,
      },
    });
  });

  test("should not call dispatch when quantity is 1 and user is trying to decrease it", () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    userEvent.click(screen.getByRole("button", { name: "−" }));
    expect(mockFullCart.dispatch).toHaveBeenCalledTimes(0);
  });

  test("should call dispatch when 'remove item' button is clicked", () => {
    renderWithContext(<CartItem {...cartItemProps} />, mockFullCart);
    userEvent.click(screen.getByRole("button", { name: "Remove Item button" }));
    expect(mockFullCart.dispatch).toHaveBeenCalledTimes(1);
    expect(mockFullCart.dispatch).toHaveBeenCalledWith({
      type: "removeFromBag",
      payload: mockFullCart.state.cart[0].id,
    });
  });
});
