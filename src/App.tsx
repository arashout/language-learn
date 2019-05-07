import * as React from 'react';
import './App.css';
import Game from './components/Game';

// const mockRound: IRoundProps = {
//   audio: require('src/assets/sounds/a.mp3'),
//   choices: ['a', 'b', 'c'],
//   correctChoice: 'b',
// }
const consonants = ['b', 'c', 'd', 'f', 'g'];

class App extends React.Component {
  public render() {
    return (
      <div id='app'>
        <Game sounds={consonants}/>
      </div>
    );
  }
}

export default App;
