
import React from 'react';
import sample from 'lodash/sampleSize'

import kanaData from '../../kana.json';
import KanaTable from '../KanaTable';

const getKanaList = () => {
    return sample(kanaData, 15);
};

const TEST_TIME_OUT = 90;

// Convert the number of seconds clock display f(90) => "01:30"
const secondsToDisplayTime = (seconds) => {
    const date = new Date(null);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
}

export default class KanaTest extends React.Component {

    constructor(props) {
        super(props);
        this.items = getKanaList();
        this.timer = null;
        this.state = {
            timeLeft: TEST_TIME_OUT,
            currentIndex: 0,
            results: [],
            finished: false,
            inputValue: "",
        };
    }

    componentDidMount() {
        this.startTimer();
    }

    testInputForItem = (value, item) => {
        return item.romanji === (value && value.toLowerCase());
    }

    handleChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    restartTest = () => {
        this.items = getKanaList();
        this.setState({
            currentIndex: 0,
            timeLeft: TEST_TIME_OUT,
            results: [],
            finished: false,
            inputValue: "",
        }, () => {
            this.startTimer()
        })
    }

    startTimer = () => {
        if (!this.timer) {
            this.timer = setInterval(() => this.countDown(), 1000);
        }
    }

    countDown() {
        const timeLeft = this.state.timeLeft - 1;

        if (timeLeft === 0) {
            clearInterval(this.timer);
            this.setState({
                timeLeft,
                finished: true
            })
        } else {
            this.setState({ timeLeft })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { currentIndex, results, inputValue } = this.state;

        const answerResult = this.testInputForItem(inputValue, this.items[currentIndex]);
        const finished = currentIndex + 1 >= this.items.length;

        this.setState({
            finished,
            currentIndex: finished ? 0 : currentIndex + 1,
            results: [
                ...results,
                answerResult
            ],
            inputValue: ""
        })
    }

    render() {
        const { currentIndex, results, timeLeft, finished } = this.state;
        const currentKana = this.items[currentIndex];
        const nextKana = this.items[currentIndex + 1];

        return (<div className="mw8 center ph3-ns" >
            <div className="ph2-ns">
                <div className="w-100 pa2 bg-white">
                    <div className="db-ns flex-ns">
                        <div className="w-100 w-60-m h5 tc mr3 f-headline outline flex justify-center flex-column">
                            {currentKana && currentKana.char}
                        </div>
                        <div className="w-100 w-40-m h5 tc f-subheadline outline flex justify-center flex-column">
                            {nextKana && nextKana.char}
                        </div>
                    </div>
                </div>

                <div className="w-100 pa2 bg-white">
                    <div className="db-ns flex-ns items-center">
                        <div className="w-100 w-60-m tc f-headlin ">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="text"
                                    disabled={finished}
                                    placeholder={finished ? "Time's up!" : "Type here"}
                                    className={"shadow-3 pv2 ph2 f2 dark-gray b--light-pink"}
                                    value={this.state.inputValue} onChange={this.handleChange}
                                />
                                {/* <input type="submit" value="Submit" /> */}
                            </form>
                        </div>
                        <div className="w-100 w-20-m tc f2">
                            {secondsToDisplayTime(timeLeft)}
                        </div>
                        <button className="w-100 w-20-m tc f2" onClick={this.restartTest}>
                            Restart?
                        </button>
                    </div>
                </div>

                <section id="test-result" className="w-100 pa2 bg-white">
                    <KanaTable items={this.items} currentIndex={finished ? this.items.length : currentIndex} results={results} />
                </section>
            </div>
        </div >)
    }
}

