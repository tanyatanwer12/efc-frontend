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

  const [statusFilter, setStatusFilter] =
  useState("");
  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedCase, setSelectedCase] =
    useState(null);

  const companyCases = cases.filter(
    (item) => item.companyId === id
  );

  const filteredCases =
  companyCases.filter(
    (item) => {

      const searchMatch =
        item.applicantName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.contactNo
          ?.toString()
          .includes(search);

      const statusMatch =
        !statusFilter ||
        item.status ===
          statusFilter;

      return (
        searchMatch &&
        statusMatch
      );
    }
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
        <div className="flex justify-between items-center mb-4">

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

  <select
    value={statusFilter}
    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }
    className="border p-3 rounded-lg"
  >
    <option value="">
      All Status
    </option>

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

</div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto overflow-y-auto max-h-[650px]">

          <table className="min-w-[1600px] text-sm">

            <thead className="bg-slate-900 text-white sticky top-0 z-10">

              <tr>
                <th className="p-3 text-left">S.No</th>

<th className="p-3 text-left">
  Date
</th>

<th className="p-3 text-left">
  Applicant
</th>

<th className="p-3 text-left">
  Resi/Office
</th>

<th className="p-3 text-left">
  Address
</th>

<th className="p-3 text-left">
  Contact
</th>

<th className="p-3 text-left">
  State
</th>

<th className="p-3 text-left">
  Pincode
</th>

<th className="p-3 text-left">
  FE Name
</th>

<th className="p-3 text-left">
  Company Rate
</th>

<th className="p-3 text-left">
  Verifier Rate
</th>

<th className="p-3 text-left">
  Case ID
</th>

<th className="p-3 text-left">
  Status
</th>

<th className="p-3 text-left">
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

                filteredCases.map(
  (item, index) => (

    <tr
      key={item._id}
      className="border-b hover:bg-slate-50"
    >

      <td className="p-3">
        {index + 1}
      </td>

      <td className="p-3">
        {item.date}
      </td>

      <td className="p-3">
        {item.applicantName}
      </td>

      <td className="p-3">
        {item.resiOffice}
      </td>

      <td className="p-3 max-w-[150px] truncate">
        {item.address}
      </td>

      <td className="p-3">
        {item.contactNo}
      </td>

      <td className="p-3">
        {item.state}
      </td>

      <td className="p-3">
        {item.pincode}
      </td>

      <td className="p-3">
        {item.verifierName}
      </td>

      <td className="p-3">
        ₹{item.companyRate}
      </td>

      <td className="p-3">
        ₹{item.verifierRate}
      </td>

      <td
  className="p-3 max-w-[180px] truncate"
  title={item.caseId}
>
  {item.caseId}
</td>

      <td className="p-3">

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            item.status === "Completed"
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

      <td className="p-3">

  <div className="flex flex-col gap-2">

    <button
      onClick={() =>
        handleEdit(item)
      }
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
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
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>

  </div>

</td>

    </tr>

  )
)

              )}

            </tbody>

          </table>

        </div>
        {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-xl w-[1100px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              Edit Case
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div>

                <label className="block mb-1 font-medium">
                  Applicant Name
                </label>

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
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div>

                <label className="block mb-1 font-medium">
                  Contact Number
                </label>

                <input
                  type="text"
                  value={
                    selectedCase?.contactNo || ""
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      contactNo:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div className="md:col-span-2">

                <label className="block mb-1 font-medium">
                  Address
                </label>

                <textarea
                  rows="3"
                  value={
                    selectedCase?.address || ""
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      address:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div>

                <label className="block mb-1 font-medium">
                  Bank
                </label>

                <input
                  type="text"
                  value={
                    selectedCase?.bank || ""
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      bank:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>


              <div>

                <label className="block mb-1 font-medium">
                  Product Type
                </label>

                

                <input
                  type="text"
                  value={
                    selectedCase?.productType || ""
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      productType:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div>

  <label className="block mb-1 font-medium">
    Resi / Office
  </label>

  <select
    value={
      selectedCase?.resiOffice || ""
    }
    onChange={(e) =>
      setSelectedCase({
        ...selectedCase,
        resiOffice:
          e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  >
    <option value="RESI">
      RESI
    </option>

    <option value="OFF">
      OFF
    </option>
  </select>

</div>


              <div>

  <label className="block mb-1 font-medium">
    Pincode
  </label>

  <input
    type="text"
    value={selectedCase?.pincode || ""}
    onChange={(e) =>
      setSelectedCase({
        ...selectedCase,
        pincode: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  />

</div>

<div>

  <label className="block mb-1 font-medium">
    State
  </label>

  <input
    type="text"
    value={selectedCase?.state || ""}
    onChange={(e) =>
      setSelectedCase({
        ...selectedCase,
        state: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  />

</div>

<div>

  <label className="block mb-1 font-medium">
    Date
  </label>

  <input
    type="text"
    value={selectedCase?.date || ""}
    onChange={(e) =>
      setSelectedCase({
        ...selectedCase,
        date: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  />

</div>

<div>

  <label className="block mb-1 font-medium">
    Visit Type
  </label>

  <select
    value={selectedCase?.visitType || ""}
    onChange={(e) =>
      setSelectedCase({
        ...selectedCase,
        visitType: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  >
    <option value="Fresh">Fresh</option>
<option value="REVISIT">Revisit</option>
  </select>

</div>

<div>

  <label className="block mb-1 font-medium">
    Payment Status
  </label>

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
    className="w-full border p-3 rounded-lg"
  >
    <option value="Paid">
      Paid
    </option>

    <option value="Unpaid">
      Unpaid
    </option>
  </select>

</div>

              <div>

                <label className="block mb-1 font-medium">
                  Verifier Name
                </label>

                <input
                  type="text"
                  value={
                    selectedCase?.verifierName || ""
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      verifierName:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div>

                <label className="block mb-1 font-medium">
                  Status
                </label>

                <select
                  value={
                    selectedCase
                      ?.status || ""
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
              </div>
              <div>

                <label className="block mb-1 font-medium">
                  Company Rate
                </label>

                <input
                  type="number"
                  value={
                    selectedCase?.companyRate || 0
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      companyRate:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div>

                <label className="block mb-1 font-medium">
                  Verifier Rate
                </label>

                <input
                  type="number"
                  value={
                    selectedCase?.verifierRate || 0
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      verifierRate:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

              </div>

              <div>

                <label className="block mb-1 font-medium">
                  Profit Preview
                </label>

                <div className="border p-3 rounded-lg bg-green-50 text-green-700 font-bold">

                  ₹
                  {(
                    Number(
                      selectedCase?.companyRate || 0
                    ) -
                    Number(
                      selectedCase?.verifierRate || 0
                    )
                  )}

                </div>

              </div>

            </div>

            <div className="md:col-span-2">

  <label className="block mb-1 font-medium">
    Case ID
  </label>

  <input
    type="text"
    value={selectedCase?.caseId || ""}
    readOnly
    className="w-full border p-3 rounded-lg bg-gray-100"
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