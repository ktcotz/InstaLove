import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { CustomQueryClientProvider } from "../../../ui";
import { FormContextProvider } from "../../../ui/form/context/FormContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./../../../lib/i18n/i18n";
import userEvent from "@testing-library/user-event";
const renderFormWithProviders = async () => {
  const { ResetPasswordForm } = await import("./../ResetPasswordForm");

  return render(<ResetPasswordForm />, {
    wrapper: ({ children }) => {
      return (
        <MemoryRouter initialEntries={["/forgot-password"]}>
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

describe("Reset password form tests suite", () => {
  test("Should correctly render initially.", async () => {
    await renderFormWithProviders();
    const passwordInput = screen.getByLabelText(/Password/);

    expect(passwordInput).toHaveValue("");
    expect(passwordInput).toBeRequired();
  });

  test("Should render correctly errors when trying to submit invalid data.", async () => {
    await renderFormWithProviders();
    const user = userEvent.setup();

    const INVALID_PASSWORD = "123";

    const INVALID_PASSWORD_MESSAGE = "Password must be more than 6 characters.";

    const passwordInput = screen.getByLabelText(/Password/);

    const submitButton = screen.getByRole("button", {
      name: /reset password/i,
    });

    await user.type(passwordInput, INVALID_PASSWORD);

    await user.click(submitButton);

    expect(screen.getByText(INVALID_PASSWORD_MESSAGE)).toBeInTheDocument();
  });
});
