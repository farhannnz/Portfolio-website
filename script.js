// GSAP Animations and Three.js Setup
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Loading Screen Animation
    const loader = document.getElementById('loader');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderPercentage = document.querySelector('.loader-percentage');
    
    // Animate loading progress with percentage
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loaderPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            loaderPercentage.textContent = '100%';
        }
    }, 100);
    
    // GSAP progress animation
    gsap.to(loaderProgress, {
        width: '100%',
        duration: 3,
        ease: 'power2.inOut',
        onComplete: () => {
            // Add exit animation
            const tl = gsap.timeline();
            
            tl.to('.loader-icon', {
                scale: 1.2,
                duration: 0.3,
                ease: 'back.out(1.7)'
            })
            .to('.loader-content', {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            })
            .to(loader, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loader.style.display = 'none';
                    loader.style.visibility = 'hidden';
                    loader.style.zIndex = '-1';
                    console.log('✅ Loader completely hidden');
                    initAnimations();
                }
            });
        }
    });

    // Three.js Background Animation
    function initThreeJS() {
        const canvas = document.getElementById('hero-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#667eea',
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Initialize animations after loading
    function initAnimations() {
        initThreeJS();
        
        // Hero section animations
        const tl = gsap.timeline();
        
        tl.to('.hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        })
        .to('.title-line', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-stats', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.hero-buttons', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .to('.profile-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6');

        // Scroll-triggered animations
        gsap.utils.toArray('.about-card').forEach(card => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.utils.toArray('.skill-item').forEach((item, index) => {
            gsap.fromTo(item, {
                opacity: 0,
                scale: 0.8,
                y: 30
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {
                        // Animate skill level bars
                        const levelBar = item.querySelector('.level-bar');
                        if (levelBar) {
                            const level = levelBar.getAttribute('data-level');
                            gsap.to(levelBar, {
                                width: level + '%',
                                duration: 1.5,
                                delay: 0.5,
                                ease: 'power2.out'
                            });
                        }
                    }
                }
            });
        });

        gsap.utils.toArray('.timeline-card').forEach(card => {
            gsap.fromTo(card, {
                opacity: 0,
                x: -50
            }, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 50,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.utils.toArray('.award-item, .cert-item').forEach((item, index) => {
            gsap.fromTo(item, {
                opacity: 0,
                x: -30
            }, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        gsap.utils.toArray('.contact-card').forEach((card, index) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Contact form animation
        gsap.fromTo('.contact-form', {
            opacity: 0,
            x: 50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.contact-form',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    // SIMPLE HAMBURGER MENU - Initialize immediately
    initMobileMenu();

    // Smooth scrolling for navigation links
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

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit to Firebase
                const success = await window.submitToFirebase({
                    name: name,
                    email: email,
                    message: message
                });
                
                if (success) {
                    alert('Thank you for your message! I will get back to you soon.');
                    this.reset();
                } else {
                    throw new Error('Failed to submit');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact me directly at farhankhan862583@gmail.com');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Add floating animation to profile card
    gsap.to('.profile-card', {
        y: -15,
        rotation: 2,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });

    // Typing animation for hero subtitle
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 2000);
    }

    // Touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        // Add touch feedback for buttons
        const buttons = document.querySelectorAll('.btn, .social-link, .project-link');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Optimize animations for mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches) {
            // Reduce animation complexity on mobile
            gsap.globalTimeline.timeScale(1.5); // Speed up animations
            
            // Disable some heavy animations on mobile
            const heavyAnimations = document.querySelectorAll('.floating-shape, .particle-dot');
            heavyAnimations.forEach(element => {
                element.style.animation = 'none';
            });
        }
    }

    // Optimize scroll performance on mobile
    let ticking = false;
    function updateScrollEffects() {
        // Your scroll effects here
        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });

    // Parallax effect for hero section
    gsap.to('.hero-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Text reveal animation for section subtitles
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.fromTo(subtitle, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', (e) => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Cursor trail effect (optional enhancement)
    let cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1
        });
    });

    // Hide cursor trail on mobile and touch devices
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        cursor.style.display = 'none';
    }

    // Fix viewport height for mobile browsers
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setViewportHeight();

    // Handle window resize
    window.addEventListener('resize', () => {
        setViewportHeight();
        
        if (window.innerWidth <= 768 || 'ontouchstart' in window) {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block';
        }
        
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle orientation change for mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
});

// Utility function for random animations
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Add some random floating elements
function createFloatingElements() {
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.style.cssText = `
            position: fixed;
            width: ${randomBetween(4, 8)}px;
            height: ${randomBetween(4, 8)}px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${randomBetween(0, 100)}%;
            top: ${randomBetween(0, 100)}%;
        `;
        document.body.appendChild(element);
        
        gsap.to(element, {
            y: randomBetween(-100, 100),
            x: randomBetween(-100, 100),
            duration: randomBetween(10, 20),
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
    }
}

// Initialize floating elements after page load
window.addEventListener('load', createFloatingElements);