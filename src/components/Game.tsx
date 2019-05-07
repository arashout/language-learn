import produce from 'immer';
import * as React from 'react';
import { Col, Container, Progress, Row } from 'reactstrap';
import { IRound } from 'src/shared';
import config from '../config';
import './Game.css'
import Round from './Round';

export interface IGameProps {
    sounds: string[];
}

export interface IGameState {
    currentRound: IRound;
    remainingSounds: string[];
    score: number;
}

export default class Game extends React.Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);

        this.state = {
            currentRound: this.generateRound(this.props.sounds),
            remainingSounds: this.props.sounds,
            score: 0,
        }
    }

    // TODO: Test this function
    public generateRound(possibleSounds: string[]): IRound {
        const correctChoice = possibleSounds.cRandomChoice();
        const choices = [correctChoice];
        for (let i = 0; i < config.NUM_CHOICES - 1; i++) {
            choices.push(this.props.sounds.cRandomChoiceExcept(choices))
        }

        return {
            choices: choices.cShuffle(),
            correctChoice
        }
    }

    public choiceHandler = (correctChoice: string, pickedChoice: string): void => {
        console.log(this.state);
        let nextState: IGameState;
        if (pickedChoice === correctChoice) {
            nextState = produce(this.state, draftState => {
                draftState.score += 1;
                draftState.remainingSounds.cRemove(pickedChoice);
                // TODO: Repeat the sounds we got wrong
                if (draftState.remainingSounds.length === 0) {
                    draftState.remainingSounds = this.props.sounds;
                }
                draftState.currentRound = this.generateRound(draftState.remainingSounds);
            });
        } else {
            nextState = produce(this.state, draftState => {
                draftState.currentRound = this.generateRound(draftState.remainingSounds);
            });
        }
        this.setState(nextState);
    }

    public render() {
        return (
            <div id='game'>
                <Container>
                    <Row>
                        <Col>
                            <Round choiceHandler={this.choiceHandler} {...this.state.currentRound} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Progress value={this.state.score} max={config.NUM_ROUNDS} />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
