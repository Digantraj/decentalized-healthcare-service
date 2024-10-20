# Secure IoT Smart Health Monitoring System using Blockchain Technology

## Introduction  
The **Secure IoT Smart Health Monitoring System** leverages blockchain technology to securely manage and store health data. This system allows for the monitoring of patients' vital signs while ensuring data integrity and security through the use of Ethereum and IPFS.

## Technologies Used  
- **Blockchain**: Ethereum  
- **Smart Contracts**: Solidity  
- **IPFS**: Pinata  
- **Backend**: Node.js with Ether.js  
- **Frontend**: React, Tailwind CSS  
- **Database**: MongoDB  
- **API Access**: Infura  

## Features  
- Store patient health records securely on the Ethereum blockchain.  
- Upload health data to IPFS for decentralized storage.  
- Generate and verify SHA-256 hashes for data integrity.  
- Retrieve health data efficiently using Ethereum smart contracts.  

## Installation  

### Prerequisites  
Before you begin, ensure you have the following installed:  
- Node.js (v14 or higher)  
- MongoDB  
- Metamask (for interacting with the Ethereum network)  
- IPFS (via Pinata)  

### Clone the Repository  
1. Clone the repository:  
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

### Install Dependencies  
1. For both the frontend and backend, install the required dependencies using npm:  
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Set Up MongoDB  
1. Create a MongoDB database.  
2. Create the following schemas in MongoDB:  
   - **Schema 1**: Patient Details (Contact and Email Address)  
   - **Schema 2**: Hospital Details (Blood Pressure, Heart Rate, Oxygen Saturation)  
   - **Schema 3**: Patient ID and SHA-256 Hash of Schema 2  

### Configure Environment Variables  
Create a `.env` file in the root of your backend directory and set up the following variables:  
```
MONGODB_URI=<your-mongodb-uri>
INFURA_PROJECT_ID=<your-infura-project-id>
INFURA_API_SECRET=<your-infura-api-secret>
PINATA_API_KEY=<your-pinata-api-key>
PINATA_API_SECRET=<your-pinata-api-secret>
```

## Run the Application  
**Start the backend server:**  
1. Navigate to the backend directory:  
   ```bash
   cd backend
   ```
2. Start the server:  
   ```bash
   node index.js
   ```  

**Start the frontend application:**  
1. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```
2. Start the application:  
   ```bash
   npm start
   ```  

## Smart Contract Details  
The smart contract is deployed on the Ethereum network. It accepts CID, timestamp, and patient ID for data storage.

## Frontend  
The frontend is built using React and styled with Tailwind CSS. It allows users to input patient data and view health records.


## License  
This project is licensed under the MIT License.

## Acknowledgments  
- [Ethereum](https://ethereum.org/) for blockchain technology.  
- [IPFS](https://ipfs.io/) for decentralized storage.  
- [Pinata](https://pinata.cloud/) for IPFS pinning services.  

## Flowchart  
Here’s a visual representation of the data flow in the system:  
**User Inputs Patient Data** → **Store Patient Data in MongoDB** → **Generate SHA-256 Hash** → **Store Hash in MongoDB** → **Upload Data to IPFS** → **Store CID in Smart Contract** → **Fetch Data** → **Verify CID** → **Return Health Data**
