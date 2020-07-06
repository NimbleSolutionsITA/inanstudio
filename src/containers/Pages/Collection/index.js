/*
 * Collection
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Container from "../../../components/Container";
import {Divider, Typography, Grid} from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useWordpressData from "../../../providers/WordpressDataProvider";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";
import useWoocommerceData from "../../../providers/WoocommerceDataProvider";
import Button from "../../../components/Button";
import {ControlBar, Player} from "video-react";
import {toggleShowContent} from "../Home/actions";

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


const responsive = {
    desktop: {
        breakpoint: { max: 1920, min: 925 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 925, min: 735 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 735, min: 0 },
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
        partialVisibilityGutter: 30

    }
};

const Card = ({content}) => {
    return (
        <React.Fragment>
            <img style={{width: '100%', marginBottom: '-2px'}} src={content.image} alt="inan collection" />
            <Divider />
            <div style={{display: 'flex', padding: '2px 0'}}>
                <Typography variant="h3" component="div">{content.name}</Typography>
                <div style={{flexGrow: 1}} />
                {content.slug && <Button style={{padding: 0}} disalblePadding disableHover disableGutters lineThrough to={`/shop/${content.slug}`}>View Product</Button>}
            </div>
        </React.Fragment>
    )
}

const Col = ({category, collection}) => {
    const player = useRef(null);
    const [playerState, setPlayerState] = useState({})
    const dispatch = useDispatch();
    const showContent = useSelector(state => state.homeCover.showContent);

    const products = useWoocommerceData(`products`, {per_page: 100, category: category.id})
    const collectionProducts = products?.filter(p => p.acf.collection).map(p => {
        return {
            slug: p.stock_status === 'outofstock' ? null : p.slug,
            name: p.name,
            image: p.acf.collection
        }
    })
    const lookbookProducts = products?.filter(p => p.acf.lookbook).map(p => {
        return {
            slug: p.stock_status === 'outofstock' ? null : p.slug,
            name: p.name,
            image: p.acf.lookbook
        }
    })
    const gallery = [
        {src:  collection?.acf.gallery1, alt: 'collection gallery 1'},
        ...(collection.acf.gallery2 ? [{src:  collection.acf.gallery2, alt: 'collection gallery 2'}] : []),
        ...(collection.acf.gallery3 ? [{src:  collection.acf.gallery3, alt: 'collection gallery 3'}] : []),
        ...(collection.acf.gallery4 ? [{src:  collection.acf.gallery4, alt: 'collection gallery 4'}] : []),
        ...(collection.acf.gallery5 ? [{src:  collection.acf.gallery5, alt: 'collection gallery 5'}] : []),
        ...(collection.acf.gallery6 ? [{src:  collection.acf.gallery6, alt: 'collection gallery 6'}] : []),
        ...(collection.acf.gallery7 ? [{src:  collection.acf.gallery7, alt: 'collection gallery 7'}] : []),
        ...(collection.acf.gallery8 ? [{src:  collection.acf.gallery8, alt: 'collection gallery 8'}] : []),
        ...(collection.acf.gallery9 ? [{src:  collection.acf.gallery9, alt: 'collection gallery 9'}] : []),
    ]
    useEffect(() => {
        if (collection.acf.video) {
            player.current.subscribeToStateChange(pl => setPlayerState(pl))
            if (playerState.paused) dispatch(toggleShowContent(true))
            else dispatch(toggleShowContent(false))
        }
    }, [collection.acf.video, dispatch, player, playerState.paused, showContent])

    const CustomButtonGroupAsArrows = ({ next, previous }) => {
        return (
            <React.Fragment>
                <button
                    onClick={() => previous()}
                    aria-label="Go to previous slide"
                    className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
                />
                <button
                    onClick={() => next()}
                    aria-label="Go to next slide"
                    className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
                />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Typography variant="h1">{category.name}</Typography>
            <Divider />
            {gallery && (
                <Container maxWidth="sm" style={{position: 'relative'}}>
                    <Carousel
                        arrows={false}
                        renderButtonGroupOutside={true}
                        customButtonGroup={<CustomButtonGroupAsArrows />}
                        additionalTransfrom={0}
                        centerMode={false}
                        dotListClass=""
                        draggable
                        focusOnSelect={false}
                        infinite
                        keyBoardControl
                        minimumTouchDrag={80}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 1920, min: 925 },
                                items: 1,
                            },
                            tablet: {
                                breakpoint: { max: 925, min: 735 },
                                items: 1,
                            },
                            mobile: {
                                breakpoint: { max: 735, min: 0 },
                                items: 1,
                            }
                        }}
                        slidesToSlide={1}
                        swipeable
                    >
                        {gallery.map(image => (
                            <img src={image.src} alt={image.alt} style={{width: '100%'}} />
                        ))}
                    </Carousel>
                </Container>
            )}
            <br />
            <br />
            <br />
            <Grid container spacing={4}>
                {collectionProducts?.map(prod => (
                    <Grid key={prod.name} item xs={12} md={6}>
                        <Card content={prod} />
                        <Divider />
                    </Grid>
                ))}
            </Grid>
            {collection.acf.video && (
                <React.Fragment>
                    <br />
                    <br />
                    <div style={{position: 'relative'}}>
                        <Player
                            ref={player}
                            poster={collection.acf.video_poster.url}
                            playsInline
                        >
                            <source src={collection.acf.video} />
                            <ControlBar />
                        </Player>
                        <Typography
                            hidden={!playerState.paused}
                            component={WatchButton}
                            style={{color: '#fff'}}
                            variant="h1"
                            onClick={() => player.current.play()}
                        >
                            WATCH
                        </Typography>
                    </div>
                </React.Fragment>
            )}
            <br />
            <br />
            <br />
            <br />
            <Typography variant="h1">Lookbook</Typography>
            <Divider />
            <br />
            <br />
            {lookbookProducts && (
                <div style={{position: 'relative'}}>
                    <Carousel
                        arrows={false}
                        renderButtonGroupOutside={true}
                        customButtonGroup={<CustomButtonGroupAsArrows />}
                        partialVisible={true}
                        responsive={responsive}
                        containerClass="carousel-container"
                        itemClass="carousel-item-padding-40-px"
                        slidesToSlide={1}
                        swipeable
                        draggable
                        focusOnSelect={false}
                        infinite
                        keyBoardControl
                        minimumTouchDrag={80}

                    >
                        {lookbookProducts.map(lb => (
                            <Card key={lb.name} content={lb} />
                        ))}
                    </Carousel>
                </div>)}
        </React.Fragment>
    )
}

function Collection() {
    const collections = useWordpressData('collection', [])
    const categories = useSelector(state => state.woocommerce['products-categories'])
    let { slug } = useParams();
    let history = useHistory();

    const category = categories?.filter((c,i) => slug ? c.slug === slug : i === 0)[0]
    const collection = collections?.filter((c,i) => slug ? c.title.rendered === slug : i === 0)[0]
    if (categories && !category && !collection) history.push('/error/collection/404')

    return (
        <Container headerPadding>
            {category && collection && <Col category={category} collection={collection} />}
        </Container>
    );
}

export default Collection;
