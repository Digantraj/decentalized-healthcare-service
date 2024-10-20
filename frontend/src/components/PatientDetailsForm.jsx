import React from "react";
import { motion } from "framer-motion";

const PatientDetailsForm = ({ formData, onDataChange, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
  };

  return (
    <motion.div
      className="bg-white mt-10 bg-opacity-80 rounded-lg shadow-md p-8 w-full max-w-md backdrop-filter backdrop-blur-lg"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Patient Details</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            placeholder="Enter age"
            required
            style={{ MozAppearance: "textfield" }}
          />
          <style>{`
            input[type='number']::-webkit-inner-spin-button,
            input[type='number']::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          `}</style>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter contact"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <motion.button
            type="submit"
            initial={{
              backgroundImage:
                "linear-gradient(to right, white, white), linear-gradient(0deg, blue, white 40%)",
            }}
            animate={{
              backgroundImage:
                "linear-gradient(to right, white, white), linear-gradient(360deg, blue, white 40%)",
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
              width: '100%',
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
           >
            Next
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PatientDetailsForm;
