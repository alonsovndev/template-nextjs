import { screen } from "@testing-library/react";
import { AppLayout } from "@/shared/components/AppLayout";
import { renderWithProviders } from "@/test/render-with-providers";

describe("AppLayout", () => {
  it("renders the header link and its children", () => {
    renderWithProviders(
      <AppLayout>
        <p>page content</p>
      </AppLayout>
    );

    expect(screen.getByRole("link", { name: "Next.js Template" })).toHaveAttribute("href", "/");
    expect(screen.getByText("page content")).toBeInTheDocument();
  });
});
