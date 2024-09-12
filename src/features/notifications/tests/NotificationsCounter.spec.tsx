import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomQueryClientProvider } from "../../../ui";
import { server } from "../../../mocks/node";
import { http, HttpResponse } from "msw";

vi.mock("../authentication/queries/useUser");
vi.mock("./queries/useGetUnreadNotifications");

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
    server.use(
      http.get(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/notifications`,
        () => {
          return HttpResponse.json({
            session: {
              user: {
                id: "123456",
              },
            },
          });
        }
      )
    );

    await renderWithProviders();

    await waitFor(() => {
      const notifications = screen.queryByLabelText(/Notifications/i);

      screen.debug();

      expect(notifications).toBeNull();
    });
  });
});
