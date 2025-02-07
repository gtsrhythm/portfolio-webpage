class AdvancedAnimations {
    constructor() {
        this.initGSAP();
        this.setupScrollTrigger();
        this.setupParallax();
        this.setupAboutAnimations();
        this.initTiltEffect();
        this.setupContactAnimations();
    }

    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Smooth scroll setup
        gsap.config({
            autoSleep: 60,
            force3D: true
        });
    }

    setupScrollTrigger() {
        // Batch timeline items for staggered reveal
        const timelineItems = gsap.utils.toArray('.timeline-item');
        
        gsap.set(timelineItems, {
            opacity: 0,
            y: 100,
            filter: "blur(10px)",
            scale: 0.9
        });

        ScrollTrigger.batch(timelineItems, {
            start: "top 85%",
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                stagger: 0.2,
                duration: 1,
                ease: "power4.out"
            }),
            onLeaveBack: batch => gsap.to(batch, {
                opacity: 0,
                y: 100,
                filter: "blur(10px)",
                scale: 0.9,
                stagger: 0.1,
                duration: 0.5
            })
        });

        // Animate timeline line drawing
        gsap.from('.timeline::before', {
            scrollTrigger: {
                trigger: '.timeline',
                start: "top 60%",
                end: "bottom 80%",
                scrub: true
            },
            scaleY: 0,
            transformOrigin: "top center"
        });

        // Animate dots with pop effect
        gsap.utils.toArray('.timeline-dot').forEach(dot => {
            gsap.from(dot, {
                scrollTrigger: {
                    trigger: dot,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                scale: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });

        // Animate timeline dates
        gsap.utils.toArray('.timeline-date').forEach(date => {
            gsap.from(date, {
                scrollTrigger: {
                    trigger: date,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: date.closest('.timeline-item:nth-child(odd)') ? 50 : -50,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    setupParallax() {
        gsap.utils.toArray('[data-speed]').forEach(element => {
            const speed = element.getAttribute('data-speed');
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
                y: (i, target) => {
                    return (ScrollTrigger.maxScroll(window) * speed * 0.1);
                }
            });
        });
    }

    // Add mouse parallax effect
    addMouseParallax() {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            gsap.utils.toArray('.timeline-content').forEach(content => {
                const depth = 30;
                const moveX = (clientX - centerX) * 0.01;
                const moveY = (clientY - centerY) * 0.01;

                gsap.to(content, {
                    duration: 1,
                    x: moveX,
                    y: moveY,
                    rotateX: moveY * 0.05,
                    rotateY: -moveX * 0.05,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupAboutAnimations() {
        // Animate about cards
        gsap.utils.toArray('.about-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: "power2.out"
            });
        });

        // Animate skill pills
        gsap.utils.toArray('.skill-pill').forEach((pill, i) => {
            gsap.from(pill, {
                scrollTrigger: {
                    trigger: '.skill-container',
                    start: "top 80%"
                },
                scale: 0,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: "back.out(1.7)"
            });
        });
    }

    setupContactAnimations() {
        gsap.utils.toArray('.contact-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: "power2.out"
            });
        });
    }

    initTiltEffect() {
        const cards = document.querySelectorAll('[data-tilt]');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
});
