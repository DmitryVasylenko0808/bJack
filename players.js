class Players {
    constructor() {
        this.players = [];
        this.currentPlayer = null;

        this.indexCurrentPlayer = 0;
        this.indexNextPlayer = 0;
    }

    createPlayers(count = 2) {
        for(let i = 1; i <= count; i++) {
            let hand = [];
            let player = {name: `Player ${i}`,
                          id: i,
                          points: 0,
                          handPlayer: hand,
                          status: true};
            this.players.push(player);
        }
    }

    nextPlayer() {
        if (this.indexCurrentPlayer === this.players.length - 1) {
            this.indexCurrentPlayer = 0;
            this.indexNextPlayer = 0;
        }
        
        this.indexCurrentPlayer = this.indexNextPlayer++;
        this.currentPlayer = this.players[this.indexCurrentPlayer];
    }

    setCard(card) {
        this.players[this.indexCurrentPlayer].handPlayer.push(card);
    }

    updatePoints() {
        let points = 0;
        let numberPlayer = this.indexCurrentPlayer;

        for(let i = 0; i < this.players[numberPlayer].handPlayer.length; i++) {
            points += this.players[numberPlayer].handPlayer[i].weightCard;
        } 
        this.players[numberPlayer].points = points;
        
        return this.players[numberPlayer].points; 
    }
}