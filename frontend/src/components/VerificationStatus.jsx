import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VerificationStatus = ({ verificationStatus }) => {
  console.log("verificationStatus", verificationStatus);

  return (
    <motion.div
      className="p-6 max-w-md mt-10 pb-7 h-[92.4%] justify-center flex flex-col mx-auto bg-white bg-opacity-80 rounded-xl shadow-md space-y-4 border border-gray-300 backdrop-filter backdrop-blur-lg"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Data Verification
      </h2>

      <div className="flex flex-col items-center">
        {verificationStatus ? (
          verificationStatus ===
          "Data match! The CID-fetched data matches the database hash." ? (
            <p className="text-green-600 font-semibold text-center break-words">
              {verificationStatus.value}
            </p>
          ) : (
            <p className="text-red-600 font-semibold text-center break-words">
              {verificationStatus.value}
            </p>
          )
        ) : (
          <div className="flex justify-center items-center">
            <img
              src="https://www.shutterstock.com/image-vector/identification-card-verified-check-mark-600nw-2273995241.jpg"
              alt="Verification Pending"
              className="w-48 h-48 object-contain" // Adjust size of image
            />
          </div>
        )}
      </div>

      {/* Button Section */}
      <div className="border-t border-gray-300 w-full mt-4 pt-4 flex justify-center">
        <Link to="fetch-by-id">
          <motion.button
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
              width: 160,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Fetch by ID
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default VerificationStatus;
