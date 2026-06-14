import Sidebar from "../components/Sidebar";
import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CaseContext } from "../context/CaseContext";
import { CompanyContext } from "../context/CompanyContext";

export default function CompanyDashboard() {
  const { id } = useParams();

  const {
    cases,
    deleteCase,
    updateCase,
  } = useContext(CaseContext);

  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedCase, setSelectedCase] =
    useState(null);

  const companyCases = cases.filter(
    (item) => item.companyId === id
  );

  const filteredCases = companyCases.filter(
    (item) =>
      item.applicantName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.contactNo
        ?.toString()
        .includes(search)
  );

  const totalCases = companyCases.length;

  const pendingCases = companyCases.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCases = companyCases.filter(
    (item) => item.status === "Completed"
  ).length;

  const totalRevenue = companyCases.reduce(
    (sum, item) =>
      sum + (item.companyRate || 0),
    0
  );

  const totalExpense = companyCases.reduce(
    (sum, item) =>
      sum + (item.verifierRate || 0),
    0
  );

  const totalProfit =
    totalRevenue - totalExpense;

  const { companies } =
    useContext(CompanyContext);

  const company =
    companies.find(
      (c) => c._id === id
    );

  const companyName =
    company?.name || "COMPANY";

  const handleDelete = (
    id,
    caseId
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete Case ${caseId}?`
      );

    if (confirmDelete) {
      deleteCase(id);
    }
  };
  const handleEdit = (caseData) => {
    setSelectedCase(caseData);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    updateCase(
      selectedCase._id,
      selectedCase
    );

    setShowEditModal(false);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              {companyName}
            </h1>

            <p className="text-gray-500 mt-2">
              Company Dashboard
            </p>
          </div>

          <Link
            to="/companies"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg"
          >
            Back
          </Link>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-10">

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
              Pending Cases
            </h3>

            <p className="text-3xl font-bold text-orange-500 mt-2">
              {pendingCases}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Completed Cases
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
              ₹{totalRevenue}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Expense
            </h3>

            <p className="text-3xl font-bold text-red-500 mt-2">
              ₹{totalExpense}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Profit
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              ₹{totalProfit}
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Cases
          </h2>

          <Link
            to={`/company/${id}/add-case`}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            + Add Case
          </Link>

        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6 flex-wrap">

          <input
            type="text"
            placeholder="Search Applicant or Phone Number..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-80 border p-3 rounded-lg"
          />



        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>
                <th className="p-4 text-left">
                  Case ID
                </th>

                <th className="p-4 text-left">
                  Applicant
                </th>

                <th className="p-4 text-left">
                  Bank
                </th>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-left">
                  Contact
                </th>

                <th className="p-4 text-left">
                  Verifier
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredCases.length === 0 ? (

                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-8 text-gray-500"
                  >
                    No cases found.
                  </td>
                </tr>

              ) : (

                filteredCases.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {item.caseId}
                    </td>

                    <td className="p-4">
                      {item.applicantName}
                    </td>

                    <td className="p-4">
                      {item.bank}
                    </td>

                    <td className="p-4">
                      {item.productType}
                    </td>

                    <td className="p-4">
                      {item.contactNo}
                    </td>

                    <td className="p-4">
                      {item.verifierName}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                            ? "bg-orange-100 text-orange-700"
                            : item.status === "Hold"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="bg-slate-900 text-white px-3 py-1 rounded-lg mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            item._id,
                            item.caseId
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
        {showEditModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white p-8 rounded-xl w-125">

              <h2 className="text-2xl font-bold mb-6">
                Edit Case
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  value={
                    selectedCase?.applicantName || ""
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

                <select
                  value={
                    selectedCase?.status || ""
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
                  <option>
                    Pending
                  </option>

                  <option>
                    Completed
                  </option>

                  <option>
                    Hold
                  </option>

                  <option>
                    Rejected
                  </option>
                </select>

                <input
                  type="number"
                  value={
                    selectedCase?.companyRate || 0
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      companyRate:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                  className="w-full border p-3 rounded"
                />

                <input
                  type="number"
                  value={
                    selectedCase?.verifierRate || 0
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
                  className="bg-green-600 text-white px-5 py-2 rounded"
                >
                  Save
                </button>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}