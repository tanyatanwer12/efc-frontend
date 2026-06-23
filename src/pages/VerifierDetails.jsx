
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CaseContext } from "../context/CaseContext";

export default function VerifierDetails() {
  const { name } = useParams();

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedCase, setSelectedCase] =
    useState(null);

  const {
    cases,
    updateCase,
  } = useContext(CaseContext);

  const verifierCases =
    cases.filter(
      (item) =>
        item.verifierName === name
    );

  const totalCases =
    verifierCases.length;

  const pendingCases =
    verifierCases.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const completedCases =
    verifierCases.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  const revenue =
    verifierCases.reduce(
      (sum, item) =>
        sum +
        (item.verifierRate || 0),
      0
    );

  const handleEdit = (item) => {
    setSelectedCase(item);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    await updateCase(
      selectedCase._id,
      selectedCase
    );

    setShowEditModal(false);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

          <h1 className="text-3xl font-bold mb-8">
            {name}
          </h1>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Total Cases
              </h3>

              <p className="text-3xl font-bold mt-2">
                {totalCases}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Pending
              </h3>

              <p className="text-3xl font-bold text-orange-500 mt-2">
                {pendingCases}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Completed
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-2">
                {completedCases}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Revenue
              </h3>

              <p className="text-3xl font-bold text-blue-600 mt-2">
                ₹{revenue.toLocaleString()}
              </p>
            </div>

          </div>

          {/* Cases Table */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-6">
              Cases Assigned
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-900 text-white">

                  <tr>

                    <th className="p-3 text-left">
                      Case ID
                    </th>

                    <th className="p-3 text-left">
                      Applicant
                    </th>

                    <th className="p-3 text-left">
                      Bank
                    </th>

                    <th className="p-3 text-left">
                      Contact
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                    <th className="p-3 text-left">
                      Rate
                    </th>

                    <th className="p-3 text-left">
                      Payment
                    </th>

                    <th className="p-3 text-left">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {verifierCases.map(
                    (item) => (
                      <tr
                        key={item._id}
                        className="border-b"
                      >

                        <td className="p-3">
                          {item.caseId}
                        </td>

                        <td className="p-3">
                          {item.applicantName}
                        </td>

                        <td className="p-3">
                          {item.bank}
                        </td>

                        <td className="p-3">
                          {item.contactNo}
                        </td>

                        <td className="p-3">
                          {item.status}
                        </td>

                        <td className="p-3">
                          ₹{item.verifierRate}
                        </td>

                        <td className="p-3">

                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              item.paymentStatus ===
                              "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.paymentStatus ||
                              "Unpaid"}
                          </span>

                        </td>

                        <td className="p-3">

                          <button
                            onClick={() =>
                              handleEdit(item)
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            Edit
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[500px]">

            <h2 className="text-xl font-bold mb-4">
              Edit Case
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                value={
                  selectedCase?.applicantName ||
                  ""
                }
                onChange={(e) =>
                  setSelectedCase({
                    ...selectedCase,
                    applicantName:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              />

              <input
                type="number"
                value={
                  selectedCase?.verifierRate ||
                  0
                }
                onChange={(e) =>
                  setSelectedCase({
                    ...selectedCase,
                    verifierRate:
                      Number(
                        e.target.value
                      ),
                  })
                }
                className="w-full border p-3 rounded"
              />

              <select
                value={
                  selectedCase?.status ||
                  ""
                }
                onChange={(e) =>
                  setSelectedCase({
                    ...selectedCase,
                    status:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Hold">
                  Hold
                </option>

                <option value="Rejected">
                  Rejected
                </option>

              </select>

              <select
                value={
                  selectedCase?.paymentStatus ||
                  "Unpaid"
                }
                onChange={(e) =>
                  setSelectedCase({
                    ...selectedCase,
                    paymentStatus:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              >
                <option value="Paid">
                  Paid
                </option>

                <option value="Unpaid">
                  Unpaid
                </option>

              </select>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

