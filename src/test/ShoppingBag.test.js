import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import ShoppingBag from "../components/ShoppingBag";
import { ShopContext } from "../context/Context";
import images from "../products/images";

const mockEmptyCart = {
  state: {
    cart: [],
  },
  dispatch: jest.fn(),
};

const mockFullCart = {
  state: {
    cart: [
      {
        id: 1,
        image: images[0],
        name: "Lorem Ipsum",
        quantity: 2,
        price: 2000.2,
      },
      {
        id: 2,
        image: images[2],
        name: "Lorem Ipsum2",
        quantity: 1,
        price: 1000.3,
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

describe("ShoppingBag component", () => {
  test("should show link to /cart", () => {
    renderWithContext(
      <MemoryRouter>
        <ShoppingBag />
      </MemoryRouter>,
      mockEmptyCart
    );
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart"
    );
  });

  test("should show empty cart on hover", () => {
    renderWithContext(
      <MemoryRouter>
        <ShoppingBag />
      </MemoryRouter>,
      mockEmptyCart
    );
    userEvent.hover(screen.getByRole("link", { name: "Cart" }));
    expect(screen.getByText("Your bag is empty!")).toBeInTheDocument();
  });

  test("should show full cart on hover", () => {
    renderWithContext(
      <MemoryRouter>
        <ShoppingBag />
      </MemoryRouter>,
      mockFullCart
    );
    userEvent.hover(screen.getByRole("link", { name: "Cart" }));
    expect(screen.getAllByRole("img").length).toBe(
      mockFullCart.state.cart.length
    );
  });

  test("should show number of items in cart", () => {
    renderWithContext(
      <MemoryRouter>
        <ShoppingBag />
      </MemoryRouter>,
      mockFullCart
    );

    const itemsInCart = mockFullCart.state.cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);

    expect(screen.getByTestId("count")).toHaveAttribute(
      "data-count",
      itemsInCart.toString()
    );
  });

  test("should call dispatch when 'remove item' button is clicked", () => {
    renderWithContext(
      <MemoryRouter>
        <ShoppingBag />
      </MemoryRouter>,
      mockFullCart
    );
    userEvent.hover(screen.getByRole("link", { name: "Cart" }));
    userEvent.click(
      screen.getAllByRole("button", { name: "Remove Item button" })[0]
    );
    expect(mockFullCart.dispatch).toHaveBeenCalledTimes(1);
    expect(mockFullCart.dispatch).toHaveBeenCalledWith({
      type: "removeFromBag",
      payload: mockFullCart.state.cart[0].id,
    });
  });

  test("should show subtotal of all cart items", () => {
    renderWithContext(
      <MemoryRouter>
        <ShoppingBag />
      </MemoryRouter>,
      mockFullCart
    );

    const subtotal = (items) => {
      return items
        .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
        .toFixed(2);
    };
    expect(screen.getByText(/Subtotal/).textContent).toBe(
      `Subtotal: $${subtotal(mockFullCart.state.cart)}`
    );
  });
});
