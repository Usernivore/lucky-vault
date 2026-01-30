import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    console.log('Lucky Vault Dashboard Initialized');
    
    // Simple Countdown Logic
    const countdownEl = document.getElementById('countdown');
    let time = {
        h: 14,
        m: 24,
        s: 58
    };

    function updateTimer() {
        if (time.s > 0) {
            time.s--;
        } else {
            if (time.m > 0) {
                time.m--;
                time.s = 59;
            } else {
                if (time.h > 0) {
                    time.h--;
                    time.m = 59;
                    time.s = 59;
                }
            }
        }
        
        const h = String(time.h).padStart(2, '0');
        const m = String(time.m).padStart(2, '0');
        const s = String(time.s).padStart(2, '0');
        
        if (countdownEl) {
            countdownEl.textContent = `${h}:${m}:${s}`;
        }
    }

    setInterval(updateTimer, 1000);

    // Add some interactivity to the cards
    const cards = document.querySelectorAll('.stat-card, .hero-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Subtle feedback already handled by CSS hover
        });
    });

    // Mock search functionality
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', () => {
        console.log('Search clicked');
        // In a real app, this would open a search modal
    });
});
