import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type QueryClientProviderProps = {
  children: ReactNode;
};

const client = new QueryClient();

export const CustomQueryClientProvider = ({
  children,
}: QueryClientProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
