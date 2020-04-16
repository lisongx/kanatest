import React from "react";
import "./App.scss";
import 'tachyons/css/tachyons.css'

import KanaTest from './components/KanaTest';

function App() {
  return (
    <div className="cf w-100 pv3 f6 ph3 ph4-ns">
        <header className="db dt-ns mw8 center w-100 ph3-ns">
            <div className="db dtc-ns v-mid tl w-50 pa2">
                <a href="/" className="dib f5 f4-ns fw6 mt0 mb1 link black-70" title="Home">
                KANA
                <div className="dib">
                  <small className="nowrap f6 mt2 mt3-ns pr2 black-70 fw2">&nbsp;v0.01</small>
                </div>
                </a>
            </div>

            <nav className="db dtc-ns v-mid w-100 tr tr-ns mt2 mt0-ns pa2">
                <a title="" href="" className="f6 fw6 link ml2 ml3-m ml4-l dib">
                    Link
                </a>

                <a title="" href="" className="f6 fw6 link ml2 ml3-m ml4-l dib">
                    Link
                </a>
            </nav>
        </header>

        <div className="mw8 center ph3-ns">
            <div className="ph2-ns">
                <div className="w-100 pa2 bg-white">
                now + next
                    <div className="db-s flex-ns">
                        <div className="h5 w-100 w-75-m f-headline tc">
                            A
                        </div>

                        <div className="h5 w-100 w-25-m h1 f-subheadline tc">
                            B
                        </div>
                    </div>

                    Previous + total correct / total wrong. History

                    <KanaTest />
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
