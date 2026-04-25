# Analytics Dashboard

A comprehensive analytical dashboard for monitoring and analyzing application data using shadcn components and Sanity CMS.

## Features

### 📊 **Overview Dashboard**

- **Real-time metrics**: Total page views, active users, system health, and conversions
- **Visual indicators**: Color-coded status badges and progress indicators
- **Auto-refresh**: Data updates every 30 seconds automatically

### 🔍 **Advanced Filtering & Search**

- **Global search**: Search across all data types with real-time filtering
- **Date range filtering**: Last 24 hours, 7 days, 30 days, or 90 days
- **Event type filtering**: Filter by specific user events (page views, clicks, form submissions, etc.)
- **Severity filtering**: Filter error logs by severity level (low, medium, high, critical)
- **Metric type filtering**: Filter system metrics by type (CPU, memory, disk, network, etc.)

### 📈 **Data Type Tabs**

#### **Page Views**

- Track user navigation patterns
- Monitor page load times
- Analyze user agent information
- Session tracking

#### **User Events**

- Monitor user interactions (clicks, form submissions, downloads)
- Track conversion events
- Analyze user behavior patterns
- Session-based event correlation

#### **System Metrics**

- Real-time server performance monitoring
- CPU, memory, and disk usage tracking
- Network latency monitoring
- Response time analysis
- Color-coded status indicators (Normal, Warning, Critical)

#### **Error Logs**

- Comprehensive error tracking
- Severity-based categorization
- Resolution status tracking
- Stack trace information
- URL and session correlation

#### **Performance Metrics**

- Core Web Vitals tracking (LCP, FID, CLS, FCP)
- Load time monitoring
- Time to First Byte (TTFB) analysis
- Performance optimization insights

#### **Conversion Events**

- Revenue tracking
- Conversion funnel analysis
- Currency support
- Session-based conversion correlation

## Architecture

### **Frontend Components**

- **shadcn/ui**: Modern, accessible React components
- **Tabs**: Organized data presentation
- **Tables**: Structured data display with sorting
- **Cards**: Metric overview and status cards
- **Badges**: Status indicators and categorization
- **Input/Select**: Advanced filtering controls

### **Backend API Endpoints**

```
/api/monitoring/page-views
/api/monitoring/user-events
/api/monitoring/system-metrics
/api/monitoring/error-logs
/api/monitoring/performance-metrics
/api/monitoring/conversion-events
```

### **Data Storage**

- **Sanity CMS**: Headless CMS for structured data storage
- **Real-time updates**: Live data synchronization
- **Schema validation**: Type-safe data structures

## Installation & Setup

### **Prerequisites**

- Node.js 18+ and npm
- Sanity CLI installed globally
- Existing monitoring system setup

### **Component Installation**

```bash
# Install required dependencies
npm install @radix-ui/react-tabs @radix-ui/react-select lucide-react

# The dashboard uses existing shadcn components
# No additional installation required
```

### **Sanity Studio Integration**

The dashboard is automatically integrated into Sanity Studio and accessible via:

- **Analytics Dashboard**: Comprehensive analytical view
- **Monitoring Dashboard**: System health overview

## Usage

### **Accessing the Dashboard**

1. Navigate to your Sanity Studio (`/studio`)
2. Click on "Analytics Dashboard" in the sidebar
3. The dashboard will load with real-time data

### **Using Filters**

1. **Search**: Use the search bar to find specific data across all types
2. **Date Range**: Select time periods for data analysis
3. **Event Type**: Filter user events by specific interaction types
4. **Severity**: Filter error logs by importance level
5. **Metric Type**: Filter system metrics by resource type

### **Data Interpretation**

#### **Overview Metrics**

- **Total Page Views**: Number of page loads tracked
- **Active Users**: Unique session count
- **System Health**: Critical/high severity error count
- **Conversions**: Total conversion events

#### **Status Indicators**

- **Normal**: Green badge for healthy metrics
- **Warning**: Yellow badge for concerning values
- **Critical**: Red badge for critical issues

#### **Performance Thresholds**

- **CPU/Memory/Disk**: >80% = Critical, >60% = Warning
- **Error Severity**: High/Critical = Red, Medium = Yellow, Low = Gray

## Customization

### **Adding New Data Types**

1. Create new Sanity schema in `src/sanity/schemaTypes/`
2. Add API endpoint in `src/app/api/monitoring/`
3. Update dashboard component with new tab
4. Add filtering logic for new data type

### **Customizing Filters**

```typescript
// Add new filter options
const [filters, setFilters] = useState<FilterState>({
  search: "",
  dateRange: "7d",
  eventType: "all",
  severity: "all",
  metricType: "all",
  // Add new filter here
  newFilter: "all",
});
```

### **Styling Customization**

The dashboard uses Tailwind CSS classes and can be customized by:

- Modifying component classes
- Updating color schemes in `globals.css`
- Customizing shadcn component variants

## Performance Considerations

### **Data Loading**

- **Lazy loading**: Data loads only when tabs are accessed
- **Caching**: API responses are cached for 30 seconds
- **Pagination**: Large datasets are paginated automatically

### **Real-time Updates**

- **Auto-refresh**: 30-second intervals for live data
- **Manual refresh**: Button to force data reload
- **Loading states**: Visual feedback during data fetching

### **Optimization Tips**

- Use date range filters to limit data size
- Implement server-side pagination for large datasets
- Consider data retention policies for old metrics

## Troubleshooting

### **Common Issues**

#### **Dashboard Not Loading**

- Check Sanity Studio connection
- Verify API endpoints are accessible
- Check browser console for errors

#### **No Data Displayed**

- Ensure monitoring system is collecting data
- Check API endpoint responses
- Verify Sanity schema is properly configured

#### **Filter Not Working**

- Check filter logic in component
- Verify data structure matches expected format
- Test individual filter functions

### **Debug Mode**

Enable debug logging by adding to component:

```typescript
const DEBUG = process.env.NODE_ENV === "development";
if (DEBUG) console.log("Filtered data:", filteredData);
```

## Future Enhancements

### **Planned Features**

- **Charts & Graphs**: Visual data representation
- **Export Functionality**: CSV/PDF data export
- **Alert System**: Automated notifications for critical metrics
- **Custom Dashboards**: User-configurable layouts
- **Advanced Analytics**: Machine learning insights

### **Integration Opportunities**

- **Slack/Discord**: Real-time notifications
- **Email Reports**: Scheduled metric summaries
- **External APIs**: Integration with other monitoring tools
- **Webhooks**: Real-time data streaming

## Contributing

### **Development Guidelines**

- Follow existing component patterns
- Use TypeScript for type safety
- Maintain accessibility standards
- Write comprehensive tests
- Update documentation for new features

### **Code Structure**

```
src/sanity/components/analytics-dashboard/
├── index.ts                    # Main export
├── analytics-dashboard.tsx     # Main dashboard component
└── README.md                   # Component documentation

src/app/api/monitoring/
├── page-views/route.ts         # Page views API
├── user-events/route.ts        # User events API
├── system-metrics/route.ts     # System metrics API
├── error-logs/route.ts         # Error logs API
├── performance-metrics/route.ts # Performance metrics API
└── conversion-events/route.ts  # Conversion events API
```

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review API endpoint responses
3. Verify Sanity schema configuration
4. Check browser console for errors
5. Review monitoring system logs

---

**Built with ❤️ using shadcn/ui and Sanity CMS**
