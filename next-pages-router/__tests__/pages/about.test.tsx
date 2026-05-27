import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "@/pages/about";

describe("About Page", () => {
  it("renders a heading", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
