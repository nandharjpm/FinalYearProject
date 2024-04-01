import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Cart from "../components/Cart";
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

const subtotal = (items) => {
  return items
    .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
    .toFixed(2);
};

describe("Cart component", () => {
  test("should show link to /all when cart is empty", () => {
    renderWithContext(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      mockEmptyCart
    );
    expect(
      screen.getByRole("link", { name: "Start shopping" })
    ).toHaveAttribute("href", "/all");
    expect(
      screen.queryByRole("button", { name: "CHECKOUT" })
    ).not.toBeInTheDocument();
  });

  test("should show items and checkout button when cart is full", () => {
    renderWithContext(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      mockFullCart
    );
    expect(screen.getAllByRole("article").length).toBe(
      mockFullCart.state.cart.length
    );
    expect(
      screen.getByRole("button", { name: "CHECKOUT" })
    ).toBeInTheDocument();
  });

  test("should show all images of cart items", () => {
    renderWithContext(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      mockFullCart
    );
    expect(screen.getAllByRole("img").length).toBe(
      mockFullCart.state.cart.length
    );
  });

  test("should show subtotal of all cart items", () => {
    renderWithContext(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      mockFullCart
    );
    expect(screen.getByText(/Subtotal/).textContent).toBe(
      `Subtotal: ${subtotal(mockFullCart.state.cart)}`
    );
  });

  test("should show total of all cart items", () => {
    renderWithContext(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      mockFullCart
    );
    const subTotal = Number(subtotal(mockFullCart.state.cart));
    const total = (subTotal + 0.13 * subTotal).toFixed(2);
    expect(screen.getByText(/Order Total/).textContent).toBe(
      `Order Total: $${total}`
    );
  });

  test("should show alert after checkout", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    renderWithContext(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      mockFullCart
    );
    userEvent.click(screen.getByRole("button", { name: "CHECKOUT" }));
    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});
