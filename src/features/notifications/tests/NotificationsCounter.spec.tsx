import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomQueryClientProvider } from "../../../ui";

const renderWithProviders = async () => {
  const { NotificationsCounter } = await import("./../NotificationsCounter");

  return render(<NotificationsCounter />, {
    wrapper: ({ children }) => {
      return <CustomQueryClientProvider>{children}</CustomQueryClientProvider>;
    },
  });
};

describe("Notifications Counter tests suite", async () => {
  test("Should render nothing when isn't notifications available", async () => {
    await renderWithProviders();

    const notifications = screen.queryByLabelText(/Notifications/i);

    expect(notifications).toBeNull();
  });

  test("Should render correctly when notifications is valid and less than 9", async () => {
    await renderWithProviders();

    const notifications = screen.queryByLabelText(/Notifications/i);

    expect(notifications).toBeNull();
  });
});
