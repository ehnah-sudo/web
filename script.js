/* PAGE SWITCHER */
function goTo(num){
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById("page" + num).style.display = "block";

    if(num === 2) startGame();
    if(num === 5) startTypewriter();
}

/* CLICK + VIBRATE */
function playClick(){
    const click = new Audio("click.b.m4a");
    click.play();
    if(navigator.vibrate) navigator.vibrate(80);
}

/* BGM FADE-IN */
document.addEventListener("click", () => {
    const bgm = document.getElementById("bgm");
    if(bgm.paused){
        bgm.volume = 0;
        bgm.play();
        let fade = setInterval(() => {
            if(bgm.volume < 1){
                bgm.volume = Math.min(bgm.volume + 0.05,1);
            } else clearInterval(fade);
        },150);
    }
});

/* MEMORY GAME */
const icons = ["❤️","❤️","⭐","⭐","⚪","⚪","💖","💖","🌸","🌸","✨","✨"];
let firstCard=null, secondCard=null, lockBoard=false, moves=0;

function startGame(){
    const board = document.getElementById("gameBoard");
    board.innerHTML = "";
    moves=0;
    document.getElementById("moves").innerText = "Moves: 0";
    firstCard=null;
    secondCard=null;
    lockBoard=false;
    document.getElementById("nextBtn").disabled = true;

    let shuffled = [...icons].sort(()=>Math.random()-0.5);
    shuffled.forEach(icon=>{
        let card=document.createElement("div");
        card.className="card";
        card.dataset.value=icon;
        card.innerText="?";
        card.onclick=()=>flip(card);
        board.appendChild(card);
    });
}

function flip(card){
    if(lockBoard || card===firstCard) return;
    card.innerText=card.dataset.value;
    card.classList.add("flipped");
    if(!firstCard){ firstCard=card; return; }

    moves++;
    document.getElementById("moves").innerText="Moves: "+moves;
    secondCard=card;
    checkMatch();
}

function checkMatch(){
    if(firstCard.dataset.value===secondCard.dataset.value){
        firstCard.onclick=null;
        secondCard.onclick=null;
        const allFlipped=Array.from(document.querySelectorAll(".card")).every(c=>c.classList.contains("flipped"));
        if(allFlipped) document.getElementById("nextBtn").disabled=false;
        resetTurn();
    } else {
        lockBoard=true;
        setTimeout(()=>{
            firstCard.innerText="?";
            secondCard.innerText="?";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        },350);
    }
}

function resetTurn(){ [firstCard,secondCard,lockBoard]=[null,null,false]; }

/* TYPEWRITER */
const typewriterText = "Watching you laugh, seeing the little things you do, it makes everything feel brighter. Sometimes I just let my mind wander, imagining moments that maybe will never happen. And even if it’s just from afar… mengagumimu dari jauh juga tidak apa-apa, kan?";
function startTypewriter(){
    const el = document.getElementById("typewriter");
    el.innerText = "";
    let i = 0;
    const interval = setInterval(()=>{
        if(i < typewriterText.length){
            el.innerText += typewriterText.charAt(i);
            i++;
        } else clearInterval(interval);
    },50);
}