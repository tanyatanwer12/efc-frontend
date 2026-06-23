import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./context/AuthContext";
import { CaseProvider } from "./context/CaseContext";
import { CompanyProvider } from "./context/CompanyContext";
import { VerifierProvider } from "./context/VerifierContext";

function ErrorFallback({
  error,
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-3">
          Something went wrong
        </h1>

        <p className="text-gray-600 mb-4">
          {error.message}
        </p>

        <button
          onClick={() =>
            window.location.reload()
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={
        ErrorFallback
      }
    >
      <AuthProvider>
        <CompanyProvider>
          <VerifierProvider>
            <CaseProvider>
              <App />
            </CaseProvider>
          </VerifierProvider>
        </CompanyProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);