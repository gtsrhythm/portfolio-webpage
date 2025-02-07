class ScrollAnimator {
    constructor() {
        this.lastScroll = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.addScrollListener();
        this.initializeElements();
    }

    addScrollListener() {
        window.addEventListener('scroll', () => {
            this.lastScroll = window.scrollY;
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    initializeElements() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('scroll-animate');
            if (!section.classList.contains('hero')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
            }
        });
    }

    handleScroll() {
        const scrollPosition = window.scrollY + window.innerHeight * 0.8;
        const elements = document.querySelectorAll('.scroll-animate');

        elements.forEach(element => {
            if (element.offsetTop <= scrollPosition) {
                if (!element.classList.contains('hero')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
                this.parallaxEffect(element);
            }
        });
    }

    parallaxEffect(element) {
        const speed = element.dataset.speed || 0.2;
        const yPos = -(window.scrollY * speed);
        element.style.backgroundPositionY = `${yPos}px`;
    }
}
