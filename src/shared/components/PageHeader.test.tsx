import { screen } from "@testing-library/react";
import { PageHeader } from "@/shared/components/PageHeader";
import { renderWithProviders } from "@/test/render-with-providers";

describe("PageHeader", () => {
  it("renders the title and subtitle", () => {
    renderWithProviders(<PageHeader title="Welcome" subtitle="subtitle text" />);

    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
    expect(screen.getByText("subtitle text")).toBeInTheDocument();
  });

  it("renders without a subtitle", () => {
    renderWithProviders(<PageHeader title="Welcome" />);

    expect(screen.getByRole("heading", { name: "Welcome" })).toBeInTheDocument();
  });
});
