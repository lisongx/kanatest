import React from 'react';
import sample   from 'lodash/sampleSize'

import KanaTable from '../KanaTable';

import kanaData from '../../kana.json';

export default class KanaTest extends React.Component {

    constructor(props) {
        super(props);
        this.items = sample(kanaData, 15);
        this.state = {
            currentIndex: 0,
            results: [],
            inputValue: "",
        };

    }

    testInputForItem = (value, item) => {
        return item.romanji === value;
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value});
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
        const { currentIndex, results } = this.state;

        return <>
            <KanaTable
                items={this.items}
                currentIndex={currentIndex}
                results={results}
            />

            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    className={"shadow-3 pv2 ph2 f2 dark-gray b--light-pink"}
                    value={this.state.inputValue} onChange={this.handleChange}
                />
                <input type="submit" value="Submit" />
            </form>
        </>
    }
}



