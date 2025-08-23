const gift = document.getElementById('gift');
const giftPage = document.getElementById('gift-page');
const wishPage = document.getElementById('wish-page');
const balloonsEl = document.getElementById('balloons');
const wishTextEl = document.getElementById('wish-text');
const sparklesEl = document.getElementById('sparkles');

const balloonMessages = ["🎁","🍰","🎉","💖","🌟","😊","🍬","🎈"];
let totalBalloons = 10; // fewer balloons

// Create sparkles on wish page
function createSparkles(count=50){
    for(let i=0;i<count;i++){
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = Math.random()*100 + '%';
        s.style.top = Math.random()*100 + '%';
        s.style.animationDuration = (0.8 + Math.random()*1.2)+'s';
        sparklesEl.appendChild(s);
    }
}

// Open gift
gift.addEventListener('click', ()=>{
    gift.classList.add('open');
    setTimeout(()=>{
        giftPage.classList.remove('show');
        giftPage.classList.add('hidden');
        wishPage.classList.remove('hidden');
        wishPage.classList.add('show');
        createSparkles();
        generateBalloons(totalBalloons);
        typeWriter("May your birthday be full of love, joy & happiness! 🎂");
        startWishGradient();
    },800);
});

// Typewriter effect
function typeWriter(text){
    let i=0;
    wishTextEl.textContent="";
    (function type(){
        if(i<text.length){
            wishTextEl.textContent+=text.charAt(i++);
            setTimeout(type,70);
        }
    })();
}

// Generate balloons
function generateBalloons(count){
    for(let i=0;i<count;i++){
        const b = document.createElement('div');
        b.className='balloon';
        b.style.left = Math.random()*85 + "vw";
        b.style.background = pickColor();
        b.style.animationDuration = (6+Math.random()*5)+'s';
        b.textContent = balloonMessages[i % balloonMessages.length];
        balloonsEl.appendChild(b);

        b.addEventListener('click', ()=> popBalloon(b));
    }
}

// Pop balloon
function popBalloon(balloon){
    if(!balloon) return;
    createConfetti(balloon);
    balloon.remove();
}

// Confetti from balloon
function createConfetti(balloon){
    for(let i=0;i<8;i++){
        const c = document.createElement('div');
        c.className='confetti-piece';
        const rect = balloon.getBoundingClientRect();
        c.style.left = rect.left + 20 + Math.random()*20 + 'px';
        c.style.top = rect.top + 20 + Math.random()*20 + 'px';
        c.style.background = pickColor();
        document.body.appendChild(c);
        setTimeout(()=>c.remove(),1500);
    }
}

// Random color
function pickColor(){
    const colors = ["#ff4e50","#f9d423","#24c6dc","#ff6a00","#8e54e9","#43e97b","#ff1493","#ffe600"];
    return colors[Math.floor(Math.random()*colors.length)];
}

// Dynamic gradient background for wish page
function startWishGradient(){
    const colors = ["#ff6a00", "#ff4e50", "#f9d423", "#24c6dc", "#8e54e9", "#43e97b"];
    let step = 0;
    setInterval(()=>{
        const c1 = colors[step % colors.length];
        const c2 = colors[(step+1) % colors.length];
        wishPage.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
        step++;
    }, 2000);
}
