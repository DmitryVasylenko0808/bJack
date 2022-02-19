class RenderUI {
    constructor(playesRender) {
        this.playersArea = null;
        this.playerBlock = null;
        this.playerName = null;
        this.points = null;
        this.status = document.querySelector('.status');

        this.playersRender = playesRender;
    }
    
    renderPlayer() {
        this.playersArea = document.querySelector('.players');
        this.playerBlock = document.createElement('div');
        this.playerName = document.createElement('h2');
        this.points = document.createElement('p');

        this.playerName.textContent = this.playersRender.currentPlayer.name;
        this.points.textContent = this.playersRender.currentPlayer.points;

        this.playerBlock.classList.add('player');
        this.playerBlock.append(this.playerName);
        this.playerBlock.append(this.points);

        this.playersArea.append(this.playerBlock);
    }

    activePlayer() {
        let currPlayerBlock = document.querySelectorAll('.player');
        let index = this.playersRender.currentPlayer.id - 1;

        if (index > 0) {
            let prev = index - 1;
            currPlayerBlock[prev].classList.remove('player-active');
        }
        currPlayerBlock[index].classList.add('player-active');
    }

    renderCard(cardPlayer) {
        let playerBlocks = document.querySelectorAll('.player');
    
        let cardBlock = document.createElement('div');
        cardBlock.classList.add('card');

        let icon;
        switch(cardPlayer.suit) {
            case 'Spades': {
                cardBlock.style.color = 'red';
                icon = '&spades;';
                break;
            }
            case 'Hearts': {
                cardBlock.style.color = 'red';
                icon = '&hearts;';
                break;
            }
            case 'Clubs': {
                cardBlock.style.color = 'black';
                icon = '&clubs;';
                break;
            }
            case 'Diamonds': {
                cardBlock.style.color = 'black';
                icon = '&diams;';
                break;
            }
        }
        cardBlock.innerHTML = cardPlayer.value + '<br>' + icon;

        let index = this.playersRender.currentPlayer.id - 1;
        playerBlocks[index].append(cardBlock);   
    }

    showPoints() {
        let currPlayerBlock = document.querySelectorAll('.player');
        let index = this.playersRender.currentPlayer.id - 1;

        let points = currPlayerBlock[index].querySelector('p');
        points.textContent = this.playersRender.currentPlayer.points; 
    }

    showStatus(booleanStatus, winnerPlayer) {
        if (booleanStatus === false) {
            this.status.textContent = `${this.playersRender.currentPlayer.name} lost`;
        }
        else {
            this.status.textContent = `${winnerPlayer.name} win!`;
        }
    }

    getCountPlayers() {
        let countPlayersElem = document.querySelectorAll('.input-count');
        let countPlayers = countPlayersElem[1].value;
        return countPlayers;
    }

    deletePlayers() {
        let elems = document.querySelectorAll('.player');

        for(let elem of elems) {
            elem.remove();
        }
    }

    clearStatus() {
        this.status.textContent = '';
    }
}