// theme switcher
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
}

// scroll of header
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 200);
});



// hero slider
const carouselSlide = document.querySelector('.carousel-slide');
const slides = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
const slideWidth = slides[0].clientWidth;

// Function to update the slide position
function updateSlidePosition() {
    carouselSlide.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots(); // Update progress indicators
}

// Function to update progress indicators
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
}

// Left Button Event
leftBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Pause auto-slide on manual interaction
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateSlidePosition();
    restartAutoSlide();
});

// Right Button Event
rightBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Pause auto-slide on manual interaction
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
    restartAutoSlide();
});

// Auto-Slide Functionality
let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
}, 3000); // Change slide every 2 seconds

// Restart Auto-Slide
function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }, 3000);
}

// Swipe Functionality
let startX = 0;
let endX = 0;

carouselSlide.addEventListener('touchstart', (e) => {
    clearInterval(autoSlideInterval); // Pause auto-slide on manual interaction
    startX = e.touches[0].clientX;
});

carouselSlide.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        // Swipe Left
        currentIndex = (currentIndex + 1) % slides.length;
    } else if (startX < endX - 50) {
        // Swipe Right
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    }
    updateSlidePosition();
    restartAutoSlide(); // Resume auto-slide after swipe
});

// Initialize Progress Indicators
updateDots();


// notification cross
const closeBtn = document.querySelector('.close-btn');
const notificationBar = document.querySelector('.notification-bar');

closeBtn.addEventListener('click', () => {
    notificationBar.style.display = 'none';
});



