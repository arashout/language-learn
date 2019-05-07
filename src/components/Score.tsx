import * as React from 'react';
import './Score.css';

export interface IScoreProps {
    value: number
}

export default function Score (props: IScoreProps) {
    return (
      <div id='score'>
        <p className='display-2'>{props.value}</p>
      </div>
    );
}
