import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
const API_URL =
  "https://efc-backend.onrender.com/api/cases";

function DeletedCases() {
  const [deletedCases, setDeletedCases] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCases, setSelectedCases] = useState([]);

  useEffect(() => {
    fetchDeletedCases();
  }, []);

  const fetchDeletedCases =
    async () => {
      try {
        const res =
          await axios.get(
            `${API_URL}/deleted`
          );

        setDeletedCases(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

const handleSelectCase = (id) => {
  if (selectedCases.includes(id)) {
    setSelectedCases(
      selectedCases.filter((caseId) => caseId !== id)
    );
  } else {
    setSelectedCases([...selectedCases, id]);
  }
};

const handleSelectAll = () => {
  if (
    selectedCases.length === filteredCases.length
  ) {
    setSelectedCases([]);
  } else {
    setSelectedCases(
      filteredCases.map((item) => item._id)
    );
  }
};

const handleBulkRestore = async () => {
  if (selectedCases.length === 0) {
    alert("Please select cases");
    return;
  }

  try {
    await Promise.all(
      selectedCases.map((id) =>
        axios.put(
          `${API_URL}/restore/${id}`
        )
      )
    );

    setSelectedCases([]);
    fetchDeletedCases();
  } catch (error) {
    console.log(error);
  }
};

const handleBulkDelete = async () => {
  if (selectedCases.length === 0) {
    alert("Please select cases");
    return;
  }

  const confirmDelete = window.confirm(
    `Delete ${selectedCases.length} selected cases permanently?`
  );

  if (!confirmDelete) return;

  try {
    await Promise.all(
      selectedCases.map((id) =>
        axios.delete(
          `${API_URL}/permanent/${id}`
        )
      )
    );

    setSelectedCases([]);
    fetchDeletedCases();
  } catch (error) {
    console.log(error);
  }
};

  const handleRestore =
    async (id) => {
      try {
        await axios.put(
          `${API_URL}/restore/${id}`
        );

        fetchDeletedCases();
      } catch (error) {
        console.log(error);
      }
    };

  const handlePermanentDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Permanently delete this case?"
        );

      if (!confirmDelete)
        return;

      try {
        await axios.delete(
          `${API_URL}/permanent/${id}`
        );

        fetchDeletedCases();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredCases =
    deletedCases.filter(
      (item) =>
        item.caseId
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        item.applicantName
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (
  <div className="flex">

    <Sidebar />

    <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Deleted Cases
          </h1>

          <p className="text-gray-500">
            Recycle Bin
          </p>
        </div>

      </div>

      {/* CARD */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Deleted Cases
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            {deletedCases.length}
          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search Case ID or Applicant..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="w-full md:w-96 border rounded-lg px-4 py-3 bg-white"
        />

      </div>

<div className="flex gap-3 mb-4">

  <button
    onClick={handleBulkRestore}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
  >
    Restore Selected
  </button>

  <button
    onClick={handleBulkDelete}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Delete Selected
  </button>

  <span className="flex items-center text-gray-600">
    {selectedCases.length} selected
  </span>

</div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

<th className="p-4">

    <input
      type="checkbox"
      checked={
        filteredCases.length > 0 &&
        selectedCases.length ===
          filteredCases.length
      }
      onChange={handleSelectAll}
    />

  </th>

              <th className="p-4 text-left">
                Case ID
              </th>

              <th className="p-4 text-left">
                Applicant
              </th>

              <th className="p-4 text-left">
                Date
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

            {filteredCases.length ===
            0 ? (
              <tr>

                <td
                  colSpan="6"
                  className="text-center py-20 text-gray-500"
                >
                  No Deleted Cases Found
                </td>

              </tr>
            ) : (
              filteredCases.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-slate-50"
                  >

<td className="p-4">

    <input
      type="checkbox"
      checked={selectedCases.includes(
        item._id
      )}
      onChange={() =>
        handleSelectCase(item._id)
      }
    />

  </td>

                    <td className="p-4">
                      {item.caseId}
                    </td>

                    <td className="p-4">
                      {
                        item.applicantName
                      }
                    </td>

                    <td className="p-4">
                      {item.date}
                    </td>

                    <td className="p-4">

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        {
                          item.status
                        }
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleRestore(
                              item._id
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          Restore
                        </button>

                        <button
                          onClick={() =>
                            handlePermanentDelete(
                              item._id
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Delete Forever
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

    </div>

  </div>
);
}

export default DeletedCases;