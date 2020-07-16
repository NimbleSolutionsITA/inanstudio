/*
 * HomeCover
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useLayoutEffect, useMemo, createRef} from 'react';
import useWordpressData from '../../../providers/WordpressDataProvider';
import {checkLogin, login, logout} from "../../../providers/AuthProvider/actions";
import {setCurrentCover} from "./actions";
import {connect} from "react-redux";
import HomeCover from "./HomeCover";
import CoverContent from "./HomeCover/CoverContent";
import {useMediaQuery, useTheme} from "@material-ui/core";

function Home(props) {
    useWordpressData('home_covers', [])
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))

    const arrLength = props.covers?.length;
    const elRefs = React.useRef([]);

    if (elRefs.current.length !== arrLength) {
        // add or remove refs
        elRefs.current = Array(arrLength).fill(undefined, undefined, undefined).map((_, i) => elRefs.current[i] || createRef());
    }
    useLayoutEffect(() => {
        if(props.covers && window.scrollY === 0)
            props.setCurrentCover(
                0,
                props.covers[0].acf.color,
                props.covers[0].acf.color_mobile,
                props.covers[0].title.rendered,
                props.covers[0].acf.cta_text,
                props.covers[0].acf.cta_link
            );
        let throttleTimeout = null
        const wait = 250
        const callBack = () => {
            if (elRefs.current[0].current) {
                elRefs.current.forEach((h, i) => {
                    if (
                        h.current.getBoundingClientRect().top < 200 &&
                        h.current.getBoundingClientRect().bottom > 200 &&
                        i !== props.currentCover.index
                    )
                        props.setCurrentCover(i, props.covers[i].acf.color, props.covers[i].acf.color_mobile, props.covers[i].title.rendered, props.covers[i].acf.cta_text, props.covers[i].acf.cta_link);
                })
            }
            throttleTimeout = null
        }

        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait)
                }
            } else {
                callBack()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [props, elRefs])


    return ( useMemo(() => (
        <div style={{position: 'relative'}}>

            {props.showContent && (
                <CoverContent
                    color={props.headerColor}
                    colorMobile={props.headerColorMobile}
                    title={props.currentCover.title}
                    ctaLink={props.currentCover.ctaLink}
                    ctaText={props.currentCover.ctaText}
                    isMobile={isMobile}
                    headerHeight={props.headerHeight}
                />
            )}
            {props.covers && props.covers.map((cover, index) => (
                <div key={cover.id} ref={elRefs.current[index]} style={{minHeight: index === props.covers.length - 1 && (isMobile ? window.innerHeight - 520 : window.innerHeight - 150)}}>
                    <HomeCover
                        bg={cover.acf.image}
                        bgMobile={cover.acf.image_mobile || cover.acf.image}
                        title={cover.title.rendered}
                        color={cover.acf.color}
                        colorMobile={cover.acf.color_mobile || cover.acf.color}
                        video={cover.acf.video}
                        isCover={cover.acf.is_cover}
                        isCoverMobile={cover.acf.is_cover_mobile}
                        loop={cover.acf.loop}
                        autoplay={cover.acf.autoplay}
                        mute={cover.acf.mute}
                        isMobile={isMobile}
                        headerHeight={props.headerHeight}
                        showContent={props.showContent}
                    />
                </div>
            ))}
        </div>
        ), [isMobile, props.covers, props.currentCover.ctaLink, props.currentCover.ctaText, props.currentCover.title, props.headerColor, props.headerColorMobile, props.headerHeight, props.showContent])
    );
}

const mapStateToProps = state => ({
    covers: state.wordpress['home-covers'],
    currentCover: state.homeCover,
    showContent: state.homeCover.showContent,
    headerColor: state.header.headerColor,
    headerColorMobile: state.header.headerColorMobile,
    headerHeight: state.header.height,
})

const mapDispatchToProps = {
    checkLogin,
    login,
    logout,
    setCurrentCover,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
