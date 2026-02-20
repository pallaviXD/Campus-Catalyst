# 🚀 CampusCatalyst - Blockchain Crowdfunding Platform

## Demo Video & Links

**Live Demo**: [Your Demo Link]
**GitHub**: [Your GitHub Repo]
**LinkedIn**: [Your LinkedIn Post]

## What is CampusCatalyst?

A decentralized crowdfunding platform built on Algorand blockchain for campus projects and student initiatives. Features real wallet integration, transparent transactions, and secure fund management.

## ✨ Key Features

- 🔐 **Pera Wallet Integration** - Real blockchain wallet connection
- 💰 **ALGO Transactions** - Actual cryptocurrency contributions
- 📊 **Real-time Dashboard** - Live campaign tracking
- 🖼️ **Image Upload** - Support for campaign images
- 🎯 **Campaign Management** - Create, view, and delete campaigns
- 🔍 **Debug Tools** - Built-in system monitoring

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Blockchain**: Algorand TestNet
- **Wallet**: Pera Wallet Connect
- **Smart Contracts**: Python (AlgoKit)
- **Styling**: Custom CSS with Teal/Green theme

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Pera Wallet browser extension
- ALGO TestNet tokens

### Installation

```bash
# Clone repository
git clone [your-repo-url]
cd CampusCatalyst

# Install frontend dependencies
cd projects/CampusCatalyst-frontend
npm install

# Start development server
npm run dev
```

### Usage

1. **Open App**: http://localhost:5173
2. **Login**: Use demo credentials or signup
3. **Connect Wallet**: Click "Connect Pera Wallet"
4. **Create Campaign**:
   - Fill campaign details
   - Upload image or use URL
   - Set goal amount in ALGO
   - Launch campaign
5. **Contribute**: Click any campaign → Enter amount → Back Campaign
6. **Manage**: Go to "My Campaigns" to view/delete your campaigns

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Create Campaign
![Create Campaign](screenshots/create-campaign.png)

### Campaign Detail
![Campaign Detail](screenshots/campaign-detail.png)

## 🎯 Features Demonstrated

### ✅ Working Features
- Wallet connection (Pera Wallet)
- Campaign creation with images
- Real-time campaign display
- Contribution functionality
- Campaign deletion
- LocalStorage persistence
- Responsive design
- Debug monitoring

### 🔄 Blockchain Integration
- TestNet transactions
- Wallet signature requests
- Transaction confirmation
- AlgoExplorer links
- Real ALGO transfers

## 🏗️ Architecture

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
│       └── smart_contracts/
└── README.md
```

## 🔐 Security Features

- Wallet signature verification
- Transaction confirmation
- Secure localStorage
- Input validation
- Error handling

## 🎨 Design

- Modern teal/green gradient theme
- Responsive layout
- Smooth animations
- Intuitive UX
- Accessible components

## 📊 Demo Scenarios

### Scenario 1: Create Campaign
1. Connect wallet
2. Click "Create Campaign"
3. Fill form with project details
4. Upload campaign image
5. Set goal (e.g., 10 ALGO)
6. Launch campaign
7. View on dashboard

### Scenario 2: Contribute to Campaign
1. Browse campaigns on dashboard
2. Click campaign card
3. Enter contribution amount
4. Click "Back This Campaign"
5. Approve in Pera Wallet
6. See transaction confirmation

### Scenario 3: Manage Campaigns
1. Go to "My Campaigns"
2. View all your campaigns
3. Check progress and stats
4. Delete campaign if needed

## 🐛 Debug Tools

Access debug page at `/debug` to:
- Check wallet connection status
- View all campaigns
- Monitor system state
- Test functionality

## 📝 Environment Variables

```env
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_NETWORK=testnet
VITE_APP_ID=1002541853
```

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to Vercel/Netlify
```

### Smart Contract
```bash
cd projects/CampusCatalyst-contracts
algokit project deploy testnet
```

## 🎓 Learning Outcomes

- Blockchain integration
- Wallet connectivity
- Smart contract interaction
- React TypeScript development
- State management
- Responsive design

## 🤝 Contributing

This is a hackathon project. Feel free to fork and improve!

## 📄 License

MIT License

## 👨‍💻 Author

[Your Name]
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]

## 🙏 Acknowledgments

- Algorand Foundation
- AlgoKit Team
- Pera Wallet
- RIFT Hackathon

---

**Built for RIFT Hackathon 2026** 🚀
