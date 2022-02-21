class Players extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        players: [],
        currentPlayer: null,

        indexCurrentPlayer: 0,
        indexNextPlayer: 0
      }
    }
  
    render() {
      //this.createPlayers(props.countPlayers);
      console.log(1);
      return (
        <h1>12</h1>
          );
    }
  
    renderPlayer(i) {
      return (
         <div className="player">
          <h2>{this.state.players[i].name}</h2>
          <p>{this.state.players[i].points}</p>
         </div>
         );
    }

    createPlayers(count = 2) {
        for(let i = 1; i <= count; i++) {
            let hand = [];
            let player = {name: `Player ${i}`,
                          id: i,
                          points: 0,
                          handPlayer: hand,
                          status: true};
            this.state.players.push(player);
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