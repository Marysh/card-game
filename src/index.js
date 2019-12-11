import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// let cardsArr = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd',];
let cardsArr = [
  {
    src: 'https://cdn.fishki.net/upload/post/2018/07/15/2651316/3-3.jpg',
    identifier: 'a'
  },
  {
    src: 'https://cdn.fishki.net/upload/post/2018/07/15/2651316/3-3.jpg',
    identifier: 'a'
  },
  {
    src: 'http://depo.ua/static/media/2018-01-18/files/27835738_CONVAR2297.jpg',
    identifier: 'b'
  },
  {
    src: 'http://depo.ua/static/media/2018-01-18/files/27835738_CONVAR2297.jpg',
    identifier: 'b'
  },
  {
    src: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/5C93/production/_108799632_sarah-skinner_grab-life-by-the-_00003735.jpg',
    identifier: 'c'
  },
  {
    src: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/5C93/production/_108799632_sarah-skinner_grab-life-by-the-_00003735.jpg',
    identifier: 'c'
  },
  {
    src: 'https://znaj.ua/images/2019/11/13/Onu022WeMi1McVQKrhiBSDCyng1Lx9LiQr5NE6pr.jpeg',
    identifier: 'd'
  },
  {
    src: 'https://znaj.ua/images/2019/11/13/Onu022WeMi1McVQKrhiBSDCyng1Lx9LiQr5NE6pr.jpeg',
    identifier: 'd'
  },
];


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

    if (openedCards.length < 2 && !openedCards.includes(index) && !equalCards.includes(index)) {
      let newOpenedCards = [...openedCards, index];
      this.setState({openedCards: newOpenedCards});

      if (newOpenedCards.length === 2) {
        if (cards[newOpenedCards[0]].identifier !== cards[newOpenedCards[1]].identifier) {
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
        }
      }
    }
    // if (cardsArr.length === equalCards.length) alert('Game is over');
  };
  resetCards = () => {
    this.setState({
      openedCards: [],
      equalCards: [],
      playerOne: 0,
      playerTwo: 0,
      nextTurn: true
    })
  };

  render() {
    const {cards, openedCards, equalCards, playerOne, playerTwo} = this.state;
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
                <div className="img-wrapper">
                  <img src={card.src} alt={card.identifier}/>
                </div>
              </Card>
            )
          }
        </div>

        <div className="result">
          <div className="d-flex space-around">
            <div>Player First: {playerOne}</div>
            <div>Player Second: {playerTwo}</div>
          </div>
          {
            // equalCards.length === cards.length ? <button className="btn">Reset</button> : null
            equalCards.length === cards.length &&
            <button className="btn" onClick={this.resetCards}>Reset</button>
          }
        </div>

      </div>

    )
  }
}

class Card extends React.Component {
  get cardClasses() {
    const {openedCards, index, equalCards} = this.props;
    let classes = 'card';
    if (openedCards.includes(index) || equalCards.includes(index)) classes += ' card-opened';
    return classes;
  }

  toggleCard = () => {
    const {onCardClick, index} = this.props;
    onCardClick(index);
  };

  render() {
    const {children} = this.props;
    return (
      <div className={this.cardClasses} onClick={this.toggleCard}>
        <div className="card-content front-side">{children}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <CardsWrapper/>
  , document.getElementById("root"));
