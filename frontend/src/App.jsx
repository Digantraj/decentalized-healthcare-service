import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import FetchByIdPage from "./components/fetchByIdPage"; // Import the fetch by ID page
import { motion } from "framer-motion";
import axios from "axios";
import Img from "./assets/image/bg-img/grad-dark.png";
import LedMatrix from "./assets/LedMatrix";
import Flow from "./components/Flow";
import DocumentData from "./components/documentData";

const App = () => {
  const [loader, setLoader] = useState(true);
  const [patientDetails, setPatientsDetails] = useState();
  const [verificationStatus, setVerificationStatus] = useState("");

  const onSave = (data) => {
    setVerificationStatus(data);
  };

  const fetchPatientsDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patient-details");
      console.log("response2", response);
      setPatientsDetails(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPatientsDetails();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Loader animation for three-dot wave effect
  const loaderVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: "easeInOut",
        duration: 0.6,
      },
    },
  };

  const dotVariant = {
    hidden: { y: 0 },
    visible: {
      y: [0, -20, 0], // Up and down motion
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <LedMatrix />
        <img
          src={Img}
          alt="background"
          className="absolute object-cover h-full w-full"
          style={{ zIndex: 0 }}
        />
        {/* Loader */}
        {loader ? (
          <motion.div
            className="flex justify-center items-center h-screen"
            initial="hidden"
            animate="visible"
            variants={loaderVariant}
          >
            <div className="flex space-x-2">
              <motion.div
                className="w-5 h-5 bg-blue-200 rounded-full"
                variants={dotVariant}
              />
              <motion.div
                className="w-5 h-5 bg-blue-400 rounded-full"
                variants={dotVariant}
              />
              <motion.div
                className="w-5 h-5 bg-blue-600 rounded-full"
                variants={dotVariant}
              />
            </div>
          </motion.div>
        ) : (
          // App Content with Routes
          <Routes>
            {/* Main Page Route */}
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Header />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  >
                    <div className="min-h-[80%] ">
                      <MainContent
                        onSave={onSave}
                        fetchPatientsDetails={fetchPatientsDetails}
                        verificationStatus={verificationStatus}
                        patientDetails={patientDetails}
                      />
                    </div>
                  </motion.div>
                  <Flow />
                  <DocumentData/>
                  <Footer />
                </motion.div>
              }
            />
            {/* Fetch by ID Page Route */}
            <Route path="/fetch-by-id" element={<FetchByIdPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
