import React from "react"
import CrossSellItem from "./CrossSellItem"
import {Divider, Grid, Typography} from "@material-ui/core"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 1920, min: 925 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 925, min: 735 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 735, min: 0 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const CrossSell = ({items, isMobile}) => {

    return (
        <React.Fragment>
            {!isMobile && <Divider />}
            <Typography style={{padding: '20px 0 40px'}} variant={isMobile ? 'h2' : 'h1'} component="h2">
                You may also like
            </Typography>
            {isMobile ? (
                <Carousel
                    partialVisible={true}
                    responsive={responsive}
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    itemClass="carousel-item-padding-40-px"
                >
                    {items.map(item => (
                        <CrossSellItem key={item} id={item}/>
                    ))}
                </Carousel>
            ) : (
                <Grid container spacing={isMobile ? 1 : 2}>
                    {items.slice(0, 3).map(item => (
                        <Grid xs={6} md={4} item key={item}>
                            <CrossSellItem id={item}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </React.Fragment>
    )
}

export default CrossSell