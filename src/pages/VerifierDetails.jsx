import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CaseContext } from "../context/CaseContext";

export default function VerifierDetails() {
  const { name } = useParams();

  const { cases } =
    useContext(CaseContext);

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

  return (
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
                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}