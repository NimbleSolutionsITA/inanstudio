import React, { useMemo } from "react";
import {makeStyles, Typography} from "@material-ui/core";
import styled from 'styled-components';
import "video-react/dist/video-react.css";
import '../coverVideoPlayer.css';
import Container from "../../../../components/Container";
import CoverVideoPlayer from '../CoverVideoPlayer';

const CoverWrapper = styled.div`
  min-height:  ${({coverCSSHeight}) => coverCSSHeight};
  width: 100%;
  scroll-snap-align: start;
  text-transform: uppercase;
  background-image: ${({bg, isCover, video, showOverlay}) => isCover || (video && showOverlay) ? `url(${bg})` : 'none'};
  background-size: cover;
  background-position: center;
  background-color: ${({video}) => video ? '#000' : '#fff'};
  overflow: hidden;
`;
const PortraitImageWrapper = styled.div`
  margin: ${({isMobile}) => isMobile ? '0 auto' : '0 auto 80px'};
  width: ${({isMobile}) => isMobile ? '100%' : '66%'};
  display: ${({isMobile}) => isMobile ? '' : 'grid'};
  & img {
    width: 100%;
  }
`;

const HomeCover = ({headerHeight, bg, bgMobile, title, isCover, isCoverMobile, color, colorMobile, video, loop, autoplay, mute, showContent, isMobile,}) => {
    const useStyles = makeStyles((theme) => ({
        title: {
            paddingTop: 0,
            textTransform: 'uppercase',
            marginLeft: '-3px',
            opacity: 0,
            [theme.breakpoints.up('md')]: {
                lineHeight: '92px',
            },
        },
    }))
    const classes = useStyles()
    return useMemo(
        () => {
            const coverCSSHeight = () => {
                if(!isCover) return 'auto'
                else if(isMobile) return `calc(100vh - ${headerHeight}px)`
                else return '100vh'
            }
            return(
                <CoverWrapper coverCSSHeight={coverCSSHeight} bg={!video && isMobile ? bgMobile : bg} isCover={isMobile ? isCoverMobile : isCover} video={!!video} showOverlay={showContent}>
                {video ? (
                    <CoverVideoPlayer
                        poster={isMobile ? bgMobile : bg}
                        loop={loop}
                        autoPlay={autoplay}
                        muted={isMobile && autoplay ? false : mute}
                        src={video}
                        color={isMobile ? colorMobile : color}
                        headerHeight={isMobile ? headerHeight : 0}
                    />
                ) : (
                    <React.Fragment>
                        <Container style={{paddingTop: isMobile ? 0 : headerHeight}}>
                            {((!isCover && !isMobile) || (!isCoverMobile && isMobile)) && (
                                <React.Fragment>
                                    <Typography
                                        classes={{ root: classes.title }}
                                        variant="h1"
                                        component="h1"
                                    >
                                        {title}
                                    </Typography>
                                    <PortraitImageWrapper isMobile={isMobile}>
                                        <img alt={title} width="100%" src={isMobile ? bgMobile : bg} />
                                    </PortraitImageWrapper>
                                </React.Fragment>
                            )}
                        </Container>
                    </React.Fragment>
                )}
            </CoverWrapper>
        )}, [autoplay, bg, bgMobile, classes.title, color, colorMobile, headerHeight, isCover, isCoverMobile, isMobile, loop, mute, showContent, title, video]
    )
}

export default HomeCover;