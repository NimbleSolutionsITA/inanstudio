/*
 *
 * Made to Order
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import {Typography, Divider, useTheme, useMediaQuery, Grid} from "@material-ui/core";
import useWordpressData from "../../../providers/WordpressDataProvider";
import Container from "../../../components/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import _ from 'lodash';

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

function MadeToOrder() {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const content = useWordpressData('pages/339', [])
    let gallery;
    let body1;
    if (content) {
        gallery = [
            {src:  content.acf.gallery1, alt: 'made to order gallery 1'},
            ...(content.acf.gallery2 ? [{src:  content.acf.gallery2, alt: 'made to order gallery 2'}] : []),
            ...(content.acf.gallery3 ? [{src:  content.acf.gallery3, alt: 'made to order gallery 3'}] : []),
            ...(content.acf.gallery4 ? [{src:  content.acf.gallery4, alt: 'made to order gallery 4'}] : []),
            ...(content.acf.gallery5 ? [{src:  content.acf.gallery5, alt: 'made to order gallery 5'}] : []),
            ...(content.acf.gallery6 ? [{src:  content.acf.gallery6, alt: 'made to order gallery 6'}] : []),
            ...(content.acf.gallery7 ? [{src:  content.acf.gallery7, alt: 'made to order gallery 7'}] : []),
            ...(content.acf.gallery8 ? [{src:  content.acf.gallery8, alt: 'made to order gallery 8'}] : []),
            ...(content.acf.gallery9 ? [{src:  content.acf.gallery9, alt: 'made to order gallery 9'}] : []),
        ]
        body1 = _.template(content.acf.body1)
    }
    return (
        <Container headerPadding>
            {content && (
                <React.Fragment>
                    {gallery && (
                        <Grid container justify="center">
                            <Grid item xs={12} md={7} style={{position: 'relative'}}>
                                <Carousel
                                    arrows={false}
                                    renderButtonGroupOutside={!isMobile}
                                    customButtonGroup={!isMobile && <CustomButtonGroupAsArrows />}
                                    showDots={isMobile}
                                    additionalTransfrom={0}
                                    centerMode={false}
                                    draggable
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
                    <Typography variant="h2">
                        <div dangerouslySetInnerHTML={{__html: body1({email:`<a href="mailto:${content.acf.email}" target="_blank" style="text-decoration: none; color: red;">${content.acf.email}</a>`,})}} />
                    </Typography>
                    <Divider style={{margin: '5px 0'}} />
                    <Typography>{content.acf.body2}</Typography>
                </React.Fragment>
            )}
        </Container>
    );
}

export default MadeToOrder;
