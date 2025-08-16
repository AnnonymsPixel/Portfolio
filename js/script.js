let theme = localStorage.getItem('theme')

var githubStats = "https://github-readme-stats.codestackr.vercel.app/api?username=zone-infinity&show_icons=true&hide_border=true"
var githubStreaks = "https://github-readme-streak-stats.herokuapp.com/?user=zone-infinity&hide_border=true"

if (theme == null) {
    setTheme("light")
} else {
    setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')

for (var i = 0; themeDots.length > i; i++) {
    themeDots[i].addEventListener('click', function () {
        let mode = this.dataset.mode
        setTheme(mode)
    });
}

function setTheme(mode) {
    let theme = document.getElementById("theme-style")
    let githubStat = document.getElementById("github-stats")
    let githubStreak = document.getElementById("github-streaks")
    let heart = document.getElementById("heart")

    if (mode === "light") {
        theme.href = "styles/default.css"
        githubStat.src = githubStats
        githubStreak.src = githubStreaks
        heart.innerHTML = "❤️"
    }

    if (mode === "blue") {
        theme.href = "styles/Blue.css"
        githubStat.src = githubStats + "&theme=tokyonight"
        githubStreak.src = githubStreaks + "&theme=tokyonight"
        heart.innerHTML = "💙"
    }

    if (mode === "green") {
        theme.href = "styles/green.css"
        githubStat.src = githubStats + "&theme=merko"
        githubStreak.src = githubStreaks + "&theme=merko"
        heart.innerHTML = "💚"
    }

    if (mode === "purple") {
        theme.href = "styles/purple.css"
        githubStat.src = githubStats + "&theme=synthwave"
        githubStreak.src = githubStreaks + "&theme=synthwave"
        heart.innerHTML = "💜"
    }

    localStorage.setItem("theme", mode)
}

//typewriter
document.addEventListener("DOMContentLoaded", function() {
    let messages = [
        "Shlok"
    ];
    
    // Ultra-smooth guns.lol style timing
    let typeSpeed = 280;         // silky smooth typing
    let deleteSpeed = 280;       // buttery deletion
    let pauseEnd = 2000;        // elegant pause to read
    let pauseStart = 400;       // smooth transition pause
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let animationId;
    
    document.title = " ";

    // High-precision timing using requestAnimationFrame for 60fps smoothness
    let lastTime = 0;
    let accumulator = 0;
    
    function ultraSmoothType(currentTime) {
        if (!lastTime) lastTime = currentTime;
        let deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        accumulator += deltaTime;
        
        let targetDelay = isDeleting ? deleteSpeed : typeSpeed;
        
        if (accumulator >= targetDelay) {
            accumulator = 0;
            
            let currentMessage = messages[messageIndex];
            
            if (isDeleting) {
                charIndex--;
                document.title = currentMessage.substring(0, charIndex);
                
                if (charIndex === 0) {
                    isDeleting = false;
                    messageIndex = (messageIndex + 1) % messages.length;
                    
                    setTimeout(() => {
                        lastTime = 0;
                        animationId = requestAnimationFrame(ultraSmoothType);
                    }, pauseStart);
                    return;
                }
            } else {
                charIndex++;
                document.title = currentMessage.substring(0, charIndex);
                
                if (charIndex === currentMessage.length) {
                    isDeleting = true;
                    
                    setTimeout(() => {
                        lastTime = 0;
                        animationId = requestAnimationFrame(ultraSmoothType);
                    }, pauseEnd);
                    return;
                }
            }
        }
        
        animationId = requestAnimationFrame(ultraSmoothType);
    }

// Loading Screen Script
        function simulateLoading() {
            const progressFill = document.getElementById('progressFill');
            const loadingScreen = document.getElementById('loading-screen');
            const mainContent = document.getElementById('main-content');
            let progress = 0;

            const interval = setInterval(() => {
                progress += Math.random() * 3 + 1;
                
                if (progress >= 100) {
                    progress = 100;
                    progressFill.style.width = progress + '%';
                    
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        mainContent.classList.add('loaded');
                    }, 500);
                    
                    clearInterval(interval);
                    return;
                }

                progressFill.style.width = progress + '%';
            }, 80);
        }

        // Initialize loading on page load
        window.addEventListener('load', simulateLoading);

//Project Section
function showNotification(message) {
    if (Notification.permission === "granted") {
        new Notification(message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(message);
            }
        });
    } else {
        alert(message); // fallback if denied
    }
}

function checkLink(link) {
    const href = link.getAttribute("href");
    if (!href || href.trim() === "" || href.trim() === "#") {
        showNotification("Source isn't available because of privacy reasons");
        return false; // block navigation
    }
    return true; // allow navigation
}

