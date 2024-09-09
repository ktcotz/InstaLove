import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { CustomQueryClientProvider } from "../../../ui";
import { FormContextProvider } from "../../../ui/form/context/FormContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./../../../lib/i18n/i18n";
import userEvent from "@testing-library/user-event";

const renderFormWithProviders = async () => {
  const { ForgotPasswordForm } = await import("./../ForgotPasswordForm");

  return render(<ForgotPasswordForm />, {
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

describe("Forgot password form tests suite", () => {
  test("Should correctly render initially.", async () => {
    await renderFormWithProviders();
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    expect(emailInput).toHaveValue("");
    expect(emailInput).toBeRequired();
  });

  test("Should render correctly errors when trying to submit invalid data.", async () => {
    await renderFormWithProviders();
    const user = userEvent.setup();

    const INVALID_EMAIL = "asd";

    const INVALID_EMAIL_MESSAGE = "Email is invalid!";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const submitButton = screen.getByRole("button", {
      name: /remind password/i,
    });

    await user.type(emailInput, INVALID_EMAIL);

    await user.click(submitButton);

    expect(screen.getByText(INVALID_EMAIL_MESSAGE)).toBeInTheDocument();
  });

  test("Should forgot password correctly when provided valid data.", async () => {
    await renderFormWithProviders();

    const user = userEvent.setup();

    const VALID_EMAIL = "bitka123@wp.pl";

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const submitButton = screen.getByRole("button", {
      name: /remind password/i,
    });

    await user.type(emailInput, VALID_EMAIL);

    await user.click(submitButton);

    const loading = await screen.findByRole("status");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(loading).then(() => {
      const alert = screen.queryByRole("alert");

      expect(alert).toBeNull();
    });
  });
});
