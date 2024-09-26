import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./style/style.css";
import "./lib/i18n/i18n.ts";
import { Modal } from "./ui/index.ts";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Modal>
        <App />
      </Modal>
    </QueryClientProvider>
  </React.StrictMode>
);
