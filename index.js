import readline from "node:readline";

class CLI {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin, output: process.stdout
        });
    }


    input(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, (answer) => {
                resolve(answer)
            })

        })

    }

    close() {
        this.rl.close();
    }


}

class GuessNumberGame {
    constructor() {
        this.cli = new CLI();
        this.difficulty = "normal"
        this.difficultyOptions = {"easy": 10, "normal": 5, "hard": 3, "god": 1}
    }

    displayWelcome() {
        console.log("Welcome to the Guess Number Game");
        console.log("I am thinking about a number between 1 and 100");
        console.log("And you should guess that number");
    }


    async inputDifficulty() {
        const options = Object.keys(this.difficultyOptions)
        console.log("Difficulty Options:")
        console.log(options)
        while (true) {
            let input = await this.cli.input("Pick difficulty: ");

            if (!(input in this.difficultyOptions)) {
                console.log(`Difficulty option '${input}' not found`);
                continue;
            }
            console.log(`Chosen difficulty option - '${input}'`);
            this.difficulty = await input;
            break;

        }

    }

    async inputNumber() {
        while (true) {
            let input = await this.cli.input("Guess number: ");
            let number = parseInt(input);
            if (number || number === 0) {
                return number;
            }
            console.log(`${input} is not a number, its ${input.type}`);
        }
    }

    async gameLoop() {
        let numTries = this.difficultyOptions[this.difficulty]
        let theAnswer = Math.floor(1 + Math.random() * 100)
        let guess = 50
        console.log("Try to guess the number between 1 and 100");
        for (let i = 0; i < numTries; i++) {
            guess = await this.inputNumber();
            if (guess > 100 || guess <= 0) {
                console.log(`${guess}?! Seriously? It's not even between 1 and 100`);
                i -=1
                continue;
            }
            if (guess === theAnswer) {
                console.log(`....${theAnswer} it is!`)
                console.log("Congratulations, you beat the game!");
                console.log(`It took you ${i + 1} tries!`);
                console.log("You won!");
                break;
            }
            if (theAnswer < guess) {
                console.log(`It's smaller than ${guess}`);
            }
            if (theAnswer > guess) {
                console.log(`It's larger than ${guess}`);
            }
        }
        console.log(`The game is over`);
        console.log(`The answer was ${theAnswer}`);
    }





}


let game = new GuessNumberGame();
game.displayWelcome();
await game.inputDifficulty();
await game.gameLoop();
game.cli.close()


