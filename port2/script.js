// 1. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Register GSAP
gsap.registerPlugin(ScrollTrigger);

// 3. Custom Cursor Follow Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with delay (using GSAP for smoothness)
    gsap.to(cursorOutline, {
        x: posX,
        y: posY,
        duration: 0.15,
        ease: "power2.out"
    });
});

// Hover effect for cursor
document.querySelectorAll('a, .project-item, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, { scale: 2.5, borderColor: 'transparent', backgroundColor: 'rgba(204, 255, 0, 0.1)' });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, { scale: 1, borderColor: '#ccff00', backgroundColor: 'transparent' });
    });
});

// 4. Hero Animation
const tl = gsap.timeline();
tl.from(".reveal", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out"
})
.from(".reveal-text", {
    opacity: 0,
    y: 20,
    duration: 0.8
}, "-=0.5")
.from(".hero-img", {
    scale: 1.2,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
}, "-=1");

// 5. Scroll Animations
// Fade in Bento Grid
gsap.from(".card", {
    scrollTrigger: {
        trigger: ".credentials",
        start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Project List Reveal
gsap.utils.toArray('.project-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%"
        },
        y: 50,
        opacity: 0,
        duration: 0.6
    });
});


/* --- BURGER MENU LOGIC --- */
const toggleBtn = document.getElementById('toggle-btn');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('.nav-link');
let isMenuOpen = false;

toggleBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        // OPEN MENU
        navOverlay.classList.add('active');
        toggleBtn.textContent = 'CLOSE';
        
        // Staggered Text Reveal Animation (GSAP)
        gsap.to(navLinks, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
        
    } else {
        // CLOSE MENU
        navOverlay.classList.remove('active');
        toggleBtn.textContent = 'MENU';
        
        // Reset links instantly so they can animate in next time
        gsap.to(navLinks, {
            y: "100%",
            opacity: 0,
            duration: 0.3
        });
    }
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        navOverlay.classList.remove('active');
        toggleBtn.textContent = 'MENU';
    });
});


