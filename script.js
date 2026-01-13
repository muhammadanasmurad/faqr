// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                    const spans = mobileMenuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && mobileMenuToggle && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (spans.length >= 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// ============================================
// Smooth Scrolling for Navigation Links (only for same-page anchors)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for same-page anchors
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // For links to other pages, let them navigate normally
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Language Toggle
// ============================================
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const selectedLang = button.getAttribute('data-lang');
        
        // Store language preference
        localStorage.setItem('preferredLanguage', selectedLang);
        
        // Here you would implement actual language switching
        // For now, this is a placeholder for future implementation
        if (selectedLang === 'ur') {
            // Future: Switch to Urdu content
            console.log('Switching to Urdu');
        } else {
            // Future: Switch to English content
            console.log('Switching to English');
        }
    });
});

// Load saved language preference
const savedLang = localStorage.getItem('preferredLanguage');
if (savedLang) {
    const savedButton = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
    if (savedButton) {
        langButtons.forEach(btn => btn.classList.remove('active'));
        savedButton.classList.add('active');
    }
}

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const messageDiv = document.getElementById('formMessage');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage(result.message, 'success');
                contactForm.reset();
            } else {
                showMessage(result.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Network error. Please try again later.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    function showMessage(text, type) {
        const messageDiv = document.getElementById('formMessage');
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
            messageDiv.style.display = 'block';
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
}

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.work-card, .value-card, .education-card, .donation-card, .centre-card, .news-card, .join-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize Prayer Times
    fetchPrayerTimes();
    
    // Initialize Theme
    initTheme();
});

// ============================================
// Active Navigation Link Highlighting (for multi-page navigation)
// ============================================
// Set active state based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));

navLinksArray.forEach(link => {
    const linkHref = link.getAttribute('href');
    // Remove .html extension for comparison
    const linkPage = linkHref.split('/').pop() || 'index.html';
    const currentPageName = currentPage || 'index.html';
    
    if (linkPage === currentPageName || 
        (currentPageName === '' && linkPage === 'index.html') ||
        (currentPageName === 'index.html' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// For single-page navigation (if sections exist on current page)
const sections = document.querySelectorAll('.section[id]');
if (sections.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Only update if we're on a single-page layout
        if (current) {
            navLinksArray.forEach(link => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    link.classList.remove('active');
                    if (href === `#${current}`) {
                        link.classList.add('active');
                    }
                }
            });
        }
    });
}

// ============================================
// WhatsApp Link Enhancement
// ============================================
const whatsappLinks = document.querySelectorAll('.whatsapp-link');

whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Ensure the link opens in a new tab/window
        if (!link.target) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
});

// ============================================
// Namaz Timings Logic
// ============================================
async function fetchPrayerTimes() {
    const container = document.getElementById('namaz-container');
    
    if (!container) return;

    try {
        // Show loading state
        container.innerHTML = `
            <div class="loading-namaz">
                <i class="fas fa-spinner fa-spin"></i> Loading Prayer Times...
            </div>
        `;
        
        // Get current date
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = today.toLocaleDateString('en-US', options);
        
        // Fetch data from Aladhan API
        // Method 1: University of Islamic Sciences, Karachi
        // School 1: Hanafi
        const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Sheikhupura&country=Pakistan&method=1&school=1');
        const data = await response.json();

        if (data.code === 200 && data.data) {
            const timings = data.data.timings;
            const hijri = data.data.date.hijri;
            
            // Format times (remove timezone if present)
            const formatTime = (time) => {
                return time.split(' ')[0]; // Returns "HH:MM"
            };
            
            // Convert 24h to 12h format
            const to12Hour = (time) => {
                const [hours, minutes] = time.split(':');
                let h = parseInt(hours, 10);
                const ampm = h >= 12 ? 'PM' : 'AM';
                h = h % 12;
                h = h ? h : 12; // the hour '0' should be '12'
                return `${h}:${minutes} ${ampm}`;
            };

            // Build Vertical Layout
            container.innerHTML = `
                <div class="namaz-card-header">
                    <img src="logo.png" class="namaz-logo logo-dark" alt="">
                    <img src="whitelogobg.png" class="namaz-logo logo-light" alt="">
                    <div class="namaz-date">${dateString}</div>
                    <div class="namaz-hijri">${hijri.day} ${hijri.month.en} ${hijri.year}</div>
                </div>
                <div class="namaz-list">
                    <div class="namaz-row">
                        <div class="namaz-name"><i class="fas fa-cloud-sun"></i> Fajr</div>
                        <div class="namaz-time">${to12Hour(formatTime(timings.Fajr))}</div>
                    </div>
                    <div class="namaz-row">
                        <div class="namaz-name"><i class="fas fa-sun"></i> Dhuhr</div>
                        <div class="namaz-time">${to12Hour(formatTime(timings.Dhuhr))}</div>
                    </div>
                    <div class="namaz-row">
                        <div class="namaz-name"><i class="fas fa-cloud-sun"></i> Asr</div>
                        <div class="namaz-time">${to12Hour(formatTime(timings.Asr))}</div>
                    </div>
                    <div class="namaz-row">
                        <div class="namaz-name"><i class="fas fa-cloud-moon"></i> Maghrib</div>
                        <div class="namaz-time">${to12Hour(formatTime(timings.Maghrib))}</div>
                    </div>
                    <div class="namaz-row">
                        <div class="namaz-name"><i class="fas fa-moon"></i> Isha</div>
                        <div class="namaz-time">${to12Hour(formatTime(timings.Isha))}</div>
                    </div>
                </div>
            `;
            
        } else {
            throw new Error('API returned error');
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        container.innerHTML = `
            <div class="loading-namaz" style="color: #dc3545;">
                <i class="fas fa-exclamation-circle"></i> Unable to load prayer times.<br>
                <small>Please check your internet connection.</small>
            </div>
        `;
    }
}

// ============================================
// Theme Toggle Logic
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    
    // Check system preference
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    // Determine initial theme
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        html.setAttribute('data-theme', 'light');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    } else {
        html.removeAttribute('data-theme'); // Default is dark
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Event Listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            
            if (currentTheme === 'light') {
                // Switch to Dark
                html.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            } else {
                // Switch to Light
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            }
        });
    }
}
