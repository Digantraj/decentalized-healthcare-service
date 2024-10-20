import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";

const InputForm = ({ onSave, title }) => {
  const [heartbeatRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [oxygenRate, setOxygenRate] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const healthData = { heartbeatRate, bloodPressure, oxygenRate };

  //   try {
  //     // const response = await axios.post(
  //     //   "http://localhost:5000/api/patient-data",
  //     //   healthData
  //     // );
  //     // console.log("response1", response);
  //     // onSave(healthData);
  //     //window reload
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white rounded-md shadow-md w-1/3"
    >
      <h2 className="text-center text-lg font-bold text-green-600">{title}</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heart Rate
          </label>
          <input
            type="number"
            placeholder="Heart Rate"
            value={heartbeatRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Pressure
          </label>
          <input
            type="number"
            placeholder="Blood Pressure"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Oxygen Saturation
          </label>
          <input
            type="number"
            placeholder="Oxygen Saturation"
            value={oxygenRate}
            onChange={(e) => setOxygenRate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default InputForm;
