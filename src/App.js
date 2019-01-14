import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import Gifs from "./cards.json";
import "./App.css";

class App extends Component {
  // Setting this.state.Gifs to the cards json array
  state = {
    Gifs,
    clickedGifIds: [],
    score: 0,
    goal: 10,
    status: ""
  };

  //shuffle the Gif cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedGifIds = this.state.clickedGifIds;

    if(clickedGifIds.includes(id)){
      this.setState({ clickedGifIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedGifIds.push(id)

      if(clickedGifIds.length === 10){
        this.setState({score: 10, status: "You Won! Great Job, Smartie! Click to play again!", clickedGifIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ Gifs, clickedGifIds, score: clickedGifIds.length, status: " " });

      for (let i = Gifs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [Gifs[i], Gifs[j]] = [Gifs[j], Gifs[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clickster</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.Gifs.map(Gif => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={Gif.id}
              key={Gif.id}
              image={Gif.image}
            />
          ))}
        </Wrapper>
        <footer>
         <br></br>
        </footer>
    </div>
    );
  }
}

export default App;