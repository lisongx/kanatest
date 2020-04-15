import React from "react";
import "./App.scss";
import 'tachyons/css/tachyons.css'

import sample   from 'lodash/sampleSize'

import KanaTable from './components/KanaTable';

import kanaData from './kana.json';

function App() {
  const kanaList = sample(kanaData, 20);

  return (
    <div className="App">
      <header className="App-header">
        <h1>untitled</h1>
      </header>

      <KanaTable items={kanaList} />
    </div>
  );
}

export default App;
