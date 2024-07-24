import { SupabaseI18NHandler } from "../lib/i18n/i18n.types";

type CustomErrorConfig = {
  message: string;
  code?: ErrorCodes;
};

enum ErrorCodes {
  RATE_LIMITING_ERROR = 429,
  USER_ALREADY_REGISTERD = 422,
  INVALID_CREDENTIALS = 400,
}

export class CustomError extends Error {
  private errorCodes: Record<ErrorCodes, SupabaseI18NHandler> = {
    "429": this.rateLimingError(),
    "422": this.userDataManageError(),
    "400": this.invalidUserCredentials(),
  };

  constructor(protected error: CustomErrorConfig) {
    super(error.message);

    this.generateError();
  }

  generateError() {
    if (this.error.code) {
      return this.errorCodes[this.error.code];
    }

    return "supabase.no-expected" as const;
  }

  private userDataManageError() {
    const isPasswordError = this.message.includes("password");

    if (isPasswordError) {
      return "supabase.same-password" as const;
    }

    return "supabase.user-already-registered" as const;
  }

  private rateLimingError() {
    return "supabase.rate-limiting" as const;
  }

  private invalidUserCredentials() {
    const isUnconfirmed = this.message.includes("not confirmed");

    if (isUnconfirmed) {
      return "supabase.not-confirmed" as const;
    }

    return "supabase.invalid-user-credentials" as const;
  }
}
