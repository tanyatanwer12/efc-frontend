import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import { CompanyContext } from "../context/CompanyContext";
import { Link } from "react-router-dom";
import { CaseContext } from "../context/CaseContext";

export default function Companies() {
  const {
    companies,
    addCompany,
    deleteCompany,
  } = useContext(CompanyContext);
const { cases } =
  useContext(CaseContext);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] =
    useState(false);
  const [companyName, setCompanyName] =
    useState("");

  const filteredCompanies =
    companies.filter((company) =>
      company.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

 const handleAddCompany = () => {

  if (!companyName.trim()) {
    alert("Please enter company name");
    return;
  }

  const exists =
    companies.some(
      (company) =>
        company.name.toLowerCase() ===
        companyName.toLowerCase()
    );

  if (exists) {
    alert(
      "Company already exists"
    );
    return;
  }

  addCompany({
    name:
      companyName.toUpperCase(),
  });

  setCompanyName("");
  setShowModal(false);
};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Companies
          </h1>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            + Add Company
          </button>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Company..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-80 border p-3 rounded-lg mb-8"
        />

        {/* Companies Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>
                <th className="p-4 text-left">
                  Company
                </th>

                <th className="p-4 text-left">
                  Cases
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredCompanies.map(
                (company) => (
                  <tr
                    key={company._id}
                    className="border-b"
                  >
                    <td className="p-4">
                      {company.name}
                    </td>

                    <td className="p-4">

  {
    cases.filter(
      (item) =>
        item.companyId ===
        company._id
    ).length
  }

</td>

                    <td className="p-4 flex gap-2">

                      <Link
                        to={`/company/${company._id}`}
                        className="bg-slate-900 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => {

  const confirmDelete =
    window.confirm(
      `Delete ${company.name}?`
    );

  if (confirmDelete) {
    deleteCompany(
      company._id
    );
  }

}}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white p-8 rounded-xl w-96">

              <h2 className="text-2xl font-bold mb-4">
                Add Company
              </h2>

              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(
                    e.target.value
                  )
                }
                className="w-full border p-3 rounded-lg mb-6"
              />

              <div className="flex justify-end gap-3">

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleAddCompany
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
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