// Create a namespace for the dice game
const DiceGame = {
    // Cache DOM elements
    elements: {
        die1: null,
        die2: null,
        sumDisplay: null,
        button: null
    },

    // Initialize the game
    init: function() {
        // Get DOM elements
        this.elements.die1 = document.getElementById('die1');
        this.elements.die2 = document.getElementById('die2');
        this.elements.sumDisplay = document.getElementById('sum');
        this.elements.button = document.querySelector('button');

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

    getSumCategory: function(sum) {
        if (sum >= 10) {
            return { message: 'High', class: 'high' };
        } else if (sum >= 6) {
            return { message: 'Mid', class: 'mid' };
        } else {
            return { message: 'Low', class: 'low' };
        }
    },

    // Roll the dice
    rollDice: function() {
        // Disable button during animation
        this.elements.button.disabled = true;

        // Add rolling animation
        this.elements.die1.classList.add('rolling');
        this.elements.die2.classList.add('rolling');

        // Generate random values
        const value1 = this.getRandomDiceValue();
        const value2 = this.getRandomDiceValue();
        const sum = value1 + value2;
        const category = this.getSumCategory(sum);

        // Update dice after animation
        setTimeout(() => {
            this.elements.die1.classList.remove('rolling');
            this.elements.die2.classList.remove('rolling');
            this.updateDots(this.elements.die1, value1);
            this.updateDots(this.elements.die2, value2);
            this.elements.sumDisplay.textContent = `Sum: ${sum}`;
            updateResult
            this.elements.button.disabled = false;
            //this.elements.resultMessage.className = `result-message ${category.class}`;
            this.updateResult(sum);
        }, 500);
    }
};

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => DiceGame.init());