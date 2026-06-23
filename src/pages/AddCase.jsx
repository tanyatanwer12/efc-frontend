import Sidebar from "../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CaseContext } from "../context/CaseContext";
import { VerifierContext } from "../context/VerifierContext";
import { CompanyContext } from "../context/CompanyContext";


export default function AddCase() {
  const { addCase } = useContext(CaseContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { verifiers } =
  useContext(VerifierContext);
  const { companies } =
  useContext(CompanyContext);
  
  const [formData, setFormData] = useState({
    caseId: "",
    visitType: "Fresh",
    applicantName: "",
    date: new Date()
    .toISOString()
    .split("T")[0],
    bank: "",
    productType: "",
    resiOffice: "",
    address: "",
    zone: "",
    pincode: "",
    contactNo: "",
    verifierName: "",
    status: "Pending",
    companyRate: "",
verifierRate: "",
    
  });


  const saveCase = () => {
  if (
    !formData.caseId ||
    !formData.applicantName ||
    !formData.date||
    !formData.pincode ||
  !formData.contactNo
  ) {
    alert(
      "Please fill Case ID, Applicant Name and Date"
    );
    return;
  }


  const selectedDate = new Date(
    formData.date
  );

  const month =
    selectedDate.toLocaleString(
      "default",
      {
        month: "long",
      }
    );

  const year =
    selectedDate.getFullYear();

    const selectedCompany =
  companies.find(
    (company) =>
      company._id === id
  );

  const newCase = {
    id: Date.now(),

    companyId: id,

    companyName:
  selectedCompany?.name || "",
  
    month,
    year,

    caseId: formData.caseId,
    applicantName:
      formData.applicantName,
    date: formData.date,
    bank: formData.bank,
    productType:
      formData.productType,
    resiOffice:
      formData.resiOffice,
    address: formData.address,
    zone: formData.zone,
    pincode: formData.pincode,
    contactNo:
      formData.contactNo,
    verifierName:
      formData.verifierName,
    status:
  formData.status,
  visitType:
  formData.visitType,
  companyRate:
  Number(formData.companyRate),

verifierRate:
  Number(formData.verifierRate),

profit:
  Number(formData.companyRate) -
  Number(formData.verifierRate),
  };

  
console.log("NEW CASE =", newCase);

  addCase(newCase);

  navigate(`/company/${id}`);
};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-slate-100 min-h-screen p-10">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Add New Case
          </h1>

          <Link
            to={`/company/${id}`}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg"
          >
            Back
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Case ID */}
            <div>
              <label className="block mb-2 font-medium">
                Case ID
              </label>

              <input
                type="text"
                value={formData.caseId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    caseId: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Applicant Name */}
            <div>
              <label className="block mb-2 font-medium">
                Applicant Name
              </label>

              <input
                type="text"
                value={formData.applicantName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    applicantName: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 font-medium">
                Date
              </label>

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Bank */}
            <div>
  <label className="block mb-2 font-medium">
    Bank
  </label>

  <input
    list="banks"
    value={formData.bank}
    onChange={(e) =>
      setFormData({
        ...formData,
        bank: e.target.value,
      })
    }
    placeholder="Select or Type Bank"
    className="w-full border p-3 rounded-lg"
  />

  <datalist id="banks">
    <option value="HDFC" />
    <option value="ICICI" />
    <option value="SBI" />
    <option value="Axis Bank" />
    <option value="Kotak" />
    <option value="Yes Bank" />
    <option value="IndusInd" />
    <option value="AU Small Finance" />
  </datalist>
</div>

            {/* Product Type */}
            <div>
              <label className="block mb-2 font-medium">
                Product Type
              </label>

              <select
                value={formData.productType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    productType: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Product</option>
                <option>Home Loan</option>
                <option>Personal Loan</option>
                <option>Credit Card</option>
                <option>Business Loan</option>
              </select>
            </div>

            {/* Resi Office */}
            <div>
              <label className="block mb-2 font-medium">
                Resi / Office
              </label>

              <select
                value={formData.resiOffice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    resiOffice: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select</option>
                <option>Residence</option>
                <option>Office</option>
              </select>
            </div>

            {/* Zone */}
           <div>
  <label className="block mb-2 font-medium">
    Zone / City
  </label>

  <input
    list="zones"
    value={formData.zone}
    onChange={(e) =>
      setFormData({
        ...formData,
        zone: e.target.value,
      })
    }
    placeholder="Select or Type Zone"
    className="w-full border p-3 rounded-lg"
  />

  <datalist id="zones">
    <option value="Delhi" />
    <option value="Gurgaon" />
    <option value="Faridabad" />
    <option value="Noida" />
    <option value="Ghaziabad" />
    <option value="Greater Noida" />
    <option value="Sonipat" />
    <option value="Panipat" />
    <option value="Rohtak" />
  </datalist>
</div>

            {/* Pincode */}
<div>
  <label className="block mb-2 font-medium">
    Pincode
  </label>

  <input
    type="text"
    value={formData.pincode}
    onChange={(e) =>
      setFormData({
        ...formData,
        pincode: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  />
</div>

            {/* Contact */}
            <div>
              <label className="block mb-2 font-medium">
                Contact Number
              </label>

              <input
                type="text"
                value={formData.contactNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactNo: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Verifier */}
            <div>
  <label className="block mb-2 font-medium">
    Verifier Name
  </label>

  <input
    list="verifiers"
    value={formData.verifierName}
    onChange={(e) =>
      setFormData({
        ...formData,
        verifierName:
          e.target.value,
      })
    }
    placeholder="Select or Type Verifier"
    className="w-full border p-3 rounded-lg"
  />

  <datalist id="verifiers">
    {verifiers.map(
      (verifier) => (
        <option
          key={verifier.id}
          value={verifier.name}
        />
      )
    )}
  </datalist>
</div>

            <div>
  <label className="block mb-2 font-medium">
    Status
  </label>

  <select
    value={formData.status}
    onChange={(e) =>
      setFormData({
        ...formData,
        status: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
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

    <option value="Cancelled">
      Cancelled
    </option>
  </select>
</div>

<div>
  <label className="block text-sm font-medium mb-2">
    Visit Type
  </label>

  <select
    value={formData.visitType}
    onChange={(e) =>
      setFormData({
        ...formData,
        visitType: e.target.value,
      })
    }
className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="Fresh">
      Fresh
    </option>

    <option value="Revisit">
      Revisit
    </option>
  </select>
</div>

          <div>
  <label className="block mb-2 font-medium">
    Company Rate
  </label>

  <input
    type="number"
    value={formData.companyRate}
    onChange={(e) =>
      setFormData({
        ...formData,
        companyRate: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  />
</div>

<div>
  <label className="block mb-2 font-medium">
    Verifier Rate
  </label>

  <input
    type="number"
    value={formData.verifierRate}
    onChange={(e) =>
      setFormData({
        ...formData,
        verifierRate: e.target.value,
      })
    }
    className="w-full border p-3 rounded-lg"
  />
</div>


            {/* Address */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Address
              </label>

              <textarea
                rows="3"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>

          </div>

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={() => navigate(`/company/${id}`)}
              className="border px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={saveCase}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Case
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}