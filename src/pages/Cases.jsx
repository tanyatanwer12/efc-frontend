import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import { CaseContext } from "../context/CaseContext";
import { CompanyContext } from "../context/CompanyContext";
import * as XLSX from "xlsx";
import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function Cases() {
  const {
    cases,
    addCase,
    deleteCase,
    updateCase,
  } = useContext(CaseContext);

const [statusFilter, setStatusFilter] =
  useState("");

  const { companies } =
    useContext(CompanyContext);

  const [selectedCases, setSelectedCases] =
    useState([]);

  const [selectedCompany, setSelectedCompany] =
    useState("");
  const [search, setSearch] =
    useState("");

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedCase, setSelectedCase] =
    useState(null);

  let filteredCases = cases.filter(
  (item) =>
    item.applicantName
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      ) ||
    item.contactNo
      ?.toString()
      .includes(search)
);

if (statusFilter) {
  filteredCases =
    filteredCases.filter(
      (item) =>
        item.status === statusFilter
    );
}

  const handleExcelUpload = (
    event
  ) => {

    if (!selectedCompany) {
      alert(
        "Please select a company first"
      );
      return;
    }
    const file =
      event.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (e) => {
      const data =
        new Uint8Array(
          e.target.result
        );

      const workbook =
        XLSX.read(data, {
          type: "array",
        });

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[sheetName];

      const excelData =
        XLSX.utils.sheet_to_json(
          worksheet
        );

      const company =
        companies.find(
          (c) =>
            c._id === selectedCompany
        );
let importedCount = 0;
let duplicateCount = 0;
      excelData.forEach((row) => {
        const caseId =
          row.APP_ID?.toString() || "";

        const alreadyExists =
          cases.some(
            (item) =>
              item.caseId === caseId
          );

        if (alreadyExists) {
  duplicateCount++;
  return;
}
        const newCase = {

          companyId:
            company?._id || "",

          companyName:
            company?.name || "",

          caseId,

          applicantName:
            row["APPLICANT NAME"] || "",

          bank:
            row.BANK || "",

          productType:
            row["LOAN APP TYPE"] || "",

          address:
            row.ADDRESS || "",

          contactNo:
            row["CONTACT NO."]?.toString() || "",

          status:
  row.STATUS
    ?.toString()
    .trim()
    .toUpperCase() ===
  "COMPLETED"
    ? "Completed"
    : "Pending",

          verifierName:
            row["FE NAME"] || "",

          companyRate:
  Number(
    row["COMPANY_RATE"]
  ) || 0,

verifierRate:
  Number(
    row["VERIFIER_RATE"] ||
    row["VERIFIER RATE"] ||
    row["Verifier Rate"]
  ) || 0,

profit:
  (Number(
    row["COMPANY_RATE"]
  ) || 0) -
  (Number(
    row["VERIFIER_RATE"]
  ) || 0),

          state:
            row.STATE || "",

          createdAt:
            new Date(),
        };
console.log(
  "NEW CASE",
  newCase
);
        addCase(newCase);
importedCount++;
      });

      alert(
  `${importedCount} cases imported successfully\n\n${duplicateCount} duplicate cases skipped`
);
    };

    reader.readAsArrayBuffer(
      file
    );
  };

  const handleDelete = async (
    id, caseId
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete Case ${caseId}?`
      );

    if (!confirmDelete) return;

    await deleteCase(id);
  };

  const handleEdit = (item) => {
    setSelectedCase(item);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    const updatedCase = {
      ...selectedCase,

      profit:
        Number(
          selectedCase.companyRate
        ) -
        Number(
          selectedCase.verifierRate
        ),
    };

    await updateCase(
      selectedCase._id,
      updatedCase
    );

    setShowEditModal(false);
  };
  const handleBulkDelete = async () => {

    if (
      selectedCases.length === 0
    ) {
      alert(
        "Please select cases"
      );
      return;
    }

    const confirmDelete =
      window.confirm(
        `Delete ${selectedCases.length} cases?`
      );

    if (!confirmDelete) return;

    for (const id of selectedCases) {
      await deleteCase(id);
    }

    setSelectedCases([]);
  };
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <div className="flex flex-wrap gap-4 items-center mb-4">

            <select
              value={selectedCompany}
              onChange={(e) =>
                setSelectedCompany(
                  e.target.value
                )
              }
              className="border p-3 rounded-lg bg-white"
            >
              <option value="">
                Select Company
              </option>

              {companies.map((company) => (
                <option
                  key={company._id}
                  value={company._id}
                >
                  {company.name}
                </option>
              ))}
            </select>
            <select
  value={statusFilter}
  onChange={(e) =>
    setStatusFilter(e.target.value)
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

            <label className="bg-green-600 text-white px-5 py-3 rounded-lg cursor-pointer hover:bg-green-700">

              📄 Upload Excel

              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                className="hidden"
              />

            </label>

            <button
              onClick={handleBulkDelete}
              className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
            >
              Delete Selected
            </button>

          </div>

          <input
            type="text"
            placeholder="Search Applicant or Phone..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />

        </div>

        <div className="bg-white rounded-xl shadow overflow-auto max-h-[650px]">

          <table className="w-full">

            <thead className="bg-slate-900 text-white sticky top-0 z-10">

              <tr>
                <th className="p-4">

                  <input
                    type="checkbox"
                    checked={
                      filteredCases.length > 0 &&
                      selectedCases.length ===
                      filteredCases.length
                    }
                    onChange={(e) => {

                      if (e.target.checked) {

                        setSelectedCases(
                          filteredCases.map(
                            (item) => item._id
                          )
                        );

                      } else {

                        setSelectedCases([]);

                      }

                    }}
                  />

                </th>
                <th className="p-4 text-left">
                  Case ID
                </th>

                <th className="p-4 text-left">
                  Applicant
                </th>
                <th className="p-4 text-left">
                  Company
                </th>

                <th className="p-4 text-left">
                  Bank
                </th>

                <th className="p-4 text-left">
                  Contact
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Company Rate
                </th>

                <th className="p-4 text-left">
                  Verifier Rate
                </th>

                <th className="p-4 text-left">
                  Profit
                </th>
                <th className="p-4 text-left">
                  Actions
                </th>


              </tr>

            </thead>

            <tbody>

              {filteredCases.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-b"
                  >
                    <td className="p-4">

                      <input
                        type="checkbox"
                        checked={selectedCases.includes(
                          item._id
                        )}

                        onChange={(e) => {

                          if (e.target.checked) {

                            setSelectedCases([
                              ...selectedCases,
                              item._id,
                            ]);

                          } else {

                            setSelectedCases(
                              selectedCases.filter(
                                (id) =>
                                  id !== item._id
                              )
                            );

                          }

                        }}
                      />

                    </td>

                    <td className="p-4">
                      {item.caseId}
                    </td>

                    <td className="p-4">
                      {item.applicantName}
                    </td>

                    <td className="p-4">
                      {item.companyName}
                    </td>


                    <td className="p-4">
                      {item.bank}
                    </td>

                    <td className="p-4">
                      {
                        item.contactNo
                      }
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
                      ₹
                      {
                        item.companyRate
                      }
                    </td>

                    <td className="p-4">
                      ₹
                      {
                        item.verifierRate
                      }
                    </td>

                    <td className="p-4 text-green-600 font-semibold">
                      ₹
                      {item.profit}
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item._id, item.caseId
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
                        >
                          <FaTrash />
                          Delete
                        </button>

                      </div>

                    </td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-xl w-[900px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              Edit Case
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

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
                  Pincode
                </label>

                <input
                  type="text"
                  value={
                    selectedCase?.pincode || ""
                  }
                  onChange={(e) =>
                    setSelectedCase({
                      ...selectedCase,
                      pincode:
                        e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />

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
  );
}