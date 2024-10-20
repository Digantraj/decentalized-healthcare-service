import React, { useState } from "react";
import axios from "axios";
import PatientDetailsForm from "./PatientDetailsForm";
import HealthDetailsForm from "./HealthDetailsForm";

const MainForm = ({ onSave, fetchParentsDetials }) => {
  const [step, setStep] = useState(1); // Tracks which form to show
  const [loading, setLaoding] = useState(false);
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    contact: "",
    gender: "",
    heartbeatRate: "",
    bloodPressure: "",
    oxygenRate: "",
  });

  // Update form state
  const handlePatientDataChange = (data) => {
    setPatientData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  // Form submission logic
  const handleSubmit = async () => {

    setLaoding(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patient-data",
        patientData
      );
      // console.log("Form submitted successfully:", response.data);
      onSave(response.data.compare);
      fetchParentsDetials();
      setLaoding(false);
      window.location.reload();
    } catch (error) {
      setLaoding(false);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="flex justify-center h-full items-center">
      {step === 1 ? (
        // Step 1: Show Patient Basic Info Form
        <PatientDetailsForm
          onNext={() => setStep(2)}
          formData={patientData}
          onDataChange={handlePatientDataChange}
        />
      ) : (
        // Step 2: Show Health Details Form
        <HealthDetailsForm
          onPrevious={() => setStep(1)}
          formData={patientData}
          onDataChange={handlePatientDataChange}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default MainForm;
