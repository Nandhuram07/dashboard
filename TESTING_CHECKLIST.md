# Testing Checklist - Blackcoffer Dashboard

Use this checklist to thoroughly test the application before deployment.

## ✅ Pre-Installation Checks

- [ ] Node.js (v18+) is installed
- [ ] MongoDB is installed and running (or MongoDB Atlas account is set up)
- [ ] npm or yarn is available
- [ ] jsondata.json file is accessible

## ✅ Backend Setup & Configuration

- [ ] Backend dependencies installed (`npm install` in backend directory)
- [ ] `.env` file created with correct MongoDB URI
- [ ] MongoDB connection successful
- [ ] Database seeded successfully (`npm run seed`)
- [ ] Backend server starts without errors (`npm run dev`)
- [ ] Backend API is accessible at `http://localhost:5000`
- [ ] Health check endpoint works (`GET /health`)

## ✅ Frontend Setup & Configuration

- [ ] Frontend dependencies installed (`npm install` in frontend directory)
- [ ] `.env.local` file created with correct API URL
- [ ] Frontend server starts without errors (`npm run dev`)
- [ ] Frontend is accessible at `http://localhost:3000`
- [ ] No console errors on initial load

## ✅ Database & Data Verification

- [ ] Data successfully imported to MongoDB
- [ ] Data count matches expected number of records
- [ ] All required fields are present in database
- [ ] Indexes are created for performance

## ✅ API Endpoints Testing

### Data Endpoints
- [ ] `GET /api/data` returns data without filters
- [ ] `GET /api/data` works with pagination
- [ ] `GET /api/data` filters by endYear correctly
- [ ] `GET /api/data` filters by topics correctly
- [ ] `GET /api/data` filters by sector correctly
- [ ] `GET /api/data` filters by region correctly
- [ ] `GET /api/data` filters by pestle correctly
- [ ] `GET /api/data` filters by source correctly
- [ ] `GET /api/data` filters by country correctly
- [ ] `GET /api/data` filters by city correctly
- [ ] `GET /api/data` handles multiple filters correctly
- [ ] `GET /api/stats` returns correct statistics
- [ ] `GET /api/stats` updates with filters applied
- [ ] `GET /api/filter-options` returns all filter options
- [ ] `GET /api/intensity-by-country` returns data
- [ ] `GET /api/likelihood-by-topic` returns data
- [ ] `GET /api/relevance-by-region` returns data
- [ ] `GET /api/year-distribution` returns data

## ✅ Frontend Components Testing

### Dashboard Layout
- [ ] Header displays correctly
- [ ] Footer displays correctly
- [ ] Loading states work properly
- [ ] Error states are handled gracefully

### Stats Cards
- [ ] All 4 stats cards display
- [ ] Stats values are correct
- [ ] Stats update when filters are applied
- [ ] Loading state shows during data fetch

### Filter Panel
- [ ] Filter panel is visible and accessible
- [ ] End Year filter works
- [ ] Topics filter allows multiple selections
- [ ] Sector filter allows multiple selections
- [ ] Region filter allows multiple selections
- [ ] PEST filter allows multiple selections
- [ ] Source filter allows multiple selections
- [ ] Country filter allows multiple selections
- [ ] City filter allows multiple selections
- [ ] Active filters display as badges
- [ ] Filters can be removed individually
- [ ] "Apply Filters" button works
- [ ] "Clear All" button clears all filters
- [ ] Filter panel is sticky on scroll (desktop)

### Charts
- [ ] Intensity by Country chart displays
- [ ] Likelihood by Topic chart displays
- [ ] Relevance by Region chart displays
- [ ] Year Distribution chart displays
- [ ] Charts update when filters are applied
- [ ] Charts show loading states
- [ ] Charts handle empty data gracefully
- [ ] Charts are interactive (tooltips, legends)
- [ ] Charts are responsive (mobile, tablet, desktop)

## ✅ Responsive Design Testing

### Mobile (320px - 768px)
- [ ] Layout stacks vertically on mobile
- [ ] Filter panel is accessible
- [ ] Charts are readable and not cut off
- [ ] Stats cards stack properly
- [ ] Navigation is usable
- [ ] Text is readable without zooming
- [ ] Touch targets are appropriately sized

### Tablet (768px - 1024px)
- [ ] Layout adapts to tablet size
- [ ] Charts display in appropriate grid
- [ ] Filter panel is accessible
- [ ] Stats cards display in grid

### Desktop (1024px+)
- [ ] Full layout displays correctly
- [ ] Filter panel is in sidebar
- [ ] Charts display in grid layout
- [ ] Stats cards display in row
- [ ] Hover states work correctly

## ✅ Functionality Testing

### Filter Functionality
- [ ] Single filter works correctly
- [ ] Multiple filters work together
- [ ] Filter combinations produce expected results
- [ ] Clearing filters resets dashboard
- [ ] Filter badges show active filters
- [ ] Removing filter badge updates dashboard

### Data Display
- [ ] Dashboard loads with all data
- [ ] Stats reflect filtered data
- [ ] Charts reflect filtered data
- [ ] Data updates in real-time when filters change
- [ ] No data state is handled gracefully

### Performance
- [ ] Initial page load is fast (< 3 seconds)
- [ ] Filter changes respond quickly (< 1 second)
- [ ] Charts render smoothly
- [ ] No memory leaks during extended use
- [ ] Large datasets are handled efficiently

## ✅ Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## ✅ Error Handling

- [ ] API errors are handled gracefully
- [ ] Network errors show appropriate messages
- [ ] Invalid filter values are handled
- [ ] Empty results show appropriate messages
- [ ] Console shows no critical errors

## ✅ Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (if applicable)
- [ ] Color contrast is sufficient
- [ ] Focus states are visible
- [ ] Alt text for images/icons (if any)

## ✅ Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Code follows project conventions
- [ ] Components are reusable
- [ ] No console warnings (in production build)

## ✅ Production Build

- [ ] Backend builds successfully (`npm run build`)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Production build runs without errors
- [ ] Environment variables are set correctly
- [ ] API endpoints work in production mode

## 📝 Notes

- Test with actual data from jsondata.json
- Verify all filter combinations
- Check performance with full dataset
- Test on multiple devices and browsers
- Document any issues found

## 🐛 Known Issues

_List any known issues or limitations here_

---

**Last Updated**: January 2026
**Tested By**: [Your Name]
**Status**: ⬜ Not Started | 🟡 In Progress | ✅ Complete
