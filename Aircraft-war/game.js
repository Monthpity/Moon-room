let imagesToLoad = 3;

function onImageLoaded() {
    imagesToLoad--;
    if (imagesToLoad === 0) {
        // 显示开始游戏按钮
        document.getElementById('startButton').style.display = 'block';
    }
}

const monsterImg = new Image();
monsterImg.src = 'monster.png';
monsterImg.onload = onImageLoaded;

const airplaneImg = new Image();
airplaneImg.src = 'airplane.png';
airplaneImg.onload = onImageLoaded;

const giftImg = new Image();
giftImg.src = 'gift.png';
giftImg.onload = onImageLoaded;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameInterval;
let lastFrameTime = 0;

function resetGame() {
    plane = new Plane();
    bullets = [];
    monsters = [];
    gifts = [];
    score = 0;
    lastBulletTime = 0;
    lastMonsterTime = 0;
    lastGiftTime = 0;
    gameOverStatus = false;
    giftsEaten = 0;
    combo = 0;
}


function spawnMonster() {
    const x = Math.random() * (canvas.width - 40);
    const monster = new Monster(x, -40);
    monsters.push(monster);
}

function spawnGift() {
    const x = Math.random() * (canvas.width - 20);
    const gift = new Gift(x, -20);
    gifts.push(gift);
}

class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Plane extends GameObject {
    constructor() {
        super(canvas.width / 2 - 40, canvas.height - 60, 60, 60);
        this.color = 'blue';
        this.speed = 0;
        this.lives = 5;
        this.direction = 0;
        this.acceleration = 0.25;
        this.deceleration = 0.55; // 添加减速属性
        this.maxSpeed = 4; // 添加最大速度属性
    }

    draw() {
        ctx.drawImage(airplaneImg, this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.direction === 0) {
            // 当没有按方向键时，飞机自然减速
            if (this.speed > 0) {
                this.speed -= this.deceleration;
                this.speed = Math.max(0, this.speed);
            } else if (this.speed < 0) {
                this.speed += this.deceleration;
                this.speed = Math.min(0, this.speed);
            }
        } else {
            // 当按方向键时，飞机加速
            this.speed += this.direction * this.acceleration;
            // 限制飞机速度在 -maxSpeed 到 maxSpeed 之间
            this.speed = Math.max(-this.maxSpeed, Math.min(this.speed, this.maxSpeed));
        }

        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    }
}

class Bullet extends GameObject {
    constructor(x, y) {
        super(x, y, 5, 10);
        this.color = 'yellow';
        this.speed = 10;
    }

    update() {
        this.y -= this.speed;
    }
}

class Monster extends GameObject {
    constructor(x, y) {
        super(x, y, 40, 40);
        this.speed = canvas.height / 4;
        this.hp = 1;
    }

    draw() {
        ctx.drawImage(monsterImg, this.x, this.y, this.width, this.height);
    }

    update(dt) {
        // 基础速度为 canvas.height / 4
        // 随着得分的增加，怪兽速度增加，但最大速度为 canvas.height / 0.1
        const maxSpeed = canvas.height / 0.01;
        const speedMultiplier = Math.min(1 + score / 30000, maxSpeed / this.speed);
        this.y += this.speed * dt * speedMultiplier;
    }
}

class Gift extends GameObject {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = 'green';
        this.speed = canvas.height / 4;
    }

    draw() {
        ctx.drawImage(giftImg, this.x, this.y, this.width, this.height);
    }

    update(dt) {
        // 基础速度为 canvas.height / 4
        // 随着得分的增加，怪兽速度增加，但最大速度为 canvas.height / 0.1
        const maxSpeed = canvas.height / 0.1;
        const speedMultiplier = Math.min(1 + score / 30000, maxSpeed / this.speed);
        this.y += this.speed * dt * speedMultiplier;
    }
}

let plane;
let bullets;
let monsters;
let gifts;
let lastBulletTime;
let lastMonsterTime;
let lastGiftTime;
let score;
let gameOverStatus;
let direction = 0; // 添加 direction 变量
let giftsEaten;
let combo;

function update(dt) {
    if (gameOverStatus) {
        return;
    }

    plane.direction = direction;
    plane.update();

    for (const bullet of bullets) {
        bullet.update();
    }

    for (const monster of monsters) {
        monster.update(dt);
    }

    for (const gift of gifts) {
        gift.update(dt);
    }

    for (const gift of gifts) {
        if (gift.y - gift.height >= canvas.height) {
            combo = 0; // 重置连续吃到礼物的次数
            break;
        }
    }

    handleCollisions();

    score += 3 * dt;

    removeOffscreenObjects();

    spawnObjects(dt);
}

function draw() {
    if (gameOverStatus) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    plane.draw();

    for (const bullet of bullets) {
        bullet.draw();
    }

    for (const monster of monsters) {
        monster.draw();
    }

    for (const gift of gifts) {
        gift.draw();
    }

    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`宝石: ${giftsEaten}`, 10, 40); // 添加这行代码显示吃到的礼物数量
    ctx.fillText(`生命值: ${plane.lives.toFixed(2)}`, 10, 20);
    ctx.fillText(`分数: ${Math.floor(score)}`, canvas.width - 110, 20);
    if (combo >= 3) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`连击: ${combo}`, canvas.width - 110, 40);
    }
}

function onKeyDown(e) {
    if (e.key === 'ArrowLeft') {
        direction = -1;
    } else if (e.key === 'ArrowRight') {
        direction = 1;
    }
}

function onKeyUp(e) {
    if (e.key === 'ArrowLeft' && direction === -1) {
        direction = 0;
    } else if (e.key === 'ArrowRight' && direction === 1) {
        direction = 0;
    }
}




function handleCollisions() {
    for (const bullet of bullets) {
        for (let i = 0; i < monsters.length; i++) {
            const monster = monsters[i];
            if (isColliding(bullet, monster)) {
                monster.hp -= 1;
                bullet.y = -100;
                if (monster.hp <= 0) {
                    score += 60;
                    monsters.splice(i, 1); // 移除击杀的怪物
                    i--; // 调整索引，防止跳过下一个怪物
                }
            }
        }
    }

    for (let i = 0; i < gifts.length; i++) {
        const gift = gifts[i];
        if (isColliding(plane, gift)) {
            gifts.splice(i, 1);
            giftsEaten++; // 增加吃到的礼物数量
            combo++; // 增加连续吃到礼物的次数
            // 增加生命值，但不超过 5
            const lifeGain = 0.5;
            if (plane.lives + lifeGain <= 5) {
                plane.lives += lifeGain;
            } else {
                plane.lives = 5;
            }
            score += 1000 * combo; // 修改分数计算方式
            gifts.splice(i, 1); // 删除已经被吃掉的礼物
            break; // 只吃一个礼物
        }
    }


    for (const monster of monsters) {
        if (isColliding(plane, monster)) {
            plane.lives -= 1;
            monster.y = -100;
            if (plane.lives <= 0) {
                gameOver(Math.floor(score));
            }
        }
    }
}



function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function removeOffscreenObjects() {
    bullets = bullets.filter(obj => obj.y + obj.height > 0);
    monsters = monsters.filter(obj => obj.y - obj.height < canvas.height);
    gifts = gifts.filter(obj => obj.y - obj.height < canvas.height);
}

function spawnObjects(dt) {
    lastBulletTime += dt;
    lastMonsterTime += dt;
    lastGiftTime += dt;

    const minBulletFrequency = 0.05;
    const maxBulletFrequency = 0.3;
    const maxGiftsForFrequencyChange = 20;

    const bulletFrequency = maxBulletFrequency - (giftsEaten / maxGiftsForFrequencyChange) * (maxBulletFrequency - minBulletFrequency);
    if (lastBulletTime > Math.max(bulletFrequency, minBulletFrequency)) {
        bullets.push(new Bullet(plane.x + plane.width / 2 - 2.5, plane.y));
        lastBulletTime = 0;
    }

    if (lastMonsterTime > getMonsterSpawnInterval()) {
        spawnMonster();
        lastMonsterTime = 0;
    }

    // 在固定时间间隔后刷新礼物
    if (lastGiftTime > (Math.random() * 12 + 12)) {
        spawnGift();
        lastGiftTime = 0;
    }
}

function getMonsterSpawnInterval() {
    const minMonsterSpawnInterval = 0.05; // 设定最小生成间隔（单位：秒）
    const maxMonsterSpawnInterval = 2.5; // 设定最大生成间隔（单位：秒）

    // 随着得分的增加，生成间隔减少，但不低于最小生成间隔
    const spawnInterval = maxMonsterSpawnInterval - Math.min(score / 100000, 1) * (maxMonsterSpawnInterval - minMonsterSpawnInterval);

    return Math.random() * (spawnInterval - minMonsterSpawnInterval) + minMonsterSpawnInterval;
}

let animationFrameId;

function gameLoop(timestamp) {
    const dt = (timestamp - lastFrameTime) / 1000;
    lastFrameTime = timestamp;

    update(dt);
    draw();

    animationFrameId = requestAnimationFrame(gameLoop);
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    resetGame();
    document.addEventListener('keydown', onKeyDown); // 添加这行代码
    document.addEventListener('keyup', onKeyUp); // 添加这行代码
    requestAnimationFrame(gameLoop);
}



function gameOver(score) {
    gameOverStatus = true;
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    document.getElementById('gameOverScreen').style.display = 'flex';
    finalScore.textContent = score;
}


document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startScreen').style.display = 'none';
    startGame();
});

function restartGame() {
    document.getElementById('gameOverScreen').style.display = 'none';
}

document.getElementById('restartButton').addEventListener('click', () => {
    location.reload(); // 刷新页面
});