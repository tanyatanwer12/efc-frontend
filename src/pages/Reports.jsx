import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { CaseContext } from "../context/CaseContext";
import { CompanyContext } from "../context/CompanyContext";

export default function Reports() {
  const { cases } = useContext(CaseContext);
  console.log("REPORT CASES", cases);
  const { companies } =
  useContext(CompanyContext);

  const totalCases = cases.length;
  

  const pendingCases = cases.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCases = cases.filter(
    (item) => item.status === "Completed"
  ).length;

  const totalRevenue = cases.reduce(
    (sum, item) =>
      sum + (item.companyRate || 0),
    0
  );

  const totalExpense = cases.reduce(
    (sum, item) =>
      sum + (item.verifierRate || 0),
    0
  );

  const totalProfit =
    totalRevenue - totalExpense;

  const companyStats = {};

  cases.forEach((item) => {
    const companyObj =
  companies.find(
    (c) =>
      c._id === item.companyId
  );

const company =
  companyObj?.name ||
  "Unknown";

    if (!companyStats[company]) {
      companyStats[company] = {
        cases: 0,
        revenue: 0,
        expense: 0,
        profit: 0,
        pending: 0,
      };
    }

    companyStats[company].cases++;

    companyStats[company].revenue +=
      item.companyRate || 0;

    companyStats[company].expense +=
      item.verifierRate || 0;

    companyStats[company].profit =
      companyStats[company].revenue -
      companyStats[company].expense;

    if (item.status === "Pending") {
      companyStats[company].pending++;
    }
  });

  const companyRows =
    Object.entries(companyStats);

  const topRevenueCompany =
    [...companyRows].sort(
      (a, b) =>
        b[1].revenue -
        a[1].revenue
    )[0]?.[0] || "-";

  const topProfitCompany =
    [...companyRows].sort(
      (a, b) =>
        b[1].profit -
        a[1].profit
    )[0]?.[0] || "-";

  const mostPendingCompany =
    [...companyRows].sort(
      (a, b) =>
        b[1].pending -
        a[1].pending
    )[0]?.[0] || "-";

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

        <h1 className="text-3xl font-bold mb-8">
          Reports Dashboard
        </h1>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

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

        {/* Analytics Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Top Revenue Company
            </h3>

            <p className="text-xl font-bold mt-3">
              {topRevenueCompany}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Top Profit Company
            </h3>

            <p className="text-xl font-bold mt-3">
              {topProfitCompany}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Most Pending Company
            </h3>

            <p className="text-xl font-bold mt-3">
              {mostPendingCompany}
            </p>
          </div>

        </div>

        {/* Company Performance */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-6">
            Company Performance
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">

                <tr>
                  <th className="p-3 text-left">
                    Company
                  </th>

                  <th className="p-3 text-left">
                    Cases
                  </th>

                  <th className="p-3 text-left">
                    Revenue
                  </th>

                  <th className="p-3 text-left">
                    Expense
                  </th>

                  <th className="p-3 text-left">
                    Profit
                  </th>

                  <th className="p-3 text-left">
                    Pending
                  </th>
                </tr>

              </thead>

              <tbody>

                {companyRows.map(
                  ([name, data]) => (
                    <tr
                      key={name}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-3 font-medium">
                        {name}
                      </td>

                      <td className="p-3">
                        {data.cases}
                      </td>

                      <td className="p-3 text-blue-600">
                        ₹{data.revenue}
                      </td>

                      <td className="p-3 text-red-500">
                        ₹{data.expense}
                      </td>

                      <td className="p-3 text-green-600 font-semibold">
                        ₹{data.profit}
                      </td>

                      <td className="p-3 text-orange-500">
                        {data.pending}
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