import logo from './logo.svg';
import './App.css';
import Game from './Game';
import { useState } from 'react';

function App() {

  const [won, setWon] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        { won ? <div className="alert alert-success">
            <strong>{won} has won the game.</strong>  Start a new game!
          </div> : <></>
        }
        { error ? <div className="alert alert-danger">
            {error}
          </div> : <></>
        }
        <Game onWin={setWon} onError={setError} onRestart={() => { setWon(null); setError(null); }} />
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
      </header>
    </div>
  );
}

export default App;
