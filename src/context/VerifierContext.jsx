import { createContext, useState } from "react";

export const VerifierContext = createContext();

export const VerifierProvider = ({
  children,
}) => {
  const [verifiers, setVerifiers] =
    useState([
      {
        id: 1,
        name: "Aman",
        startPincode: "110001",
        endPincode: "110050",
      },
      {
        id: 2,
        name: "Rohit",
        startPincode: "110051",
        endPincode: "110100",
      },
    ]);

  const addVerifier = (verifier) => {
    setVerifiers([
      ...verifiers,
      verifier,
    ]);
  };

  const deleteVerifier = (id) => {
  setVerifiers(
    verifiers.filter(
      (item) => item.id !== id
    )
  );
};

  return (
    <VerifierContext.Provider
      value={{
        verifiers,
        addVerifier,
        deleteVerifier,
      }}
    >
      {children}
    </VerifierContext.Provider>
  );
};