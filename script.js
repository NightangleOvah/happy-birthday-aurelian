document.addEventListener('DOMContentLoaded', () => {

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isTabActive = true;

    // --- Tab Visibility Manager for Performance ---
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
    });

    // --- 1. Sound FX Engine (Web Audio API) ---
    class SoundEffects {
        constructor() { this.ctx = null; }
        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
        }
        playWhoosh() {
            if (!this.ctx || isReducedMotion || !isTabActive) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.3);
        }
        playSparkle() {
            if (!this.ctx || isReducedMotion || !isTabActive) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.2);
        }
    }
    const sfx = new SoundEffects();

    // --- 2. Advanced Velocity Physics Cursor Engine ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let lastX = 0, lastY = 0;

    if (cursorDot && cursorOutline && !isReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        function renderCursor() {
            if (isTabActive) {
                const vx = mouseX - lastX;
                const vy = mouseY - lastY;
                const speed = Math.min(Math.sqrt(vx * vx + vy * vy), 50);
                
                outlineX += (mouseX - outlineX) * 0.15;
                outlineY += (mouseY - outlineY) * 0.15;

                const scaleX = 1 + (speed * 0.015);
                const scaleY = 1 - (speed * 0.008);
                const angle = Math.atan2(vy, vx) * (180 / Math.PI);

                cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
                
                lastX = mouseX;
                lastY = mouseY;
            }
            requestAnimationFrame(renderCursor);
        }
        renderCursor();
    }

    // --- 3. Atmospheric Starfield Canvas ---
    let initParticlesFlag = false;
    function initAtmosphere() {
        if (initParticlesFlag) return;
        initParticlesFlag = true;

        const canvas = document.getElementById('aurora-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle3D {
            constructor() { this.reset(); }
            reset() {
                this.x = (Math.random() - 0.5) * 2000;
                this.y = (Math.random() - 0.5) * 2000;
                this.z = Math.random() * 2000;
            }
            update() {
                this.z -= 1.2;
                if (this.z < 1) this.reset();
            }
            draw() {
                const fov = 300;
                const sx = (this.x / this.z) * fov + width / 2;
                const sy = (this.y / this.z) * fov + height / 2;
                const size = (2000 - this.z) / 800;

                if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, Math.max(0.1, size), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 242, 254, ${1 - this.z / 2000})`;
                    ctx.fill();
                }
            }
        }

        for (let i = 0; i < 250; i++) particles.push(new Particle3D());

        function animateCanvas() {
            if (isTabActive) {
                ctx.fillStyle = 'rgba(3, 3, 7, 0.25)';
                ctx.fillRect(0, 0, width, height);
                particles.forEach(p => { p.update(); p.draw(); });
            }
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    // --- 4. Portrait Canvas Particle Engine ---
    const portraitCanvas = document.getElementById('portrait-particles');
    if (portraitCanvas) {
        const pCtx = portraitCanvas.getContext('2d');
        let pWidth = portraitCanvas.width = 350;
        let pHeight = portraitCanvas.height = 400;
        let pArray = [];

        for (let i = 0; i < 30; i++) {
            pArray.push({
                x: Math.random() * pWidth,
                y: Math.random() * pHeight,
                r: Math.random() * 2 + 1,
                vy: Math.random() * -0.4 - 0.1
            });
        }

        function renderPortraitParticles() {
            if (isTabActive) {
                pCtx.clearRect(0, 0, pWidth, pHeight);
                pArray.forEach(p => {
                    p.y += p.vy;
                    if (p.y < 0) p.y = pHeight;
                    pCtx.beginPath();
                    pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    pCtx.fillStyle = 'rgba(0, 242, 254, 0.4)';
                    pCtx.fill();
                });
            }
            requestAnimationFrame(renderPortraitParticles);
        }
        renderPortraitParticles();
    }

    // --- 5. Timed Intro Controller & Focus Management ---
    const introStatus = document.getElementById('intro-status-text');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const clickHint = document.getElementById('click-hint');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const heroHeading = document.getElementById('hero-heading');

    if (introStatus) {
        setTimeout(() => { introStatus.textContent = "Collecting Memories..."; }, 1200);
        setTimeout(() => { introStatus.textContent = "One Last Thing..."; }, 2400);
        setTimeout(() => {
            introStatus.textContent = "Your Experience is Ready";
            if (openGiftBtn) openGiftBtn.classList.add('visible');
            if (clickHint) clickHint.classList.add('visible');
            if (openGiftBtn) openGiftBtn.focus();
        }, 3400);
    }

    function unlockPage() {
        sfx.init();
        sfx.playWhoosh();
        initAtmosphere();

        if (introScreen) {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.classList.remove('locked');
                    mainContent.setAttribute('aria-hidden', 'false');
                    if (heroHeading) heroHeading.focus();
                }
            }, 1200);
        }
    }

    if (openGiftBtn) openGiftBtn.addEventListener('click', unlockPage);
    const skipBtn = document.getElementById('skip-intro-btn');
    if (skipBtn) skipBtn.addEventListener('click', unlockPage);

    // --- 6. Scroll Engine: Navigation Highlight, Underline Indicator & Line Drawing ---
    const nav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const timelineLine = document.getElementById('timeline-line-path');

    function updateNavIndicator(activeLink) {
        if (!navIndicator || !activeLink) return;
        const rect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('.nav-links').getBoundingClientRect();
        navIndicator.style.left = `${rect.left - navRect.left}px`;
        navIndicator.style.width = `${rect.width}px`;
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Shrink Navbar
        if (nav) {
            if (scrollY > 60) nav.classList.add('shrunk');
            else nav.classList.remove('shrunk');
        }

        // Active Section Navigation Tracking
        let currentSectionId = '';
        sections.forEach(section => {
            const top = section.offsetTop - 200;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
                updateNavIndicator(link);
            }
        });

        // Timeline SVG Line Scroll Progress
        if (timelineLine) {
            const track = document.getElementById('timeline-track');
            if (track) {
                const rect = track.getBoundingClientRect();
                const totalHeight = rect.height;
                const visible = window.innerHeight - rect.top;
                const progress = Math.max(0, Math.min(1, visible / totalHeight));
                timelineLine.style.strokeDashoffset = 1000 - (progress * 1000);
            }
        }
    });

    // Initialize indicator position
    const initialActive = document.querySelector('.nav-link.active');
    if (initialActive) updateNavIndicator(initialActive);

    // --- 7. Magnetic Buttons & 3D Tilt Cards ---
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            if (isReducedMotion) return;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.transition = 'transform var(--duration-fast) ease';
        });
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'none';
            sfx.playSparkle();
        });
    });

    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (isReducedMotion) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${(y / (rect.height / 2)) * -6}deg) rotateY(${(x / (rect.width / 2)) * 6}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform var(--duration-card) ease';
        });
        card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
    });

    // --- 8. Intersection Observer for Reveals ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

    // --- 9. Finale Closing Sequence & Accessible Ending Overlay ---
    const celebrateBtn = document.getElementById('celebrate-btn');
    const heroCelebrateBtn = document.getElementById('hero-celebrate-btn');
    const endingModal = document.getElementById('ending-screen');
    const replayBtn = document.getElementById('replay-btn');

    function triggerCelebration() {
        sfx.init();
        sfx.playWhoosh();
        
        const glow = document.querySelector('.ambient-glow');
        if (glow) {
            glow.style.filter = 'blur(30px)';
            glow.style.opacity = '1';
        }

        setTimeout(() => {
            if (endingModal) {
                endingModal.classList.add('visible');
                endingModal.setAttribute('aria-hidden', 'false');
                if (replayBtn) replayBtn.focus();
            }
        }, 2200);
    }

    if (celebrateBtn) celebrateBtn.addEventListener('click', triggerCelebration);
    if (heroCelebrateBtn) heroCelebrateBtn.addEventListener('click', () => {
        const finaleSec = document.getElementById('finale');
        if (finaleSec) finaleSec.scrollIntoView({ behavior: 'smooth' });
    });

    if (replayBtn && endingModal) {
        replayBtn.addEventListener('click', () => {
            endingModal.classList.remove('visible');
            endingModal.setAttribute('aria-hidden', 'true');
            if (celebrateBtn) celebrateBtn.focus();
        });
    }
});
    

