import { render } from "@testing-library/react";
import CartItem from "../components/CartItem";
import Context, { ShopContext } from "../context/Context";
import images from "../products/images";
import { shopReducer } from "../context/Reducers";

const cartItemProps = {
  id: 1,
  name: "Lorem Ipsum Dolor",
  image: images[0],
  price: 3000,
  quantity: 4,
};

const state = {
  currentCategory: "sale",

  cart: [
    {
      id: cartItemProps.id,
      image: cartItemProps.image,
      name: cartItemProps.name,
      quantity: cartItemProps.quantity,
    },
  ],
};

const renderWithContext = (component) => {
  return {
    ...render(<Context value={ShopContext}>{component}</Context>),
  };
};

describe("shopReducer test", () => {
  const setup = () => {
    renderWithContext(<CartItem {...cartItemProps} />);
  };

  test("should decrease item quantity", async () => {
    setup();
    const action = {
      type: "updateQuantity",
      payload: {
        id: cartItemProps.id,
        newQuantity: cartItemProps.quantity - 1,
      },
    };
    const updatedState = shopReducer(state, action);

    expect(updatedState).toEqual({
      ...state,
      cart: [
        {
          ...state.cart[0],
          quantity: cartItemProps.quantity - 1,
        },
      ],
    });
  });

  test("should increase item quantity", async () => {
    setup();
    const action = {
      type: "updateQuantity",
      payload: {
        id: cartItemProps.id,
        newQuantity: cartItemProps.quantity + 1,
      },
    };
    const updatedState = shopReducer(state, action);

    expect(updatedState).toEqual({
      ...state,
      cart: [
        {
          ...state.cart[0],
          quantity: cartItemProps.quantity + 1,
        },
      ],
    });
  });

  test("should remove item", () => {
    setup();
    const action = {
      type: "removeFromBag",
      payload: cartItemProps.id,
    };
    const updatedState = shopReducer(state, action);

    expect(updatedState).toEqual({
      ...state,
      cart: [],
    });
  });

  test("should update category", () => {
    setup();
    const action = {
      type: "updateCategory",
      payload: { category: "luxury" },
    };
    const updatedState = shopReducer(state, action);

    expect(updatedState).toEqual({
      currentCategory: "luxury",
      cart: state.cart,
    });
  });

  test("should reset cart", () => {
    setup();
    const action = {
      type: "resetCart",
    };
    const updatedState = shopReducer(state, action);

    expect(updatedState).toEqual({
      ...state,
      cart: [],
    });
  });

  test("should add new item", () => {
    setup();
    const newItem = {
      id: 1,
      name: "Lorem Ipsum Dolor2",
      image: images[1],
      price: 5000,
    };
    const action = {
      type: "addToBag",
      payload: newItem,
    };
    const updatedState = shopReducer(state, action);

    expect(updatedState).toEqual({
      ...state,
      cart: [...state.cart, { ...newItem, quantity: 1 }],
    });
  });
});
