/**
 * PAGE_X MVP SHOWDOWN - INTERACTIVE ENGINE v5.0 (GLOBAL EDITION)
 * FEATURES: Countdown, Immersive Gallery, Social Simulation
 */

"use strict";

const H5Control = (function() {

    const DATA = {
        // Target: March 1st, 08:30 AM KST
        targetTime: new Date("2026-03-01T08:30:00+09:00").getTime(),
        images: ['images/card-2.jpg', 'images/card-3.jpg'],
        titles: ['STAGE 1-4: BATTLE PROCESS', 'OFFICIAL SCORING & MVP RULES'],
        descs: [
            'Experience the intensity from Opening Tap Dance to the final Solo Song Performance.',
            'Detailed breakdown of point accumulation and the Grand Final Best-of-3 system.'
        ],
        duration: 5500 // 5.5 seconds per slide
    };

    let state = {
        idx: 0,
        active: false,
        timer: null,
        pTimer: null,
        liked: false,
        collected: false
    };

    const el = {
        overlay: document.getElementById('gallery-ui'),
        vImg: document.getElementById('viewImg'),
        vTitle: document.getElementById('viewTitle'),
        vDesc: document.getElementById('viewDesc'),
        fills: [document.getElementById('step-0'), document.getElementById('step-1')],
        t: {
            d: document.getElementById('t-d'),
            h: document.getElementById('t-h'),
            m: document.getElementById('t-m'),
            s: document.getElementById('t-s')
        }
    };

    /** Countdown Logic */
    const startCountdown = () => {
        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = DATA.targetTime - now;

            if (diff <= 0) {
                document.getElementById('timerMain').innerHTML = "<div style='color:#FE2C55; font-weight:900; letter-spacing:2px;'>SHOWCASE LIVE NOW</div>";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            el.t.d.innerText = String(days).padStart(2, '0');
            el.t.h.innerText = String(hours).padStart(2, '0');
            el.t.m.innerText = String(mins).padStart(2, '0');
            el.t.s.innerText = String(secs).padStart(2, '0');
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    };

    /** Gallery Control System */
    const openGallery = (i) => {
        state.idx = 0;
        state.active = true;
        el.overlay.style.display = 'flex';
        setTimeout(() => el.overlay.classList.add('active'), 50);
        document.body.style.overflow = 'hidden';
        render();
    };

    const closeGallery = () => {
        state.active = false;
        el.overlay.classList.remove('active');
        setTimeout(() => el.overlay.style.display = 'none', 500);
        document.body.style.overflow = 'auto';
        stopAll();
    };

    const render = () => {
        el.vImg.style.opacity = '0';
        setTimeout(() => {
            el.vImg.src = DATA.images[state.idx];
            el.vTitle.innerText = DATA.titles[state.idx];
            el.vDesc.innerText = DATA.descs[state.idx];
            el.vImg.style.opacity = '1';
            syncProgress();
        }, 250);
    };

    const syncProgress = () => {
        stopAll();
        el.fills.forEach((f, i) => f.style.width = i < state.idx ? '100%' : '0%');

        const activeFill = el.fills[state.idx];
        let p = 0;
        state.pTimer = setInterval(() => {
            p += 1;
            activeFill.style.width = p + '%';
            if (p >= 100) clearInterval(state.pTimer);
        }, DATA.duration / 100);

        state.timer = setTimeout(next, DATA.duration);
    };

    const stopAll = () => {
        clearTimeout(state.timer);
        clearInterval(state.pTimer);
    };

    const next = () => {
        state.idx = (state.idx + 1) % DATA.images.length;
        render();
    };

    const prev = () => {
        state.idx = (state.idx - 1 + DATA.images.length) % DATA.images.length;
        render();
    };

    /** Engagement Actions */
    const like = () => {
        state.liked = !state.liked;
        const btn = document.getElementById('likeAction');
        const count = document.getElementById('likeCount');
        btn.classList.toggle('active');
        count.innerText = state.liked ? '85.4K' : '85.3K';
    };

    const collect = () => {
        state.collected = !state.collected;
        const btn = document.getElementById('collectAction');
        const label = document.getElementById('collectLabel');
        btn.classList.toggle('collected');
        label.innerText = state.collected ? 'Saved' : 'Save';
    };

    const share = () => {
        alert("Link copied! Go share it with other fans and support your KING!");
    };

    // Global Key Listeners
    document.addEventListener('keydown', (e) => {
        if (!state.active) return;
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'Escape') closeGallery();
    });

    // Initializer
    const init = () => {
        startCountdown();
        document.getElementById('mainFollowBtn').onclick = function() {
            this.innerText = this.innerText.includes('Follow') ? '✓ Following' : 'Follow';
            this.style.background = this.innerText.includes('Following') ? '#2C2C2E' : '#FE2C55';
        };
        console.log("PAGE_X Global Interactive Engine Initialized.");
    };

    return { openGallery, closeGallery, next, prev, like, collect, share, init };
})();

document.addEventListener('DOMContentLoaded', H5Control.init);
