function preload() {
    this.words = loadJSON('words.json');
}

function setup() {
  createCanvas(1200, 700);
  textSize(20);
  textAlign(CENTER, CENTER);

  if (this.words) {
    this.gameState = initializeGame(this.words);
    this.isWaitingForInput = false;
  }
}

function draw() {
    background(240);

    if (this.gameState) {
        drawGame(this.gameState);
        drawKeyboard(this.gameState);

        if (this.gameState.guessedWord.join("") == this.gameState.word) {
            showMessage("Вы победили! Начать заново? (Да/Нет)", this.gameState, (data) => {
                this.gameState = initializeGame(data);
                this.isWaitingForInput = false;
            });
        } else if (this.gameState.attemptsLeft === 0) {
            showMessage(`Вы проиграли! Загаданное слово: ${this.gameState.word}. Начать заново? (Да/Нет)`, this.gameState, (data) => {
                this.gameState = initializeGame(data);
                this.isWaitingForInput = false;
            })
        }
    }
}

function initializeGame(data) {//записываю данные
    const keys = Object.keys(data);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const selectedWord = data[randomIndex];
    const { word, hint } = selectedWord;
    return {
        word: word,
        hint: hint,
        guessedWord: Array(word.length).fill("_"),
        attemptsLeft: 6,
        guessedLetters: new Set(),
        correctLetters: new Set(),
        incorrectLetters: new Set(),
    };
}

function drawGame(state) {
    drawGallows(state.attemptsLeft);//Виселица

    fill(0);//подсказка
    strokeWeight(1);
    text(`Подсказка: ${state.hint}`, width / 2, 30);

    //Слово
    text(state.guessedWord.join(" "), width / 2, 380);

    //Попытки
    text(`Попыток: ${state.attemptsLeft}`, width / 2, 420);
}

function drawKeyboard(state) {//отрисовка клавы
    const letters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    const buttonSize = 40;
    let x = 100;
    let y = 500;

    for (let letter of letters) {
        if (state.correctLetters.has(letter)) {
            fill(0, 255, 0); //Зеленый
        } else if (state.incorrectLetters.has(letter)) {
            fill(255, 0, 0); //Красный
        } else {
            fill(200); //Серый
        }

        // Отрисовка кнопки
        rect(x, y, buttonSize, buttonSize, 5);
        fill(0);
        text(letter.toUpperCase(), x + buttonSize / 2, y + buttonSize / 2);

        //Клик по кнопке
        if (
            mouseX > x && mouseX < x + buttonSize &&
            mouseY > y && mouseY < y + buttonSize &&
            mouseIsPressed && !this.isWaitingForInput
        ) {
            handleInput(state, letter);
        }

        x += buttonSize + 10;
        if (x > width - 100) {
            x = 100;
            y += buttonSize + 10;
        }
    }
}

function handleInput(state, letter) {//отрисовка букв
    if (!state.guessedLetters.has(letter)) {
        state.guessedLetters.add(letter);
        if (state.word.includes(letter)) {
            state.correctLetters.add(letter);
            for (let i = 0; i < state.word.length; i++) {
                if (state.word[i] === letter) {
                state.guessedWord[i] = letter;
                }
            }
        } else {
        state.incorrectLetters.add(letter);
        state.attemptsLeft--;
        }
    }
}

function showMessage(message, state, onRestart) {//ожидаю пользователя
    fill(0);
    text(message, width / 2, height / 1.5);

    this.isWaitingForInput = true;

    if (keyIsPressed) {
        if (key === 'д' || key === 'y') {
            loadJSON('words.json', (data) => {
                initializeGame(data);
                //onRestart(data);
            })
        } else if (key === 'н' || key === 'n') {
            noLoop();
            window.close();
        }
    }
}

function drawGallows(attemptsLeft) {//отрисовка виселицы и человека
    stroke(0);
    strokeWeight(4);

    line(100, 80, 100, 380); // Вертикальная стойка
    line(100, 80, 250, 80);  // Горизонтальная перекладина
    line(250, 80, 250, 130); // Веревка

    if (attemptsLeft < 6) ellipse(250, 150, 40); // Голова
    if (attemptsLeft < 5) line(250, 160, 250, 240); // Тело
    if (attemptsLeft < 4) line(250, 180, 200, 220); // Левая рука
    if (attemptsLeft < 3) line(250, 180, 300, 220); // Правая рука
    if (attemptsLeft < 2) line(250, 240, 200, 300); // Левая нога
    if (attemptsLeft < 1) line(250, 240, 300, 300); // Правая нога
}