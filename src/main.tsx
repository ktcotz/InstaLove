import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style/style.css";
import "./lib/i18n/i18n.ts";
import { Modal } from "./ui/index.ts";
import { NavigationContextProvider } from "./features/navigation/context/NavigationContext.tsx";
import { AuthContextProvider } from "./features/authentication/context/AuthContext.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <NavigationContextProvider>
        <Modal>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </Modal>
      </NavigationContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
