import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PatientList = ({ title, patientDetilas, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  console.log("patientDetilas", patientDetilas);

  useEffect(() => {
    if (searchTerm) {
      const filtered = patientDetilas.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatients(filtered || []);
    } else {
      setFilteredPatients(patientDetilas || []);
    }
  }, [searchTerm, patientDetilas]);

  return (
    <motion.div
      className="p-4 bg-white mt-10 bg-opacity-80 rounded-md shadow-md w-full h-[93%] max-w-[800px] mx-auto backdrop-filter backdrop-blur-lg overflow-y-scroll overflow-x-auto no-scrollbar"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-center text-2xl mt-5 font-bold text-gray-800">
        {title}
      </h2>

      {/* Search Input */}
      <div className="mt-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search by name"
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center md:mt-44 mt-10">
          <div className="h-10 w-10 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          {/* Table */}
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                  ID
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                  Age
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                  Contact
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-600">
                  Gender
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-sm text-gray-800">
                      {patient.patientId}
                    </td>
                    <td className="py-2 px-4 border-b text-sm text-gray-800">
                      {patient.name}
                    </td>
                    <td className="py-2 px-4 border-b text-sm text-gray-800">
                      {patient.age}
                    </td>
                    <td className="py-2 px-4 border-b text-sm text-gray-800">
                      {patient.contact}
                    </td>
                    <td className="py-2 px-4 border-b text-sm text-gray-800">
                      {patient.gender}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-sm text-red-600"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default PatientList;
