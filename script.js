// ===== GLOBAL VARIABLES =====
let currentPage = 1;
const totalPages = 7;
const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const pageIndicator = document.getElementById('page-indicator');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeBackgroundAnimations();
    initializeSlideshows();
    initializeNavigation();
    initializeMusicControl();
    
    // Show first page
    updatePageIndicator();
});

// ===== BACKGROUND ANIMATIONS =====
function initializeBackgroundAnimations() {
    createFloatingHearts();
    createFallingPetals();
}

function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(heart);
    }
}

function createFallingPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 25;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 8 + 10) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        const size = Math.random() * 10 + 10;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        container.appendChild(petal);
    }
}

// ===== PHOTO SLIDESHOWS =====
function initializeSlideshows() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        const slideshow = page.querySelector('.photo-slideshow');
        if (slideshow) {
            const images = slideshow.querySelectorAll('.slideshow-img');
            if (images.length > 1) {
                let currentIndex = 0;
                const isSlowSlideshow = slideshow.classList.contains('slow');
                const interval = isSlowSlideshow ? 5000 : 4000;
                
                setInterval(() => {
                    images[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].classList.add('active');
                }, interval);
            }
        }
    });
}

// ===== PAGE NAVIGATION =====
function initializeNavigation() {
    // Next buttons
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextPageId = btn.getAttribute('data-next');
            navigateToPage(nextPageId);
        });
    });
    
    // Replay button (Page 7)
    const replayBtn = document.getElementById('replay-btn');
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            navigateToPage('page1');
        });
    }
    
    // Download button (Page 7)
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadMemories);
    }
}

function navigateToPage(pageId) {
    // Remove active class from current page
    const currentPageElement = document.querySelector('.page.active');
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // Add active class to new page
    const newPageElement = document.getElementById(pageId);
    if (newPageElement) {
        newPageElement.classList.add('active');
        
        // Update current page number
        currentPage = parseInt(pageId.replace('page', ''));
        updatePageIndicator();
        
        // Trigger confetti on page 7
        if (currentPage === 7) {
            setTimeout(() => {
                createConfetti();
            }, 500);
        }
    }
}

function updatePageIndicator() {
    pageIndicator.textContent = `${currentPage}/${totalPages}`;
}

// ===== MUSIC CONTROL =====
function initializeMusicControl() {
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.querySelector('.play-icon').classList.remove('hidden');
            musicToggle.querySelector('.pause-icon').classList.add('hidden');
        } else {
            music.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
            musicToggle.querySelector('.play-icon').classList.add('hidden');
            musicToggle.querySelector('.pause-icon').classList.remove('hidden');
        }
        isPlaying = !isPlaying;
    });
    
    // Auto-play attempt (may be blocked by browser)
    setTimeout(() => {
        music.play().then(() => {
            musicToggle.querySelector('.play-icon').classList.add('hidden');
            musicToggle.querySelector('.pause-icon').classList.remove('hidden');
            isPlaying = true;
        }).catch(err => {
            console.log('Auto-play prevented. User must click play button.');
        });
    }, 1000);
}

// ===== CONFETTI EFFECT (PAGE 7) =====
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiCount = 100;
    const colors = ['#E63946', '#FFB3C1', '#FFC8DD', '#FFD700', '#FF6B7A'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// ===== DOWNLOAD MEMORIES FUNCTION =====
function downloadMemories() {
    // Create a simple HTML page that displays all images
    const galleryHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Beautiful Memories ❤️</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #1a0000 0%, #330011 50%, #1a0000 100%);
            color: white;
            padding: 2rem;
        }
        h1 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 2rem;
            color: #FFB3C1;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 1400px;
            margin: 0 auto;
        }
        .photo-item {
            position: relative;
            overflow: hidden;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease;
        }
        .photo-item:hover {
            transform: scale(1.05);
        }
        .photo-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
        .download-info {
            text-align: center;
            margin-top: 3rem;
            padding: 2rem;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 15px;
            max-width: 600px;
            margin: 3rem auto;
        }
        .download-btn {
            display: inline-block;
            margin-top: 1rem;
            padding: 1rem 2rem;
            background: #E63946;
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }
        .download-btn:hover {
            background: #FFB3C1;
            transform: translateY(-3px);
        }
    </style>
</head>
<body>
    <h1>Our Beautiful Memories ❤️🌹</h1>
    <div class="gallery">
        ${generateGalleryImages()}
    </div>
    <div class="download-info">
        <p>Right-click on any image and select "Save Image As..." to download individual photos.</p>
        <p style="margin-top: 1rem;">To download all photos at once, please ensure all images are in the /images folder.</p>
    </div>
</body>
</html>
    `;
    
    // Create a blob and download it
    const blob = new Blob([galleryHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Our-Memories-Gallery.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show confirmation
    alert('📸 Gallery downloaded! Open the HTML file to view all our memories. ❤️');
}

function generateGalleryImages() {
    let html = '';
    for (let page = 1; page <= 7; page++) {
        for (let img = 1; img <= 4; img++) {
            html += `
        <div class="photo-item">
            <img src="images/page${page}_${img}.jpg" alt="Memory from Page ${page}" onerror="this.parentElement.style.display='none'">
        </div>`;
        }
    }
    return html;
}

// ===== EASTER EGGS & ENHANCEMENTS =====

// Add sparkle effect on cursor (optional enhancement)
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add CSS for sparkle fade animation
const style = document.createElement('style');
style.textContent = `
@keyframes sparkle-fade {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}
`;
document.head.appendChild(style);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < totalPages) {
        navigateToPage(`page${currentPage + 1}`);
    } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        navigateToPage(`page${currentPage - 1}`);
    }
});

console.log('💕 Valentine\'s Day Website Loaded Successfully! 💕');
