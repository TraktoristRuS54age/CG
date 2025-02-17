var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');

//константные значения не использовать передавать через параметры функции
const GRAVITY = 0.2;
const JUMP_STRENGTH = -10;
const PHASE_OFFSET = 0.5;

const letters = [
    { x: 50, y: 50, vy: 0, phase: 0 },
    { x: 150, y: 50, vy: 0, phase: PHASE_OFFSET },
    { x: 270, y: 50, vy: 0, phase: PHASE_OFFSET * 2 },
];

function symbolCh(x, y) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, 20, 50);
    ctx.fillRect(x, y + 50, 60, 20);
    ctx.fillRect(x + 60, y, 20, 100);
}

function symbolD(x, y) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y + 80, 100, 20);
    ctx.fillRect(x + 20, y + 10, 20, 90);
    ctx.fillRect(x + 20, y, 60, 20);
    ctx.fillRect(x + 60, y + 10, 20, 90);
}

function symbolV(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 20, 100);
    ctx.fillRect(x + 20, y, 30, 20);
    ctx.fillRect(x + 20, y + 40, 50, 20);
    ctx.fillRect(x + 20, y + 80, 50, 20);
    ctx.fillRect(x + 50, y + 40, 20, 40);
    ctx.fillRect(x + 35, y, 20, 40);
}

function updateSymbols() {
    for (const letter of letters) {
        letter.vy += GRAVITY;
        letter.y += letter.vy;

        if (letter.y >= 300) {
            letter.y = 300;
            letter.vy = JUMP_STRENGTH * Math.sin(letter.phase); // Начальная скорость прыжка
            letter.phase += 0.05;
        }
    }
}

function drawSymbols() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    symbolCh(letters[0].x, letters[0].y);
    symbolD(letters[1].x, letters[1].y);
    symbolV(letters[2].x, letters[2].y);
}

function draw() {
    updateSymbols();
    drawSymbols();
    requestAnimationFrame(draw);
}

draw();
