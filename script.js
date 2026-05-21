/* ================================
   MOBILE MENU TOGGLE
   ================================ */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a nav link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

/* ================================
   SMOOTH SCROLL ENHANCEMENT
   ================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal anchor links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for sticky nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ================================
   ANALYTICS HELPER (Optional)
   ================================ */
// Track button clicks for analytics
const trackButtonClick = (buttonLabel) => {
    if (window.gtag) {
        gtag('event', 'button_click', {
            'button_label': buttonLabel
        });
    }
};

// Add click tracking to CTA buttons if needed
document.querySelectorAll('.nav-cta, .cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const label = this.textContent.trim();
        trackButtonClick(label);
    });
});

/* ================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ================================ */
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

// Observe all cards and feature items
document.querySelectorAll('.feature-card, .card, .package-card, .resource-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

/* ================================
   DYNAMIC YEAR IN FOOTER (if needed)
   ================================ */
// Uncomment if footer has a year to update
// document.addEventListener('DOMContentLoaded', function() {
//     const yearElements = document.querySelectorAll('.year');
//     const currentYear = new Date().getFullYear();
//     yearElements.forEach(el => {
//         el.textContent = currentYear;
//     });
// });

/* ================================
   FORM LINK TRACKING
   ================================ */
document.querySelectorAll('a[href*="docs.google.com/forms"]').forEach(link => {
    link.addEventListener('click', function() {
        if (window.gtag) {
            gtag('event', 'form_link_click', {
                'link_url': this.href
            });
        }
    });
});
