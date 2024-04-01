import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/Context.js";
import CartItem from "./CartItem.js";
import "../styles/components/Cart.scss";

const Cart = ({ setActiveLink }) => {
  const { state, dispatch } = useContext(ShopContext);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = state.cart.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );
    setSubtotal(total);
  }, [state.cart]);

  useEffect(() => {
    setTax(subtotal * 0.13);
  }, [subtotal]);

  useEffect(() => {
    setTotal(subtotal + tax);
  }, [subtotal, tax]);

  const handleCheckout = () => {
    alert("Thank you for your order!");
    dispatch({ type: "resetCart" });
  };

  return (
    <main>
      <h3 className="order-title">Your Order</h3>
      <section className="order">
        {state.cart.length > 0 ? (
          <>
            {state.cart.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="delivery-info">
              <p>
                <i className="fa fa-truck" aria-hidden="true"></i> Order will be
                shipped in 24 hours
              </p>
              <p>
                <i className="fa fa-calendar-check-o" aria-hidden="true"></i>{" "}
                Same day delivery available for orders before 12pm
              </p>
              <p>
                <i className="fa fa-gift" aria-hidden="true"></i> Gift options
                available
              </p>
            </div>
            <div className="summary">
              <h3>Summary</h3>
              <p>
                Subtotal: <span>{subtotal.toFixed(2)}</span>
              </p>
              <p>
                Tax: <span>{tax.toFixed(2)}</span>
              </p>
              <p className="total">
                Order Total: $<span>{total.toFixed(2)}</span>
              </p>
              <button onClick={handleCheckout} className="btn-md btn-secondary">
                CHECKOUT
              </button>
            </div>
          </>
        ) : (
          <div className="empty-bag">
            <p>Your bag is currently empty!</p>
            <Link
              to="/all"
              className="btn-accent btn-sm"
              onClick={() => setActiveLink("all")}
            >
              Start shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
