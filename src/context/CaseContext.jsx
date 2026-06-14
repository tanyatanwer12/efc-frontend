import {
  createContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";

export const CaseContext =
  createContext();

export const CaseProvider = ({
  children,
}) => {
  const [cases, setCases] =
    useState([]);

  const API_URL =
    "http://localhost:5000/api/cases";

  // GET ALL CASES

  const fetchCases = async () => {
  try {
    console.log("FETCHING CASES...");

    const res =
      await axios.get(API_URL);

    console.log(
      "CASES RECEIVED:",
      res.data
    );

    setCases(res.data);
  } catch (error) {
    console.error(
      "Error fetching cases",
      error
    );
  }
};

  // LOAD CASES ON START

  useEffect(() => {
    fetchCases();
  }, []);

  // ADD CASE

  const addCase = async (
    newCase
  ) => {
    try {
      const res =
        await axios.post(
          API_URL,
          newCase
        );

      setCases((prev) => [
        ...prev,
        res.data,
      ]);
    } catch (error) {
      console.error(
        "Error adding case",
        error
      );
    }
  };

  // DELETE CASE

  const deleteCase = async (
    id
  ) => {
    try {
      await axios.delete(
        `${API_URL}/${id}`
      );

      setCases((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting case",
        error
      );
    }
  };

  // UPDATE CASE

  const updateCase = async (
    id,
    updatedData
  ) => {
    try {
      const res =
        await axios.put(
          `${API_URL}/${id}`,
          updatedData
        );

      setCases((prev) =>
        prev.map((item) =>
          item._id === id
            ? res.data
            : item
        )
      );
    } catch (error) {
      console.error(
        "Error updating case",
        error
      );
    }
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        fetchCases,
        addCase,
        deleteCase,
        updateCase,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};