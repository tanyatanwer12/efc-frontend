import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

import { CaseProvider } from "./context/CaseContext";
import { CompanyProvider } from "./context/CompanyContext";
import { VerifierProvider } from "./context/VerifierContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CompanyProvider>
        <VerifierProvider>
          <CaseProvider>
            <App />
          </CaseProvider>
        </VerifierProvider>
      </CompanyProvider>
    </AuthProvider>
  </React.StrictMode>
);