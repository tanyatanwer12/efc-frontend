import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import AddCase from "./pages/AddCase";
import Companies from "./pages/Companies";
import Cases from "./pages/Cases";
import Reports from "./pages/Reports";
import ExportExcel from "./pages/ExportExcel";
import Settings from "./pages/Settings";
import Verifiers from "./pages/Verifiers";
import Login from "./pages/Login";
import VerifierDetails from "./pages/VerifierDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route
  path="/verifier/:name"
  element={<VerifierDetails />}
/>
        <Route
          path="/company/:id"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company/:id/add-case"
          element={
            <ProtectedRoute>
              <AddCase />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cases"
          element={
            <ProtectedRoute>
              <Cases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/export"
          element={
            <ProtectedRoute>
              <ExportExcel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verifiers"
          element={
            <ProtectedRoute>
              <Verifiers />
            </ProtectedRoute>
          }
        />

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;