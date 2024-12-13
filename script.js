const gameContainer = document.querySelector('.game');
const movesText = document.querySelector('.moves');
const timerText = document.querySelector('.timer');
const restartButton = document.querySelector('.restart');

const emojis = ['🎮', '🎮', '🎲', '🎲', '🎯', '🎯', '🎨', '🎨', 
                '🎭', '🎭', '🎪', '🎪', '🎢', '🎢', '🎡', '🎡'];
let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let timer = 0;
let timerInterval;
let isPlaying = false;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = emoji;
    
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    
    card.addEventListener('click', flipCard);
    return card;
}

function startGame() {
    gameContainer.innerHTML = '';
    cards = [];
    flippedCards = [];
    moves = 0;
    matches = 0;
    timer = 0;
    isPlaying = true;
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerText.textContent = `Time: ${timer}s`;
    }, 1000);
    
    movesText.textContent = '0 Moves';
    
    const shuffledEmojis = shuffleArray([...emojis]);
    shuffledEmojis.forEach(emoji => {
        const card = createCard(emoji);
        cards.push(card);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (!isPlaying) return;
    const card = this;
    
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            moves++;
            movesText.textContent = `${moves} Moves`;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.card-front').textContent;
    const emoji2 = card2.querySelector('.card-front').textContent;
    
    if (emoji1 === emoji2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        
        if (matches === emojis.length / 2) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    
    flippedCards = [];
}

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    setTimeout(() => {
        alert(`Congratulations! You won in ${moves} moves and ${timer} seconds!`);
    }, 500);
}

restartButton.addEventListener('click', startGame);
startGame(); 
