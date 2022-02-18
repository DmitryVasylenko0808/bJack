class Deck {
    constructor() {
        this.suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
        this.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
            "J", "Q", "K", "A"];
        this.deck = [];
    }
    
    createDeck() {
        for(let v of this.values) {
            for(let s of this.suits) {
                let weight = parseInt(v);

                if (v === 'J' || v === 'Q' || v === 'K')
                weight = 10;
                if(v === 'A') weight = 11;

                let card = {value: v, suit: s, weightCard: weight};
                this.deck.push(card);
            }
        }
    }

    shuffleDeck() {
        const TURNS = 200;

        for(let i = 0; i < TURNS; i++) {
            let randIndexFirst = Math.floor(Math.random() * this.deck.length);
            let randIndexSecond = Math.floor(Math.random() * this.deck.length);
            
            let temp = this.deck[randIndexFirst];
            this.deck[randIndexFirst] = this.deck[randIndexSecond];
            this.deck[randIndexSecond] = temp; 
        }
    }

    getCard() {
        return this.deck.pop();
    }

    updateDeck() {
        this.deck = [];
        this.createDeck();
        this.shuffleDeck();
    }
}