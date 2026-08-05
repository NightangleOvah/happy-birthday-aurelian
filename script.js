// Birthday music (optional)
function playMusic(){
    const music = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_4a7dba3df9.mp3?filename=happy-birthday-112194.mp3");
    music.play();
}

// Reveal surprise
function revealSurprise(){
    document.getElementById("surprise").style.display="block";
    launchConfetti();
}

// Confetti
function launchConfetti(){
    for(let i=0;i<150;i++){
        let conf=document.createElement("div");
        conf.innerHTML="🎉";
        conf.style.position="fixed";
        conf.style.left=Math.random()*100+"vw";
        conf.style.top="-20px";
        conf.style.fontSize=(20+Math.random()*30)+"px";
        conf.style.animation=`fall ${4+Math.random()*3}s linear forwards`;
        document.body.appendChild(conf);

        setTimeout(()=>conf.remove(),7000);
    }
}

// Easter Egg
let clicks=0;
document.addEventListener("click",()=>{
    clicks++;
    if(clicks==20){
        alert("🥚 Easter Egg Unlocked!\n\nAurelian, you're officially the coolest unc on Earth 😂❤️");
    }
});

// Floating balloons
for(let i=0;i<15;i++){
    let balloon=document.createElement("div");
    balloon.innerHTML=["🎈","🎉","🎂","🎁"][Math.floor(Math.random()*4)];
    balloon.style.position="fixed";
    balloon.style.left=Math.random()*100+"vw";
    balloon.style.bottom="-60px";
    balloon.style.fontSize=(30+Math.random()*20)+"px";
    balloon.style.animation=`floatUp ${10+Math.random()*6}s linear infinite`;
    balloon.style.animationDelay=Math.random()*5+"s";
    document.body.appendChild(balloon);
}
