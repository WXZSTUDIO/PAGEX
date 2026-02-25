/**
 * PAGE_X MVP SHOWDOWN H5 ENGINE
 * 包含：自动循环播放、社交互动逻辑、键盘监听、响应式缩放
 */

const H5Engine = (() => {
    // 数据配置
    const config = {
        images: ['images/card-2.jpg', 'images/card-3.jpg'],
        descriptions: ['活动流程：从 Opening 到 Grand Final', '计分规则：积分制与决赛淘汰机制'],
        playDuration: 6000 // 6秒
    };

    let state = {
        currentIndex: 0,
        timer: null,
        progressTimer: null,
        isLightboxOpen: false
    };

    // 弹窗逻辑
    const openGallery = (idx) => {
        state.currentIndex = 0;
        state.isLightboxOpen = true;
        const el = document.getElementById('gallery');
        el.style.display = 'flex';
        setTimeout(() => el.classList.add('active'), 50);
        document.body.style.overflow = 'hidden';
        render();
    };

    const closeGallery = () => {
        state.isLightboxOpen = false;
        const el = document.getElementById('gallery');
        el.classList.remove('active');
        setTimeout(() => el.style.display = 'none', 400);
        document.body.style.overflow = 'auto';
        stopTimers();
    };

    const render = () => {
        const img = document.getElementById('displayImg');
        const desc = document.getElementById('img-desc');
        
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = config.images[state.currentIndex];
            img.style.opacity = '1';
            desc.innerText = config.descriptions[state.currentIndex];
            startAutoPlay();
        }, 200);
    };

    const startAutoPlay = () => {
        stopTimers();
        
        let progress = 0;
        const fillEl = document.getElementById(`fill${state.currentIndex}`);
        
        // 重置所有进度条
        document.querySelectorAll('.fill').forEach((f, i) => {
            f.style.width = i < state.currentIndex ? '100%' : '0%';
        });

        state.progressTimer = setInterval(() => {
            progress += 1;
            fillEl.style.width = `${progress}%`;
            if (progress >= 100) clearInterval(state.progressTimer);
        }, config.playDuration / 100);

        state.timer = setTimeout(() => {
            goNext();
        }, config.playDuration);
    };

    const stopTimers = () => {
        clearTimeout(state.timer);
        clearInterval(state.progressTimer);
    };

    const goNext = () => {
        state.currentIndex = (state.currentIndex + 1) % config.images.length;
        render();
    };

    const goPrev = () => {
        state.currentIndex = (state.currentIndex - 1 + config.images.length) % config.images.length;
        render();
    };

    // 社交交互
    const toggleLike = (el) => {
        el.classList.toggle('active');
        const valNode = el.querySelector('.val');
        valNode.innerText = el.classList.contains('active') ? '85.4K' : '85.3K';
    };

    const toggleCollect = (el) => {
        el.classList.toggle('active');
        el.querySelector('.val').innerText = el.classList.contains('active') ? '已收藏' : '收藏';
    };

    const share = () => {
        alert("链接已复制，快去分享给好友为 Bias 投票吧！");
    };

    // 键盘监听
    document.addEventListener('keydown', (e) => {
        if (!state.isLightboxOpen) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
    });

    // 初始化按钮
    const init = () => {
        const fBtn = document.getElementById('followBtn');
        fBtn.onclick = () => {
            fBtn.innerText = fBtn.innerText.includes('关注') ? '✓ 已关注' : '关注 (Follow)';
            fBtn.style.background = fBtn.innerText.includes('已关注') ? '#2c2c2e' : '#fe2c55';
        };
    };

    return { openGallery, closeGallery, goNext, goPrev, toggleLike, toggleCollect, share, init };
})();

window.onload = H5Engine.init;
