import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "../components/Home";

describe("Home component", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  test("should show image of a woman with a correct source", () => {
    setup();
    // expect(screen.getByAltText("woman").src).toBe(full-path);
    expect(screen.getByAltText("woman")).toHaveAttribute("src", "img2.jpg");
  });

  test("should render six links", () => {
    setup();
    expect(screen.getAllByRole("link").length).toEqual(6);
  });

  test("should render ten images", () => {
    setup();
    expect(screen.getAllByRole("img").length).toEqual(10);
  });

  test("'Shop now' button should link to /all", () => {
    setup();
    expect(screen.getByRole("link", { name: "Shop now" })).toHaveAttribute(
      "href",
      "/all"
    );
  });

  test("'Sale' button should link to /sale", () => {
    setup();
    expect(screen.getByRole("link", { name: "Sale" })).toHaveAttribute(
      "href",
      "/sale"
    );
  });
  test("'All' button should link to /all", () => {
    setup();
    expect(screen.getByRole("link", { name: "All" })).toHaveAttribute(
      "href",
      "/all"
    );
  });
  test("'New' button should link to /new", () => {
    setup();
    expect(screen.getByRole("link", { name: "New" })).toHaveAttribute(
      "href",
      "/new"
    );
  });
  test("'Gifts' button should link to /gifts", () => {
    setup();
    expect(screen.getByRole("link", { name: "Gifts" })).toHaveAttribute(
      "href",
      "/gifts"
    );
  });
  test("'Luxury' button should link to /luxury", () => {
    setup();
    expect(screen.getByRole("link", { name: "Luxury" })).toHaveAttribute(
      "href",
      "/luxury"
    );
  });
});
