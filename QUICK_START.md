 # Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env and set your MongoDB URI
```

**Frontend (.env.local):**
```bash
cd frontend
cp .env.local.example .env.local
# Edit if your backend runs on a different port
```

### Step 3: Start MongoDB

Make sure MongoDB is running:
- Local: `mongod` (if installed locally)
- Or use MongoDB Atlas connection string in `.env`

### Step 4: Seed Database

```bash
cd backend
# Make sure jsondata.json is accessible (default: ../../Downloads/jsondata.json)
# Or set JSON_DATA_PATH in .env
npm run seed
```

### Step 5: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Open Browser

Navigate to: `http://localhost:3000`

## ✅ Verify Installation

1. Backend health check: `http://localhost:5000/health`
2. Frontend loads without errors
3. Dashboard displays data
4. Filters work correctly

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: Ensure IP is whitelisted

**Data Not Loading:**
- Run seed script: `npm run seed` in backend
- Check browser console for API errors
- Verify API URL in frontend `.env.local`

**Port Already in Use:**
- Change PORT in backend `.env`
- Update NEXT_PUBLIC_API_URL in frontend `.env.local`

## 📚 Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for testing
- Explore the codebase structure
- Customize charts and filters as needed
