import React from "react";
import { motion } from "framer-motion";
import image from "../assets/hac.jpg";

const Header = () => {
  return (
    <header className="fixed -top-16 left-0 right-0 lg:w-[90%] mx-auto flex justify-center items-center bg-black bg-opacity-0  p-4 rounded-full shadow-lg z-50">
      <div className="flex items-center w-full  justify-between space-x-4">
        {/* Title with Animation */}
        <motion.h2
          className="text-3xl font-bold text-center hidden md:block text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img className="h-20 w-64  bg-blend-color" src="https://logomoose.com/wp-content/uploads/2014/03/horizon.jpg"/>
        </motion.h2>
      </div>

      {/* Footer Text for small screens */}
      <motion.span
        className=" flex text-2xl  text-blue-300 flex-row-reverse  "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
       Decentralized Health Management and Security System
      </motion.span>
    </header>
  );
};

export default Header;
