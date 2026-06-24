import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { CaseContext } from "../context/CaseContext";
import { CompanyContext } from "../context/CompanyContext";
import { VerifierContext } from "../context/VerifierContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Settings() {

  const { cases } =
  useContext(CaseContext);

  const { companies } =
  useContext(CompanyContext);

const { verifiers } =
  useContext(VerifierContext);

const downloadCasesBackup =
  () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        cases
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

    saveAs(
      new Blob([excelBuffer]),
      "cases-backup.xlsx"
    );
  };


const downloadCompleteBackup =
  () => {

    const workbook =
      XLSX.utils.book_new();

    // Cases Sheet

    const casesSheet =
      XLSX.utils.json_to_sheet(
        cases
      );

    XLSX.utils.book_append_sheet(
      workbook,
      casesSheet,
      "Cases"
    );

    // Companies Sheet

    const companiesSheet =
      XLSX.utils.json_to_sheet(
        companies
      );

    XLSX.utils.book_append_sheet(
      workbook,
      companiesSheet,
      "Companies"
    );

    // Verifiers Sheet

    const verifiersSheet =
      XLSX.utils.json_to_sheet(
        verifiers
      );

    XLSX.utils.book_append_sheet(
      workbook,
      verifiersSheet,
      "Verifiers"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const fileData =
      new Blob(
        [excelBuffer],
        {
          type:
            "application/octet-stream",
        }
      );

    saveAs(
      fileData,
      "Tiger-Complete-Backup.xlsx"
    );
  };


  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">
  <div className="mb-8">
    <h1 className="text-3xl font-bold">
      Settings
    </h1>

    <p className="text-gray-500 mt-2">
      System administration and maintenance
    </p>
  </div>

  {/* Backup & Recovery */}

  <div className="bg-white rounded-xl shadow p-6 mb-8">

    <h2 className="text-xl font-bold mb-6">
      Backup & Recovery
    </h2>

    <div className="grid md:grid-cols-2 gap-4">

      <button
  onClick={
    downloadCasesBackup
  }
  className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700"
>
  Download Cases Backup
</button>

      <button
        onClick={() =>
          alert(
            "Companies Backup Feature Coming Soon"
          )
        }
        className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700"
      >
        Download Companies Backup
      </button>

      <button
        onClick={() =>
          alert(
            "Verifiers Backup Feature Coming Soon"
          )
        }
        className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700"
      >
        Download Verifiers Backup
      </button>

      <button
  onClick={
    downloadCompleteBackup
  }
  className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700"
>
  Download Complete Backup
</button>

    </div>

  </div>

  {/* Data Maintenance */}

  <div className="bg-white rounded-xl shadow p-6 mb-8">

    <h2 className="text-xl font-bold mb-6">
      Data Maintenance
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between items-center">

        <div>
          <p className="font-medium">
            Deleted Cases
          </p>

          <p className="text-gray-500 text-sm">
            View and restore deleted records
          </p>
        </div>

        <button
          className="bg-slate-900 text-white px-4 py-2 rounded-lg"
        >
          Open
        </button>

      </div>

      <hr />

      <div className="flex justify-between items-center">

        <div>
          <p className="font-medium">
            Recycle Bin
          </p>

          <p className="text-gray-500 text-sm">
            Manage removed records
          </p>
        </div>

        <span className="text-green-600 font-semibold">
          Active
        </span>

      </div>

    </div>

  </div>

  {/* Account */}

  <div className="bg-white rounded-xl shadow p-6 mb-8">

    <h2 className="text-xl font-bold mb-6">
      Account
    </h2>

    <div className="flex justify-between items-center">

      <div>

        <p className="font-medium">
          Change Password
        </p>

        <p className="text-gray-500 text-sm">
          Update account credentials
        </p>

      </div>

      <button
        onClick={() =>
          alert(
            "Password Update Feature Coming Soon"
          )
        }
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Update
      </button>

    </div>

  </div>

  {/* Application Information */}

  <div className="bg-white rounded-xl shadow p-6">

    <h2 className="text-xl font-bold mb-6">
      Application Information
    </h2>

    <div className="space-y-3">

      <p>
        <strong>
          Application:
        </strong>{" "}
        Tiger Verification System
      </p>

      <p>
        <strong>
          Version:
        </strong>{" "}
        1.0.0
      </p>

      <p>
        <strong>
          Environment:
        </strong>{" "}
        Production
      </p>

    </div>

  </div>

</div>
        
    </div>
  );
}