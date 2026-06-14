import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your account and application preferences
          </p>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-6">
            Profile Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">
                Name
              </p>

              <p className="font-semibold">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Role
              </p>

              <p className="font-semibold">
                {user?.role}
              </p>
            </div>

          </div>

        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-6">
            Account Settings
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between items-center">

              <div>
                <p className="font-medium">
                  Change Password
                </p>

                <p className="text-gray-500 text-sm">
                  Update your account password
                </p>
              </div>

              <button
                onClick={() =>
                  alert(
                    "Password change feature will be available soon."
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>

            </div>

            <hr />

            <div className="flex justify-between items-center">

              <div>
                <p className="font-medium">
                  Login Status
                </p>

                <p className="text-gray-500 text-sm">
                  Current session information
                </p>
              </div>

              <span className="text-green-600 font-semibold">
                Active
              </span>

            </div>

          </div>

        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-6">
            Preferences
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
              />
              Enable Excel Import
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
              />
              Enable Excel Export
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
              />
              Email Notifications
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
              />
              Auto Refresh Dashboard
            </label>

          </div>

        </div>

        {/* Application Information */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Application Information
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Application:</strong>{" "}
              Tiger Verification System
            </p>

            <p>
              <strong>Version:</strong>{" "}
              1.0.0
            </p>

            <p>
              <strong>Status:</strong>

              <span className="text-green-600 font-semibold ml-2">
                Running
              </span>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}