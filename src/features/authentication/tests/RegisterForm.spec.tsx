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
import { http, HttpResponse } from "msw";

const renderFormWithProviders = async () => {
  const { RegisterForm } = await import("../RegisterForm");

  return render(<RegisterForm />, {
    wrapper: ({ children }) => {
      return (
        <MemoryRouter initialEntries={["/register"]}>
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

describe("Register Form component testing suite", () => {
  test("Should correctly render initially.", async () => {
    await renderFormWithProviders();

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const nickNameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/);
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/);

    expect(nickNameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    expect(nickNameInput).toBeRequired();
    expect(confirmPasswordInput).toBeRequired();
  });

  test("Should render correctly errors when trying to submit invalid data.", async () => {
    await renderFormWithProviders();

    const user = userEvent.setup();

    const INVALID_EMAIL = "asd";
    const INVALID_PASSWORD = "cos";
    const INVALID_NICKNAME = "a";
    const INVALID_CONFIRM_PASSWORD = "abb";

    const INVALID_PASSWORD_EQUALITY = "abcdefgh";
    const INVALID_CONFIRM_PASSWORD_EQUALITY = "abcdefghhij";

    const INVALID_EMAIL_MESSAGE = "Email is invalid!";
    const INVALID_PASSWORD_MESSAGE = "Password must be more than 6 characters.";
    const INVALID_NICKNAME_MESSAGE = "Username must be more than 3 characters.";
    const INVALID_CONFIRM_PASSWORD_MESSAGE = "Passwords don't match.";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const nickNameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/);
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/);

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.type(emailInput, INVALID_EMAIL);
    await user.type(passwordInput, INVALID_PASSWORD);
    await user.type(nickNameInput, INVALID_NICKNAME);
    await user.type(confirmPasswordInput, INVALID_CONFIRM_PASSWORD);

    await user.click(submitButton);

    expect(screen.getByText(INVALID_EMAIL_MESSAGE)).toBeInTheDocument();
    expect(screen.getAllByText(INVALID_PASSWORD_MESSAGE)).toHaveLength(2);
    expect(screen.getByText(INVALID_NICKNAME_MESSAGE)).toBeInTheDocument();

    await user.type(passwordInput, INVALID_PASSWORD_EQUALITY);
    await user.type(confirmPasswordInput, INVALID_CONFIRM_PASSWORD_EQUALITY);

    expect(
      screen.getByText(INVALID_CONFIRM_PASSWORD_MESSAGE)
    ).toBeInTheDocument();
  });

  test("Should register correctly when provided valid data.", async () => {
    await renderFormWithProviders();

    const user = userEvent.setup();

    const VALID_EMAIL = "bitka123@wp.pl";
    const VALID_PASSWORD = "123456";
    const VALID_USERNAME = "bitek";
    const VALID_CONFIRM_PASSWORD = "123456";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const nickNameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/);
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/);

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.type(emailInput, VALID_EMAIL);
    await user.type(passwordInput, VALID_PASSWORD);
    await user.type(nickNameInput, VALID_USERNAME);
    await user.type(confirmPasswordInput, VALID_CONFIRM_PASSWORD);

    await user.click(submitButton);

    const loading = await screen.findByRole("status");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(() => {
      const alerts = screen.queryAllByRole("alert");

      expect(alerts).toHaveLength(0);
    });
  });

  test("Should show form error when provided invalid data.", async () => {
    server.use(
      http.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await renderFormWithProviders();

    const user = userEvent.setup();

    const VALID_EMAIL = "bitka123@wp.pl";
    const VALID_PASSWORD = "123456";
    const VALID_USERNAME = "bitek";
    const VALID_CONFIRM_PASSWORD = "123456";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const nickNameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/);
    const confirmPasswordInput = screen.getByLabelText(/Confirm password/);

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.type(emailInput, VALID_EMAIL);
    await user.type(passwordInput, VALID_PASSWORD);
    await user.type(nickNameInput, VALID_USERNAME);
    await user.type(confirmPasswordInput, VALID_CONFIRM_PASSWORD);

    await user.click(submitButton);

    const loading = await screen.findByRole("status");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(() => {
      const alerts = screen.queryAllByRole("alert");

      expect(alerts).not.toHaveLength(0);
    });
  });
});
