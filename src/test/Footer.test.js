import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  render(<Footer />);
  test("should show name", () => {
    expect(
      screen.getByRole("heading", { name: "Sparkles" })
    ).toBeInTheDocument();
  });

  test("should Github link", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: "RReiso github.com profile" })
    ).toBeInTheDocument();
  });

  test("should Pixabay link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Pixabay" })).toBeInTheDocument();
  });
});
