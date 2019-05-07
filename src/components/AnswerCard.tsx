import * as React from 'react';
import { Button } from 'reactstrap';
import './AnswerCard.css'

export type ChoiceState = 'correct' | 'incorrect' | 'notChosen';

export interface IAnswerCardProps {
    value: string;
    onClickHandler: () => void;
    choiceState: ChoiceState;
}

// export interface IAnswerCardState {
// }
// TODO: Figure out what is causing 
export default class AnswerCard extends React.PureComponent<IAnswerCardProps> {
    constructor(props: IAnswerCardProps) {
        super(props);
    }

    public render() {
        // TODO: Could define a variant type... But I am lazy
        const colorChoice: { [CS in ChoiceState]: string } = {
            'correct': 'success',
            'incorrect': 'danger',
            'notChosen': 'secondary'
        }
        const colorModifier = colorChoice[this.props.choiceState];
        const isOutlined = this.props.choiceState === 'notChosen';
        return (
            <div className='answer-card'>
                <Button
                    size='lg'
                    color={colorModifier}
                    outline={isOutlined}
                    onClick={this.props.onClickHandler}>
                    <p className="display-2">{this.props.value}</p>
                </Button>
            </div>
        );
    }
}
