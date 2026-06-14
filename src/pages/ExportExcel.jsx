import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import { CaseContext } from "../context/CaseContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { CompanyContext } from "../context/CompanyContext";

export default function ExportExcel() {
  
  const [month, setMonth] =
  useState("");


  const [company, setCompany] =
    useState("");
const { cases } =
  useContext(CaseContext);

  const [verifier, setVerifier] =
    useState("");

  const months = [
  ...new Set(
    cases
      .filter((item) => item.createdAt)
      .map((item) =>
        new Date(item.createdAt)
          .toLocaleString(
            "default",
            { month: "long" }
          )
      )
  ),
];

  const [status, setStatus] =
    useState("");

    const { companies } =
  useContext(CompanyContext);

  const verifiers = [
    ...new Set(
      cases
        .map((c) => c.verifierName)
        .filter(Boolean)
    ),
  ];

  let filteredCases = [...cases];

  if (company) {
  filteredCases =
    filteredCases.filter(
      (item) =>
        item.companyId === company
    );
}

if (month) {
  filteredCases =
    filteredCases.filter(
      (item) =>
        new Date(
          item.createdAt
        ).toLocaleString(
          "default",
          { month: "long" }
        ) === month
    );
}

  if (verifier) {
    filteredCases =
      filteredCases.filter(
        (item) =>
          item.verifierName ===
          verifier
      );
  }

  if (status) {
    filteredCases =
      filteredCases.filter(
        (item) =>
          item.status === status
      );
  }

  const exportExcel = () => {

if (filteredCases.length === 0) {
  alert("No cases found to export");
  return;
}

    const exportData =
      filteredCases.map((item) => ({
        CaseID: item.caseId,
        Applicant:
          item.applicantName,

CreatedDate:
  new Date(
    item.createdAt
  ).toLocaleDateString(),

        Bank: item.bank,
        Contact:
          item.contactNo,
        Address:
          item.address,
        Pincode:
          item.pincode,
        Company:
  companies.find(
    (c) =>
      c._id === item.companyId
  )?.name || "",
        Verifier:
          item.verifierName,
        Status:
          item.status,
        CompanyRate:
          item.companyRate,
        VerifierRate:
          item.verifierRate,
        Profit:
          item.profit,
      }));

    const worksheet =
      XLSX.utils.json_to_sheet(
        exportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Cases"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const fileData =
  new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

    let fileName =
  "cases-report.xlsx";

if (company && month) {
  fileName =
    `${companies.find(
      (c) =>
        c._id === company
    )?.name}-${month}.xlsx`;
}
else if (company) {
  fileName =
    `${companies.find(
      (c) =>
        c._id === company
    )?.name}-report.xlsx`;
}
else if (month) {
  fileName =
    `${month}-cases-report.xlsx`;
}

saveAs(fileData, fileName);
};
  return (
    <div className="flex">
      <Sidebar />

<div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">
        <h1 className="text-3xl font-bold mb-8">
          Export Excel
        </h1>

        <div className="bg-white p-8 rounded-xl shadow">

          <div className="grid md:grid-cols-4 gap-4 mb-6">

            <select
  value={company}
  onChange={(e) =>
    setCompany(e.target.value)
  }
  className="border p-3 rounded-lg"
>
  <option value="">
    All Companies
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
  value={month}
  onChange={(e) =>
    setMonth(e.target.value)
  }
  className="border p-3 rounded-lg"
>
  <option value="">
    All Months
  </option>

  {months.map((month) => (
    <option
      key={month}
      value={month}
    >
      {month}
    </option>
  ))}
</select>

            <select
              value={verifier}
              onChange={(e) =>
                setVerifier(
                  e.target.value
                )
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                All Verifiers
              </option>

              {verifiers.map(
                (verifier) => (
                  <option
                    key={verifier}
                    value={verifier}
                  >
                    {verifier}
                  </option>
                )
              )}
            </select>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="border p-3 rounded-lg"
            >
              <option value="">
                All Status
              </option>

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

          </div>

          <div className="mb-6">
  <p className="text-lg font-semibold">
    Showing {filteredCases.length} Case{filteredCases.length !== 1 ? "s" : ""}
  </p>
</div>
          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Export Excel
          </button>

        </div>

      </div>
    </div>
  );
}
