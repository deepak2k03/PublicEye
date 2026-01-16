# 👁️ Public Eye: Blockchain-Powered Transparency Platform

Public Eye is a decentralized transparency platform designed to track public infrastructure projects. It ensures financial accountability by locking project budgets in smart contract escrows and releasing funds only when authorized administrators verify milestones on the blockchain.

This project uses a **MERN stack (MongoDB, Express, React, Node.js)** integrated with an **Ethereum smart contract** managed using **Hardhat**.

---

## 🏗️ Project Architecture

The system is divided into three synchronized layers:

* **Frontend**
  React (Vite) dashboard for Citizens and Admins

* **Backend**
  Node.js + Express REST API with MongoDB for authentication and project metadata

* **Blockchain**
  Solidity smart contract deployed on a local Hardhat network for escrow-based fund management

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

---

## 1️⃣ Prerequisites

Ensure the following are installed on your system:

* **Node.js** (v18 or higher)
* **MongoDB** (Local instance or MongoDB Atlas URI)
* **MetaMask Browser Extension**

---

## 2️⃣ Smart Contract Setup (Hardhat)

Navigate to the `smart_contracts` directory.

### Install dependencies

```bash
cd smart_contracts
npm install
```

### Create `.env` file

Create a `.env` file inside `smart_contracts` and add:

```env
PRIVATE_KEY=your_private_key_here
RPC_URL=http://127.0.0.1:8545
```

### Start the local Hardhat node

```bash
npx hardhat node
```

> ⚠️ Keep this terminal open.
> It provides pre-funded accounts and private keys (Admin = Account #0).

### Deploy the smart contract

Open a new terminal:

```bash
npx hardhat ignition deploy ./ignition/modules/PublicLedger.js --network localhost
```

📌 **Important**
Copy the deployed contract address and update it in:

```
client/src/pages/ProjectDetails.jsx
```

---

## 3️⃣ Backend Setup (Node.js + Express)

Navigate to the backend folder.

### Install dependencies

```bash
cd ../server
npm install
```

### Start the server

```bash
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

## 4️⃣ Frontend Setup (React + Vite)

Navigate to the frontend folder.

### Install dependencies

```bash
cd ../client
npm install
```

### Start the development server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🦊 MetaMask Configuration

To interact with the smart contract, configure MetaMask for the local Hardhat network.

### Add Hardhat Network

* **Network Name**: Hardhat Local
* **RPC URL**: `http://127.0.0.1:8545`
* **Chain ID**: `31337`
* **Currency Symbol**: ETH

### Import Admin Account

1. Copy the **private key for Account #0** from the Hardhat node terminal
2. In MetaMask → Import Account → Paste the private key
3. You should see **10,000 ETH** balance

---

## 🔑 Role-Based Access Control

| Feature                | Citizen | Admin                     |
| ---------------------- | ------- | ------------------------- |
| View Projects          | ✅       | ✅                         |
| View Public Ledger     | ✅       | ✅                         |
| Add New Project        | ❌       | ✅                         |
| Verify & Release Funds | ❌       | ✅ (Admin Wallet Required) |

---

## 🛠️ Troubleshooting

### ❌ “Project does not exist”

Occurs if the Hardhat node was restarted.

✔️ Solution:
Click **Verify** as an admin. The backend auto-registers the project on-chain before verification.

---

### ❌ “Restricted Access” for Admin

Happens if the user role was manually changed in MongoDB.

✔️ Solution:
Log out and log back in to refresh session data stored in `localStorage`.

---

### ❌ Nonce Mismatch Error

Occurs after restarting the Hardhat node.

✔️ Solution:
In MetaMask:

```
Settings → Advanced → Clear activity tab data
```

---

## 📌 Notes

* Hardhat local blockchain state resets on restart
* Contract redeployment requires updating the frontend contract address
* Admin actions require MetaMask wallet connection

---

## 🤝 Contributions

Contributions, issues, and feature requests are welcome.
Feel free to fork the repository and submit a pull request.

---
