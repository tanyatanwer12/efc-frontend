import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData, setFormData] =
  useState({
    userId: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response =
        await axios.post(
          "https://efc-backend.onrender.com/api/auth/login",
          formData
        );

      login(
        response.data.user,
        response.data.token
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
  EFC
</h1>

          <p className="text-gray-500 mt-2">
  Employee Verification Portal
</p>

        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="mb-4">

  <label className="block mb-2">
    User ID
  </label>

  <input
    type="text"
    placeholder="EFC001"
    value={formData.userId}
    onChange={(e) =>
      setFormData({
        ...formData,
        userId:
          e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
    required
  />

</div>

          <div className="mb-6">

            <label className="block mb-2">
              Password
            </label>

            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password:
                    e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}