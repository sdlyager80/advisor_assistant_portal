# ServiceNow Integration Guide

This guide provides step-by-step instructions for integrating the Advisor Assistant React Portal with ServiceNow.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [ServiceNow Configuration](#servicenow-configuration)
3. [Table Setup](#table-setup)
4. [REST API Configuration](#rest-api-configuration)
5. [Security Configuration](#security-configuration)
6. [Deployment Methods](#deployment-methods)
7. [Testing](#testing)

## Prerequisites

- ServiceNow instance (any edition)
- Administrator access to ServiceNow
- Knowledge of ServiceNow tables and REST API
- Completed React portal build

## ServiceNow Configuration

### 1. Create Custom Tables

#### Create Lead Table

1. Navigate to **System Definition > Tables**
2. Click **New**
3. Configure the table:
   - **Label**: Advisor Lead
   - **Name**: x_dxc_advisor_lead
   - **Extends table**: Task [task] (optional)
   - **Create module**: Yes

4. Add the following columns:

| Column Label | Column Name | Type | Max Length | Mandatory |
|-------------|-------------|------|------------|-----------|
| Number | number | String | 40 | Yes |
| First Name | first_name | String | 100 | Yes |
| Last Name | last_name | String | 100 | Yes |
| Company | company | String | 100 | No |
| Email | email | Email | 100 | Yes |
| Business Phone | business_phone | Phone Number | 40 | No |
| Lead Type | lead_type | Choice | - | No |
| Lead Rating | lead_rating | Choice | - | No |
| Stage | stage | Choice | - | Yes |
| Industry | industry | String | 100 | No |

5. Configure Choice Lists:

**Lead Type Choices:**
- New Business
- Existing Business

**Lead Rating Choices:**
- Cold
- Warm
- Hot
- Super Hot

**Stage Choices:**
- New (default)
- Contacted
- Nurturing
- Qualified
- Disqualified

#### Create Opportunity Table

1. Navigate to **System Definition > Tables**
2. Click **New**
3. Configure:
   - **Label**: Advisor Opportunity
   - **Name**: x_dxc_advisor_opportunity

4. Add columns:

| Column Label | Column Name | Type | Max Length | Mandatory |
|-------------|-------------|------|------------|-----------|
| Number | number | String | 40 | Yes |
| Consumer | consumer | String | 100 | Yes |
| Short Description | short_description | String | 200 | No |
| Amount | amount | Currency | - | No |
| Industry | industry | String | 100 | No |
| Rating | rating | Choice | - | No |
| Stage | stage | Choice | - | Yes |
| Sales Cycle Type | sales_cycle_type | String | 50 | No |

5. Configure Choice Lists:

**Rating Choices:**
- High
- Medium
- Low

**Stage Choices:**
- Qualify (default)
- Develop
- Propose
- Negotiate
- Closed

#### Create Quote Table

1. Navigate to **System Definition > Tables**
2. Click **New**
3. Configure:
   - **Label**: Advisor Quote
   - **Name**: x_dxc_advisor_quote

4. Add columns:

| Column Label | Column Name | Type | Max Length | Mandatory |
|-------------|-------------|------|------------|-----------|
| Number | number | String | 40 | Yes |
| Description | description | String | 200 | Yes |
| Amount | amount | Currency | - | No |
| Status | status | Choice | - | Yes |
| Valid Until | valid_until | Date | - | No |

5. Configure Choice Lists:

**Status Choices:**
- Draft
- Pending (default)
- Approved
- Rejected

### 2. Create Business Rules for Number Generation

For each table, create a business rule to auto-generate the number field:

1. Navigate to **System Definition > Business Rules**
2. Click **New**
3. Configure:
   - **Name**: Generate [Table] Number
   - **Table**: [Your table]
   - **When**: before, insert
   - **Active**: Yes

4. In the Script field:

```javascript
(function executeRule(current, previous /*null when async*/) {
    if (!current.number) {
        var gr = new GlideRecord('x_dxc_advisor_lead'); // Change table name
        gr.orderByDesc('number');
        gr.setLimit(1);
        gr.query();
        
        var prefix = 'LEAD'; // Change prefix: LEAD, OPP, QTE
        var nextNum = 1;
        
        if (gr.next()) {
            var lastNum = parseInt(gr.number.substring(prefix.length));
            nextNum = lastNum + 1;
        }
        
        current.number = prefix + ('0000' + nextNum).slice(-4);
    }
})(current, previous);
```

## REST API Configuration

### 1. Enable REST API Access

1. Navigate to **System Web Services > REST > REST API Explorer**
2. Verify REST API is enabled
3. Test endpoints using the API Explorer

### 2. Configure ACLs (Access Control Lists)

For each table, configure appropriate ACLs:

1. Navigate to **System Security > Access Control (ACL)**
2. Create ACLs for each table and operation:

**Read Access:**
- **Type**: record
- **Operation**: read
- **Name**: x_dxc_advisor_lead.*
- **Requires role**: user (or custom role)

**Create Access:**
- **Type**: record
- **Operation**: create
- **Name**: x_dxc_advisor_lead
- **Requires role**: user (or custom role)

**Write/Update Access:**
- **Type**: record
- **Operation**: write
- **Name**: x_dxc_advisor_lead.*
- **Requires role**: user (or custom role)

Repeat for opportunity and quote tables.

### 3. Create REST API Integration User (Optional)

For dedicated API access:

1. Navigate to **User Administration > Users**
2. Create a new user:
   - **User ID**: advisor_api
   - **Active**: Yes
3. Assign appropriate roles:
   - rest_service
   - x_dxc_advisor_user (custom role)

## Security Configuration

### 1. CORS Configuration

If the React portal is hosted separately from ServiceNow:

1. Navigate to **System Properties > Security**
2. Enable CORS:
   - **Property**: glide.rest.outbound.ecc_queue.skip_authentication
   - **Value**: true (for development only)

3. Add CORS rules:
   ```
   Navigate to System Web Services > REST > CORS Rules
   Click New
   ```
   
   Configure:
   - **Name**: Advisor Portal CORS
   - **REST API**: All
   - **Domain**: https://your-portal-domain.com
   - **Max age**: 3600
   - **HTTP methods**: GET, POST, PUT, PATCH, DELETE, OPTIONS

### 2. API Authentication

Choose one of the following methods:

#### Session-Based (Recommended for same-domain deployment)
- Users must be logged into ServiceNow
- Portal uses session cookies automatically
- No additional configuration needed

#### OAuth 2.0
1. Navigate to **System OAuth > Application Registry**
2. Click **New**
3. Select **Create an OAuth API endpoint for external clients**
4. Configure:
   - **Name**: Advisor Portal OAuth
   - **Client ID**: (auto-generated)
   - **Client Secret**: (auto-generated)
   - **Redirect URL**: https://your-portal-domain.com/callback
   - **Accessible from**: All application scopes

5. Update React portal to use OAuth flow

#### Basic Authentication (Not recommended for production)
- Configure in API requests
- Use encrypted credentials
- Implement proper credential management

## Deployment Methods

### Method 1: Service Portal Widget

1. **Create Service Portal Widget**
   ```
   Navigate to Service Portal > Widgets
   Click New
   ```

2. **Configure Widget:**
   - **Name**: Advisor Assistant
   - **ID**: advisor_assistant
   - **Description**: Data-driven advisor workbench

3. **Add HTML Template:**
   - Copy contents from `dist/index.html`
   - Paste into HTML template field

4. **Add CSS:**
   - Copy all CSS from build
   - Paste into CSS field
   - Or upload as attachments

5. **Add Client Script:**
   - Copy JavaScript from build
   - Paste into Client Controller
   - Update API endpoints to use ServiceNow REST API format

6. **Add to Service Portal Page:**
   ```
   Navigate to Service Portal > Pages
   Select or create a page
   Add the Advisor Assistant widget
   ```

### Method 2: UI Builder Page

1. **Create UI Builder Experience**
   ```
   Navigate to UI Builder
   Click Create new experience
   ```

2. **Import React Components:**
   - Upload built assets
   - Configure component mapping
   - Set up data sources

3. **Configure Data Sources:**
   - Add REST data sources
   - Map to advisor tables
   - Configure authentication

### Method 3: External Hosting with iFrame

1. **Host React App:**
   - Deploy to web server
   - Configure HTTPS
   - Set up proper CORS

2. **Create ServiceNow Page:**
   ```
   Navigate to Service Portal > Pages
   Create new page
   Add HTML widget with iframe
   ```

3. **Configure iFrame:**
   ```html
   <iframe 
     src="https://your-portal-domain.com" 
     width="100%" 
     height="800px"
     frameborder="0"
     allow="fullscreen"
   ></iframe>
   ```

## Testing

### 1. REST API Testing

Use ServiceNow REST API Explorer:

```
Navigate to System Web Services > REST > REST API Explorer

Test each endpoint:
- GET /api/now/table/x_dxc_advisor_lead
- POST /api/now/table/x_dxc_advisor_lead
- PATCH /api/now/table/x_dxc_advisor_lead/{sys_id}
```

### 2. Create Test Data

Create sample records in each table:

**Leads:**
```javascript
var lead = new GlideRecord('x_dxc_advisor_lead');
lead.initialize();
lead.first_name = 'John';
lead.last_name = 'Smith';
lead.email = 'john.smith@example.com';
lead.company = 'ABC Insurance';
lead.stage = 'New';
lead.lead_rating = 'Hot';
lead.lead_type = 'New Business';
lead.insert();
```

### 3. Portal Testing Checklist

- [ ] Can view leads list
- [ ] Can filter leads by stage
- [ ] Can open lead detail modal
- [ ] Can edit and save lead
- [ ] Pagination works correctly
- [ ] Stage progress bar displays correctly
- [ ] Can view opportunities
- [ ] Can view quotes
- [ ] Recent items display
- [ ] Dashboard cards show correct counts
- [ ] Tab switching works smoothly
- [ ] Responsive design works on mobile

### 4. Performance Testing

Monitor:
- API response times
- Page load times
- Browser console for errors
- Network requests
- ServiceNow system logs

## Troubleshooting

### Common Issues

**Issue: 403 Forbidden**
- Solution: Check ACLs, ensure user has proper roles

**Issue: CORS errors**
- Solution: Add CORS rule for your domain

**Issue: Authentication failed**
- Solution: Verify session is active or OAuth configuration

**Issue: Table not found**
- Solution: Verify table names match exactly

**Issue: No data returned**
- Solution: Check table has records, verify query filters

## Best Practices

1. **Always use HTTPS** in production
2. **Implement proper error handling** in API calls
3. **Use role-based access control** for security
4. **Enable audit logging** for compliance
5. **Regular backups** of custom tables
6. **Monitor API usage** and performance
7. **Keep ServiceNow instance updated**
8. **Document custom configurations**

## Support Resources

- ServiceNow REST API Documentation: https://docs.servicenow.com/
- ServiceNow Community: https://community.servicenow.com/
- Halstack Documentation: https://developer.dxc.com/halstack

## Appendix: Sample REST Calls

### Get All Leads
```bash
curl --request GET \
  --url 'https://instance.service-now.com/api/now/table/x_dxc_advisor_lead' \
  --header 'Accept: application/json' \
  --user 'username:password'
```

### Create Lead
```bash
curl --request POST \
  --url 'https://instance.service-now.com/api/now/table/x_dxc_advisor_lead' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "stage": "New"
  }'
```

### Update Lead
```bash
curl --request PATCH \
  --url 'https://instance.service-now.com/api/now/table/x_dxc_advisor_lead/{sys_id}' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --data '{
    "stage": "Qualified"
  }'
```
