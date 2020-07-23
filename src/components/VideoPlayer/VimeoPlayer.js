import React, {useState} from "react";
import Vimeo from '@u-wave/react-vimeo';
import {Typography} from "@material-ui/core";
import styled from "styled-components"
import {useDispatch} from "react-redux";
import {toggleShowContent} from "../../containers/Pages/Home/actions";

const WatchButton = styled.div`
  display: ${({isPlaying}) => isPlaying && 'none'};
  margin: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    text-decoration: line-through;
  }
  h1 {
      position: absolute;
      top: 50%;
      width: 100%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
        padding: 70% 0;
  }
`;

const VimeoPlayer = ({autoplay = true, video, loop = true, mute = true, color, background, cover}) => {
    const dispatch = useDispatch()
    const [isPlaying, setIsPlaying] = useState(autoplay)
    const handlePlay = () => {
        setIsPlaying(true)
        dispatch(toggleShowContent(false))
    }
    const handlePause = () => {
        setIsPlaying(false)
        dispatch(toggleShowContent(true))
    }

    return (
        <div style={{position: 'relative', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: cover && `url(${cover})`}}>
            <Vimeo
                style={{opacity: !isPlaying && cover && 0}}
                paused={!isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                video={video}
                color={color.substring(1)}
                responsive={true}
                background={background}
                showTitle={false}
                showPortrait={false}
                showByline={false}
                autoplay={autoplay}
                loop={loop}
                muted={mute}
            />
            <WatchButton style={{color}} hidden={isPlaying}>
                <Typography
                    style={{color}}
                    variant="h1"
                    onClick={handlePlay}
                >
                    WATCH
                </Typography>
            </WatchButton>
        </div>
    )
}

export default VimeoPlayer