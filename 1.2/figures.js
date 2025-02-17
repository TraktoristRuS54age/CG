var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');

//избавиться от глобальных переменных
var isDragging = false;
var offsetX = 20, offsetY = 170;
var dragOffsetX = 0, dragOffsetY = 0;

function road() {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 450, 900, 50);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 450, 900, 10);
}

function wheels() {
    ctx.beginPath();
    ctx.arc(offsetX + 130, offsetY + 230, 50, 0, Math.PI * 2, true);
    ctx.moveTo(offsetX + 290, offsetY + 230);
    ctx.arc(offsetX + 240, offsetY + 230, 50, 0, Math.PI * 2, true);
    ctx.moveTo(offsetX + 630, offsetY + 230);
    ctx.arc(offsetX + 580, offsetY + 230, 50, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(offsetX + 130, offsetY + 230, 25, 0, Math.PI * 2, true);
    ctx.moveTo(offsetX + 290, offsetY + 230);
    ctx.arc(offsetX + 240, offsetY + 230, 25, 0, Math.PI * 2, true);
    ctx.moveTo(offsetX + 630, offsetY + 230);
    ctx.arc(offsetX + 580, offsetY + 230, 25, 0, Math.PI * 2, true);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
}

function autoBody() {
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    ctx.lineTo(offsetX, offsetY + 200);
    ctx.lineTo(offsetX + 420, offsetY + 200);
    ctx.lineTo(offsetX + 420, offsetY);
    ctx.lineTo(offsetX, offsetY);
    ctx.fillStyle = '#f1b77f';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = "44px serif";
    ctx.strokeText("Пажилой молочник!", offsetX + 18, offsetY + 80);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(offsetX + 425, offsetY);
    ctx.lineTo(offsetX + 425, offsetY + 200);
    ctx.lineTo(offsetX + 680, offsetY + 200);
    ctx.lineTo(offsetX + 680, offsetY + 206);
    ctx.lineTo(offsetX + 690, offsetY + 206);
    ctx.lineTo(offsetX + 690, offsetY + 190);
    ctx.lineTo(offsetX + 675, offsetY + 120);
    ctx.lineTo(offsetX + 570, offsetY + 95);
    ctx.lineTo(offsetX + 550, offsetY);
    ctx.lineTo(offsetX + 425, offsetY);
    ctx.fillStyle = '#ff9633';
    ctx.fill();
    ctx.stroke();
}

function details() {
    ctx.beginPath(); // Дверь
    ctx.moveTo(offsetX + 438, offsetY + 5);
    ctx.lineTo(offsetX + 438, offsetY + 95);
    ctx.lineTo(offsetX + 430, offsetY + 100);
    ctx.lineTo(offsetX + 430, offsetY + 195);
    ctx.lineTo(offsetX + 530, offsetY + 195);
    ctx.lineTo(offsetX + 530, offsetY + 100);
    ctx.lineTo(offsetX + 518, offsetY + 5);
    ctx.lineTo(offsetX + 438, offsetY + 5);
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.fillRect(offsetX + 435, offsetY + 105, 20, 5);
    
    ctx.beginPath(); // Окно двери
    ctx.moveTo(offsetX + 442, offsetY + 7);
    ctx.lineTo(offsetX + 442, offsetY + 93);
    ctx.lineTo(offsetX + 524, offsetY + 93);
    ctx.lineTo(offsetX + 513, offsetY + 7);
    ctx.lineTo(offsetX + 442, offsetY + 7);
    ctx.fillStyle = '#c4e7e5';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath(); // Лобовое стекло
    ctx.moveTo(offsetX + 523, offsetY + 7);
    ctx.lineTo(offsetX + 534, offsetY + 93);
    ctx.lineTo(offsetX + 570, offsetY + 93);
    ctx.lineTo(offsetX + 551, offsetY + 7);
    ctx.lineTo(offsetX + 523, offsetY + 7);
    ctx.fillStyle = '#c4e7e5';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath(); // Задняя фара
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(offsetX - 1, offsetY + 182, 10, 18);

    ctx.beginPath(); // Передний бампер
    ctx.moveTo(offsetX + 677, offsetY + 130);
    ctx.lineTo(offsetX + 660, offsetY + 130);
    ctx.lineTo(offsetX + 650, offsetY + 140);
    ctx.lineTo(offsetX + 650, offsetY + 150);
    ctx.lineTo(offsetX + 650, offsetY + 160);
    ctx.lineTo(offsetX + 684, offsetY + 160);
    ctx.lineTo(offsetX + 677, offsetY + 130);
    ctx.fillStyle = '#def4f3';
    ctx.fill();
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    road();
    wheels();
    autoBody();
    details();
}

canvas.addEventListener('mousedown', function(e) {
    var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    
    var truckLeft = offsetX;
    var truckRight = offsetX + 690; // Ширина грузовика
    var truckTop = offsetY;
    var truckBottom = offsetY + 280; // Высота грузовика

    if (mouseX >= truckLeft && mouseX <= truckRight && mouseY >= truckTop && mouseY <= truckBottom) {
        isDragging = true;
        dragOffsetX = mouseX - offsetX;
        dragOffsetY = mouseY - offsetY;
    }
});

canvas.addEventListener('mousemove', function(e) {
    if (isDragging) {
        var mouseX = e.offsetX;
        var mouseY = e.offsetY;

        offsetX = mouseX - dragOffsetX;
        offsetY = mouseY - dragOffsetY;
        draw();
    }
});

canvas.addEventListener('mouseup', function() {
    isDragging = false;
});

canvas.addEventListener('mouseout', function() {
    isDragging = false;
});

draw();