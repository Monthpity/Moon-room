// 颜色数据
const colors = [
    {
        name: "Burgundy",
        nameZh: "勃艮第红",
        hex: "#800020",
        description: "The deep, rich, elegant red color is named after the red wines produced in the Brandywine region of France, symbolizes nobility and class.",
        descriptionZh: "深沉、浓郁、优雅的红色，得名于法国勃良第地区生产的红酒。象征高贵和经典。",
        temperature: "warm"
    },
    {
        name: "Klein Blue",
        nameZh: "克莱因蓝",
        hex: "#002FA7",
        description: "Strong, sharp, deep blue color created by French artist Yves Klein in the 1950s, Symbolizes innovation and infinity.",
        descriptionZh: "强烈、鲜明、深邃的蓝色，由法国艺术家伊夫·克莱因在20世纪50年代创造。象征创新和无限。",
        temperature: "cool"
    },
    {
        name: "China Red",
        nameZh: "中国红",
        hex: "#E71F18",
        description: "Unity, striving, and endless life symbolize good luck and happiness.",
        descriptionZh: "团结、奋斗、生生不息，象征好运和幸福。",
        temperature: "warm"
    },
    {
        name: "Mars Green",
        nameZh: "马尔斯绿",
        hex: "#008C8C",
        description: "Power, wealth, mystery and luxury, Mars Green is inspired by a blue-green hue of the natural landscape along the River Tay in ANNIE's native Scotland.",
        descriptionZh: "力量、财富、神秘和奢华，马尔斯绿的灵感来源于ANNIE家乡苏格兰的泰勒河畔自然景观的一种蓝绿色调。",
        temperature: "cool"
    },
    {
        name: "Hermes Orange",
        nameZh: "爱马仕橙",
        hex: "#E85827",
        description: "Warm, vibrant and stylish, the Hermès packaging color, orange-red feeling is never-ending fashion life, but also a symbol of nobility in the eyes of the public.",
        descriptionZh: "温暖、活力、时尚，来源于爱马仕的包装颜色，橘红的感觉是永不停歇的时尚生命，也是大众眼中高贵的象征。",
        temperature: "warm"
    },
    {
        name: "Prussian Blue",
        nameZh: "普鲁士蓝",
        hex: "#003153",
        description: "Gentlemanly, elegant, restrained, a color that a German worker named Diesbach in the 18th century inadvertently concocted.",
        descriptionZh: "绅士、优雅、内敛，18世纪一个名叫狄斯巴赫的德国工人无意调制成的一 种颜色。",
        temperature: "cool"
    },
    {
        name: "Mummy Brown",
        nameZh: "木乃伊棕",
        hex: "#8F4B28",
        description: "Power, eternity, honor, and immortality, this brown color is made from ground up Egyptian mummified bodies, both human and feline.",
        descriptionZh: "权利、永恒、尊贵、永生，这种棕色是由磨碎埃及木乃伊尸体制成的，包括人类和猫科动物的木乃伊。",
        temperature: "warm"
    },
    {
        name: "Tiffany Blue",
        nameZh: "蒂芙尼蓝",
        hex: "#81D8D0",
        description: "Clear, free-spirited, romantic and happy, it is a light shade of lime green.",
        descriptionZh: "清澈、自由自在、浪漫幸福，是一种青绿色的浅色调。",
        temperature: "cool"
    },
    {
        name: "Sennelier Yellow",
        nameZh: "申布伦黄",
        hex: "#F9DC24",
        description: "Sunny, bright and warm, it is a bright yellow, named after the French painter and colorist Henri Scheinbrun.",
        descriptionZh: "阳光、明亮、温暖，是一种明亮的黄色，得名自法国画家和色彩专家亨利-申布伦。",
        temperature: "warm"
    },
    {
        name: "Bordeaux",
        nameZh: "波尔多红",
        hex: "#4C0009",
        description: "Noble, luxurious, quality, French Bordeaux appellation produces wines with a hint of blue in this reddish hue, rich in depth and historical connotations.",
        descriptionZh: "高贵、豪华、品质，法国波尔多产区出产的葡萄酒，这种红色调呈色调带有一丝蓝色调，富有深度和历史内涵。",
        temperature: "warm"
    },
    {
        name: "MysticStars Yellow",
        nameZh: "星星黄",
        hex: "#ffc91a",
        description: "Little cute stars.",
        descriptionZh: "可爱小星星的超级标志黄色。",
        temperature: "warm"
    },
    {
        name: "zzh Blue",
        nameZh: "周周蓝",
        hex: "#1f91dc",
        description: "Turquoise depths with azure meet,A sea's calm whisper, soft and sweet.",
        descriptionZh: "碧水深流，海面一抹幽蓝。",
        temperature: "cool"
    },
    {
        name: "Final Black",
        nameZh: "终末黑",
        hex: "#000205",
        description: "The final colour, the echo of the world.",
        descriptionZh: "终末的色彩，世间的残响。",
        temperature: "neutral"
    },
    {
        name: "Lafcadian Blue",
        nameZh: "氿月蓝",
        hex: "#66ccff",
        description: "The color of Highness Tianyi.",
        descriptionZh: "即“天依蓝”。",
        temperature: "cool"
    },
];
// 初始化函数
function init() {
    // 处理颜色数据，添加 RGB 和 HSL 值
    colors.forEach(color => {
        const rgb = hexToRgb(color.hex);
        color.rgb = rgb;
        color.hsl = rgbToHsl(...rgb.split(', ').map(Number));
    });

    setTheme(state.theme);
    DOM.themeSelect.value = state.theme;
    DOM.languageSelect.value = state.currentLanguage;
    updateLanguage();
    renderColors();
    initCustomSelects();
}

// 处理颜色数据，添加 RGB 和 HSL 值
colors.forEach(color => {
    const rgb = hexToRgb(color.hex);
    color.rgb = rgb;
    color.hsl = rgbToHsl(...rgb.split(', ').map(Number));
});

// DOM 元素对象
const DOM = {
    colorGrid: document.getElementById('colorGrid'),
    modal: document.getElementById('colorModal'),
    modalColorPreview: document.getElementById('modalColorPreview'),
    modalColorInfo: document.getElementById('modalColorInfo'),
    closeBtn: document.querySelector('.close'),
    filterButtons: document.querySelectorAll('.filter-btn'),
    contextMenu: document.getElementById('contextMenu'),
    copyButtons: {
        hex: document.getElementById('copyHex'),
        rgb: document.getElementById('copyRGB'),
        hsl: document.getElementById('copyHSL')
    },
    settingsBtn: document.getElementById('settingsBtn'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsBtn: document.querySelector('.close-settings'),
    languageSelect: document.getElementById('languageSelect'),
    themeSelect: document.getElementById('themeSelect'),
    footerText: document.getElementById('footerText'),
    canvas: document.getElementById('background-canvas')
};

// 全局状态对象
let state = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    currentFilter: 'all',
    currentLanguage: localStorage.getItem('language') || 'en',
    selectedColor: null,
    theme: localStorage.getItem('theme') || 'auto'
};

// 渲染颜色卡片
function renderColors() {
    const filteredColors = colors.filter(color =>
        state.currentFilter === 'all' ||
        (state.currentFilter === 'favorites' && state.favorites.includes(color.name)) ||
        color.temperature === state.currentFilter
    );

    DOM.colorGrid.innerHTML = filteredColors.map((color, index) => `
        <div id="color-card-${color.name}" class="color-card">
            <div class="color-sample" style="background: ${color.gradient || color.hex};" onclick="openModal(${colors.indexOf(color)})"></div>
            <div class="color-name">${state.currentLanguage === 'en' ? color.name : color.nameZh}</div>
            <div class="favorite-btn ${state.favorites.includes(color.name) ? 'active' : ''}" onclick="toggleFavorite('${color.name}', this)">
                <svg viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>
        </div>
    `).join('');

    DOM.colorGrid.querySelectorAll('.color-card').forEach((card, index) => {
        setTimeout(() => card.classList.add('show'), index * 50);
    });
}

// 切换收藏状态
function toggleFavorite(colorName, favoriteBtn) {
    const index = state.favorites.indexOf(colorName);
    if (index === -1) {
        state.favorites.push(colorName);
        favoriteBtn.classList.add('active');
        createParticles(favoriteBtn);
    } else {
        state.favorites.splice(index, 1);
        favoriteBtn.classList.remove('active');
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    favoriteBtn.classList.add('animating');
    setTimeout(() => favoriteBtn.classList.remove('animating'), 400);
    if (state.currentFilter === 'favorites') renderColors();
}

// 创建粒子动画效果
function createParticles(btn) {
    const particleCount = 8;
    const angleStep = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = i * angleStep;
        const distance = Math.random() * 30 + 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        btn.appendChild(particle);

        particle.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(1)`, opacity: 0 }
        ], {
            duration: 500 + Math.random() * 300,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            fill: 'forwards'
        });

        setTimeout(() => particle.remove(), 1000);
    }
}

// 打开颜色详情模态框
function openModal(colorIndex) {
    const color = colors[colorIndex];
    state.selectedColor = color;
    DOM.modalColorPreview.style.background = color.gradient || color.hex;
    DOM.modalColorInfo.innerHTML = `
        <h2>${state.currentLanguage === 'en' ? color.name : color.nameZh}</h2>
        <p>${state.currentLanguage === 'en' ? color.description : color.descriptionZh}</p>
        ${['hex', 'rgb', 'hsl', 'gradient'].map(type => color[type] ? `
            <div class="color-value">
                <span>${type.toUpperCase()}: ${type === 'gradient' ? color[type] : (type === 'hex' ? color[type] : `${type}(${color[type]})`)}</span>
                <button class="copy-btn" data-color="${type === 'gradient' ? color[type] : (type === 'hex' ? color[type] : `${type}(${color[type]})`)}" data-type="${type}">
                    ${state.currentLanguage === 'en' ? 'Copy' : '复制'}
                </button>
            </div>
        ` : '').join('')}
    `;
    DOM.modal.style.display = 'block';
    setTimeout(() => DOM.modal.classList.add('show'), 10);

    DOM.modalColorInfo.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            copyToClipboard(e.target.getAttribute('data-color'), e.target.getAttribute('data-type'));
        });
    });

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        DOM.modalColorPreview.style.background = `
            radial-gradient(circle at ${x}px ${y}px, 
            rgba(255,255,255,0.3) 0%, 
            rgba(255,255,255,0) 50%), 
            ${color.gradient || color.hex}
        `;
    };

    DOM.modalColorPreview.addEventListener('mousemove', handleMouseMove);
    DOM.modalColorPreview.addEventListener('mouseleave', () => {
        DOM.modalColorPreview.style.background = color.gradient || color.hex;
    });
}

// 关闭模态框
DOM.closeBtn.onclick = () => {
    DOM.modal.classList.remove('show');
    setTimeout(() => DOM.modal.style.display = 'none', 300);
};

// 全局点击事件处理
window.onclick = (event) => {
    if (event.target == DOM.modal) {
        DOM.modal.classList.remove('show');
        setTimeout(() => DOM.modal.style.display = 'none', 300);
    }
    if (event.target == DOM.settingsModal) {
        DOM.settingsModal.style.display = 'none';
    }
    hideContextMenu();
};

// 筛选按钮事件监听
DOM.filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        DOM.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        state.currentFilter = button.getAttribute('data-filter');
        renderColors();
    });
});

// 显示上下文菜单
function showContextMenu(e, colorIndex) {
    e.preventDefault();
    state.selectedColor = colors[colorIndex];
    DOM.contextMenu.style.display = 'block';
    DOM.contextMenu.style.left = `${e.clientX}px`;
    DOM.contextMenu.style.top = `${e.clientY}px`;
}

// 隐藏上下文菜单
function hideContextMenu() {
    DOM.contextMenu.style.display = 'none';
}

// 复制颜色值到剪贴板
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => showCopyAnimation(type));
}

// 显示复制成功动画
function showCopyAnimation(type) {
    const animation = document.createElement('div');
    animation.className = 'copy-animation';
    animation.textContent = state.currentLanguage === 'en' ? `${type.toUpperCase()} Copied!` : `${type.toUpperCase()} 已复制！`;
    document.body.appendChild(animation);

    const rect = event.target.getBoundingClientRect();
    animation.style.left = `${rect.left}px`;
    animation.style.top = `${rect.top - 40}px`;

    setTimeout(() => animation.remove(), 1500);
}

// 复制按钮事件监听
Object.values(DOM.copyButtons).forEach(btn => {
    btn.addEventListener('click', () => {
        if (state.selectedColor && state.selectedColor[btn.id.replace('copy', '').toLowerCase()]) {
            copyToClipboard(state.selectedColor[btn.id.replace('copy', '').toLowerCase()], btn.id.replace('copy', ''));
        }
        hideContextMenu();
    });
});

// 设置按钮事件监听
DOM.settingsBtn.addEventListener('click', () => {
    DOM.settingsModal.style.display = 'block';
});

// 关闭设置模态框
DOM.closeSettingsBtn.onclick = () => {
    DOM.settingsModal.style.display = 'none';
};

// 语言选择事件监听
DOM.languageSelect.addEventListener('change', (e) => {
    state.currentLanguage = e.target.value;
    localStorage.setItem('language', state.currentLanguage);
    updateLanguage();
    renderColors();
});

// 主题选择事件监听
DOM.themeSelect.addEventListener('change', (e) => {
    state.theme = e.target.value;
    localStorage.setItem('theme', state.theme);
    setTheme(state.theme);
});

// 设置主题
function setTheme(theme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', theme === 'auto' ? (prefersDark ? 'dark' : 'light') : theme);
}

// 更新语言
function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${state.currentLanguage}`);
    });

    DOM.footerText.innerHTML = state.currentLanguage === 'en'
        ? '© 2025 Moon Color. All rights reserved. Powered by <a href="https://www.cmymoon.com" style="color: blue; text-decoration: none;">Moon</a>.'
        : '© 2025 Moon Color。保留所有权利。由 <a href="https://www.cmymoon.com" style="color: blue; text-decoration: none;">Moon</a> 提供技术支持。';

    DOM.languageSelect.value = state.currentLanguage;
    updateCustomSelect(DOM.languageSelect);
}

// 背景动画
const ctx = DOM.canvas.getContext('2d');
let width, height;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    DOM.canvas.width = width;
    DOM.canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)].hex,
    speed: Math.random() * 0.5 + 0.1,
    direction: Math.random() * Math.PI * 2
}));

function drawParticle(particle) {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
}

function updateParticle(particle) {
    particle.x += Math.cos(particle.direction) * particle.speed;
    particle.y += Math.sin(particle.direction) * particle.speed;

    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => {
        drawParticle(particle);
        updateParticle(particle);
    });
    requestAnimationFrame(animate);
}

animate();

// 初始化自定义选择框
function initCustomSelects() {
    document.querySelectorAll('.custom-select').forEach(select => {
        const selectElement = select.querySelector('select');
        const selectSelected = document.createElement('div');
        selectSelected.setAttribute('class', 'select-selected');
        selectSelected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
        select.appendChild(selectSelected);

        const selectItems = document.createElement('div');
        selectItems.setAttribute('class', 'select-items select-hide');

        Array.from(selectElement.options).forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.innerHTML = option.innerHTML;
            optionDiv.addEventListener('click', function () {
                Array.from(this.parentNode.children).forEach(sibling => sibling.classList.remove('same-as-selected'));
                this.classList.add('same-as-selected');
                selectSelected.innerHTML = this.innerHTML;
                selectElement.selectedIndex = index;
                selectElement.dispatchEvent(new Event('change'));
                select.classList.remove('active');
            });
            selectItems.appendChild(optionDiv);
        });

        select.appendChild(selectItems);

        selectSelected.addEventListener('click', function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
            select.classList.toggle('active');
        });
    });
}

// 关闭所有自定义选择框
function closeAllSelect(elmnt) {
    const selectItems = document.getElementsByClassName('select-items');
    const selectSelected = document.getElementsByClassName('select-selected');
    for (let i = 0; i < selectItems.length; i++) {
        if (elmnt != selectSelected[i]) {
            selectSelected[i].classList.remove('select-arrow-active');
        }
        if (elmnt != selectItems[i]) {
            selectItems[i].classList.add('select-hide');
        }
    }
}

// 添加全局点击事件监听器来关闭自定义选择框
document.addEventListener('click', closeAllSelect);

// 更新自定义选择框
function updateCustomSelect(selectElement) {
    const customSelect = selectElement.closest('.custom-select');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectSelected = customSelect.querySelector('.select-selected');
    if (selectSelected) {
        selectSelected.innerHTML = selectedOption.innerHTML;
    }
}

// 初始化函数
function init() {
    setTheme(state.theme);
    DOM.themeSelect.value = state.theme;
    DOM.languageSelect.value = state.currentLanguage;
    updateLanguage();
    renderColors();
    initCustomSelects();
}

// 当 DOM 加载完成时初始化
document.addEventListener('DOMContentLoaded', init);

// 语言切换事件监听
DOM.languageSelect.addEventListener('change', (e) => {
    state.currentLanguage = e.target.value;
    localStorage.setItem('language', state.currentLanguage);
    updateLanguage();
    renderColors();
    updateCustomSelect(e.target);
});

// 主题切换事件监听
DOM.themeSelect.addEventListener('change', (e) => {
    state.theme = e.target.value;
    localStorage.setItem('theme', state.theme);
    setTheme(state.theme);
    updateCustomSelect(e.target);
});

// HEX to RGB 转换函数
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}

// RGB to HSL 转换函数
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
}