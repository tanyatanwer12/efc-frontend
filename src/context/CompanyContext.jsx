import {
  createContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";
export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] =
    useState([]);

  // Fetch Companies

  const fetchCompanies =
    async () => {
      try {
        const res =
          await axios.get(
            "https://efc-backend.onrender.com/api/companies"
          );

        setCompanies(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Add Company

  const addCompany =
    async (company) => {
      try {
        const res =
          await axios.post(
            "https://efc-backend.onrender.com/api/companies",
            company
          );

        setCompanies((prev) => [
          ...prev,
          res.data,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

  // Delete Company

  const deleteCompany =
    async (id) => {
      try {
        await axios.delete(
          `https://efc-backend.onrender.com/api/companies/${id}`
        );

        setCompanies((prev) =>
          prev.filter(
            (company) =>
              company._id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <CompanyContext.Provider
      value={{
        companies,
        addCompany,
        deleteCompany,
        fetchCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};