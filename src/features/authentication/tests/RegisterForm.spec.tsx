import { render, waitFor } from "@testing-library/react";
import { describe, expect, test, vitest } from "vitest";
import { screen } from "@testing-library/react";
import { LoginForm } from "../LoginForm";
import { MemoryRouter } from "react-router";
import { CustomQueryClientProvider } from "../../../ui/QueryClientProvider";
import { FormContextProvider } from "../../../ui/form/context/FormContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./../../../lib/i18n/i18n";
import { userEvent } from "@testing-library/user-event";

const renderFormWithProviders = () => {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <CustomQueryClientProvider>
        <FormContextProvider>
          <I18nextProvider i18n={i18n}>
            <LoginForm />
          </I18nextProvider>
        </FormContextProvider>
      </CustomQueryClientProvider>
    </MemoryRouter>
  );
};

const loginFnMock = vitest.fn();

vitest.mock("./../mutations/useLogin.ts", () => {
  return {
    useLogin: () => {
      return {
        login: loginFnMock,
        isLogin: false,
        loginError: null,
      };
    },
  };
});

describe("Login Form component testing suite", () => {
  test("Should correctly render initially.", () => {
    renderFormWithProviders();
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/);

    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  test("Should render correctly errors when trying to submit invalid data.", async () => {
    renderFormWithProviders();

    const INVALID_EMAIL = "asd";
    const INVALID_PASSWORD = "cos";

    const INVALID_EMAIL_MESSAGE = "Email is invalid!";
    const INVALID_PASSWORD_MESSAGE = "Password must be more than 6 characters.";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/g);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, INVALID_EMAIL);
    await userEvent.type(passwordInput, INVALID_PASSWORD);

    await userEvent.click(submitButton);

    expect(screen.getByText(INVALID_EMAIL_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText(INVALID_PASSWORD_MESSAGE)).toBeInTheDocument();
  });

  test("Should login correctly when provided valid data.", async () => {
    renderFormWithProviders();

    const VALID_EMAIL = "kamil123@wp.pl";
    const VALID_PASSWORD = "mojesuperhasło";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/Password/g);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, VALID_EMAIL);
    await userEvent.type(passwordInput, VALID_PASSWORD);

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(loginFnMock).toHaveBeenCalledWith({
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });
    });
  });
});