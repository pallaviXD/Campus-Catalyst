# CampusCatalyst Frontend

A stunning React-based frontend for the Campus Crowdfunding Platform with red & black theme, complete authentication, and Algorand blockchain integration.

## 🎨 Features

### Design & UI
- **Modern Red & Black Theme** - Professional, high-contrast design
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion powered transitions
- **Icon Integration** - React Icons for beautiful UI elements
- **Custom Components** - Reusable, well-structured components

### Authentication System
- **Sign Up** - User registration with email verification
- **Sign In** - Secure login system
- **Email Verification** - Confirmation flow for new users
- **Protected Routes** - Secure access to authenticated pages
- **User Profile** - Account management

### Campaign Features
- **Dashboard** - Overview of all campaigns with statistics
- **Create Campaign** - Intuitive form to launch new campaigns
- **Campaign Details** - Detailed view with contribution interface
- **My Campaigns** - Manage your created campaigns
- **Campaign Cards** - Beautiful card design with progress tracking
- **Real-time Stats** - Live funding progress and backers count

### Blockchain Integration
- **Wallet Connection** - Pera Wallet, Defly Wallet support
- **Smart Contract Integration** - Direct interaction with Algorand contracts
- **Transaction Handling** - Secure ALGO contributions
- **Address Display** - Formatted wallet addresses

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Navigation bar with wallet connection
│   ├── CampaignCard.tsx        # Campaign card component
│   ├── ConnectWallet.tsx       # Wallet connection modal
│   └── ...
├── pages/
│   ├── Login.tsx               # Login page
│   ├── Signup.tsx              # Registration page
│   ├── VerifyEmail.tsx         # Email verification
│   ├── Dashboard.tsx           # Main dashboard
│   ├── CreateCampaign.tsx      # Campaign creation
│   ├── CampaignDetail.tsx      # Campaign details & contribution
│   └── MyCampaigns.tsx         # User's campaigns management
├── contexts/
│   └── AuthContext.tsx         # Authentication state management
├── styles/
│   ├── theme.css               # Theme variables & colors
│   ├── globals.css             # Global styles & utilities
│   ├── Auth.css                # Authentication pages styling
│   ├── Navbar.css              # Navigation styling
│   ├── Dashboard.css           # Dashboard styling
│   ├── CampaignCard.css        # Campaign card styling
│   ├── CreateCampaign.css      # Campaign creation styling
│   ├── CampaignDetail.css      # Campaign detail styling
│   ├── MyCampaigns.css         # My campaigns styling
│   └── App.css                 # Main app styling
└── App.tsx                     # Main app with routing

```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.0 or later
- npm 9.0 or later
- Algorand wallet (Pera or Defly)

### Installation

```bash
# Navigate to frontend directory
cd CampusCatalyst/projects/CampusCatalyst-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 🎨 Theme Customization

The theme is defined in `src/styles/theme.css`:

```css
:root {
  --primary-red: #DC143C;
  --primary-black: #0A0A0A;
  --secondary-black: #1A1A1A;
  /* ... more variables */
}
```

Customize colors, spacing, shadows, and more by editing these CSS variables.

## 🔐 Authentication Flow

1. **Sign Up** → User creates account
2. **Email Verification** → User verifies email (simulated)
3. **Login** → User signs in
4. **Dashboard Access** → Protected routes accessible

## 💰 Campaign Workflow

1. **Connect Wallet** → User connects Algorand wallet
2. **Create Campaign** → Fill form with campaign details
3. **Smart Contract Deployment** → Campaign created on blockchain
4. **Receive Contributions** → Users can contribute ALGO
5. **Track Progress** → Real-time funding updates
6. **Withdraw Funds** → Creator withdraws after goal reached

## 🔗 Smart Contract Integration

### Connect to Smart Contract

Update the contract address in your environment:

```env
VITE_APP_ID=YOUR_TESTNET_APP_ID
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_TOKEN=
VITE_ALGOD_NETWORK=testnet
```

### Integration Points

The frontend integrates with the smart contract at:
- **Create Campaign**: `create_campaign()` method
- **Contribute**: `contribute()` method with payment transaction
- **Withdraw**: `withdraw_funds()` method
- **Get Info**: `get_campaign_info()` method

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Key Components

### Navbar
- Wallet connection status
- User menu with profile & logout
- Navigation links
- Mobile responsive menu

### CampaignCard
- Campaign image with overlay
- Progress bar with percentage
- Funding statistics
- Days remaining countdown
- Category badge

### Dashboard
- Statistics overview (4 stat cards)
- Filter buttons (All, Active, Completed)
- Campaign grid layout
- Loading states

### CreateCampaign
- Multi-field form
- Category selection
- Duration picker
- Image URL input
- Form validation

### CampaignDetail
- Hero image
- Creator information
- Campaign description
- Contribution interface
- Quick amount buttons
- Progress tracking

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Vite** - Build tool
- **AlgoKit Utils** - Algorand integration
- **@txnlab/use-wallet-react** - Wallet connection
- **React Icons** - Icon library
- **Notistack** - Notifications
- **CSS3** - Styling with custom properties

## 🎨 Design System

### Colors
- Primary Red: `#DC143C`
- Dark Red: `#B01030`
- Primary Black: `#0A0A0A`
- Secondary Black: `#1A1A1A`

### Typography
- Headings: Poppins
- Body: Inter

### Spacing Scale
- XS: 0.25rem
- SM: 0.5rem
- MD: 1rem
- LG: 1.5rem
- XL: 2rem
- 2XL: 3rem

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
VITE_APP_ID=YOUR_APP_ID
VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
VITE_ALGOD_PORT=443
VITE_ALGOD_TOKEN=
VITE_ALGOD_NETWORK=testnet
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

### GitHub Pages

```bash
# Build
npm run build

# Deploy dist folder
```

## 🐛 Troubleshooting

### Wallet Connection Issues
- Ensure wallet extension is installed
- Check network configuration (testnet/mainnet)
- Clear browser cache

### Build Errors
- Delete `node_modules` and reinstall
- Check Node.js version (20.0+)
- Verify all dependencies are installed

### Smart Contract Integration
- Verify App ID is correct
- Check network configuration
- Ensure contract is deployed on testnet

## 📝 TODO / Future Enhancements

- [ ] Add campaign categories filtering
- [ ] Implement search functionality
- [ ] Add user profiles with avatars
- [ ] Campaign comments and updates
- [ ] Social sharing integration
- [ ] Email notifications
- [ ] Campaign milestones
- [ ] NFT rewards for backers
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is part of the RIFT Hackathon submission.

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Algorand Developer Portal](https://developer.algorand.org/)
- [AlgoKit Documentation](https://github.com/algorandfoundation/algokit-cli)
- [Use Wallet React](https://github.com/TxnLab/use-wallet)

## 🏆 RIFT Hackathon Compliance

✅ React frontend with modern UI  
✅ Algorand wallet integration  
✅ Smart contract interaction  
✅ Responsive design  
✅ User authentication  
✅ Campaign management  
✅ Contribution interface  
✅ Real-time updates  
✅ Production-ready code  

---

**Built with ❤️ for Campus Communities**
