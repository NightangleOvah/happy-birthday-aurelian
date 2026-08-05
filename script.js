
/* ==========================================
   PROJECT AURORA
   SCRIPT PART 1
========================================== */

// Elements
const intro = document.getElementById("intro");
const website = document.getElementById("website");

const openGift = document.getElementById("openGift");
const celebrate = document.getElementById("celebrate");

const overlay = document.getElementById("birthdayOverlay");
const closeOverlay = document.getElementById("closeOverlay");

const cursorGlow = document.getElementById("cursorGlow");

const musicButton = document.getElementById("music");

// Hide overlay at startup
if (overlay) {
    overlay.style.display = "none";
}

// Hide website until gift opens
if (website) {
    website.style.display = "none";
}

// Gift opening
if (openGift) {
    openGift.addEventListener("click", () => {

        openGift.disabled = true;

        intro.style.transition = "1.2s";
        intro.style.opacity = "0";
        intro.style.transform = "scale(1.05)";

        setTimeout(() => {

            intro.style.display = "none";

            website.style.display = "block";

            website.style.opacity = "0";

            website.style.transition = "1.4s";

            requestAnimationFrame(() => {
                website.style.opacity = "1";
            });

            launchConfetti();

        },1200);

    });
}

// Celebrate button
if (celebrate) {

    celebrate.addEventListener("click",()=>{

        overlay.style.display="flex";

        overlay.animate([
            {
                opacity:0,
                transform:"scale(.9)"
            },
            {
                opacity:1,
                transform:"scale(1)"
            }
        ],{
            duration:500,
            fill:"forwards"
        });

        launchConfetti();

    });

}

// Close overlay
if(closeOverlay){

closeOverlay.addEventListener("click",()=>{

overlay.style.display="none";

});

}

// Cursor Glow (Desktop)
document.addEventListener("mousemove",(e)=>{

cursorGlow.style.left=e.clientX+"px";
cursorGlow.style.top=e.clientY+"px";

});

// Touch Support (Mobile)
document.addEventListener("touchmove",(e)=>{

const touch=e.touches[0];

cursorGlow.style.left=touch.clientX+"px";
cursorGlow.style.top=touch.clientY+"px";

});

// Music button (placeholder)
if(musicButton){

musicButton.addEventListener("click",()=>{

alert("🎵 Music will be added in Version 3!");

});

}

// Placeholder function
function launchConfetti(){

// Part 2 will replace this
console.log("Confetti!");
  
  
  

}/* 
