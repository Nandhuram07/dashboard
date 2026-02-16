# Blackcoffer Data Visualization Dashboard

A modern, responsive data visualization dashboard built with Next.js, Node.js, TypeScript, and MongoDB. This application provides interactive charts and filters for analyzing Blackcoffer data insights.

## 🚀 Features

- **Interactive Visualizations**: Multiple chart types (Bar, Line, Pie, Area) using Recharts
- **Advanced Filtering**: Filter by Year, Topics, Sector, Region, PEST, Source, Country, and City
- **Real-time Statistics**: Dashboard stats cards showing key metrics
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Type Safety**: Full TypeScript implementation for both frontend and backend
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **RESTful API**: Clean API architecture with Express.js
- **MongoDB Integration**: Efficient data storage and querying

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher) - Local installation or MongoDB Atlas
- npm or yarn

## 🛠️ Installation

### 1. Clone or navigate to the project directory

```bash
cd blackcoffer-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blackcoffer
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Seed the Database

Make sure MongoDB is running, then:

```bash
cd ../backend
# Copy jsondata.json to backend directory or update the path in seed.ts
npm run seed
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
blackcoffer-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── scripts/         # Seeding scripts
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── charts/          # Chart components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── filters/         # Filter components
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                 # Utilities and API client
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🎨 Key Technologies

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Recharts** - Chart library
- **Axios** - HTTP client

## 📊 API Endpoints

- `GET /api/data` - Get filtered data with pagination
- `GET /api/stats` - Get dashboard statistics
- `GET /api/filter-options` - Get available filter options
- `GET /api/intensity-by-country` - Get intensity data by country
- `GET /api/likelihood-by-topic` - Get likelihood data by topic
- `GET /api/relevance-by-region` - Get relevance data by region
- `GET /api/year-distribution` - Get year distribution data

## 🧪 Testing Checklist

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for comprehensive testing guidelines.

## 📝 Development Notes

- The application follows modern coding standards and best practices
- Code is modular and reusable
- TypeScript ensures type safety throughout
- Responsive design works on mobile, tablet, and desktop
- Charts are interactive and update based on filters

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas connection string
- Verify the `MONGODB_URI` in `.env` file

### Port Already in Use
- Change the `PORT` in backend `.env` file
- Update `NEXT_PUBLIC_API_URL` in frontend `.env.local` accordingly

### Data Not Loading
- Check if database is seeded: `npm run seed` in backend directory
- Verify API is running and accessible
- Check browser console for errors

## 📄 License

This project is created for Blackcoffer assignment purposes.

## 👤 Author

Built with ❤️ for Blackcoffer Data Visualization Assignment
