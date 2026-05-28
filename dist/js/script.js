// Navbar-Fixed and Back-to-Top Button
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;
    const toTop = document.querySelector('#to-top');

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    } else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
};

// Hamburger Navigation Menu
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// Click outside hamburger to close menu
window.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

// Theme Toggle Premium Button Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');

function updateThemeIcons() {
    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleDarkIcon.classList.add('hidden');
    } else {
        themeToggleLightIcon.classList.add('hidden');
        themeToggleDarkIcon.classList.remove('hidden');
    }
}

// Set initial icons on load
updateThemeIcons();

themeToggleBtn.addEventListener('click', function() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
    updateThemeIcons();
});

// Interactive Portfolio Filter
const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class styling from all buttons
        filterBtns.forEach(b => {
            b.classList.remove('bg-primary', 'text-white', 'border-teal-500', 'shadow-md', 'shadow-teal-500/10');
            b.classList.add('bg-white', 'dark:bg-slate-900/80', 'text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-800');
        });
        // Add active class styling to current button
        btn.classList.add('bg-primary', 'text-white', 'border-teal-500', 'shadow-md', 'shadow-teal-500/10');
        btn.classList.remove('bg-white', 'dark:bg-slate-900/80', 'text-slate-600', 'dark:text-slate-300', 'border-slate-200', 'dark:border-slate-800');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden-item');
            } else {
                item.classList.add('hidden-item');
            }
        });
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only trigger once
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Contact Form mailto link builder
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const bodyTemplate = `Hi Ady,\n\nMy name is ${name} (${email}).\n\n${message}`;
        const mailtoUrl = `mailto:adysaputra680@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyTemplate)}`;
        
        window.location.href = mailtoUrl;
    });
}
