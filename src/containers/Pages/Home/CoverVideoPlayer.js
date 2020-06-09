import React, {useEffect, useMemo, useRef, useState} from 'react';
import { Player, ControlBar } from 'video-react';
import {Typography} from "@material-ui/core";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowContent} from "./actions";

const WatchButton = styled.div`
  margin: 0;
  position: absolute;
  width: 100%;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  color: ${({col}) => col};
  cursor: pointer;
  transition: opacity .75s ease;
  :hover {
    opacity: .5;
  }
`;
const CoverVideoPlayer = (props) => {
    const player = useRef(null);
    const [playerState, setPlayerState] = useState({})
    const dispatch = useDispatch();
    const showContent = useSelector(state => state.homeCover.showContent);

    useEffect(() => {
        player.current.subscribeToStateChange(pl => setPlayerState(pl))
        if (playerState.paused) dispatch(toggleShowContent(true))
        else dispatch(toggleShowContent(false))
     }, [dispatch, player, playerState.paused, showContent])
    return (useMemo(() => (
        <div style={{position: 'relative', backgroundImage: `url(${props.poster})`, height: `calc(100vh - ${props.headerHeight}px)`}}>
            <Player
                ref={player}
                poster={props.poster}
                loop={props.loop}
                autoPlay={props.autoplay}
                muted={props.mute}
                playsInline
                fluid={false}
                height={window.innerHeight}
                width={window.innerWidth}
            >
                <source src={props.src} />
                <ControlBar />
            </Player>
            <Typography
                hidden={!showContent}
                col={props.color}
                component={WatchButton}
                variant="h1"
                onClick={() => player.current.play()}
            >
                WATCH
            </Typography>
        </div>
        ), [props.autoplay, props.color, props.headerHeight, props.loop, props.mute, props.poster, props.src, showContent])
    );
}

export default CoverVideoPlayer;