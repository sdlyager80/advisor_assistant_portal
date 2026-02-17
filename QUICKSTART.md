# Quick Start Guide

Get the Advisor Assistant Portal running in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies

```bash
cd advisor-assistant-portal
npm install
```

### 2. Configure ServiceNow Connection

Edit `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'https://YOUR-INSTANCE.service-now.com',  // ← Change this
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### 3. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

## ✅ Verification Checklist

After starting the app, verify:

- [ ] Dashboard loads with 4 cards (Leads, Opportunities, Quotes, Recent)
- [ ] Can click cards to switch tabs
- [ ] Sample/mock data appears (or real data if ServiceNow is configured)
- [ ] No errors in browser console
- [ ] DXC logo appears in footer

## 🔧 Development Workflow

### Make Changes
```bash
# Components are in src/components/
# Styles are in corresponding .css files
# API calls are in src/services/serviceNowAPI.js
```

### Build for Production
```bash
npm run build
# Output is in dist/
```

### Preview Production Build
```bash
npm run preview
```

## 📦 Key Files

```
advisor-assistant-portal/
├── src/
│   ├── App.jsx                      ← Main application
│   ├── components/
│   │   ├── DashboardCards.jsx      ← Top summary cards
│   │   ├── LeadsTab.jsx            ← Leads management
│   │   ├── OpportunitiesTab.jsx    ← Opportunities
│   │   ├── QuotesTab.jsx           ← Quotes
│   │   └── RecentTab.jsx           ← Recent activity
│   └── services/
│       └── serviceNowAPI.js        ← ServiceNow integration
├── vite.config.js                  ← Build & proxy config
└── package.json                    ← Dependencies
```

## 🎨 Customization Quick Tips

### Change Colors

Edit `src/App.css`:
```css
:root {
  --primary-color: #1B75BB;      ← Main brand color
  --secondary-color: #00ADEE;    ← Accent color
  /* ... */
}
```

### Change Logo

Replace `src/assets/DXCHorizontalTaglineFullColorDark.png`

### Add New Tab

1. Create component: `src/components/NewTab.jsx`
2. Add to `App.jsx` tabs array
3. Add case in `renderTabContent()`

## 🐛 Common Issues & Fixes

### Issue: "Cannot find module '@dxc-technology/halstack-react'"
```bash
# Solution:
npm install --force
```

### Issue: CORS errors with ServiceNow
```bash
# Solution 1: Use proxy (already configured in vite.config.js)
# Solution 2: Configure CORS on ServiceNow (see SERVICENOW_INTEGRATION.md)
```

### Issue: No data appears
```bash
# The app will load mock data if ServiceNow connection fails
# Check browser console for specific errors
# Verify ServiceNow REST API is accessible
```

### Issue: Build fails
```bash
# Clear cache and reinstall:
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📖 Next Steps

1. **Read README.md** - Full documentation
2. **Read SERVICENOW_INTEGRATION.md** - ServiceNow setup guide
3. **Configure ServiceNow tables** - Create custom tables
4. **Test with real data** - Connect to your ServiceNow instance
5. **Customize branding** - Update colors and logo
6. **Deploy** - Build and deploy to production

## 💡 Pro Tips

1. **Use Mock Data First**
   - The app automatically loads mock data if ServiceNow fails
   - Great for testing UI changes without ServiceNow access

2. **Hot Module Replacement**
   - Changes auto-reload in dev mode
   - No need to refresh browser

3. **Browser DevTools**
   - React DevTools extension is helpful
   - Check Network tab for API calls

4. **Component Reusability**
   - LeadCard, OpportunityCard follow similar patterns
   - Easy to add new card types

5. **Halstack Documentation**
   - Visit https://developer.dxc.com/halstack
   - Explore all available components

## 🆘 Need Help?

- Check browser console for errors
- Review ServiceNow REST API Explorer
- Verify table names and field names match
- Test API endpoints with curl or Postman
- Check ServiceNow ACLs and permissions

## 📚 Resources

- **Halstack**: https://developer.dxc.com/halstack
- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **ServiceNow REST API**: https://docs.servicenow.com/

## 🎯 Feature Roadmap Ideas

Want to extend the portal? Consider adding:

- [ ] Advanced search and filtering
- [ ] Bulk operations (import/export)
- [ ] Real-time notifications
- [ ] Charts and analytics dashboard
- [ ] Email integration
- [ ] Calendar integration
- [ ] Mobile-optimized views
- [ ] Offline support
- [ ] Voice commands
- [ ] Data-driven recommendations
- [ ] Document management
- [ ] Task automation workflows

---

**Ready to build something amazing? Start coding! 🚀**
