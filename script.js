(() => {
  "use strict";

  const intro = document.querySelector("#intro");
  const main = document.querySelector("#main-content");
  const enterButton = document.querySelector("#enter-button");
  const skipButton = document.querySelector("#skip-button");
  const navLinks = [...document.querySelectorAll(".nav__link")];
  const soundToggle = document.querySelector("#sound-toggle");
  const soundLabel = document.querySelector("#sound-label");
  const celebration = document.querySelector("#celebration");
  const celebrateButton = document.querySelector("#celebrate-button");
  const closeCelebration = document.querySelector("#close-celebration");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lastFocused = null;
  let audioContext = null;
  let ambience = null;

  const unlock = () => {
    if (!intro || intro.classList.contains("is-hidden")) return;
    intro.classList.add("is-hidden");
    main.classList.remove("is-locked");
    document.body.classList.remove("modal-open");
    document.querySelector("#hero-title")?.focus({ preventScroll: true });
    window.setTimeout(() => document.querySelector("#home")?.querySelector(".reveal")?.classList.add("is-visible"), 80);
  };

  enterButton?.addEventListener("click", () => { unlock(); initSound(); });
  skipButton?.addEventListener("click", unlock);

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: "-20% 0px -55% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" }));
  });

  function initSound() {
    if (audioContext) {
      if (audioContext.state === "suspended") audioContext.resume();
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext = new AudioCtx();
    const master = audioContext.createGain();
    master.gain.value = 0.018;
    master.connect(audioContext.destination);

    const oscA = audioContext.createOscillator();
    const oscB = audioContext.createOscillator();
    oscA.type = "sine"; oscB.type = "triangle";
    oscA.frequency.value = 261.63; oscB.frequency.value = 392;
    const gainA = audioContext.createGain(); const gainB = audioContext.createGain();
    gainA.gain.value = 0.18; gainB.gain.value = 0.08;
    oscA.connect(gainA).connect(master); oscB.connect(gainB).connect(master);
    oscA.start(); oscB.start();
    ambience = { master, oscA, oscB };
    soundToggle.setAttribute("aria-pressed", "true");
    soundLabel.textContent = "Sound on";
  }

  soundToggle?.addEventListener("click", () => {
    if (!audioContext) { initSound(); return; }
    const enabled = soundToggle.getAttribute("aria-pressed") === "true";
    if (enabled) {
      ambience.master.gain.setTargetAtTime(0, audioContext.currentTime, 0.08);
      soundToggle.setAttribute("aria-pressed", "false");
      soundLabel.textContent = "Sound off";
    } else {
      audioContext.resume();
      ambience.master.gain.setTargetAtTime(0.018, audioContext.currentTime, 0.08);
      soundToggle.setAttribute("aria-pressed", "true");
      soundLabel.textContent = "Sound on";
    }
  });

  function openCelebration() {
    if (!celebration) return;
    lastFocused = document.activeElement;
    celebration.classList.add("is-visible");
    celebration.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeCelebration?.focus();
    if (!reducedMotion.matches && audioContext && ambience) {
      ambience.oscA.frequency.setTargetAtTime(329.63, audioContext.currentTime, 0.25);
      ambience.oscB.frequency.setTargetAtTime(523.25, audioContext.currentTime, 0.25);
    }
  }

  function closeCelebrationModal() {
    if (!celebration) return;
    celebration.classList.remove("is-visible");
    celebration.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocused?.focus?.();
  }

  celebrateButton?.addEventListener("click", () => {
    initSound();
    openCelebration();
  });
  closeCelebration?.addEventListener("click", closeCelebrationModal);
  celebration?.addEventListener("click", (event) => {
    if (event.target.classList.contains("celebration__backdrop")) closeCelebrationModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && celebration?.classList.contains("is-visible")) closeCelebrationModal();
  });
})();
