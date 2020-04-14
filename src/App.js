import React from "react";
import "./App.scss";

import Kana from './components/Kana';

import kanaData from './kana.json';

function App() {
  const randomKana = kanaData[Math.floor(Math.random() * kanaData.length)];

  return (
    <div className="App">
      <header className="App-header">
        <Kana char={randomKana.char} />
      </header>
    </div>
  );
}

export default App;
