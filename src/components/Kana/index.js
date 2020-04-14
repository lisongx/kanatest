import React from 'react';

export default class Kana extends React.PureComponent {

    render() {
        const { char } = this.props;

        return <div class="f-headline kana-item">
            {char}
        </div>
    }
}



