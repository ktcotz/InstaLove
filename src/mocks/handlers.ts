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

  http.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, async () => {
    await delay(100);

    console.log("TUTAJ DATA");

    return HttpResponse.json({
      user: {
        login: "bitka123@wp.pl",
        password: "123456",
      },
    });
  }),
];
