
import React from 'react';
import sample from 'lodash/sampleSize'

import kanaData from '../../kana.json';

const getKanaList = () => {
    return sample(kanaData, 15);
};

const TEST_TIME_OUT = 60;

export default class KanaTest extends React.Component {

    constructor(props) {
        super(props);
        this.items = getKanaList();
        this.timer = null;
        this.state = {
            timeLeft: TEST_TIME_OUT,
            currentIndex: 0,
            results: [],
            inputValue: "",
        };
    }

    componentDidMount() {
        this.startTimer();
    }

    testInputForItem = (value, item) => {
        return item.romanji === value;
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
        this.setState({ timeLeft })

        if (timeLeft === 0) {
            alert("finished!");
            clearInterval(this.timer);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { currentIndex, results, inputValue } = this.state;

        const answerResult = this.testInputForItem(inputValue, this.items[currentIndex]);

        this.setState({
            currentIndex: currentIndex + 1,
            results: [
                ...results,
                answerResult
            ],
            inputValue: ""
        })
    }

    render() {
        const { currentIndex, results, timeLeft } = this.state;
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
                                    placeholder="Type here"
                                    className={"shadow-3 pv2 ph2 f2 dark-gray b--light-pink"}
                                    value={this.state.inputValue} onChange={this.handleChange}
                                />
                                {/* <input type="submit" value="Submit" /> */}
                            </form>
                        </div>
                        <div className="w-100 w-20-m tc f2">
                            00:{timeLeft}
                        </div>
                        <div className="w-100 w-20-m tc f2" onClick={this.restartTest}>
                            Restart?
                        </div>
                    </div>
                </div>
            </div>
        </div >)
    }
}

