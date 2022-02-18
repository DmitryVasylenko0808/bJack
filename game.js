class Game {
    constructor() {
        this.isNowPlaying = false;
        this.gameStatus = false;
        this.deckObj = null;
        this.playersObj = null;
        this.renderUI = null;
    }

    initGame() {
        this.deckObj = new Deck;
        this.playersObj = new Players;
        this.renderUI = new RenderUI(this.playersObj);
    }

    startGame() {
        if (this.isNowPlaying) {
            this.resetGame();
        }
        this.initGame();
        this.deckObj.createDeck();
        this.deckObj.shuffleDeck();

        let countPlayersElem = document.querySelectorAll('.players-count');
        let countPlayers = countPlayersElem[1].value;
        this.playersObj.createPlayers(countPlayers);

        let count = 0;
        while(count < countPlayers) {
            this.playersObj.nextPlayer();
            this.renderUI.renderPlayer();
            count++;
        }
        
        this.playersObj.nextPlayer();
        this.renderUI.activePlayer();

        this.isNowPlaying = true;
        this.gameStatus = true;
    }

    endGame() {
        let winner;
        let score = 0;
        let n = 0;

        for(let i = 0; i < this.playersObj.players.length; i++) 
        {
            if((this.playersObj.players[i].points > score)
                && (this.playersObj.players[i].points < 22)) {
                    winner = this.playersObj.players[i];
                    score = winner.points;
            }
        }
        this.renderUI.showStatus(true, winner);
        this.gameStatus = false;
    }

    hit() {
        if (this.gameStatus) {
            let card = this.deckObj.getCard();
            this.playersObj.setCard(card);
            this.renderUI.renderCard(card);
            this.playersObj.updatePoints();
            this.renderUI.showPoints();

            const check = () => {
                if (this.playersObj.currentPlayer.points > 21) {
                    this.renderUI.showStatus(false);

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

    resetGame() {
        this.deckObj = null;
        this.playersObj = null;
        this.renderUI.deletePlayers();
        this.renderUI.clearStatus();
        this.renderUI = null;
    }
}

window.addEventListener('load', function() {
    const game = new Game;
    let buttons = this.document.querySelectorAll('.btn');
    buttons[0].addEventListener('click', game.startGame.bind(game));
    buttons[1].addEventListener('click', game.hit.bind(game));
    buttons[2].addEventListener('click', game.stay.bind(game)); 
});