import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Items from "./components/Items";
import PageNotFound from "./components/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [activeLink, setActiveLink] = useState("");

  return (
    <ScrollToTop>
      <Header activeLink={activeLink} setActiveLink={setActiveLink} />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home activeLink={activeLink} setActiveLink={setActiveLink} />
          }
        />
        <Route path="/all" element={<Items category="all" />} />
        <Route path="/new" element={<Items category="new" />} />
        <Route path="/gifts" element={<Items category="gifts" />} />
        <Route path="/luxury" element={<Items category="luxury" />} />
        <Route path="/sale" element={<Items category="sale" />} />
        <Route path="/cart" element={<Cart setActiveLink={setActiveLink} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </ScrollToTop>
  );
}

export default App;
