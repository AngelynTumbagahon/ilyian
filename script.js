document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quizContainer");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const mainEmoji = document.getElementById("mainEmoji");
    const warningMessage = document.getElementById("warningMessage");

    const envelopeStage = document.getElementById("envelopeStage");
    const envelopeBtn = document.getElementById("envelopeBtn");

    const letterModal = document.getElementById("letterModal");
    const closeModal = document.getElementById("closeModal");

    const kissStage = document.getElementById("kissStage");
    const kissBtn = document.getElementById("kissBtn");
    const kissEmoji = document.getElementById("kissEmoji");

    const warnings = [
        "Subukan mo lang i-click yan! 😡",
        "Hoy! Bawal i-click yan sabi eh palo ka sa ulo! 🔪",
        "Sige, ESTIOCO, gigil mo talaga ko! 🤬",
        "Walang choice kundi YES! 😤",
        "Ah ganyan ha? I-YES mo na NGANIIIIII! 💔",
        "Dalian mo inaantok na ko! 🥱"
    ];

    const emojiStates = ["😠", "😾", "😭", "😤", "🤬", "🥱"];
    let warningIndex = 0;

    function moveNoButton(e) {
        if(e) e.preventDefault();
        
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        
        const randomX = (Math.random() * (winWidth * 0.6)) - (winWidth * 0.3);
        const randomY = (Math.random() * (winHeight * 0.5)) - (winHeight * 0.25);
        
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

        warningMessage.textContent = warnings[warningIndex];
        mainEmoji.textContent = emojiStates[warningIndex];
        mainEmoji.className = "emoji-display angry-animation";
        
        warningIndex = (warningIndex + 1) % warnings.length;
    }

    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("touchstart", moveNoButton, {passive: false});

    yesBtn.addEventListener("click", (e) => {
        e.preventDefault();
        quizContainer.classList.add("hidden");
        noBtn.style.display = "none"; 
        envelopeStage.classList.remove("hidden");
    });

    envelopeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        letterModal.style.display = "flex";
    });

    closeModal.addEventListener("click", (e) => {
        e.preventDefault();
        letterModal.style.display = "none";
        envelopeStage.classList.add("hidden");
        kissStage.classList.remove("hidden");
    });

    function playKissSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
            
            gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (err) {
            console.log("Audio systems initialized.");
        }
    }

    kissBtn.addEventListener("click", (e) => {
        e.preventDefault();
        playKissSound();
        kissEmoji.textContent = "🥰💋"; 
        
        setTimeout(() => {
            alert("Muah! 💋 I love you so much my love! Happy Monthsary ulit! ❤️✨");
        }, 150);
    });
});
