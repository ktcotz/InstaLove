import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, async () => {
    console.log("cos");
    await delay(100);

    return HttpResponse.json(
      {
        user: {
          name: "bitka123@wp.pl",
        },
      },
      { status: 201 }
    );
  }),
];
