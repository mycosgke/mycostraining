// Create a namespace for the dice game
const DiceGame = {
    // Cache DOM elements
    elements: {
        die1: null,
        die2: null,
        die3: null,
        sumDisplay: null,
        button: null,
        diceSound: null,
        resultMessage: null
    },

    // Game state
    scores: [],

    // Initialize the game
    init: function() {
        // Get DOM elements
        this.elements.die1 = document.getElementById('die1');
        this.elements.die2 = document.getElementById('die2');
        this.elements.die3 = document.getElementById('die3');
        this.elements.sumDisplay = document.getElementById('sum');
        this.elements.button = document.querySelector('button');
        this.elements.diceSound = document.getElementById('diceSound');
        this.elements.resultMessage = document.getElementById('resultMessage');

        // Initial roll
        this.rollDice();
    },

    // Update dots on a die
    updateDots: function(die, value) {
        die.setAttribute('data-value', value);
        const dots = die.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.style.display = index < value ? 'block' : 'none';
        });
    },

    // Generate random number between 1 and 6
    getRandomDiceValue: function() {
        return Math.floor(Math.random() * 6) + 1;
    },

    // Calculate average score
    calculateAverage: function() {
        if (this.scores.length === 0) return 0;
        const sum = this.scores.reduce((a, b) => a + b, 0);
        return sum / this.scores.length;
    },

    getSumCategory: function(sum, dice) {
        // Check for triples first
        if (dice && dice[0] === dice[1] && dice[1] === dice[2]) {
            return { message: 'ตอง!', color: '#9C27B0' }; // Purple for triples
        }

        // Check sum ranges
        if (sum >= 11 && sum <= 17) {
            return { message: 'สูง', color: '#4CAF50' }; // Green for High
        } else if (sum >= 4 && sum <= 10) {
            return { message: 'ต่ำ', color: '#F44336' }; // Red for Low
        }
    },

    //TODO:
    //Don't implement yet, next sprint!:)
    // getSumCategory: function(sum, dice, betNumber = null) {
    //     // Check for triples first
    //     if (dice && dice[0] === dice[1] && dice[1] === dice[2]) {
    //         return { message: 'Triple!', color: '#9C27B0' }; // Purple for triples
    //     }

    //     // Check sum ranges
    //     if (sum >= 11 && sum <= 17) {
    //         return { message: 'สูง', color: '#4CAF50' }; // Green for High
    //     } else if (sum >= 4 && sum <= 10) {
    //         return { message: 'ต่ำ', color: '#F44336' }; // Red for Low
    //     }

    //     // Check if the bet number is in the dice roll
    //     if (betNumber !== null) {
    //         const count = dice.filter(d => d === betNumber).length;
    //         if (count > 0) {
    //             return { message: `Bet won! Number ${betNumber} appeared ${count} time(s)!`, color: '#FFC107' }; // Yellow for win
    //         } else {
    //             return { message: `Bet lost! Number ${betNumber} did not appear.`, color: '#607D8B' }; // Gray for loss
    //         }
    //     }
    // },

    // Update result message
    updateResult: function(sum, average, dice) {
        const category = this.getSumCategory(sum, [dice[0],dice[1],dice[2]]);
        this.elements.resultMessage.textContent =
            `Current Roll: ${category.message} | Average Score: ${average.toFixed(1)}`;
        this.elements.resultMessage.style.color = category.color;
    },

    // Roll the dice
    rollDice: function() {
        // Disable button during animation
        this.elements.button.disabled = true;

        // Play dice roll sound
        if (this.elements.diceSound) {
            this.elements.diceSound.currentTime = 0;
            this.elements.diceSound.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
        }

        // Add rolling animation
        this.elements.die1.classList.add('rolling');
        this.elements.die2.classList.add('rolling');
        this.elements.die3.classList.add('rolling');

        // Generate random values
        const value1 = this.getRandomDiceValue();
        const value2 = this.getRandomDiceValue();
        const value3 = this.getRandomDiceValue();

        const sum = value1 + value2 + value3;
        const category = this.getSumCategory(sum, [value1, value2, value3]);

        // Add to scores array
        this.scores.push(sum);

        // Calculate average
        const average = this.calculateAverage();

        // Update dice after animation
        setTimeout(() => {
            this.elements.die1.classList.remove('rolling');
            this.elements.die2.classList.remove('rolling');
            this.elements.die3.classList.remove('rolling');
            this.updateDots(this.elements.die1, value1);
            this.updateDots(this.elements.die2, value2);
            this.updateDots(this.elements.die3, value3);
            this.elements.sumDisplay.textContent = `รวม: ${sum}`;
            this.elements.button.disabled = false;
            this.updateResult(sum, average, [value1,value2,value3]);
        }, 500);
    }
};

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => DiceGame.init());