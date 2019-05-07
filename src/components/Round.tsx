import * as React from 'react';
import {Col, Container, Row} from 'reactstrap';
import config from 'src/config';
import { IRound } from '../shared';
import AnswerCard, { ChoiceState } from './AnswerCard';
import './Round.css'
import SoundCard from './SoundCard';

export interface IRoundProps extends IRound {
    choiceHandler(correctChoice: string, pickedChoice: string): void
}

export interface IRoundState {
    pickedChoice: Maybe<string>;
}

export default class Round extends React.Component<IRoundProps, IRoundState> {
    constructor(props: IRoundProps) {
        super(props);

        this.state = {
            pickedChoice: null,
        }
    }

    public choiceHandler = (choice: string) => {
        let audio: HTMLAudioElement;
        if(choice === this.props.correctChoice){
            audio = new Audio(require('../assets/correct.wav'));
        } else {
            audio = new Audio(require('../assets/wrong.wav'));
        }
        audio.play();
        this.setState({ pickedChoice: choice });

        setTimeout(() => {
            this.setState({pickedChoice: null});
            this.props.choiceHandler(this.props.correctChoice, choice)
        }, config.WAIT_TIME);
    }

    public render() {
        return (
            <Container id='round'>
                <Row>
                    {/* TODO: Probably a better way to center... */}
                    <Col/>
                    <Col className='d-flex justify-content-center'>
                        <SoundCard sound={this.props.correctChoice} />
                    </Col>
                    <Col/>
                </Row>

                {/* TODO: Also high-light correct choice when wrong choice is picked */}
                <Row>
                    {this.props.choices.map(choice => {
                        let choiceState: ChoiceState = 'notChosen';
                        if (choice === this.state.pickedChoice) {
                            choiceState = choice === this.props.correctChoice ? 'correct' : 'incorrect';
                        }
                        return (<Col key={choice}>
                            <AnswerCard
                                onClickHandler={() => this.choiceHandler(choice)}
                                value={choice}
                                choiceState={choiceState}
                            />
                        </Col>)
                    })}
                </Row>
            </Container>
        );
    }
}
