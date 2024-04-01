import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/Context.js";
import BagDropdown from "./BagDropdown";
import "../styles/components/ShoppingBag.scss";

const ShoppingBag = ({ hamNav, setActiveLink }) => {
  const { state } = useContext(ShopContext);
  const [totalBagItems, setTotalBagItems] = useState(0);

  useEffect(() => {
    const total = state.cart.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    setTotalBagItems(total);
  }, [state.cart]);

  return (
    <div id="bag-icon" className={hamNav ? "ham-bag" : "d-nav"}>
      <Link to="/cart" onClick={() => setActiveLink("")}>
        <span
          className="p1 fa-stack fa-2x has-badge"
          data-count={totalBagItems}
          data-testid="count"
        >
          <i
            className="p3 fa fa-shopping-bag fa-stack-1x xfa-inverse"
            data-count="4b"
          ></i>
        </span>
        <span className="sr-only">Cart</span>
      </Link>
      <BagDropdown />
    </div>
  );
};

export default ShoppingBag;
