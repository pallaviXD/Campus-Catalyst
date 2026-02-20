# CampusCatalyst User Guide

## ✅ What's Fixed

1. **Image Upload**: You can now upload images directly or use URLs
2. **Debug Page**: Clean, professional design showing campaigns
3. **Campaign Creation**: Works perfectly with image support

## 🚀 How to Use

### Creating a Campaign

1. **Connect Wallet**: Click "Connect Pera Wallet" in top right
2. **Click "Create Campaign"**
3. **Fill the form**:
   - Title: Your campaign name
   - Description: What your campaign is about
   - Goal Amount: How much ALGO you need
   - Duration: How long the campaign runs
   - Category: Select appropriate category
   - **Image**: Either:
     - Click "Upload Image" to upload from your computer (JPG, PNG, GIF - Max 5MB)
     - OR enter an image URL
4. **Click "Launch Campaign"**
5. Campaign appears on Dashboard immediately!

### Viewing Campaigns

- **Dashboard**: See all campaigns
- **My Campaigns**: See only your campaigns
- **Debug Page**: Go to http://localhost:5173/debug to see system status

### Debug Page Features

Access at: `/debug`

- View wallet connection status
- See all campaigns with images
- Refresh data
- Clear all campaigns (for testing)
- Click any campaign to view details

## 📸 Image Upload

Two ways to add images:

### Option 1: Upload File
- Click "Upload Image" button
- Select image from your computer
- Supports: JPG, PNG, GIF
- Max size: 5MB
- Image preview shows immediately

### Option 2: Use URL
- Enter image URL in the text field
- Image from any website
- Preview shows when you enter URL

## 🐛 Debug Page

The debug page now looks professional:
- Clean card-based design
- Shows wallet status (connection, address, balance, App ID)
- Displays all campaigns with images
- Click campaigns to view details
- Refresh and Clear All buttons

## ✨ Features Working

✅ Campaign creation with image upload
✅ Image preview before submission
✅ URL-based images
✅ File upload (base64 storage)
✅ Professional debug page
✅ Campaign display with images
✅ Real-time updates
✅ Wallet integration

## 🎯 Testing

1. Start app: `npm run dev`
2. Login
3. Connect Pera Wallet
4. Create campaign with image
5. Check Dashboard - campaign appears with image
6. Go to `/debug` to see system status

## 💡 Tips

- Use high-quality images for better presentation
- Keep image size under 5MB for faster loading
- Use landscape images (16:9 ratio) for best display
- Test with both upload and URL methods
- Check Debug page if campaign doesn't appear

That's it! Campaign creation now works perfectly with image support.
