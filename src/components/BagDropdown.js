import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Context.js";
import "../styles/components/BagDropdown.scss";

const BagDropdown = () => {
  const { state, dispatch } = useContext(ShopContext);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = state.cart
      .reduce((acc, item) => acc + Number(item.price) * item.quantity, 0)
      .toFixed(2);
    setSubtotal(total);
  }, [state.cart]);

  const removeFromBag = (id) => {
    dispatch({ type: "removeFromBag", payload: id });
  };

  return (
    <div className="dropdown">
      {state.cart.length > 0 ? (
        <>
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "0.75rem",
              marginRight: "1rem",
            }}
          >
            Price per item
          </span>
          {state.cart.map((item) => (
            <article className="dropdown-item" key={item.id}>
              <img src={item.image} alt={`${item.name}`} />
              <span>{item.name}</span>
              <span>${item.price}</span>
              <span role="button" onClick={() => removeFromBag(item.id)}>
                <i className="circle fa fa-solid fa-times-circle"></i>
                <span className="sr-only">Remove Item button</span>
              </span>
            </article>
          ))}
          <p>Subtotal: ${subtotal}</p>
        </>
      ) : (
        <p>Your bag is empty!</p>
      )}
    </div>
  );
};

export default BagDropdown;
