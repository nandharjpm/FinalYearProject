import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockComponent } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import Header from "../components/Header";
import Context, { ShopContext } from "../context/Context";

const renderWithContext = (component) => {
  return { ...render(<Context value={ShopContext}>{component}</Context>) };
};

describe("Header", () => {
  test("should show link to home page", () => {
    renderWithContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link", { name: "Sparkles" });
    expect(links.length).toBeGreaterThanOrEqual(1);
    expect(links[0]).toHaveAttribute("href", "/");
  });

  test("should show link to '/all'", () => {
    renderWithContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "All" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/all");
  });

  test("should show link to '/new'", () => {
    renderWithContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "New" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/new");
  });

  test("should show link to '/luxury'", () => {
    renderWithContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "Luxury" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/luxury");
  });

  test("should show link to '/gifts'", () => {
    renderWithContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "Gifts" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/gifts");
  });

  test("should show link to '/sale'", () => {
    renderWithContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: "Sale" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/sale");
  });

  test("should show link to '/cart'", () => {
    renderWithContext(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link", { name: "Cart" });
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
