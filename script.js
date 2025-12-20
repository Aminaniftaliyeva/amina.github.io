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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Profile image loading with fallbacks
const profileImage = document.getElementById('profileImage');
if (profileImage) {
    // Check if image failed to load and try alternatives
    profileImage.addEventListener('error', function() {
        const imageSources = [
            'assets/image.png',
            './assets/image.png',
            'assets/image.jpg',
            './assets/image.jpg',
            'assets/images/profile.jpg',
            './assets/images/profile.jpg',
            'assets/images/profile.png',
            './assets/images/profile.png',
            'assets/images/image.jpg',
            'assets/images/image.png',
            './profile.jpg',
            'profile.jpg',
            './profile.png',
            'profile.png',
            './photo.jpg',
            'photo.jpg'
        ];
        
        let currentIndex = 0;
        const originalSrc = profileImage.src;
        
        function tryLoadImage() {
            if (currentIndex < imageSources.length) {
                const img = new Image();
                img.onload = function() {
                    profileImage.src = imageSources[currentIndex];
                    profileImage.style.display = 'block';
                };
                img.onerror = function() {
                    currentIndex++;
                    if (currentIndex < imageSources.length) {
                        tryLoadImage();
                    } else {
                        // If no image found, keep trying or show placeholder
                        console.log('Profile image not found');
                    }
                };
                img.src = imageSources[currentIndex];
            }
        }
        
        // Only try alternatives if the original failed
        if (originalSrc && !originalSrc.includes('data:')) {
            tryLoadImage();
        }
    });
    
    // Ensure image is visible if it loads successfully
    profileImage.addEventListener('load', function() {
        profileImage.style.display = 'block';
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
