# OVAMI tik - Premium Ticket Sales Website

A fully functional, modern ticket sales website built with HTML, CSS, and JavaScript. Features an attractive design, ticket purchasing functionality, scam reporting system, and event rating capabilities.

## 🎫 Features

### Core Functionality
- **Ticket Sales**: Browse and purchase tickets for various events
- **Event Management**: Display events with details, dates, locations, and pricing
- **User Event Creation**: Add your own events with detailed information and flyers
- **Discount System**: Apply discount codes for savings on ticket purchases
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Beautiful gradient colors and smooth animations

### Security & Trust Features
- **Scam Reporting System**: Report suspicious activities and scams
- **Event Rating System**: Rate and review concerts/shows after attending
- **Form Validation**: Ensures data integrity and user experience

### Design Features
- **Attractive Color Scheme**: Modern gradients and appealing visual design
- **Smooth Animations**: Hover effects, transitions, and interactive elements
- **Professional Layout**: Clean, organized sections with intuitive navigation

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. The website will load immediately with all functionality

### File Structure
```
tik/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🎯 How to Use

### Browsing Events
1. Navigate to the Events section
2. Browse through available events
3. View event details, dates, locations, and pricing
4. Click "Buy Tickets" to purchase or "Rate Event" to review

### Purchasing Tickets
1. Click "Buy Tickets" on any event
2. Select number of tickets (1-5)
3. Fill in your contact information
4. **Apply discount code (optional):**
   - Enter your discount code
   - Click "Apply" to see savings
   - View updated total with discount
5. Review final total price
6. Click "Purchase Tickets" to complete order

### Reporting Scams
1. Click "Report Scam" in the navigation
2. Fill in the scam report form:
   - Event name
   - Description of what happened
   - Date of incident
   - Your contact information (optional)
3. Submit the report

### Adding Your Own Events
1. Navigate to "Add Event" section
2. Fill in all event details:
   - Event title and description
   - Date and time
   - Location and price
   - Category and capacity
   - Contact information
   - **Event flyer (optional):** Upload an image to showcase your event
3. Click "Add Event" to publish

### Rating Events
1. Click "Rate Event" on any event card
2. Enter the event name
3. Select a rating (1-5 stars)
4. Add optional comments
5. Submit your rating

## 🎫 Available Discount Codes

Try these discount codes for savings:
- **WELCOME20**: 20% off your first purchase (max $50 off)
- **SAVE10**: 10% off any event over $25 (max $25 off)
- **FLAT5**: $5 off any purchase over $20
- **WEEKEND15**: 15% off weekend events over $30 (max $30 off)

*Note: Discount codes have usage limits and expiration dates. Terms and conditions apply.*

## 🖼️ Event Flyer Feature

### Uploading Event Flyers
- **Supported Formats**: JPG, PNG, GIF
- **File Size Limit**: Maximum 5MB
- **Preview**: See your flyer before publishing
- **Display**: Flyers appear prominently in event cards
- **Optional**: Events work perfectly without flyers

### Benefits
- **Visual Appeal**: Make your events stand out
- **Professional Look**: Showcase event branding and design
- **Better Engagement**: Attract more attendees with visual content
- **Easy Management**: Upload, preview, and remove flyers easily

## 🎨 Design Features

### Color Palette
- **Primary**: Blue (#1E88E5)
- **Secondary**: Orange (#F57C00)
- **Accent**: Green (#43A047)
- **Background**: Light Gray (#F5F5F5)
- **Text**: Dark Gray (#212121)

### Visual Elements
- Gradient backgrounds and buttons
- Smooth hover animations
- Card-based layout design
- Responsive grid system
- Modern typography

## 📱 Responsive Design

The website automatically adapts to different screen sizes:
- **Desktop**: Full layout with side-by-side sections
- **Tablet**: Adjusted spacing and layout
- **Mobile**: Stacked layout with hamburger menu

## 🔧 Customization

### Adding New Events
Users can now add their own events through the website interface, or you can edit the `events` array in `script.js`:
```javascript
const events = [
    {
        id: 7,
        title: "Your Event Name",
        date: "2024-05-01",
        location: "Event Location",
        price: 50.00,
        icon: "fas fa-icon-name",
        description: "Event description"
    }
    // ... more events
];
```

### Changing Colors
Modify the CSS variables in `styles.css` to match your brand colors.

### Adding Features
The modular JavaScript structure makes it easy to add new functionality.

## 🛡️ Security Features

- Form validation for all inputs
- Secure data handling
- Scam reporting system
- User input sanitization

## 🌟 Advanced Features

- **Parallax Scrolling**: Hero section with scroll effects
- **Intersection Observer**: Animated event cards on scroll
- **Keyboard Navigation**: ESC key to close modals
- **Smooth Scrolling**: Internal navigation with smooth transitions
- **Mobile Menu**: Responsive hamburger menu for mobile devices

## 📊 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚀 Future Enhancements

Potential features that could be added:
- User authentication system
- Payment gateway integration
- Event search and filtering
- User dashboard
- Email notifications
- Social media sharing
- Event calendar view
- Admin panel for event management
- **Advanced discount management system**
- **Bulk discount code generation**
- **Loyalty program with points**

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📞 Support

For support or questions:
- Email: support@ovamitik.com
- Phone: +1 (555) 123-4567

---

**Built with ❤️ for the event ticketing community**
