import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CustomQueryClientProvider } from "../../../ui/QueryClientProvider";
import { FormContextProvider } from "../../../ui/form/context/FormContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./../../../lib/i18n/i18n";
import { userEvent } from "@testing-library/user-event";
import { server } from "../../../mocks/node";
import { delay, http, HttpResponse } from "msw";

const renderFormWithProviders = async () => {
  const { LoginForm } = await import("./../LoginForm");

  return render(<LoginForm />, {
    wrapper: ({ children }) => {
      return (
        <MemoryRouter initialEntries={["/login"]}>
          <CustomQueryClientProvider>
            <FormContextProvider>
              <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
            </FormContextProvider>
          </CustomQueryClientProvider>
        </MemoryRouter>
      );
    },
  });
};

describe("Login Form component testing suite", () => {
  test("Should correctly render initially.", async () => {
    await renderFormWithProviders();
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/);

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test("Should render correctly errors when trying to submit invalid data.", async () => {
    await renderFormWithProviders();
    const user = userEvent.setup();

    const INVALID_EMAIL = "asd";
    const INVALID_PASSWORD = "cos";

    const INVALID_EMAIL_MESSAGE = "Email is invalid!";
    const INVALID_PASSWORD_MESSAGE = "Password must be more than 6 characters.";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, INVALID_EMAIL);
    await user.type(passwordInput, INVALID_PASSWORD);

    await user.click(submitButton);

    expect(screen.getByText(INVALID_EMAIL_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(INVALID_PASSWORD_MESSAGE)).toBeInTheDocument();
  });

  test("Should login correctly when provided valid data.", async () => {
    await renderFormWithProviders();

    const user = userEvent.setup();

    const VALID_EMAIL = "bitka123@wp.pl";
    const VALID_PASSWORD = "123456";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, VALID_EMAIL);
    await user.type(passwordInput, VALID_PASSWORD);

    await user.click(submitButton);

    const loading = await screen.findByRole("status");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(() => {
      const alert = screen.getByRole("alert");

      expect(alert).toHaveTextContent("");
    });
  });

  test("Should show form error when provided invalid data.", async () => {
    server.use(
      http.post(
        `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token`,
        async () => {
          await delay(100);

          return new HttpResponse(null, { status: 500 });
        }
      )
    );

    await renderFormWithProviders();

    const user = userEvent.setup();

    const INVALID_EMAIL = "wyspagier@wp.pl";
    const INVALID_PASSWORD = "wyspagier";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, INVALID_EMAIL);
    await user.type(passwordInput, INVALID_PASSWORD);

    await user.click(submitButton);

    const loading = await screen.findByRole("status");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(() => {
      const alerts = screen.getAllByRole("alert");

      expect(alerts).not.toHaveLength(0);
    });
  });
});
