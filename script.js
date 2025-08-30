// Sample discount codes
const discountCodes = [
    {
        code: "WELCOME20",
        type: "percentage",
        value: 20,
        description: "20% off your first purchase",
        minAmount: 0,
        maxDiscount: 50,
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        usageLimit: 1000,
        usedCount: 0
    },
    {
        code: "SAVE10",
        type: "percentage",
        value: 10,
        description: "10% off any event",
        minAmount: 25,
        maxDiscount: 25,
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        usageLimit: 5000,
        usedCount: 0
    },
    {
        code: "FLAT5",
        type: "fixed",
        value: 5,
        description: "$5 off any purchase",
        minAmount: 20,
        maxDiscount: 5,
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        usageLimit: 2000,
        usedCount: 0
    },
    {
        code: "WEEKEND15",
        type: "percentage",
        value: 15,
        description: "15% off weekend events",
        minAmount: 30,
        maxDiscount: 30,
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        usageLimit: 3000,
        usedCount: 0
    }
];

// Sample events data
const events = [
    {
        id: 1,
        title: "Rock Concert 2024",
        date: "2024-03-15",
        location: "Madison Square Garden, NY",
        price: 89.99,
        icon: "fas fa-guitar",
        description: "An electrifying night of rock music featuring top artists"
    },
    {
        id: 2,
        title: "Jazz Festival",
        date: "2024-03-22",
        location: "Central Park, NY",
        price: 45.00,
        icon: "fas fa-music",
        description: "A relaxing evening of smooth jazz under the stars"
    },
    {
        id: 3,
        title: "Comedy Night",
        date: "2024-03-28",
        location: "Comedy Cellar, NY",
        price: 35.50,
        icon: "fas fa-laugh",
        description: "Laugh your heart out with the best comedians in town"
    },
    {
        id: 4,
        title: "Classical Symphony",
        date: "2024-04-05",
        location: "Carnegie Hall, NY",
        price: 120.00,
        icon: "fas fa-violin",
        description: "Experience the magic of classical music with the Philharmonic"
    },
    {
        id: 5,
        title: "Pop Music Festival",
        date: "2024-04-12",
        location: "Brooklyn Bridge Park, NY",
        price: 75.00,
        icon: "fas fa-microphone",
        description: "A day filled with pop hits and amazing performances"
    },
    {
        id: 6,
        title: "Theater Performance",
        date: "2024-04-19",
        location: "Broadway Theater, NY",
        price: 95.00,
        icon: "fas fa-theater-masks",
        description: "A captivating theatrical experience you won't forget"
    }
];

// Global variables
let currentEvent = null;
let selectedRating = 0;
let scamReports = [];
let ratings = [];
let currentDiscount = null;

// DOM elements
const eventsGrid = document.getElementById('eventsGrid');
const ticketModal = document.getElementById('ticketModal');
const scamModal = document.getElementById('scamModal');
const ratingModal = document.getElementById('ratingModal');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Show loading spinner initially
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Simulate loading time for better UX
    setTimeout(() => {
        displayEvents();
        setupEventListeners();
        setupMobileMenu();
        createParticles();
        
        // Hide loading spinner
        if (loadingSpinner) {
            loadingSpinner.classList.add('hidden');
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 500);
        }
    }, 1500);
});

// Display events in the grid
function displayEvents() {
    eventsGrid.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// Create event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const iconClass = event.icon || 'fas fa-ticket-alt';
    
    // Check if event has a flyer
    const flyerHTML = event.flyer ? `<img src="${event.flyer}" alt="${event.title} Flyer">` : '';
    
    card.innerHTML = `
        <div class="event-image">
            ${flyerHTML}
            <i class="${iconClass}"></i>
        </div>
        <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-date">${formatDate(event.date)}</p>
            <p class="event-location">${event.location}</p>
            <p class="event-price">$${event.price.toFixed(2)}</p>
            <div class="event-actions">
                <button class="buy-btn" onclick="openTicketModal(${event.id})">Buy Tickets</button>
                <button class="rate-btn" onclick="openRatingModal('${event.title}')">Rate Event</button>
            </div>
        </div>
    `;
    
    return card;
}

// Format date for display
function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Close modals with close button
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeAllModals);
    });
    
    // Ticket quantity change
    document.getElementById('ticketQuantity').addEventListener('change', updateTotalPrice);
    
    // Star rating
    document.querySelectorAll('.star-rating i').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStarDisplay();
        });
    });
    
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId === 'report') {
                openScamModal();
            } else {
                scrollToSection(targetId);
            }
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Open ticket purchase modal
function openTicketModal(eventId) {
    currentEvent = events.find(event => event.id === eventId);
    if (!currentEvent) return;
    
    const eventDetails = document.getElementById('eventDetails');
    eventDetails.innerHTML = `
        <div style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
            <h3>${currentEvent.title}</h3>
            <p><strong>Date:</strong> ${formatDate(currentEvent.date)}</p>
            <p><strong>Location:</strong> ${currentEvent.location}</p>
            <p><strong>Price per ticket:</strong> $${currentEvent.price.toFixed(2)}</p>
        </div>
    `;
    
    updateTotalPrice();
    ticketModal.style.display = 'block';
}

// Open scam report modal
function openScamModal() {
    // Set today's date as default
    document.getElementById('scamDate').value = new Date().toISOString().split('T')[0];
    scamModal.style.display = 'block';
}

// Open rating modal
function openRatingModal(eventTitle) {
    document.getElementById('ratingEvent').value = eventTitle;
    selectedRating = 0;
    updateStarDisplay();
    ratingModal.style.display = 'block';
}

// Close all modals
function closeAllModModal() {
    ticketModal.style.display = 'none';
    scamModal.style.display = 'none';
    ratingModal.style.display = 'none';
}

// Apply discount code
function applyDiscount() {
    const discountCodeInput = document.getElementById('discountCode').value.trim().toUpperCase();
    const discountMessage = document.getElementById('discountMessage');
    
    if (!discountCodeInput) {
        showDiscountMessage('Please enter a discount code', 'error');
        return;
    }
    
    // Find the discount code
    const discountCode = discountCodes.find(code => code.code === discountCodeInput);
    
    if (!discountCode) {
        showDiscountMessage('Invalid discount code', 'error');
        return;
    }
    
    // Check if code is still valid
    const today = new Date();
    const validFrom = new Date(discountCode.validFrom);
    const validUntil = new Date(discountCode.validUntil);
    
    if (today < validFrom || today > validUntil) {
        showDiscountMessage('Discount code has expired or is not yet valid', 'error');
        return;
    }
    
    // Check usage limit
    if (discountCode.usedCount >= discountCode.usageLimit) {
        showDiscountMessage('Discount code usage limit reached', 'error');
        return;
    }
    
    // Check minimum amount requirement
    const quantity = parseInt(document.getElementById('ticketQuantity').value) || 1;
    const subtotal = quantity * currentEvent.price;
    
    if (subtotal < discountCode.minAmount) {
        showDiscountMessage(`Minimum purchase amount: $${discountCode.minAmount}`, 'error');
        return;
    }
    
    // Apply discount
    currentDiscount = discountCode;
    showDiscountMessage(`Discount applied: ${discountCode.description}`, 'success');
    
    // Update prices
    updateTotalPrice();
}

// Show discount message
function showDiscountMessage(message, type) {
    const discountMessage = document.getElementById('discountMessage');
    discountMessage.textContent = message;
    discountMessage.className = `discount-message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        discountMessage.textContent = '';
        discountMessage.className = 'discount-message';
    }, 5000);
}

// Update total price based on quantity and discount
function updateTotalPrice() {
    if (!currentEvent) return;
    
    const quantity = parseInt(document.getElementById('ticketQuantity').value);
    const subtotal = quantity * currentEvent.price;
    
    // Update subtotal
    document.getElementById('subtotalPrice').textContent = subtotal.toFixed(2);
    
    let total = subtotal;
    let discountAmount = 0;
    
    // Apply discount if available
    if (currentDiscount) {
        if (currentDiscount.type === 'percentage') {
            discountAmount = (subtotal * currentDiscount.value) / 100;
            // Apply maximum discount limit
            if (currentDiscount.maxDiscount > 0) {
                discountAmount = Math.min(discountAmount, currentDiscount.maxDiscount);
            }
        } else if (currentDiscount.type === 'fixed') {
            discountAmount = Math.min(currentDiscount.value, subtotal);
        }
        
        total = subtotal - discountAmount;
        
        // Show discount display
        document.getElementById('discountDisplay').style.display = 'block';
        document.getElementById('discountAmount').textContent = discountAmount.toFixed(2);
    } else {
        // Hide discount display
        document.getElementById('discountDisplay').style.display = 'none';
    }
    
    // Update total
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Update star rating display
function updateStarDisplay() {
    document.querySelectorAll('.star-rating i').forEach((star, index) => {
        if (index < selectedRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Purchase tickets
function purchaseTickets() {
    const quantity = document.getElementById('ticketQuantity').value;
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    
    if (!name || !email || !phone) {
        showSuccessMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Calculate final total with discount
    const subtotal = quantity * currentEvent.price;
    let total = subtotal;
    let discountAmount = 0;
    
    if (currentDiscount) {
        if (currentDiscount.type === 'percentage') {
            discountAmount = (subtotal * currentDiscount.value) / 100;
            if (currentDiscount.maxDiscount > 0) {
                discountAmount = Math.min(discountAmount, currentDiscount.maxDiscount);
            }
        } else if (currentDiscount.type === 'fixed') {
            discountAmount = Math.min(currentDiscount.value, subtotal);
        }
        total = subtotal - discountAmount;
    }
    
    // In a real application, this would integrate with a payment processor
    setTimeout(() => {
        let message = `Successfully purchased ${quantity} ticket(s) for ${currentEvent.title}!`;
        if (currentDiscount) {
            message += ` Applied discount: ${currentDiscount.description}.`;
        }
        message += ` Total: $${total.toFixed(2)}`;
        
        showSuccessMessage(message);
        closeAllModals();
        
        // Clear form
        document.getElementById('customerName').value = '';
        document.getElementById('customerEmail').value = '';
        document.getElementById('customerPhone').value = '';
        document.getElementById('ticketQuantity').value = '1';
        document.getElementById('discountCode').value = '';
        
        // Clear discount
        currentDiscount = null;
        document.getElementById('discountMessage').textContent = '';
        document.getElementById('discountDisplay').style.display = 'none';
    }, 1500);
}

// Submit scam report
function submitScamReport() {
    const eventName = document.getElementById('scamEvent').value;
    const description = document.getElementById('scamDescription').value;
    const date = document.getElementById('scamDate').value;
    const contact = document.getElementById('scamContact').value;
    
    if (!eventName || !description || !date) {
        showSuccessMessage('Please fill in all required fields', 'error');
        return;
    }
    
    const report = {
        id: Date.now(),
        eventName,
        description,
        date,
        contact,
        timestamp: new Date().toISOString()
    };
    
    scamReports.push(report);
    
    // In a real application, this would be sent to a server
    showSuccessMessage('Scam report submitted successfully. We will investigate this matter.');
    closeAllModals();
    
    // Clear form
    document.getElementById('scamEvent').value = '';
    document.getElementById('scamDescription').value = '';
    document.getElementById('scamContact').value = '';
}

// Submit rating
function submitRating() {
    const eventName = document.getElementById('ratingEvent').value;
    const comment = document.getElementById('ratingComment').value;
    
    if (!eventName || selectedRating === 0) {
        showSuccessMessage('Please select an event and provide a rating', 'error');
        return;
    }
    
    const rating = {
        id: Date.now(),
        eventName,
        rating: selectedRating,
        comment,
        timestamp: new Date().toISOString()
    };
    
    ratings.push(rating);
    
    // In a real application, this would be sent to a server
    showSuccessMessage(`Thank you for rating ${eventName} with ${selectedRating} stars!`);
    closeAllModals();
    
    // Clear form
    document.getElementById('ratingComment').value = '';
    selectedRating = 0;
    updateStarDisplay();
}

// Show success message
function showSuccessMessage(message, type = 'success') {
    successText.textContent = message;
    
    if (type === 'error') {
        successMessage.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e53)';
    } else {
        successMessage.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
    }
    
    successMessage.style.display = 'flex';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll to events section
function scrollToEvents() {
    scrollToSection('events');
}

// Utility functions
function closeAllModals() {
    ticketModal.style.display = 'none';
    scamModal.style.display = 'none';
    ratingModal.style.display = 'none';
    
    // Reset discount state
    currentDiscount = null;
    const discountMessage = document.getElementById('discountMessage');
    const discountDisplay = document.getElementById('discountDisplay');
    const discountCode = document.getElementById('discountCode');
    
    if (discountMessage) discountMessage.textContent = '';
    if (discountDisplay) discountDisplay.style.display = 'none';
    if (discountCode) discountCode.value = '';
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add loading animation to event cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe event cards for animation
    setTimeout(() => {
        document.querySelectorAll('.event-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) rotateX(10deg)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });
    }, 500);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Add form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.phone || !isValidPhone(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Create particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const startX = Math.random() * window.innerWidth;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = startX + 'px';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Enhanced search functionality
function searchEvents(query) {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    
    let filteredEvents = events.filter(event => {
        // Text search
        const matchesSearch = !query || 
            event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase()) ||
            event.category.toLowerCase().includes(query.toLowerCase());
        
        // Category filter
        const matchesCategory = !categoryFilter || event.category === categoryFilter;
        
        // Price filter
        let matchesPrice = true;
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
            matchesPrice = event.price >= min && (max === Infinity ? true : event.price <= max);
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Update display with filtered events
    displayFilteredEvents(filteredEvents);
}

// Filter events by category and price
function filterEvents() {
    const query = document.getElementById('searchInput').value;
    searchEvents(query);
}

function displayFilteredEvents(filteredEvents) {
    eventsGrid.innerHTML = '';
    
    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No events found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    // Add staggered animation
    filteredEvents.forEach((event, index) => {
        const eventCard = createEventCard(event);
        eventCard.style.animationDelay = (index * 0.1) + 's';
        eventsGrid.appendChild(eventCard);
    });
}

// Add new event functionality
function addNewEvent() {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const location = document.getElementById('eventLocation').value;
    const price = parseFloat(document.getElementById('eventPrice').value);
    const category = document.getElementById('eventCategory').value;
    const description = document.getElementById('eventDescription').value;
    const capacity = parseInt(document.getElementById('eventCapacity').value);
    const contact = document.getElementById('eventContact').value;
    const flyerFile = document.getElementById('eventFlyer').files[0];
    
    if (!title || !date || !location || !price || !category || !description || !capacity || !contact) {
        showSuccessMessage('Please fill in all required fields', 'error');
        return;
    }
    
    if (price < 0) {
        showSuccessMessage('Price must be a positive number', 'error');
        return;
    }
    
    if (capacity < 1) {
        showSuccessMessage('Capacity must be at least 1', 'error');
        return;
    }
    
    // Create new event object
    const newEvent = {
        id: Date.now(),
        title: title,
        date: date.split('T')[0], // Extract date part only
        time: date.split('T')[1], // Extract time part
        location: location,
        price: price,
        category: category,
        description: description,
        capacity: capacity,
        availableTickets: capacity,
        contact: contact,
        icon: getCategoryIcon(category),
        isUserAdded: true,
        timestamp: new Date().toISOString()
    };
    
    // Handle flyer upload if provided
    if (flyerFile) {
        // Validate file size (5MB limit)
        if (flyerFile.size > 5 * 1024 * 1024) {
            showSuccessMessage('Flyer image must be less than 5MB', 'error');
            return;
        }
        
        // Validate file type
        if (!flyerFile.type.startsWith('image/')) {
            showSuccessMessage('Please upload a valid image file', 'error');
            return;
        }
        
        // Convert to base64 for storage (in a real app, this would upload to a server)
        const reader = new FileReader();
        reader.onload = function(e) {
            newEvent.flyer = e.target.result;
            // Add to events array
            events.push(newEvent);
            // Refresh display
            displayEvents();
            // Show success message
            showSuccessMessage(`Event "${title}" added successfully with flyer!`);
            // Clear form
            clearAddEventForm();
        };
        reader.readAsDataURL(flyerFile);
    } else {
        // Add to events array without flyer
        events.push(newEvent);
        // Refresh display
        displayEvents();
        // Show success message
        showSuccessMessage(`Event "${title}" added successfully!`);
        // Clear form
        clearAddEventForm();
    }
}

// Get icon based on category
function getCategoryIcon(category) {
    const iconMap = {
        'concert': 'fas fa-music',
        'theater': 'fas fa-theater-masks',
        'sports': 'fas fa-futbol',
        'comedy': 'fas fa-laugh',
        'festival': 'fas fa-calendar-alt',
        'conference': 'fas fa-users',
        'other': 'fas fa-ticket-alt'
    };
    return iconMap[category] || 'fas fa-ticket-alt';
}

// Clear add event form
function clearAddEventForm() {
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventLocation').value = '';
    document.getElementById('eventPrice').value = '';
    document.getElementById('eventCategory').value = '';
    document.getElementById('eventDescription').value = '';
    document.getElementById('eventCapacity').value = '';
    document.getElementById('eventContact').value = '';
    document.getElementById('eventFlyer').value = '';
    document.getElementById('flyerPreview').style.display = 'none';
}

// Preview flyer image
function previewFlyer(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('flyerPreview');
    const previewImg = document.getElementById('flyerImage');
    
    if (file) {
        // Validate file size
        if (file.size > 5 * 1024 * 1024) {
            showSuccessMessage('Image must be less than 5MB', 'error');
            event.target.value = '';
            return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showSuccessMessage('Please select a valid image file', 'error');
            event.target.value = '';
            return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            preview.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.style.display = 'none';
    }
}

// Remove flyer
function removeFlyer() {
    document.getElementById('eventFlyer').value = '';
    document.getElementById('flyerPreview').style.display = 'none';
}

// Add new discount code
function addNewDiscountCode(codeData) {
    const newDiscountCode = {
        id: Date.now(),
        code: codeData.code.toUpperCase(),
        type: codeData.type, // 'percentage' or 'fixed'
        value: parseFloat(codeData.value),
        description: codeData.description,
        minAmount: parseFloat(codeData.minAmount) || 0,
        maxDiscount: parseFloat(codeData.maxDiscount) || 0,
        validFrom: codeData.validFrom,
        validUntil: codeData.validUntil,
        usageLimit: parseInt(codeData.usageLimit) || 1000,
        usedCount: 0,
        timestamp: new Date().toISOString()
    };
    
    discountCodes.push(newDiscountCode);
    return newDiscountCode;
}

// Get available discount codes (for admin purposes)
function getAvailableDiscountCodes() {
    return discountCodes.filter(code => {
        const today = new Date();
        const validFrom = new Date(code.validFrom);
        const validUntil = new Date(code.validUntil);
        return today >= validFrom && today <= validUntil && code.usedCount < code.usageLimit;
    });
}

// Export functions for potential external use
window.OVAMITik = {
    searchEvents,
    submitScamReport,
    submitRating,
    purchaseTickets,
    openTicketModal,
    openScamModal,
    openRatingModal,
    addNewEvent,
    applyDiscount,
    addNewDiscountCode,
    getAvailableDiscountCodes,
    previewFlyer,
    removeFlyer
};
