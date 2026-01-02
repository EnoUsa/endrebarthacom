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
// Scroll-Based Navigation Styling (DISABLED - using transparent nav)
// ===================================

// Removed to keep nav transparent with network background visible

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

