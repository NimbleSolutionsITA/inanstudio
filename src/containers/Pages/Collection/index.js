/*
 * Collection
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import {useHistory, useParams} from "react-router";
import {Divider, Typography, Grid, useTheme, useMediaQuery, Dialog, IconButton} from "@material-ui/core";
import Container from "../../../components/Container";
import Button from "../../../components/Button";
import useWordpressData from "../../../providers/WordpressDataProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VimeoPlayer from "../../../components/VideoPlayer/VimeoPlayer";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const Card = ({content, isMobile, isLookbook}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <img onClick={handleOpen} style={{width: '100%', marginBottom: '-2px', cursor: 'pointer'}} src={content.image} alt="inan collection" />
            <Divider />
            <Container disableGutters={!isMobile || isLookbook}>
                <div style={{display: 'flex', padding: '2px 0'}}>
                    <Typography variant="h3" component="div" style={{lineHeight: '21px'}}>{content.name === 'BAG BELT 4' ? 'bag belt' : content.name}</Typography>
                    <div style={{flexGrow: 1}} />
                    {content.slug && <Button style={{padding: 0}} disablePadding disableHover disableGutters lineThrough to={`/shop/${content.slug}`}>{isMobile ? 'View' : 'View Product'}</Button>}
                </div>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{zIndex: 1401}}
                fullScreen
            >
                <div style={{maxWidth: '100%', maxHeight: window.innerHeight, margin: 'auto'}}>
                    <img style={{objectFit: 'cover', marginBottom: '-2px', maxHeight: 'calc(100vh - 28px)', maxWidth: '100%'}} src={content.image} alt="inan collection" />
                    <Divider />
                    <div style={{display: 'flex', padding: '2px 0'}}>
                        <Typography variant="h3" component="div" style={{lineHeight: '21px'}}>{content.name === 'BAG BELT 4' ? 'bag belt' : content.name}</Typography>
                        <div style={{flexGrow: 1}} />
                        {content.slug && <Button style={{padding: 0}} disablePadding disableHover disableGutters lineThrough to={`/shop/${content.slug}`}>{isMobile ? 'View' : 'View Product'}</Button>}
                    </div>
                    <Divider />
                </div>
                <IconButton disableRipple onClick={() => setOpen(false)} style={{position: 'absolute', right: 0, top: 0}}><CloseOutlinedIcon style={{fontSize: '5rem'}} /></IconButton>
            </Dialog>
        </React.Fragment>
    )
}

const Col = ({category, collection, isMobile}) => {

    const products = useSelector(state => state.woocommerce.products);
    const collectionProducts = products?.filter(p => p.acf.collection).map(p => {
        return {
            slug: p.stock_status === 'outofstock' ? null : p.slug,
            name: p.name,
            image: p.acf.collection
        }
    })
    const lookbookProducts = products?.filter(p => p.acf.lookbook).sort((a,b) => (a.slug > b.slug) ? 1 : ((b.slug > a.slug) ? -1 : 0)).map(p => {
        return [
            {
                slug: p.stock_status === 'outofstock' ? null : p.slug,
                name: p.name,
                image: p.acf.lookbook,
            },
            p.acf.lookbook2 && {
                slug: p.stock_status === 'outofstock' ? null : p.slug,
                name: p.name,
                image: p.acf.lookbook2
            },
        ]
    }).reduce((acc, val) => val[1] ? [...acc, ...val] : [...acc, val[0]])

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

    return (useMemo(() => (
        <React.Fragment>
            <Container disableGutters={!isMobile}>
                <Typography variant="h1">{category.name}</Typography>
            </Container>
            <Divider />
            {gallery && (
                <Grid container justify="center">
                    <Grid item xs={12} md={7} style={{position: 'relative'}}>
                        <Carousel
                            arrows={false}
                            renderButtonGroupOutside={!isMobile}
                            customButtonGroup={!isMobile && <CustomButtonGroupAsArrows />}
                            showDots={isMobile}
                            additionalTransfrom={0}
                            draggable={false}
                            focusOnSelect={false}
                            infinite
                            keyBoardControl
                            minimumTouchDrag={80}
                            responsive={{
                                all: {
                                    breakpoint: { max: 10000, min: 0 },
                                    items: 1,
                                },
                            }}
                            slidesToSlide={1}
                            swipeable
                        >
                            {gallery.map(slide => (
                                <img key={slide.src} src={slide.src} alt={slide.alt} style={{width: '100%'}} />
                            ))}
                        </Carousel>
                    </Grid>
                </Grid>
            )}
            <br />
            <br />
            <br />
            <Grid container spacing={isMobile ? 0 : 4}>
                {collectionProducts?.map(prod => (
                    <Grid key={prod.slug || prod.image + prod.name} item xs={12} md={6}>
                        <Card isMobile={isMobile} content={prod} />
                        <Divider />
                        {isMobile && <br />}
                        {isMobile && <br />}
                    </Grid>
                ))}
            </Grid>
            {collection.acf.video && (
                <React.Fragment>
                    <br />
                    <br />
                    <div style={{position: 'relative'}}>
                        <VimeoPlayer
                            video={collection.acf.video}
                            autoplay={false}
                            cover={collection.acf.video_poster.url}
                            color="#fff"
                        />
                    </div>
                </React.Fragment>
            )}
            <br />
            <br />
            <br />
            <br />
            {lookbookProducts && (
                <React.Fragment>
                    <Container disableGutters={!isMobile}>
                        <Typography variant="h1">Lookbook</Typography>
                    </Container>
                        <Divider />
                        <br />
                        <br />
                    <Container disableGutters={!isMobile}>
                        <div style={{position: 'relative', marginRight: isMobile && '-16px'}}>
                            <Carousel
                                responsive={{
                                    desktop: {
                                        breakpoint: { max: 10000, min: 735 },
                                        items: 3,
                                    },
                                    mobile: {
                                        breakpoint: { max: 735, min: 0 },
                                        items: 2,
                                        partialVisibilityGutter: 40
                                    }
                                }}
                                partialVisbile
                                arrows={false}
                                renderButtonGroupOutside={!isMobile}
                                customButtonGroup={!isMobile && <CustomButtonGroupAsArrows />}
                                additionalTransfrom={0}
                                containerClass="multi"
                                itemClass="carousel-item-padding-40-px"
                                swipeable
                                focusOnSelect={false}
                                infinite
                                draggable={false}
                                keyBoardControl
                                minimumTouchDrag={80}
                            >
                                {lookbookProducts.map(lb => (
                                    <Card isMobile={isMobile} key={lb.slug || lb.image} content={lb} isLookbook />
                                ))}
                            </Carousel>
                        </div>
                    </Container>
                </React.Fragment>
                )
            }
        </React.Fragment>
    ),[category.name, collection.acf.video, collection.acf.video_poster.url, collectionProducts, gallery, isMobile, lookbookProducts]))
}

function Collection() {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const collections = useWordpressData('collection', [])
    const categories = useSelector(state => state.woocommerce['products-categories'])
    let { slug } = useParams();
    let history = useHistory();

    const category = categories?.filter((c,i) => slug ? c.slug === slug : i === 0)[0]
    const collection = collections?.filter((c,i) => slug ? c.title.rendered === slug : i === 0)[0]
    if (categories && !category && !collection) history.push('/error/collection/404')
    return (useMemo(() => (
        <Container disableGutters={isMobile} headerPadding>
            {category && collection ? <Col isMobile={isMobile} category={category} collection={collection} /> : <div />}
        </Container>
    ), [category, collection, isMobile]))
}

export default Collection;
