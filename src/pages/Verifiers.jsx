import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { CaseContext } from "../context/CaseContext";
import { Link } from "react-router-dom";

export default function Verifiers() {
  const { cases } =
    useContext(CaseContext);

  const verifierStats = {};

  cases.forEach((item) => {
    const verifier =
      item.verifierName ||
      "Unknown";

    if (!verifierStats[verifier]) {
      verifierStats[verifier] = {
        totalCases: 0,
        pending: 0,
        completed: 0,
        revenue: 0,
      };
    }

    verifierStats[
      verifier
    ].totalCases++;

    if (
      item.status ===
      "Pending"
    ) {
      verifierStats[
        verifier
      ].pending++;
    }

    if (
      item.status ===
      "Completed"
    ) {
      verifierStats[
        verifier
      ].completed++;
    }

    verifierStats[
      verifier
    ].revenue +=
      item.verifierRate || 0;
  });

  const verifierRows =
    Object.entries(
      verifierStats
    );

  const totalVerifiers =
    verifierRows.length;

  const totalCases =
    cases.length;

  const totalPending =
    cases.filter(
      (item) =>
        item.status ===
        "Pending"
    ).length;

  const totalCompleted =
    cases.filter(
      (item) =>
        item.status ===
        "Completed"
    ).length;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

        <h1 className="text-3xl font-bold mb-8">
          Verifier Dashboard
        </h1>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Verifiers
            </h3>

            <p className="text-3xl font-bold mt-2">
              {totalVerifiers}
            </p>
          </div>

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
              {totalPending}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Completed
            </h3>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {totalCompleted}
            </p>
          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Verifier Performance
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">

                <tr>
                  <th className="p-3 text-left">
                    Verifier
                  </th>

                  <th className="p-3 text-left">
                    Total Cases
                  </th>

                  <th className="p-3 text-left">
                    Pending
                  </th>

                  <th className="p-3 text-left">
                    Completed
                  </th>

                  <th className="p-3 text-left">
                    Revenue
                  </th>

                  <th className="p-3 text-left">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {verifierRows.map(
                  (
                    [
                      name,
                      data,
                    ]
                  ) => (
                    <tr
                      key={name}
                      className="border-b"
                    >
                      <td className="p-3 font-medium">
                        {name}
                      </td>

                      <td className="p-3">
                        {
                          data.totalCases
                        }
                      </td>

                      <td className="p-3 text-orange-500">
                        {
                          data.pending
                        }
                      </td>

                      <td className="p-3 text-green-600">
                        {
                          data.completed
                        }
                      </td>

                      <td className="p-3 text-blue-600 font-semibold">
                        ₹
                        {data.revenue.toLocaleString()}
                      </td>

                      <td className="p-3">

                        <Link
                          to={`/verifier/${name}`}
                          className="bg-slate-900 text-white px-4 py-2 rounded-lg"
                        >
                          View
                        </Link>

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