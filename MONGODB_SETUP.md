# MongoDB Setup Guide - Step by Step Instructions

This guide will walk you through setting up MongoDB for the Blackcoffer Dashboard project. You can choose between **local installation** or **MongoDB Atlas (cloud)**.

---

## 📋 Table of Contents

1. [Option 1: Local MongoDB Installation (Windows)](#option-1-local-mongodb-installation-windows)
2. [Option 2: MongoDB Atlas (Cloud)](#option-2-mongodb-atlas-cloud)
3. [Configure Your Project](#configure-your-project)
4. [Verify MongoDB Connection](#verify-mongodb-connection)
5. [Troubleshooting](#troubleshooting)

---

## Option 1: Local MongoDB Installation (Windows)

### Step 1: Download MongoDB Community Server

1. Visit the MongoDB download page: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest stable version (recommended: 7.0 or higher)
   - **Platform**: Windows
   - **Package**: MSI (recommended) or ZIP
3. Click **Download**

### Step 2: Install MongoDB

1. **Run the installer** (MSI file you downloaded)
2. **Choose Setup Type**: Select "Complete" installation
3. **Service Configuration**:
   - ✅ Check "Install MongoDB as a Service"
   - Select "Run service as Network Service user" (default)
   - Service Name: `MongoDB` (default)
   - ✅ Check "Run service automatically"
4. **Install MongoDB Compass** (optional but recommended):
   - ✅ Check "Install MongoDB Compass" - This is a GUI tool to view your database
5. Click **Install** and wait for installation to complete
6. Click **Finish**

### Step 3: Verify MongoDB Installation

1. **Open Command Prompt or PowerShell** (Run as Administrator)
2. **Check if MongoDB service is running**:
   ```powershell
   Get-Service MongoDB
   ```
   You should see status as "Running"

3. **Test MongoDB connection**:
   ```powershell
   mongosh
   ```
   If successful, you'll see the MongoDB shell prompt: `test>`

4. **Exit MongoDB shell**:
   ```powershell
   exit
   ```

### Step 4: Start MongoDB Service (if not running)

If MongoDB service is not running, start it:

**Using PowerShell (Run as Administrator)**:
```powershell
Start-Service MongoDB
```

**Or using Services GUI**:
1. Press `Win + R`, type `services.msc`, press Enter
2. Find "MongoDB" service
3. Right-click → **Start**

### Step 5: Verify MongoDB is Listening on Default Port

MongoDB runs on port `27017` by default. Verify it's accessible:

```powershell
netstat -an | findstr 27017
```

You should see `LISTENING` status for port 27017.

---

## Option 2: MongoDB Atlas (Cloud)

MongoDB Atlas is a cloud-hosted MongoDB service - perfect if you don't want to install MongoDB locally.

### Step 1: Create MongoDB Atlas Account

1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email or use Google/GitHub account
3. Verify your email if required

### Step 2: Create a Free Cluster

1. **After login**, click **"Build a Database"** or **"Create"** → **"Database"**
2. **Choose a deployment option**:
   - Select **"M0 FREE"** (Free tier - perfect for development)
   - Click **"Create"**
3. **Cloud Provider & Region**:
   - Choose a provider (AWS, Google Cloud, or Azure)
   - Select a region closest to you
   - Click **"Create Cluster"**
4. **Wait for cluster creation** (takes 3-5 minutes)

### Step 3: Create Database User

1. **Set up authentication**:
   - Username: Create a username (e.g., `blackcoffer_user`)
   - Password: Create a strong password (save it securely!)
   - Click **"Create Database User"**

### Step 4: Configure Network Access

1. **Add IP Address**:
   - Click **"Add IP Address"**
   - For development, click **"Add Current IP Address"**
   - Or click **"Allow Access from Anywhere"** (0.0.0.0/0) - ⚠️ Only for development!
   - Click **"Finish and Close"**

### Step 5: Get Connection String

1. **Click "Connect"** button on your cluster
2. **Choose "Connect your application"**
3. **Select driver**: `Node.js` and version `5.5 or later`
4. **Copy the connection string** - It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<username>` and `<password>`** with your database user credentials
6. **Add database name** at the end (before `?`):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blackcoffer?retryWrites=true&w=majority
   ```
7. **Save this connection string** - You'll need it in the next step!

---

## Configure Your Project

### Step 1: Navigate to Backend Directory

```powershell
cd backend
```

### Step 2: Create or Update .env File

1. **Check if `.env` file exists**:
   ```powershell
   Test-Path .env
   ```

2. **If it doesn't exist, create it from the example**:
   ```powershell
   Copy-Item .env.example .env
   ```

3. **Open `.env` file** in your text editor (VS Code, Notepad++, etc.)

### Step 3: Configure MongoDB URI

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blackcoffer
NODE_ENV=development
JSON_DATA_PATH=../../Downloads/jsondata.json
```

**For MongoDB Atlas:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blackcoffer?retryWrites=true&w=majority
NODE_ENV=development
JSON_DATA_PATH=../../Downloads/jsondata.json
```

**Important Notes:**
- Replace `username` and `password` with your actual MongoDB Atlas credentials
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- The database name `blackcoffer` will be created automatically if it doesn't exist

### Step 4: Save the .env File

Save and close the `.env` file.

---

## Verify MongoDB Connection

### Step 1: Test Connection with Seed Script

The easiest way to verify your MongoDB connection is to run the seed script:

```powershell
cd backend
npm run seed
```

**Expected Output (Success):**
```
✅ Connected to MongoDB
🗑️  Cleared existing data
📂 Reading data from: [path]
📊 Found [number] records to import
✅ Inserted batch 1/X
...
🎉 Successfully seeded [number] records
```

**If you see errors**, check the [Troubleshooting](#troubleshooting) section below.

### Step 2: Test Connection by Starting Backend Server

```powershell
cd backend
npm run dev
```

**Expected Output (Success):**
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 3: Verify Database Creation (Optional)

**Using MongoDB Compass (if installed locally):**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see `blackcoffer` database in the list
4. Click on it to see collections and data

**Using MongoDB Shell (mongosh):**
```powershell
mongosh
use blackcoffer
show collections
db.datapoints.countDocuments()
exit
```

**For MongoDB Atlas:**
1. Go to MongoDB Atlas dashboard
2. Click on your cluster
3. Click **"Browse Collections"**
4. You should see `blackcoffer` database with `datapoints` collection

---

## Troubleshooting

### ❌ Error: "MongoDB connection error"

**Possible Causes & Solutions:**

1. **MongoDB service not running (Local)**:
   ```powershell
   # Check service status
   Get-Service MongoDB
   
   # Start service if stopped
   Start-Service MongoDB
   ```

2. **Wrong connection string**:
   - Verify `MONGODB_URI` in `.env` file
   - For local: `mongodb://localhost:27017/blackcoffer`
   - For Atlas: Ensure username, password, and cluster URL are correct

3. **Firewall blocking connection**:
   - Windows Firewall might be blocking MongoDB
   - Add exception for port 27017 or disable firewall temporarily for testing

4. **MongoDB Atlas IP not whitelisted**:
   - Go to Atlas dashboard → Network Access
   - Add your current IP address
   - Wait 1-2 minutes for changes to take effect

### ❌ Error: "Authentication failed" (MongoDB Atlas)

**Solutions:**
- Verify username and password in connection string
- Ensure special characters in password are URL-encoded (e.g., `@` becomes `%40`)
- Check if database user exists in Atlas dashboard

### ❌ Error: "ECONNREFUSED" or "Connection refused"

**Solutions:**
- MongoDB service is not running (local)
- Wrong port number (should be 27017 for local)
- MongoDB not installed correctly

### ❌ Error: "Cannot find module 'mongoose'"

**Solution:**
```powershell
cd backend
npm install
```

### ❌ Error: "Port 27017 already in use"

**Solutions:**
- Another MongoDB instance might be running
- Check running processes:
  ```powershell
  Get-Process | Where-Object {$_.ProcessName -like "*mongo*"}
  ```
- Stop other MongoDB instances or change MongoDB port

### ❌ Seed Script: "Could not find jsondata.json"

**Solutions:**
1. Ensure `jsondata.json` file exists in one of these locations:
   - `C:\Users\[YourUsername]\Downloads\jsondata.json`
   - `backend\jsondata.json`
   - Or set `JSON_DATA_PATH` in `.env` to the correct path

2. Update `.env` file:
   ```env
   JSON_DATA_PATH=C:\full\path\to\jsondata.json
   ```

### ✅ Verify MongoDB is Running (Local)

```powershell
# Check service status
Get-Service MongoDB

# Check if port is listening
netstat -an | findstr 27017

# Test connection
mongosh
```

### ✅ Test Connection String Manually

**For Local MongoDB:**
```powershell
mongosh "mongodb://localhost:27017/blackcoffer"
```

**For MongoDB Atlas:**
```powershell
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blackcoffer"
```

---

## Quick Reference

### Local MongoDB Commands

```powershell
# Start MongoDB service
Start-Service MongoDB

# Stop MongoDB service
Stop-Service MongoDB

# Restart MongoDB service
Restart-Service MongoDB

# Check MongoDB service status
Get-Service MongoDB

# Connect to MongoDB shell
mongosh

# Connect to specific database
mongosh mongodb://localhost:27017/blackcoffer
```

### Environment Variables

**Backend `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blackcoffer  # Local
# OR
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blackcoffer  # Atlas
NODE_ENV=development
JSON_DATA_PATH=../../Downloads/jsondata.json
```

---

## Next Steps

After successfully setting up MongoDB:

1. ✅ **Seed the database**: `npm run seed` (in backend directory)
2. ✅ **Start backend server**: `npm run dev` (in backend directory)
3. ✅ **Start frontend**: `npm run dev` (in frontend directory)
4. ✅ **Open browser**: Navigate to `http://localhost:3000`

---

## Additional Resources

- **MongoDB Documentation**: https://docs.mongodb.com/
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com/
- **Mongoose Documentation**: https://mongoosejs.com/docs/
- **MongoDB Compass**: https://www.mongodb.com/products/compass

---

## Summary Checklist

- [ ] MongoDB installed (local) OR MongoDB Atlas account created (cloud)
- [ ] MongoDB service running (local) OR Cluster created (Atlas)
- [ ] Database user created (Atlas only)
- [ ] IP address whitelisted (Atlas only)
- [ ] Connection string obtained and configured
- [ ] `.env` file created/updated with `MONGODB_URI`
- [ ] Connection verified with `npm run seed` or `npm run dev`
- [ ] Database seeded successfully
- [ ] Backend server starts without errors

---

**Need Help?** If you encounter any issues not covered here, check the project's [README.md](./README.md) or [QUICK_START.md](./QUICK_START.md) for additional guidance.
