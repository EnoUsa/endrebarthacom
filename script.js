// ===================================
// Mobile Navigation Toggle
// ===================================

const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll-Based Navigation Styling
// ===================================

const nav = document.querySelector('.nav');
let lastScroll = 0;
let ticking = false;

const updateNav = () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(5, 5, 5, 0.95)';
        nav.style.borderBottomColor = 'rgba(42, 42, 42, 0.8)';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.7)';
        nav.style.borderBottomColor = 'rgba(20, 20, 20, 1)';
    }
    
    lastScroll = currentScroll;
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
    }
});

// ===================================
// Intersection Observer for Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

// Animate individual items
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Setup animation styles
const setupAnimations = () => {
    const animatedElements = document.querySelectorAll('.cert-card, .experience-card, .skill-item, .contact-link');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.98)';
        el.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index % 6 * 0.08}s, 
                              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index % 6 * 0.08}s`;
        animateOnScroll.observe(el);
    });
};

// Add CSS class for animated elements
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }
    
    .section-header {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .section-header.animate-in {
        opacity: 1;
        transform: translateX(0);
    }
    
    .about-text, .about-skills, .certifications-intro, .contact-intro {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, 
                    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
    }
    
    .about-text.animate-in, .about-skills.animate-in, 
    .certifications-intro.animate-in, .contact-intro.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// Animate section headers and content blocks
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-header, .about-text, .about-skills, .certifications-intro, .contact-intro').forEach(el => {
    sectionObserver.observe(el);
});

// Initialize animations
setupAnimations();

// ===================================
// Active Section Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const highlightNav = () => {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Add active state styles
const activeStyles = document.createElement('style');
activeStyles.textContent = `
    .nav-links a.active {
        color: var(--color-accent-warm);
    }
    .nav-links a.active::after {
        width: 100%;
        background: var(--color-accent-warm);
    }
`;
document.head.appendChild(activeStyles);

// ===================================
// Orbit Animation Enhancement
// ===================================

const orbit = document.querySelector('.cert-orbit');
if (orbit) {
    const createOrbitDots = () => {
        const rings = document.querySelectorAll('.orbit-ring');
        const colors = ['rgba(201, 169, 98, 0.6)', 'rgba(74, 158, 255, 0.6)', 'rgba(0, 212, 170, 0.6)'];
        
        rings.forEach((ring, ringIndex) => {
            const dotCount = 4 + ringIndex * 2;
            const radius = ring.offsetWidth / 2;
            
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'orbit-dot';
                
                const angle = (360 / dotCount) * i;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;
                
                dot.style.cssText = `
                    position: absolute;
                    width: ${4 + ringIndex}px;
                    height: ${4 + ringIndex}px;
                    background: ${colors[ringIndex % colors.length]};
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) translate(${x}px, ${y}px);
                    box-shadow: 0 0 ${6 + ringIndex * 2}px ${colors[ringIndex % colors.length]};
                `;
                
                ring.appendChild(dot);
            }
        });
    };
    
    // Initialize dots after layout
    setTimeout(createOrbitDots, 600);
}

// ===================================
// Magnetic Button Effect
// ===================================

const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===================================
// Parallax Effect on Hero
// ===================================

const heroVisual = document.querySelector('.hero-visual');
let rafId = null;

const handleParallax = () => {
    if (heroVisual && window.scrollY < window.innerHeight) {
        const scrolled = window.scrollY;
        heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
    rafId = null;
};

window.addEventListener('scroll', () => {
    if (!rafId) {
        rafId = requestAnimationFrame(handleParallax);
    }
});

// ===================================
// Cursor Trail Effect (subtle)
// ===================================

const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(201, 169, 98, 0.03) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: transform 0.3s ease-out, opacity 0.3s ease;
        opacity: 0;
    `;
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });
    
    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
};

// Only enable cursor trail on desktop
if (window.matchMedia('(min-width: 1024px)').matches) {
    createCursorTrail();
}


// ===================================
// Keyboard Navigation Enhancement
// ===================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Prefers Reduced Motion
// ===================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.cert-card, .experience-card, .skill-item, .contact-link').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
    });
    
    document.querySelectorAll('.section-header, .about-text, .about-skills, .certifications-intro, .contact-intro').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ===================================
// Console Easter Egg
// ===================================

console.log('%c✨ Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #c9a962;');
console.log('%cBuilt with vanilla HTML, CSS & JS', 'font-size: 12px; color: #999;');
console.log('%c12x Salesforce Certified', 'font-size: 14px; color: #4a9eff;');
