import { useContext } from "react";
import { ShopContext } from "../context/Context.js";

const CartItem = ({ id, name, image, price, quantity }) => {
  const { dispatch } = useContext(ShopContext);

  const removeFromBag = (id) => {
    dispatch({ type: "removeFromBag", payload: id });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0 && newQuantity < 6) {
      dispatch({
        type: "updateQuantity",
        payload: { id, newQuantity },
      });
    }
  };

  return (
    <article className="cart-item">
      <span role="button" className="remove" onClick={() => removeFromBag(id)}>
        <i className="circle fa fa-solid fa-times-circle"></i>
        <span className="sr-only">Remove Item button</span>
      </span>
      <div className="cart-item-all">
        <div className="cart-item-main-info">
          <img src={image} alt={name} />
          <p>
            <span>{name}</span>
            <span>${price}</span>
          </p>
        </div>
        <div className="cart-item-quantity">
          <span>${(price * quantity).toFixed(2)}</span>
          <div className="quantity-buttons">
            <button
              className="btn-sm btn-primary"
              onClick={() => updateQuantity(id, quantity - 1)}
            >
              −
            </button>
            <span data-testid="quantity">{quantity}</span>
            <button
              className="btn-sm btn-primary"
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
