import * as React from 'react';
import listenImg from '../assets/listen.png';


interface ISoundCardProps {
    sound: string;
}

interface ISoundCardState {
    audio: HTMLAudioElement;
}

export default class SoundCard extends React.Component<ISoundCardProps, ISoundCardState> {
    constructor(props: ISoundCardProps) {
        super(props);

    }
    public componentWillMount() {
        this.setState({ audio: new Audio(this.getAudio(this.props.sound)) });
    }

    public componentWillReceiveProps(nextProps: ISoundCardProps) {
        console.log("Recieved props: ", nextProps);
        if (nextProps.sound !== this.props.sound) {
            this.setState({ audio: new Audio(this.getAudio(nextProps.sound)) })
        }
    }
    public getAudio(sound: string): string {
        console.log('require sound' + sound);
        return require(`../assets/sounds/${sound}.mp3`);
    }


    public playAudio = () => {
        this.state.audio
            .play()
            .catch((r) => console.error("Could not play audio!" + r));
    }
    public render() {
        return (
            <div className='btn btn-light'>
                <img src={listenImg} alt={listenImg} onClick={this.playAudio} />
            </div>
        )
    }
}
