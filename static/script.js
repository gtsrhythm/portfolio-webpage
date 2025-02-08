document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.querySelector('.loading-container');
    
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
        loadingContainer.style.opacity = '0';
        setTimeout(() => {
            loadingContainer.style.visibility = 'hidden';
        }, 500);
    });

    setTimeout(() => {
        if (document.body.classList.contains('loading')) {
            document.body.classList.remove('loading');
            loadingContainer.style.opacity = '0';
            loadingContainer.style.visibility = 'hidden';
        }
    }, 5000);

    new ScrollAnimator();

    const texts = [
        "Frontend Designer",
        "Backend Developer",
        "Fullstack Developer",
        "Application Developer",
        "UI/UX Engineer"
    ];
    
    const animatedText = document.querySelector('.animated-text');
    let currentText = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const text = texts[currentText];
        
        if (isDeleting) {
            animatedText.textContent = text.substring(0, currentChar - 1);
            currentChar--;
            typingSpeed = 50;
        } else {
            animatedText.textContent = text.substring(0, currentChar + 1);
            currentChar++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentChar === text.length) {
            isDeleting = true;
            typingSpeed = 1500; 
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentText = (currentText + 1) % texts.length;
            typingSpeed = 500; 
        }

        setTimeout(typeText, typingSpeed);
    }

    typeText();

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const heroSection = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        createParticle(heroSection);
    }

    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    const scrollToTop = document.querySelector('.scroll-to-top');
    const sections = ['hero', 'about', 'projects', 'contact'];
    let currentSectionIndex = 0;

    window.addEventListener('scroll', () => {
        const contactSection = document.getElementById('contact');
        const rect = contactSection.getBoundingClientRect();
        
        if (rect.top <= window.innerHeight * 0.5) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    scrollIndicator.addEventListener('click', () => {
        currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        document.getElementById(sections[currentSectionIndex]).scrollIntoView({ behavior: 'smooth' });
    });

    scrollToTop.addEventListener('click', () => {
        currentSectionIndex = 0;
    });

    // Scroll indicator click handler
    scrollIndicator.addEventListener('click', () => {
        currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        document.getElementById(sections[currentSectionIndex]).scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll to top click handler
    scrollToTop.addEventListener('click', () => {
        currentSectionIndex = 0;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reset section index when user manually scrolls
    let isScrolling;
    window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            currentSectionIndex = sections.findIndex(section => {
                const element = document.getElementById(section);
                const rect = element.getBoundingClientRect();
                const offset = element.offsetTop;
                return scrollPosition >= offset && scrollPosition < offset + rect.height;
            });
            if (currentSectionIndex === -1) currentSectionIndex = 0;
        }, 66);
    });
});

function createParticle(parent) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 10 + 5}s linear infinite;
    `;

    parent.appendChild(particle);
}

// Add mousemove effect
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const speed = particle.offsetWidth * 0.02; // Reduced from 0.05
        const x = (window.innerWidth / 2 - e.pageX) * speed;
        const y = (window.innerHeight / 2 - e.pageY) * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add this to your existing CSS (in styles.css)
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(0) translateX(20px);
        }
        75% {
            transform: translateY(20px) translateX(10px);
        }
    }
`;
document.head.appendChild(style);

// Add after DOM content loaded event handler

function showToast(message, duration = 3000) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create and show new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove toast after duration
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Update click handler for project links
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-link')) {
        const href = e.target.getAttribute('href');
        if (href === 'https://github.com/gtsrhythm/Lide') {
            return; // Allow normal link behavior for LIDE
        }
        e.preventDefault();
        const message = e.target.dataset.message || 'This is a private project. Links are not available to the public.';
        showToast(message);
    }
});
