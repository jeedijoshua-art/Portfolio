/**
 * Main application script
 * Handles initialization of animations, dynamic cursor, theme toggling, and typing effects.
 */

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Modern Reactive Cursor Implementation
(function () {
    // Only enable on non-touch desktop devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth <= 768) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isVisible = false;

    // Interactive elements that trigger the hover effect
    const hoverTargets = 'a, button, .btn, .social-btn, .skill-tag, #theme-toggle, .project-card';

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
            isVisible = true;
            dot.classList.add('active');
            ring.classList.add('active');
        }
    });

    document.addEventListener('mousedown', () => {
        dot.classList.add('click');
        ring.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        dot.classList.remove('click');
        ring.classList.remove('click');
    });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        dot.classList.remove('active');
        ring.classList.remove('active');
    });

    document.addEventListener('mouseenter', () => {
        isVisible = true;
        dot.classList.add('active');
        ring.classList.add('active');
    });

    // Hover detection on interactive elements
    document.querySelectorAll(hoverTargets).forEach((el) => {
        el.addEventListener('mouseenter', () => {
            dot.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            dot.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });

    // Smooth animation loop: dot follows instantly, ring follows with lerp
    function animate() {
        // Dot follows cursor directly
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';

        // Ring follows with smooth delay (lerp)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(animate);
    }
    animate();
})();


// Theme Toggle Functionality
const themeBtn = document.getElementById('theme-toggle');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Check local storage for previously selected theme
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

// Typing Effect Script setup
const typingText = document.querySelector('.typing-text');
// The set of roles to rotate through
const phrases = ['CS Student', 'Python Programmer', 'Problem Solver', 'Tech Enthusiast'];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    // Pause briefly before deleting, and after typing a full phrase
    if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect when the document is fully loaded
document.addEventListener('DOMContentLoaded', type);
