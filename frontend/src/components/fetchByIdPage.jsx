import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Ensure you import motion from framer-motion

const FetchByIdPage = () => {
  const [id, setId] = useState("");
  const [patient, setPatient] = useState(null);
  const [details, setDetails] = useState(null); // Store additional patient details
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState(null); // Manage heading state

  const fetchPatientById = async () => {
    setLoading(true);
    setError(null);
    setPatient(null);
    setDetails(null);
    setHeading(null); // Reset heading state before fetching

    try {
      const response = await axios.get(`http://localhost:5000/api/patient-details/${id}`);
      console.log("response", response.data.message);

      if (response.data) {
        setPatient(response.data.patientDetails);
        setDetails(response.data.patientDetails
          || null); // Ensure details are set properly
        setId("");
        console.log("response.data.patientDetails.message",response.data.message)
        setHeading(response.data.message);
        setLoading(false);
      } else {
        setLoading(false);
        setHeading(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching patient data:",error.response.data.message);
      setHeading(error.response.data.message);
    } 
    // finally {
    //   setLoading(false);
    // }
  };
 console.log(heading)
  return (
    <div className="p-6 relative max-w-lg mx-auto">
      <Link to="/">
        <h2 className="flex justify-start text-white text-6xl">&larr;</h2>
      </Link>
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Fetch Patient by ID</h2>

      <div className="bg-white bg-opacity-70 flex flex-col backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-6">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Patient ID"
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />

        <motion.button
          initial={{
            backgroundImage: "linear-gradient(to right, white, white), linear-gradient(0deg, blue, white 40%)",
          }}
          animate={{
            backgroundImage: "linear-gradient(to right, white, white), linear-gradient(360deg, blue, white 40%)",
          }}
          transition={{
            type: "tween",
            ease: "linear",
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            border: "2px solid transparent",
            borderRadius: "20px",
            backgroundClip: "padding-box, border-box",
            backgroundOrigin: "padding-box, border-box",
            width: 160,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={fetchPatientById}
          className="px-4 py-2 bg-blue-500 text-black font-bold w-full rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          {loading ? "Fetching..." : "Fetch"}
        </motion.button>

        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 font-semibold text-center">
            {error}
          </div>
        )}

        {patient && !loading && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-center">Patient Details</h3>
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Field</th>
                  <th className="py-2 px-4 border-b border-gray-300 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">ID</td>
                  <td className="py-2 px-4 border-b border-gray-300">{patient._id}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">Name</td>
                  <td className="py-2 px-4 border-b border-gray-300">{patient.name}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">Age</td>
                  <td className="py-2 px-4 border-b border-gray-300">{patient.age}</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300">Contact</td>
                  <td className="py-2 px-4 border-b border-gray-300">{patient.contact}</td>
                </tr>
              </tbody>
            </table>

 
          </div>
        )}

       
{heading && !loading && (
          <h1 className="text-center mt-6">
            {heading === "Data match! The CID-fetched data matches the database hash."
              ? <p className="bg-green-600 text-white p-2 rounded">Data match! The CID-fetched data matches the database hash.</p>
              : <p className="bg-red-600 text-white p-2 rounded">Data mismatch! The CID-fetched data does not match the database hash.</p>}
          </h1>
        )}
      
      </div>
    </div>
  );
};

export default FetchByIdPage;
