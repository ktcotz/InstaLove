import { delay, http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, async () => {
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

  http.post(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token`, async () => {
    await delay(100);

    return HttpResponse.json(
      [
        {
          user: {
            name: "bitka123@wp.pl",
          },
        },
      ],
      { status: 200 }
    );
  }),

  http.post(
    `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/recover`,
    async () => {
      await delay(100);

      return HttpResponse.json(
        [
          {
            email: "bitka123@wp.pl",
          },
        ],
        { status: 200 }
      );
    }
  ),
];
