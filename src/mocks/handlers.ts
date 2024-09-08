import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token`, async () => {
    await delay(100);
    return HttpResponse.json({
      user: {
        login: "Cosiek Mosiek",
        password: "Strong Password",
      },
    });
  }),
];
