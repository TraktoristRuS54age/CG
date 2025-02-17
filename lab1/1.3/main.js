// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

// function drawPixel(x, y, color) {
//     x = clamp(x, 0, canvas.width - 1);
//     y = clamp(y, 0, canvas.height - 1);
//     ctx.fillStyle = color;
//     ctx.fillRect(x, y, 1, 1);
// }

// function bresenham(x0, y0, x1, y1, color) {
//     let dx = Math.abs(x1 - x0);
//     let dy = -Math.abs(y1 - y0);
//     let sx = x0 < x1 ? 1 : -1;
//     let sy = y0 < y1 ? 1 : -1;
//     let err = dx + dy;

//     while (true) {
//         drawPixel(x0, y0, color);
//         if (x0 === x1 && y0 === y1) break;
//         let e2 = 2 * err;
//         if (e2 >= dy) { 
//             err += dy; 
//             x0 += sx; 
//         }
//         if (e2 <= dx) { 
//             err += dx; 
//             y0 += sy; 
//         }
//     }
// }

// function cohenSutherlandClip(x0, y0, x1, y1, xmin, ymin, xmax, ymax) {
//     const INSIDE = 0, LEFT = 1, RIGHT = 2, BOTTOM = 4, TOP = 8;
//     const xMin = 0, xMax = canvas.width, yMin = 0, yMax = canvas.height;

//     function computeCode(x, y) {
//         let code = INSIDE;
//         if (x < xMin) code |= LEFT;
//         else if (x > xMax) code |= RIGHT;
//         if (y < yMin) code |= BOTTOM;
//         else if (y > yMax) code |= TOP;
//         return code;
//     }

//     let code0 = computeCode(x0, y0);
//     let code1 = computeCode(x1, y1);
//     let accept = false;

//     while (true) {
//         if (!(code0 | code1)) { // Полностью внутри
//             accept = true;
//             break;
//         } else if (code0 & code1) { // Полностью снаружи
//             break;
//         } else {
//             let x, y, code = code0 || code1;

//             if (code & TOP) { // Пересечение с верхней границей
//                 x = x0 + (x1 - x0) * (yMax - y0) / (y1 - y0);
//                 y = yMax;
//             } else if (code & BOTTOM) { // Пересечение с нижней границей
//                 x = x0 + (x1 - x0) * (yMin - y0) / (y1 - y0);
//                 y = yMin;
//             } else if (code & RIGHT) { // Пересечение с правой границей
//                 y = y0 + (y1 - y0) * (xMax - x0) / (x1 - x0);
//                 x = xMax;
//             } else if (code & LEFT) { // Пересечение с левой границей
//                 y = y0 + (y1 - y0) * (xMin - x0) / (x1 - x0);
//                 x = xMin;
//             }

//             if (code === code0) {
//                 x0 = x;
//                 y0 = y;
//                 code0 = computeCode(x0, y0);
//             } else {
//                 x1 = x;
//                 y1 = y;
//                 code1 = computeCode(x1, y1);
//             }
//         }
//     }

//     if (accept) {
//         // Фиксируем координаты внутри холста перед отрисовкой
//         x0 = clamp(x0, xMin, xMax);
//         y0 = clamp(y0, yMin, yMax);
//         x1 = clamp(x1, xMin, xMax);
//         y1 = clamp(y1, yMin, yMax);
//         bresenham(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), '#ff0000');
//     }
// }

// function drawLine() {
//     const x0 = parseInt(document.getElementById('x0').value);
//     const y0 = parseInt(document.getElementById('y0').value);
//     const x1 = parseInt(document.getElementById('x1').value);
//     const y1 = parseInt(document.getElementById('y1').value);

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     cohenSutherlandClip(x0, y0, x1, y1, 0, 0, canvas.width, canvas.height);
// }

// document.getElementById('drawButton').addEventListener('click', drawLine);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
let timeoutId = null;

function drawPixel(x, y, color) {
    x = clamp(x, 0, canvas.width - 1);
    y = clamp(y, 0, canvas.height - 1);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function bresenham(x0, y0, x1, y1) {
    let points = [];
    let dx = Math.abs(x1 - x0);
    let dy = -Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;

    while (true) {
        points.push({ x: x0, y: y0 });
        if (x0 === x1 && y0 === y1) break;
        let e2 = 2 * err;
        if (e2 >= dy) {
            err += dy;
            x0 += sx;
        }
        if (e2 <= dx) {
            err += dx;
            y0 += sy;
        }
    }
    return points;
}

function cohenSutherlandClip(x0, y0, x1, y1) {
    const INSIDE = 0, LEFT = 1, RIGHT = 2, BOTTOM = 4, TOP = 8;
    const xMin = 0, xMax = canvas.width, yMin = 0, yMax = canvas.height;

    function computeCode(x, y) {
        let code = INSIDE;
        if (x < xMin) code |= LEFT;
        else if (x > xMax) code |= RIGHT;
        if (y < yMin) code |= BOTTOM;
        else if (y > yMax) code |= TOP;
        return code;
    }

    let code0 = computeCode(x0, y0);
    let code1 = computeCode(x1, y1);
    let accept = false;

    while (true) {
        if (!(code0 | code1)) {
            accept = true;
            break;
        } else if (code0 & code1) {
            break;
        } else {
            let x, y, code = code0 || code1;

            if (code & TOP) {
                x = x0 + (x1 - x0) * (yMax - y0) / (y1 - y0);
                y = yMax;
            } else if (code & BOTTOM) {
                x = x0 + (x1 - x0) * (yMin - y0) / (y1 - y0);
                y = yMin;
            } else if (code & RIGHT) {
                y = y0 + (y1 - y0) * (xMax - x0) / (x1 - x0);
                x = xMax;
            } else if (code & LEFT) {
                y = y0 + (y1 - y0) * (xMin - x0) / (x1 - x0);
                x = xMin;
            }

            if (code === code0) {
                x0 = x;
                y0 = y;
                code0 = computeCode(x0, y0);
            } else {
                x1 = x;
                y1 = y;
                code1 = computeCode(x1, y1);
            }
        }
    }

    if (accept) {
        x0 = clamp(x0, xMin, xMax);
        y0 = clamp(y0, yMin, yMax);
        x1 = clamp(x1, xMin, xMax);
        y1 = clamp(y1, yMin, yMax);
        return { x0: Math.round(x0), y0: Math.round(y0), x1: Math.round(x1), y1: Math.round(y1), accept: true };
    }
    return { accept: false };
}

function animateLine(points, color) {
    let index = 0;
    clearTimeout(timeoutId);

    function drawNextPoint() {
        if (index < points.length) {
            const { x, y } = points[index];
            drawPixel(x, y, color);
            index++;
            timeoutId = setTimeout(drawNextPoint, 10);
        }
    }
    drawNextPoint();
}

function drawLine() {
    const x0 = parseInt(document.getElementById('x0').value);
    const y0 = parseInt(document.getElementById('y0').value);
    const x1 = parseInt(document.getElementById('x1').value);
    const y1 = parseInt(document.getElementById('y1').value);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const clipped = cohenSutherlandClip(x0, y0, x1, y1);
    
    if (clipped.accept) {
        const points = bresenham(clipped.x0, clipped.y0, clipped.x1, clipped.y1);
        animateLine(points, '#ff0000');
    }
}

document.getElementById('drawButton').addEventListener('click', drawLine);