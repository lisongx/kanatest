import React from 'react';
import classNames from "classnames"

export default class Kana extends React.PureComponent {
    static defaultProps = {
        isCurrent: false,
        answerResult: null,
    }
    render() {
        const { char, isCurrent, answerResult } = this.props;
        let colorClass = "dark-gray";

        if (isCurrent) {
            colorClass = "light-blue";
        } else if (answerResult === true) {
            colorClass = "green"
        } else if (answerResult === false) {
            colorClass = "dark-red"
        }

        return <div className={classNames(
            "f1",
            "kana-item",
            "w-50",
            "w-third-m",
            "w-20-l",
            "tc",
            colorClass
        )}>
            {char}
        </div>
    }
}
