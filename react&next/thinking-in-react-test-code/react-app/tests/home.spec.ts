import { test, expect } from "@playwright/test";

test("Show all products", async ({ page }) => {
  // await page.goto("/");

  await expect(page.getByText(/Hello/)).toBeVisible();
});
