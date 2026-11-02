import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/health", (route) =>
    route.fulfill({
      json: { status: "ok", version: "e2e", checks: [{ name: "database", status: "ok" }] },
    })
  );
});

test("home page renders the service status from the API", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
  await expect(page.getByText(/version e2e/)).toBeVisible();
});

test("unknown routes show the not-found page", async ({ page }) => {
  await page.goto("/does-not-exist");

  await expect(page.getByText("Page not found")).toBeVisible();
});
