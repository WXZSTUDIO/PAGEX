/**
 * PAGE_X MVP SHOWDOWN 交互逻辑
 * 涵盖：图片画廊、自动播放、进度条、键盘控制、社交模拟
 */

const Gallery = (() => {
    const images = ['images/card-2.jpg', 'images/card-3.jpg'];
    let currentIndex = 0;
    let autoTimer = null;
    let progressTimer = null;
    const duration = 5000; // 5秒自动切换

    const dom = {
        overlay: document.getElementById('galleryOverlay'),
        img: document.getElementById('activeImg'),
        progressFills: [document.getElementById('p1'), document.getElementById('p2')]
    };

    const update = () => {
        dom.img.style.opacity = '0';
        setTimeout(() => {
            dom.img.src = images[currentIndex];
            dom.img.style.opacity = '1';
            resetProgress();
            startProgress();
        }, 200);
    };

    const startProgress = () => {
        clearTimeout(autoTimer);
        clearInterval(progressTimer);
        
        let width = 0;
        const fill = dom.progressFills[currentIndex];
        
        // 先填充之前的进度条
        dom.progressFills.forEach((f, idx) => {
            f.style.width = idx < currentIndex ? '100%' : '0%';
        });

        progressTimer = setInterval(() => {
            width += 1;
            fill.style.width = width + '%';
            if (width >= 100) clearInterval(progressTimer);
        }, duration / 100);

        autoTimer = setTimeout(() => {
            next();
        }, duration);
    };

    const resetProgress = () => {
        dom.progressFills.forEach(f => f.style.width = '0%');
    };

    const open = (index) => {
        currentIndex = 0;
        dom.overlay.style.display = 'flex';
        setTimeout(() => dom.overlay.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
        update();
    };

    const close = () => {
        dom.overlay.classList.remove('active');
        setTimeout(() => dom.overlay.style.display = 'none', 400);
        document.body.style.overflow = 'auto';
        clearTimeout(autoTimer);
        clearInterval(progressTimer);
    };

    const next = () => {
        currentIndex = (currentIndex + 1) % images.length;
        update();
    };

    const prev = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        update();
    };

    // 键盘支持 (Esc, Left, Right)
    document.addEventListener('keydown', (e) => {
        if (!dom.overlay.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    return { open, close, next, prev };
})();

const Interaction = (() => {
    const like = (el) => {
        el.classList.toggle('liked');
        const countEl = el.querySelector('.count');
        let val = parseFloat(countEl.innerText);
        if (el.classList.contains('liked')) {
            countEl.innerText = (val + 0.1).toFixed(1) + 'K';
        } else {
            countEl.innerText = '85.3K';
        }
    };

    const initFollow = () => {
        const btn = document.getElementById('followBtn');
        btn.onclick = function() {
            if (this.innerText.includes('关注')) {
                this.innerText = '✓ 已关注';
                this.style.background = '#2C2C2E';
            } else {
                this.innerText = '关注 (Follow)';
                this.style.background = '#FE2C55';
            }
        };
    };

    return { like, initFollow };
})();

// 初始化
window.onload = () => {
    Interaction.initFollow();
    console.log("PAGE_X MVP Showcase Ready.");
};
