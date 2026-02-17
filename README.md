# Advisor Assistant Portal

A modern React-based portal for the Advisor Assistant application, built with Halstack (DXC Design System) for seamless ServiceNow integration.

## Overview

The Advisor Assistant is a suite of Advanced Apps that provides insurance advisors, producers, and field managers with a data-driven daily workbench. This React portal recreates the ServiceNow Service Portal widget functionality with a modern, responsive interface using Halstack components.

## Features

### Core Modules

- **Leads Management** - Track and manage insurance leads with stage progression
- **Opportunities** - Manage sales opportunities through the sales cycle
- **Quotes** - View and manage insurance quotes
- **Recent Activity** - Quick access to recent items and activities

### Key Capabilities

- ✅ Real-time ServiceNow data integration via REST API
- ✅ Interactive dashboard cards with click-to-filter
- ✅ Stage progression tracking with visual indicators
- ✅ Advanced filtering and pagination
- ✅ Modal-based record viewing and editing
- ✅ Responsive design for mobile and desktop
- ✅ Dark mode ready
- ✅ DXC Technology branding ("Powered by" footer)

## Technology Stack

- **React 18** - Modern React with hooks
- **Halstack React** - DXC Design System components
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for ServiceNow API calls
- **Font Awesome** - Icon library
- **Date-fns** - Date formatting utilities

## Prerequisites

- Node.js 18+ and npm
- ServiceNow instance with REST API access
- ServiceNow tables configured:
  - `x_dxc_advisor_lead`
  - `x_dxc_advisor_opportunity`
  - `x_dxc_advisor_quote`

## Installation

1. **Clone or extract the project**
   ```bash
   cd advisor-assistant-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure ServiceNow connection**
   
   Edit `vite.config.js` and update the proxy target:
   ```javascript
   proxy: {
     '/api': {
       target: 'https://YOUR-INSTANCE.service-now.com',
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/api/, '')
     }
   }
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:3000`

## ServiceNow Integration

### Authentication

The application uses ServiceNow session-based authentication via cookies. Users must be logged into ServiceNow before accessing the portal.

### REST API Endpoints

The portal expects the following ServiceNow REST API endpoints:

#### Leads
- `GET /api/now/table/x_dxc_advisor_lead` - Fetch all leads
- `POST /api/now/table/x_dxc_advisor_lead` - Create a new lead
- `PATCH /api/now/table/x_dxc_advisor_lead/{sys_id}` - Update a lead

#### Opportunities
- `GET /api/now/table/x_dxc_advisor_opportunity` - Fetch all opportunities
- `POST /api/now/table/x_dxc_advisor_opportunity` - Create an opportunity
- `PATCH /api/now/table/x_dxc_advisor_opportunity/{sys_id}` - Update an opportunity

#### Quotes
- `GET /api/now/table/x_dxc_advisor_quote` - Fetch all quotes
- `PATCH /api/now/table/x_dxc_advisor_quote/{sys_id}` - Update a quote

#### Recent Items
- `GET /api/now/table/sys_ui_list_recent` - Fetch recent activity

### Table Schema

#### Lead Table (x_dxc_advisor_lead)
```
- sys_id (String, Primary Key)
- number (String, Unique)
- first_name (String)
- last_name (String)
- company (String)
- email (Email)
- business_phone (Phone)
- lead_type (Choice: New Business, Existing Business)
- lead_rating (Choice: Cold, Warm, Hot, Super Hot)
- stage (Choice: New, Contacted, Nurturing, Qualified, Disqualified)
- industry (String)
```

#### Opportunity Table (x_dxc_advisor_opportunity)
```
- sys_id (String, Primary Key)
- number (String, Unique)
- consumer (String)
- short_description (String)
- amount (Currency)
- industry (String)
- rating (Choice: High, Medium, Low)
- stage (Choice: Qualify, Develop, Propose, Negotiate, Closed)
- sales_cycle_type (String)
```

#### Quote Table (x_dxc_advisor_quote)
```
- sys_id (String, Primary Key)
- number (String, Unique)
- description (String)
- amount (Currency)
- status (Choice: Draft, Pending, Approved, Rejected)
- valid_until (Date)
```

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deployment Options

#### Option 1: ServiceNow Service Portal Widget

1. Build the application (`npm run build`)
2. Create a new Service Portal widget in ServiceNow
3. Copy the contents of `dist/index.html` to the widget's HTML template
4. Upload CSS and JS files as attachments or inline them
5. Configure the widget in your Service Portal

#### Option 2: Standalone Web Server

Deploy the `dist` folder to any web server (Apache, Nginx, etc.) with proper CORS configuration for ServiceNow API access.

#### Option 3: ServiceNow UI Builder

1. Build the application
2. Create a new UI Builder experience
3. Import the built assets
4. Configure authentication and API access

### CORS Configuration

If deploying separately from ServiceNow, configure CORS on your ServiceNow instance:

1. Navigate to **System Properties > Security**
2. Add your portal domain to **CORS Rules**
3. Enable REST API access for external domains

## Project Structure

```
advisor-assistant-portal/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and media
│   │   └── DXCHorizontalTaglineFullColorDark.png
│   ├── components/           # React components
│   │   ├── DashboardCards.jsx
│   │   ├── DashboardCards.css
│   │   ├── LeadsTab.jsx
│   │   ├── LeadsTab.css
│   │   ├── LeadCard.jsx
│   │   ├── LeadCard.css
│   │   ├── LeadModal.jsx
│   │   ├── LeadModal.css
│   │   ├── OpportunitiesTab.jsx
│   │   ├── OpportunitiesTab.css
│   │   ├── QuotesTab.jsx
│   │   ├── QuotesTab.css
│   │   ├── RecentTab.jsx
│   │   └── RecentTab.css
│   ├── services/             # API services
│   │   └── serviceNowAPI.js
│   ├── App.jsx               # Main application
│   ├── App.css               # Global styles
│   └── main.jsx              # Entry point
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## Customization

### Branding

The DXC Technology logo appears in the "Powered by" footer. To customize:

1. Replace `src/assets/DXCHorizontalTaglineFullColorDark.png` with your logo
2. Update the footer section in `src/App.jsx`

### Color Scheme

The application uses the following color palette (from the original widget):

- **Midnight Blue**: #0E1020
- **Peach**: #FFC982
- **Sky**: #A1E6FF
- **True Blue**: #4995FF
- **Melon**: #FF7E51
- **Royal**: #004AAC
- **Gold**: #FFAE41
- **Red**: #D14600

Update colors in `src/App.css` under the `:root` selector.

### Adding New Features

1. Create new components in `src/components/`
2. Add corresponding styles in component CSS files
3. Update `src/services/serviceNowAPI.js` for new API calls
4. Import and use in `src/App.jsx`

## Troubleshooting

### CORS Errors

**Issue**: Browser blocks API requests
**Solution**: Configure CORS on ServiceNow or use proxy configuration in `vite.config.js`

### Authentication Issues

**Issue**: 401 Unauthorized errors
**Solution**: Ensure user is logged into ServiceNow. The portal uses session cookies for authentication.

### Data Not Loading

**Issue**: No data appears in the portal
**Solution**: 
1. Check ServiceNow table names match configuration
2. Verify REST API is enabled
3. Check browser console for errors
4. Use mock data (see `loadMockData()` in `App.jsx`) for testing

## Development

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues or questions:
- Check ServiceNow documentation for API details
- Review Halstack documentation: https://developer.dxc.com/halstack
- Contact your ServiceNow administrator for instance-specific configuration

## License

Copyright © 2025 DXC Technology. All rights reserved.

## Version History

### v1.0.0 (Current)
- Initial release
- Leads, Opportunities, Quotes, and Recent tabs
- ServiceNow REST API integration
- Halstack design system integration
- Responsive design
- Stage progression tracking
- Modal-based editing
- DXC Technology branding
