import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const { token, loading } =
    useContext(AuthContext);

  if (loading)
    return <h1>Loading...</h1>;

  return token ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}