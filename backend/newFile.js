import express from "express";
import mongoose from "mongoose";
import { createHash } from "crypto";
import PinataSDK from "@pinata/sdk";
import cors from "cors";
// import Web3 from "web3"; // Import Web3.js

import ethers from "ethers";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://shrawan2401:shrawan7650@cluster0.vhy52pl.mongodb.net/hacktone?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas
const mainSchema = new mongoose.Schema({}, { timestamps: true });
const detailsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Main",
      required: true,
    },
    oxygenRate: { type: Number, required: true },
    bloodPressure: { type: Number, required: true },
    heartbeatRate: { type: Number, required: true },
  },
  { timestamps: true }
);
const patientDetailsSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Main",
      required: true,
    },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    contact: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  },
  { timestamps: true }
);
const hashedDataSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Main",
      required: true,
    },
    hashedData: { type: String, required: true },
  },
  { timestamps: true }
);

// Models
const Main = mongoose.model("Main", mainSchema);
const Details = mongoose.model("Details", detailsSchema);
const HashedData = mongoose.model("HashedData", hashedDataSchema);
const PatientDetails = mongoose.model("PatientDetails", patientDetailsSchema);
// Initialize Pinata SDK
const pinata = new PinataSDK(
  "77ea31f55a481eb9f8a0",
  "0f1340612386a9cd02da448e91768797a908de3f2b5a4ecdbf76cbbb0553f559"
);

// Initialize Web3
// Web3.js Setup with Infura and Private Key
const infuraUrl = `https://node.ghostnet.etherlink.com/`; // Your Infura URL
// const privateKey =process.env.privateKey; // Your private key
const privateKey =
  "0x3c223a774538555b7c584d34942658cd8c484a7816e4bef92930b4967e0bd6af"; // Private key with 0x
// Initialize Web3 instance with Infura provider
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

// Add private key to Web3 wallet
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "0xC0F1d29f94f69e2cb35A60FFF976Ce4E3d7179F2"; // Replace with your deployed contract address
const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "addOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "patientId",
        type: "string",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timeStamp",
        type: "uint256",
      },
    ],
    name: "addPatientRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_owners",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "removedOwner",
        type: "address",
      },
    ],
    name: "OwnerRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "hashedPatientID",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "patientId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "hashedCID",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "CID",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timeStamp",
        type: "uint256",
      },
    ],
    name: "PatientRecordAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "removeOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "patientId",
        type: "string",
      },
    ],
    name: "getPatientRecords",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "CID",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timeStamp",
            type: "uint256",
          },
        ],
        internalType: "struct PatientRecord.Patient[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "owners",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to hash data
const hashData = (patientId, oxygenRate, bloodPressure, heartbeatRate) => {
  //   console.log(Patient ID: ${patientId});
  //   console.log(Oxygen Rate: ${oxygenRate});
  //   console.log(Blood Pressure: ${bloodPressure});
  //   console.log(Heartbeat Rate: ${heartbeatRate});
  const dataString = `${patientId}-${oxygenRate}-${bloodPressure}-${heartbeatRate}`;
  console.log("dataString", dataString);

  // console.log("Hashed Data: ", hashData(patientId, oxygenRate, bloodPressure, heartbeatRate));
  console.log("dataString", dataString);
  return createHash("sha256").update(dataString).digest("hex");
};

//strat yah sa kiya hai
// Function to Add Record with CID and MongoDB Timestamp
// Function to Add Record with CID and MongoDB Timestamp
const addRecordToBlockchain = async (patientId, ipfsCID, timestamp) => {
  console.log("Adding record to blockchain: ", patientId, ipfsCID, timestamp);
  const time = Math.floor(timestamp);
  console.log("time", time);
  try {
    // Send transaction to add the record with patientId, CID, and MongoDB timestamp
    const tx = await contract.addPatientRecord(
      patientId.toString(),
      ipfsCID,
      time
    );
    const receipt = await tx.wait();

    // console.log("Record added to blockchain, response: ", receipt);
  } catch (error) {
    console.error("Error adding record to blockchain:", error);
  }
};

// Function to Get CID from Contract
const getCidFromContract = async (patientId) => {
  console.log("getCidFromContract", patientId);
  try {
    const tx = await contract.getPatientRecords(patientId.toString());
    console.log("yx", tx);

    // console.log("run", tx[0].CID);
    return Array.isArray(tx) && tx.length > 0 ? tx[0].CID : null;
  } catch (error) {
    console.error("Error fetching CID from contract:", error);
    return null;
  }
};
// const getCidFromContract = async (patientId) => {
//   console.log("getCidFromContract", patientId);
//   try {
//     const tx = await contract.getPatientRecords(patientId);
//     console.log(tx);
//     if (Array.isArray(tx) && tx.length > 0) {
//       console.log("CID:", tx[0].CID);
//       return tx[0].CID;
//     } else {
//       console.log("No records found for this patient.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching CID from contract:", error);
//     return null;
//   }
// };

//start ka step 2 hai
// Function to Fetch Data from IPFS using CID
const fetchDataFromIPFS = async (cid) => {
  try {
    const response = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${cid}`
    );
    console.log("response.data", response);
    return response.data; // This will return the patient data as JSON
  } catch (error) {
    console.error("Error fetching data from IPFS:", error);
    return null;
  }
};
//start ka step 3 hai
// Function to Hash the Fetched Data (using SHA-256)
const hashFetchedData = (data) => {
  try {
    // Convert data (JSON) to a string
    const { patientId, oxygenRate, bloodPressure, heartbeatRate } =
      data.details;

    const dataStringhorzion = `${patientId}-${oxygenRate}-${bloodPressure}-${heartbeatRate}`;
    console.log("dataStringhorzion", dataStringhorzion);
    // Create SHA-256 hash
    const hash = createHash("sha256").update(dataStringhorzion).digest("hex");
    console.log("hash", hash);

    return hash;
  } catch (error) {
    console.error("Error hashing fetched data:", error);
  }
};

// Function to Fetch Hashed Data from MongoDB
//start ka step 4 hai
const getHashedDataFromDB = async (patientId) => {
  console.log("getHashedDataFromDB", patientId);
  try {
    const hashedRecord = await HashedData.findOne({ patientId });
    console.log("hashedRecord", hashedRecord);
    return hashedRecord ? hashedRecord.hashedData : null;
  } catch (error) {
    console.error("Error fetching hashed data from MongoDB:", error);
    return null;
  }
};

const compareHashes = async (patientId) => {
  try {
    // 1. Fetch CID from Blockchain
    console.log("patientid", patientId);
    const cid = await getCidFromContract(patientId);
    if (!cid) {
      console.log("CID not found for this patient.");
      return;
    }

    console.log("CID from Blockchain:", cid);

    // 2. Fetch Data from IPFS
    const fetchedData = await fetchDataFromIPFS(cid);
    if (!fetchedData) {
      console.log("No data found on IPFS.");
      return;
    }

    // 3. Hash the Fetched Data (SHA-256)
    const fetchedDataHash = hashFetchedData(fetchedData);
    console.log("Hashed Data from IPFS:", fetchedDataHash);

    // 4. Fetch Hashed Data from MongoDB
    const mongoHashedData = await getHashedDataFromDB(patientId);
    if (!mongoHashedData) {
      console.log("Hashed data not found in MongoDB.");
      return;
    }

    console.log("Hashed Data from MongoDB:", mongoHashedData);
    console.log("fetchedDataHash", fetchedDataHash);
    // 5. Compare the Hashes
    if (fetchedDataHash === mongoHashedData) {
      console.log(
        "Data match! The CID-fetched data matches the database hash."
      );
      const value =
        "Data match! The CID-fetched data matches the database hash.";
      return { value, fetchedDataHash };
    } else {
      console.log(
        "Data mismatch! The CID-fetched data does not match the database hash."
      );
      const value =
        "Data mismatch! The CID-fetched data does not match the database hash.";
      return { value, fetchedDataHash };
    }
  } catch (error) {
    console.error("Error comparing hashes:", error);
  }
};
//fetch id detials

const savePatientRecord = async (
  name,
  age,
  contact,
  gender,
  oxygenRate,
  bloodPressure,
  heartbeatRate
) => {
  try {
    // Step 1: Create and save Main record
    const mainRecord = new Main({});
    await mainRecord.save();
    const patientId = mainRecord._id;

    // Step 2: Create and save PatientDetails record
    const patientDetails = new PatientDetails({
      patientId,
      name,
      age,
      contact,
      gender,
    });
    await patientDetails.save();
    console.log("Patient Details saved:", patientDetails);

    // Step 3: Create and save Details record
    const details = new Details({
      patientId,
      oxygenRate,
      bloodPressure,
      heartbeatRate,
    });
    await details.save();

    // Get the timestamp from MongoDB (createdAt)
    const timestamp = details.createdAt.getTime() / 1000; // Convert to seconds
    console.log("Details saved:", details);

    // Step 4: Hash patient data and save it
    const hashedData = hashData(
      patientId,
      oxygenRate,
      bloodPressure,
      heartbeatRate
    );
    const hashedRecord = new HashedData({ patientId, hashedData });
    await hashedRecord.save();

    // Step 5: Upload hashed data to IPFS via Pinata
    const pinataResult = await pinata.pinJSONToIPFS({ details });
    console.log("pinataResult.IpfsHash", pinataResult.IpfsHash);

    // Step 6: Add record to the blockchain
    await addRecordToBlockchain(patientId, pinataResult.IpfsHash, timestamp);

    return { success: true, ipfsCID: pinataResult.IpfsHash, patientId };
  } catch (error) {
    console.error("Error saving patient record:", error);
    return { success: false, error: error.message };
  }
};

// app.get("/api/patient-details/:id", async (req, res) => {
//    // Compare hashes
//    const { id } = req.params;
//    console.log("Requested Patient ID:", id);
//    try{
//    const smartContractHashData = await compareHashes(id);
//    console.log("Smart Contract Hash Data:", smartContractHashData.fetchedDataHash);

//    if (!smartContractHashData.fetchedDataHash) {
//      return res.status(404).json({ message: "No data found in the contract" });
//    }

//    const patientDetailsHash = await getHashedDataFromDB(id);
//    console.log("Patient Details Hash from MongoDB:", patientDetailsHash);
//    var objectId = new mongoose.Types.ObjectId(id);
// if(patientDetailsHash===smartContractHashData.fetchedDataHash){
//   console.log("math")
//   const patientDetails = await PatientDetails.findById({patientId:objectId});
//   console.log("patientDetails",patientDetails)
//   return res.json(patientDetails);
// }else{
//   return res.json({
//     message:"hash data not match"
//   });

// }

//   } catch (error) {
//     console.error("Error fetching patient details:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error. Could not retrieve patient details." });
//   }
// });

app.get("/api/patient-details/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Requested Patient ID:", id);

  try {
    const smartContractHashData = await compareHashes(id);
    console.log(
      "Smart Contract Hash Data:",
      smartContractHashData?.fetchedDataHash
    );

    if (!smartContractHashData.fetchedDataHash) {
      return res.status(404).json({ message: "No data found in the contract" });
    }

    const patientDetailsHash = await getHashedDataFromDB(id);
    console.log("Patient Details Hash from MongoDB:", patientDetailsHash);

    // Convert string id to ObjectId
    var objectId = new mongoose.Types.ObjectId(id);

    if (patientDetailsHash === smartContractHashData.fetchedDataHash) {
      console.log("Hashes match");

      // Use findOne to query by patientId field
      const patientDetails = await PatientDetails.findOne({
        patientId: objectId,
      });
      if (!patientDetails) {
        return res.status(404).json({ message: "Patient details not found" });
      }

      console.log("patientDetails", patientDetails);
      return res.json({
        message: "Data match! The CID-fetched data matches the database hash.",
        patientDetails,
      });
    } else {
      console.log("Hash data does not match");
      return res.json({
        message:
          "Data mismatch! The CID-fetched data does not match the database hash.",
      });
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return res
      .status(500)
      .json({ message: "Server error. Could not retrieve patient details." });
  }
});



// API route for patient data submission
app.post("/api/patient-data", async (req, res) => {
  const {
    oxygenRate,
    bloodPressure,
    heartbeatRate,
    name,
    age,
    contact,
    gender,
  } = req.body;
  console.log(req.body);

  if (!oxygenRate || !bloodPressure || !heartbeatRate) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const result = await savePatientRecord(
    name,
    age,
    contact,
    gender,
    oxygenRate,
    bloodPressure,
    heartbeatRate
  );

  console.log("Result:", result);
  if (result.success) {
    // Call compareHashes after saving the data
    const compare = await compareHashes(result.patientId); // Add this line
    console.log("compare", compare);
    return res.json({
      message: "Data saved successfully",
      ipfsCID: result.ipfsCID,
      patientId: result.patientId,
      compare: compare,
    });
  } else {
    return res
      .status(500)
      .json({ message: "Error saving data", error: result.error });
  }
});
//get patient detials
app.get("/api/patient-details", async (req, res) => {
  try {
    const patientDetails = await PatientDetails.find();
    return res.json(patientDetails);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return res.status(500).json({ message: "Error fetching patient details" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
