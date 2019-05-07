import * as React from 'react';
import { Button } from 'reactstrap';
import './AnswerCard.css'

export type ChoiceState = 'correct' | 'incorrect' | 'notChosen';

export interface IAnswerCardProps {
    value: string;
    onClickHandler: () => void;
    choiceState: ChoiceState;
}

export interface IAnswerCardState {
}

export default class AnswerCard extends React.Component<IAnswerCardProps, IAnswerCardState> {
    constructor(props: IAnswerCardProps) {
        super(props);

        this.state = {
        }
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
                    <p className="display-4">{this.props.value}</p>
                </Button>
            </div>
        );
    }
}
