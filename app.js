/**
 * PAGE_X MVP SHOWDOWN - ENGINE v6.0
 * ALIGNED UI & COMPACT TIMER
 */

"use strict";

const H5Control = (function() {

    const DATA = {
        target: new Date("2026-03-01T08:30:00+09:00").getTime(),
        assets: ['images/card-2.jpg', 'images/card-3.jpg'],
        titles: ['BATTLE PROCESS', 'SCORING RULES'],
        descs: ['From Opening to the final Grand Final PK.', 'Accumulated points and the Best of 3 system.'],
        duration: 5000
    };

    let state = { idx: 0, active: false, timer: null, pTimer: null, liked: false };

    const el = {
        overlay: document.getElementById('gallery-ui'),
        vImg: document.getElementById('viewImg'),
        vTitle: document.getElementById('viewTitle'),
        vDesc: document.getElementById('viewDesc'),
        fills: [document.getElementById('step-0'), document.getElementById('step-1')],
        t: { d: document.getElementById('t-d'), h: document.getElementById('t-h'), m: document.getElementById('t-m'), s: document.getElementById('t-s') }
    };

    const runCountdown = () => {
        const update = () => {
            const diff = DATA.target - Date.now();
            if (diff <= 0) {
                document.getElementById('timerMain').innerHTML = "LIVE NOW";
                return;
            }
            el.t.d.innerText = String(Math.floor(diff / 86400000)).padStart(2, '0');
            el.t.h.innerText = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
            el.t.m.innerText = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
            el.t.s.innerText = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        };
        setInterval(update, 1000);
        update();
    };

    const openGallery = (i) => {
        state.active = true;
        el.overlay.style.display = 'flex';
        setTimeout(() => el.overlay.classList.add('active'), 50);
        document.body.style.overflow = 'hidden';
        render();
    };

    const closeGallery = () => {
        state.active = false;
        el.overlay.classList.remove('active');
        setTimeout(() => el.overlay.style.display = 'none', 400);
        document.body.style.overflow = 'auto';
        stop();
    };

    const render = () => {
        el.vImg.style.opacity = '0';
        setTimeout(() => {
            el.vImg.src = DATA.assets[state.idx];
            el.vTitle.innerText = DATA.titles[state.idx];
            el.vDesc.innerText = DATA.descs[state.idx];
            el.vImg.style.opacity = '1';
            play();
        }, 200);
    };

    const play = () => {
        stop();
        el.fills.forEach((f, i) => f.style.width = i < state.idx ? '100%' : '0%');
        const f = el.fills[state.idx];
        let p = 0;
        state.pTimer = setInterval(() => {
            p += 1;
            f.style.width = p + '%';
            if (p >= 100) clearInterval(state.pTimer);
        }, DATA.duration / 100);
        state.timer = setTimeout(next, DATA.duration);
    };

    const stop = () => { clearTimeout(state.timer); clearInterval(state.pTimer); };
    const next = () => { state.idx = (state.idx + 1) % DATA.assets.length; render(); };
    const prev = () => { state.idx = (state.idx - 1 + DATA.assets.length) % DATA.assets.length; render(); };

    const init = () => {
        runCountdown();
        document.getElementById('mainFollowBtn').onclick = function() {
            this.innerText = this.innerText === 'Follow' ? 'Following' : 'Follow';
            this.style.background = this.innerText === 'Following' ? '#2C2C2E' : '#FE2C55';
        };
    };

    return { openGallery, closeGallery, next, prev, init, like: () => {}, collect: () => {}, share: () => alert("Link Copied!") };
})();

document.addEventListener('DOMContentLoaded', H5Control.init);
