// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.display = 'none';
    mobileToggle.style.background = 'none';
    mobileToggle.style.border = 'none';
    mobileToggle.style.fontSize = '24px';
    mobileToggle.style.cursor = 'pointer';
    
    // Insert mobile toggle before nav actions
    const navActions = document.querySelector('.nav-actions');
    navActions.parentNode.insertBefore(mobileToggle, navActions);
    
    // Mobile menu functionality
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Frame showcase carousel functionality
    const frameShowcase = document.querySelector('.frame-showcase');
    const frameItems = document.querySelectorAll('.frame-item');
    let currentIndex = 0;
    
    // Auto-rotate frames every 3 seconds
    setInterval(() => {
        frameItems.forEach((item, index) => {
            item.style.transform = `translateX(${(index - currentIndex) * 140}px) scale(${index === currentIndex ? 1.1 : 1})`;
            item.style.zIndex = index === currentIndex ? 10 : 1;
        });
        currentIndex = (currentIndex + 1) % frameItems.length;
    }, 3000);
    
    // Video placeholder click functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Simulate video play (in real implementation, this would open a video modal)
            this.style.background = '#000';
            this.innerHTML = '<p style="color: white;">Video would play here</p>';
        });
    }
    
    // Button click animations
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Scroll animations
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
    
    // Observe elements for scroll animations
    document.querySelectorAll('.frame-card, .feature, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add shadow when scrolled
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form validation for contact forms (if any)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
    });
    
    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // WhatsApp chat simulation
    document.querySelectorAll('.contact-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent === '📱') {
                alert('WhatsApp chat would open here in a real implementation');
            } else if (this.textContent === '✉') {
                alert('Email client would open here');
            } else if (this.textContent === '📷') {
                alert('Instagram would open here');
            }
        });
    });
    
    // Service card interactions
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Frame card hover effects
    document.querySelectorAll('.frame-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const frameImage = this.querySelector('.frame-border');
            frameImage.style.transform = 'scale(1.05) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const frameImage = this.querySelector('.frame-border');
            frameImage.style.transform = 'scale(1) rotateY(0deg)';
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mobile-toggle {
        display: none !important;
    }
    
    @media (max-width: 768px) {
        .mobile-toggle {
            display: block !important;
        }
        
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .nav-menu.mobile-active {
            display: flex;
        }
        
        .header {
            transition: transform 0.3s ease;
        }
    }
    
    .service-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .frame-border {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
