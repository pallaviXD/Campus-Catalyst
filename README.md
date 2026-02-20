# 🚀 CampusCatalyst - Blockchain Crowdfunding Platform

A decentralized crowdfunding platform built on Algorand blockchain for campus projects and student initiatives.

![CampusCatalyst](https://img.shields.io/badge/Algorand-Blockchain-00D4AA?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

- 🔐 **Pera Wallet Integration** - Secure blockchain wallet connection
- 💰 **ALGO Transactions** - Real cryptocurrency contributions on Algorand TestNet
- 📊 **Real-time Dashboard** - Live campaign tracking and statistics
- 🖼️ **Image Upload** - Support for campaign images (file upload or URL)
- 🎯 **Campaign Management** - Create, view, contribute, and delete campaigns
- 🔍 **Status Tracking** - Automatic completion when goal reached or deadline passed
- 📱 **Responsive Design** - Beautiful teal gradient theme, works on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Blockchain**: Algorand TestNet
- **Wallet**: Pera Wallet Connect
- **Smart Contracts**: Python (AlgoKit)
- **Styling**: Custom CSS with modern design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Pera Wallet browser extension
- ALGO TestNet tokens (get from [TestNet Dispenser](https://bank.testnet.algorand.network/))

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/CampusCatalyst.git
cd CampusCatalyst

# Install frontend dependencies
cd projects/CampusCatalyst-frontend
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

### Usage

1. **Login/Signup** - Create an account or use demo credentials
2. **Connect Wallet** - Click "Connect Pera Wallet" in top right
3. **Create Campaign**:
   - Fill campaign details
   - Upload image or use URL
   - Set goal amount in ALGO
   - Launch campaign
4. **Contribute** - Click any campaign → Enter amount → Back Campaign
5. **Manage** - Go to "My Campaigns" to view/delete your campaigns

## 🎯 Key Features

✅ Wallet connection (Pera Wallet)  
✅ Campaign creation with images  
✅ Real-time campaign display  
✅ Contribution functionality with ALGO  
✅ Campaign deletion  
✅ Auto-complete status  
✅ LocalStorage persistence  
✅ Responsive design  

## 🏗️ Project Structure

```
CampusCatalyst/
├── projects/
│   ├── CampusCatalyst-frontend/    # React frontend
│   │   ├── src/
│   │   │   ├── pages/              # Main pages
│   │   │   ├── components/         # Reusable components
│   │   │   ├── services/           # Algorand service
│   │   │   ├── hooks/              # Custom hooks
│   │   │   └── styles/             # CSS files
│   │   └── package.json
│   └── CampusCatalyst-contracts/   # Smart contracts
└── README.md
```

## 🚀 Deployment

### Build for Production
```bash
cd projects/CampusCatalyst-frontend
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

## 📄 License

MIT License

## 👨‍💻 Author

Built for RIFT Hackathon 2026

---

**⭐ Star this repo if you found it helpful!**
