import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { healthyStatus } from "@/mocks/handlers";
import { server } from "@/mocks/server";
import { renderWithProviders } from "@/test/render-with-providers";
import { StatusCard } from "@/features/status";

describe("StatusCard", () => {
  it("shows a loading state, then the service status and its checks", async () => {
    renderWithProviders(<StatusCard />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading status");
    expect(await screen.findByText(/version 1\.0\.0/)).toBeInTheDocument();
    expect(screen.getByText("database")).toBeInTheDocument();
    expect(screen.getByText("cache")).toBeInTheDocument();
  });

  it("shows an empty state when the service reports no checks", async () => {
    server.use(http.get("*/health", () => HttpResponse.json({ ...healthyStatus, checks: [] })));

    renderWithProviders(<StatusCard />);

    expect(await screen.findByText("No checks reported")).toBeInTheDocument();
  });

  it("shows an error with a retry action when the request fails, then recovers", async () => {
    server.use(http.get("*/health", () => new HttpResponse(null, { status: 500 }), { once: true }));
    const user = userEvent.setup();

    renderWithProviders(<StatusCard />);

    expect(await screen.findByText("Could not load the service status")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Retry" }));

    expect(await screen.findByText(/version 1\.0\.0/)).toBeInTheDocument();
    expect(await screen.findByText("Status refreshed")).toBeInTheDocument();
  });

  it("refreshes the status when the refresh button is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StatusCard />);
    await screen.findByText(/version 1\.0\.0/);

    await user.click(screen.getByRole("button", { name: "Refresh" }));

    expect(await screen.findByText("Status refreshed")).toBeInTheDocument();
  });
});
