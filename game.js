class Game {
    constructor() {
        this.deckObj = new Deck;
        this.playersObj = new Players;
        this.renderUI = new RenderUI(this.playersObj);
    }

    startGame() {
        this.deckObj.createDeck();
        this.deckObj.shuffleDeck();

        this.playersObj.createPlayers(3);

        let count = 0;
        while(count < 3) {
            this.playersObj.nextPlayer();
            this.renderUI.renderPlayer();
            count++;
        }
        
        this.playersObj.nextPlayer();
        this.renderUI.activePlayer();
    }

    endGame() {
        this.playersObj.resetPlayers();
        let winner;
        let score = 0;
        let n = 0;

        while(n < this.playersObj.players.length) {
            if (this.playersObj.currentPlayer.points > score 
                && this.playersObj.currentPlayer.points < 22) {
                    winner = this.playersObj.currentPlayer;
            }
            
            score = winner.points;
            this.playersObj.nextPlayer();
            n++;
        }
        document.querySelector('.status').textContent = `${winner.name} win!`; //
        //
    }

    hit() {
        let card = this.deckObj.getCard();
        this.playersObj.setCard(card);
        this.renderUI.renderCard(card);
        this.playersObj.updatePoints();
        this.renderUI.showPoints();

        const check = () => {
            if (this.playersObj.currentPlayer.points > 21) {
                let textLoose = `${this.playersObj.currentPlayer.name} lost`;
                document.querySelector('.status').textContent = textLoose; //
                this.playersObj.currentPlayer.status = false;

                if (this.playersObj.currentPlayer.id === this.playersObj.players.length) {
                    this.endGame();
                }
                else {
                    this.playersObj.nextPlayer();
                    this.renderUI.activePlayer();
                }
            }
        }
        check();
    }

    stay() {
        if (this.playersObj.currentPlayer.id !== this.playersObj.players.length) {
            this.playersObj.nextPlayer();
            this.renderUI.activePlayer();
        }
        else {
            this.endGame();
        }
    }
}

window.addEventListener('load', function() {
    const game = new Game();
    game.startGame();
    let buttons = this.document.querySelectorAll('.btn');
    buttons[1].addEventListener('click', game.hit.bind(game));
    buttons[2].addEventListener('click', game.stay.bind(game)); 
});