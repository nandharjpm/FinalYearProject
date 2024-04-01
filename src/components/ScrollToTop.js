import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const flexWrapper = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "flexStart",
  };

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <div style={flexWrapper}>{props.children}</div>;
};

export default ScrollToTop;
