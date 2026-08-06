// Mouse Follow Glow Effect
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}값이 맞지않음` // handled by standard coords below
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
});

// Intro Screen Transition & Gift Open
const openGiftBtn = document.getElementById('open-gift-btn');
const giftBox = document.getElementById('gift-box');
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function revealWebsite() {
    introScreen.style.opacity = '0';
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 800);
}

openGiftBtn.addEventListener('click', () => {
    revealWebsite();
    bgMusic.play().catch(() => {});
    musicBtn.textContent = '🎵 Music: On';
});

giftBox.addEventListener('click', () => {
    revealWebsite();
    bgMusic.play().catch(() => {});
    musicBtn.textContent = '🎵 Music: On';
});

// Music Toggle Button
let isPlaying = false;
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🎵 Music: Off';
    } else {
        bgMusic.play();
        musicBtn.textContent = '🎵 Music: On';
    }
    isPlaying = !isPlaying;
});

