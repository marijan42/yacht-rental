document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = 'auto';
    }, 2000);

    // --- 2. Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Scroll Animations (Repeater) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-anim');
            } else {
                // Remove class when scrolling away to trigger animation again later
                entry.target.classList.remove('active-anim');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

    // --- 4. NEW Two-Part Cursor Logic ---
    const cursor = document.querySelector('.cursor'); // The Ring
    const cursorDot = document.querySelector('.cursor-dot'); // The Dot
    const hoverTargets = document.querySelectorAll('.hover-target');

    document.addEventListener('mousemove', (e) => {
        // Move the Ring (slightly delayed for "drag" feel if desired, but keeping tight here)
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Move the Dot
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Add visual cues when hovering over interesting things
    hoverTargets.forEach(t => {
        t.addEventListener('mouseenter', () => {
            cursor.classList.add('active'); // Ring expands
            // Optional: You could hide the dot if you want a cleaner "target" look
            // cursorDot.style.opacity = '0';
        });
        t.addEventListener('mouseleave', () => {
            cursor.classList.remove('active'); // Ring shrinks
            // cursorDot.style.opacity = '1';
        });
    });
    // --- 5. MOBILE MENU TOGGLE ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle the navigation
        navLinks.classList.toggle('open');

        // Change icon from Bars to X
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.querySelector('i').classList.remove('fa-xmark');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });
});