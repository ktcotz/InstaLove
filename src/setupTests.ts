import "@testing-library/jest-dom";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { server } from "./mocks/node";

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
