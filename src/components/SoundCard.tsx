import * as React from 'react';
import config from 'src/config';
import listenImg from '../assets/listen.png';
import slowImg from '../assets/slow.png';
import './SoundCard.css';

interface ISoundCardProps {
    sound: string;
}

interface ISoundCardState {
    audio: HTMLAudioElement;
    recentlyClicked: boolean;
    img: string;
}

export default class SoundCard extends React.Component<ISoundCardProps, ISoundCardState> {
    constructor(props: ISoundCardProps) {
        super(props);
    }

    public componentWillMount() {
        this.setState({ 
            audio: new Audio(this.getAudio(this.props.sound)), 
            recentlyClicked: false, 
            img: listenImg 
        });
    }

    public componentWillReceiveProps(nextProps: ISoundCardProps) {
        if (nextProps.sound !== this.props.sound) {
            this.setState({ audio: new Audio(this.getAudio(nextProps.sound)) })
        }
    }

    public getAudio(sound: string): string {
        return require(`../assets/sounds/${sound}.mp3`);
    }


    public playAudio = () => {
        if (this.state.recentlyClicked) {
            this.state.audio.playbackRate = 0.6;
            
        }

        this.state.audio
            .play()
            .catch((r) => console.error("Could not play audio!" + r));

        this.setState({ audio: this.state.audio, recentlyClicked: true, img: slowImg });

        setTimeout(() => {
            this.setState({ audio: this.state.audio, recentlyClicked: false, img: listenImg });
        }, config.WAIT_TIME * 2);
    }
    public render() {
        return (
            <div id='sound-card' className='btn btn-light'>
                <img src={this.state.img} onClick={this.playAudio} />
            </div>
        )
    }
}
