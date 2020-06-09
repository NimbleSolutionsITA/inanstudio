import React, {useEffect, useMemo, useRef, useState} from 'react'
import { Player, ControlBar } from 'video-react'
import {Typography} from "@material-ui/core"
import styled from "styled-components"

const WatchButton = styled.div`
  margin: 0;
  position: absolute;
  width: 100%;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  cursor: pointer;
  color: #fff;
  transition: opacity .75s ease;
  :hover {
    opacity: .5;
  }
`;
const VideoPlayer = (props) => {
    const player = useRef(null);
    const [playerState, setPlayerState] = useState({})
    useEffect(() => {
        player.current.subscribeToStateChange(pl => setPlayerState(pl))
     }, [])
    return (useMemo(() => (
        <div style={{position: 'relative', backgroundImage: `url(${props.poster})`}}>
            <Player
                ref={player}
                poster={props.poster}
                playsInline
            >
                <source src={props.src} />
                <ControlBar />
            </Player>
            <Typography
                hidden={!playerState.paused}
                component={WatchButton}
                variant="h1"
                onClick={() => player.current.play()}
            >
                WATCH
            </Typography>
        </div>
        ), [playerState.paused, props.poster, props.src])
    );
}

export default VideoPlayer;