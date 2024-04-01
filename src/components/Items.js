import { useContext } from "react";
import { ShopContext } from "../context/Context.js";
import SingleItem from "./SingleItem.js";
import "../styles/components/SingleItem.scss";

const Items = ({ category }) => {
  const { state } = useContext(ShopContext);

  return (
    <main>
      <h4 className="title">- {category} -</h4>
      <section className="all-items">
        {category === "all"
          ? state.products.map((item) => {
              return <SingleItem key={item.id} item={item} />;
            })
          : state.products.map((item) => {
              //return items with category(new, sale etc) set to 'true'
              return item[category] && <SingleItem key={item.id} item={item} />;
            })}
      </section>
    </main>
  );
};

export default Items;
