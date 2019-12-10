import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let cardsArr = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd',];


class CardsWrapper extends React.Component {
  constructor(props) {
    super(props);
    let cards = cardsArr.sort(function () {
      return Math.random() - 0.5;
    });
    this.state = {
      cards: cards,
      openedCards: [],
      equalCards: [],
      playerOne: 0,
      playerTwo: 0,
      nextTurn: true,
    };
  }

  handleCardClick = (index) => {
    const {openedCards, cards, equalCards, nextTurn, playerOne, playerTwo} = this.state;

    if (openedCards.length < 2) {
      let newOpenedCards = [...openedCards, index];
      this.setState({openedCards: newOpenedCards});

      if (newOpenedCards.length === 2) {
        if (cards[newOpenedCards[0]] !== cards[newOpenedCards[1]]) {
          setTimeout(() => {
            this.setState({openedCards: [], nextTurn: !nextTurn});
          }, 1000);
        } else {
          let newEqualCards = [...equalCards, ...newOpenedCards];
          let changedPlayer;

          if (nextTurn) {
            changedPlayer = {playerOne: playerOne + 1};
          } else {
            changedPlayer = {playerTwo: playerTwo + 1};
          }
          this.setState({equalCards: newEqualCards, openedCards: [], ...changedPlayer});

          if (newEqualCards.length === cards.length) {
            const {playerOne, playerTwo} = this.state;
            alert(`Player 1: ${nextTurn ? changedPlayer : playerOne}, Player 2: ${!nextTurn ? changedPlayer : playerTwo}`);
          }

          // console.log(this.state.nextTurn);
        }
      }
    }
    // if (cardsArr.length === equalCards.length) alert('Game is over');
  };

  render() {
    const {cards, openedCards, equalCards, playerOne, playerTwo} = this.state;
    console.log(playerTwo, playerOne);
    return (
      <div>
        <div className="cards-wrapper d-flex space-around flex-wrap">
          {
            cards.map((card, index) =>
              <Card
                key={index}
                index={index}
                openedCards={openedCards}
                equalCards={equalCards}
                onCardClick={this.handleCardClick}
              >
                {card}
              </Card>
            )
          }
        </div>
        <div className="result d-flex align-center space-around">
          <div>
            {
              `Player 1: ${this.state.playerOne}, 
              Player 2: ${this.state.playerTwo}`
            }
          </div>
          <button className="btn">Reset</button>
        </div>
      </div>

    )
  }
}

class Card extends React.Component {
  get classes() {
    const {openedCards, index, equalCards} = this.props;
    let classes = 'card';
    if (openedCards.includes(index) || equalCards.includes(index)) classes += ' front-side';
    return classes;
  }

  toggleCard = () => {
    const {onCardClick, index} = this.props;
    onCardClick(index);
  };

  render() {
    const {children} = this.props;
    return (
      <div className={this.classes} onClick={this.toggleCard}>{children}</div>
    )
  }
}

ReactDOM.render(
  <CardsWrapper/>
  , document.getElementById("root"));
