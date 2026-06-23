import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CaseContext } from "../context/CaseContext";
import { CompanyContext } from "../context/CompanyContext";


export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  const { cases } =useContext(CaseContext);
const {
  companies,
  addCompany,
} = useContext(CompanyContext);
  const [newCompany, setNewCompany] = useState({
    name: "",
    contactPerson: "",
    phone: "",
  });

  

  const totalCases =
  cases.length;

const pendingCases =
  cases.filter(
    (item) =>
      item.status ===
      "Pending"
  ).length;

const completedCases =
  cases.filter(
    (item) =>
      item.status ===
      "Completed"
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

  const handleAddCompany = () => {
  if (!newCompany.name.trim()) {
  alert("Please enter company name");
  return;
}

  const company = {
    id: Date.now(),
    name: newCompany.name.toUpperCase(),
    totalCases: 0,
    contactPerson:
      newCompany.contactPerson,
    phone: newCompany.phone,
  };

  addCompany(company);

  setNewCompany({
    name: "",
    contactPerson: "",
    phone: "",
  });

  setShowModal(false);
};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">
        {/* Header */}
        <div>
  <h1 className="text-3xl font-bold">
    Welcome
  </h1>

  <p className="text-gray-500 mt-1">
    Here's your verification overview
  </p>
</div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">
  Revenue
</h2>

<p className="text-3xl font-bold mt-2 text-green-600">
  ₹{totalRevenue}
</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">
  Expense
</h2>

<p className="text-3xl font-bold mt-2 text-red-500">
  ₹{totalExpense}
</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">
  Profit
</h2>

<p className="text-3xl font-bold mt-2 text-blue-600">
  ₹{totalProfit}
</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">
  Total Cases
</h2>

<p className="text-3xl font-bold mt-2">
  {totalCases}
</p>
          </div>
        </div>

        {/* Company Section */}
        <div className="flex justify-between items-center mt-12 mb-6">
          <h2 className="text-2xl font-bold">
            Companies
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Company
          </button>
        </div>

  
{/* Company Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  {companies.map((company) => {

    const companyCasesData = cases.filter(
      (item) =>
        item.companyId === company._id
    );

    const totalCases =
      companyCasesData.length;

    const pendingCases =
      companyCasesData.filter(
        (item) =>
          item.status === "Pending"
      ).length;

    const completedCases =
      companyCasesData.filter(
        (item) =>
          item.status === "Completed"
      ).length;

    const revenue =
      companyCasesData.reduce(
        (sum, item) =>
          sum +
          (item.companyRate || 0),
        0
      );

    const expense =
      companyCasesData.reduce(
        (sum, item) =>
          sum +
          (item.verifierRate || 0),
        0
      );

    const profit =
      revenue - expense;

    return (
      <div
        key={company._id}
        className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition"
      >

        <h3 className="text-xl font-bold mb-4">
          {company.name}
        </h3>

        <div className="space-y-2">

          <p>
            Total Cases:
            <span className="font-semibold ml-2">
              {totalCases}
            </span>
          </p>

          <p>
            Pending:
            <span className="text-orange-500 font-semibold ml-2">
              {pendingCases}
            </span>
          </p>

          <p>
            Completed:
            <span className="text-green-600 font-semibold ml-2">
              {completedCases}
            </span>
          </p>

          <hr />

          <p>
            Revenue:
            <span className="text-blue-600 font-semibold ml-2">
              ₹{revenue.toLocaleString()}
            </span>
          </p>

          <p>
            Expense:
            <span className="text-red-500 font-semibold ml-2">
              ₹{expense.toLocaleString()}
            </span>
          </p>

          <p>
            Profit:
            <span className="text-green-600 font-bold ml-2">
              ₹{profit.toLocaleString()}
            </span>
          </p>

        </div>

        <Link
          to={`/company/${company._id}`}
          className="mt-5 inline-block bg-slate-900 text-white px-4 py-2 rounded-lg"
        >
          View Details
        </Link>

      </div>
    );
  })}

</div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">

              <h2 className="text-2xl font-bold mb-6">
                Add New Company
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Company Name"
                  value={newCompany.name}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      name: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Contact Person"
                  value={newCompany.contactPerson}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      contactPerson: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newCompany.phone}
                  onChange={(e) =>
                    setNewCompany({
                      ...newCompany,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddCompany}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>

              </div>

            </div>
          </div>
        )}
      </div>
    </div>
    
  );
}