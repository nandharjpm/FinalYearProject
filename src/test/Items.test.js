import { render, screen } from "@testing-library/react";
import { ShopContext } from "../context/Context";
import Items from "../components/Items";

const mockState = {
  state: {
    products: [
      {
        id: 1,
        sale: true,
        luxury: true,
      },
      {
        id: 2,
        luxury: true,
      },
      {
        id: 3,
        sale: true,
        gifts: true,
        luxury: true,
      },
    ],
    cart: [],
  },
};

const renderWithContext = (category) => {
  return {
    ...render(
      <ShopContext.Provider value={{ ...mockState }}>
        <Items category={category} />
      </ShopContext.Provider>
    ),
  };
};

const productQuantity = (category) => {
  return mockState.state.products.reduce((acc, item) => {
    return item[category] ? acc + 1 : acc;
  }, 0);
};

describe("SingleItem component", () => {
  test("should show all product cards", () => {
    renderWithContext("all");
    expect(screen.getAllByRole("article").length).toBe(
      mockState.state.products.length
    );
  });

  test("should show only cards of products that are on sale", () => {
    renderWithContext("sale");
    expect(screen.getAllByRole("article").length).toBe(productQuantity("sale"));
  });

  test("should show only cards of products that are luxury", () => {
    renderWithContext("luxury");
    expect(screen.getAllByRole("article").length).toBe(
      productQuantity("luxury")
    );
  });

  test("should show only cards of products that are gifts", () => {
    renderWithContext("gifts");
    expect(screen.getAllByRole("article").length).toBe(
      productQuantity("gifts")
    );
  });
});
