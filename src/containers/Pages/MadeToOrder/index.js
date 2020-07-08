/*
 *
 * Made to Order
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import {Typography, Divider} from "@material-ui/core";
import useWordpressData from "../../../providers/WordpressDataProvider";
import Container from "../../../components/Container";
import Carousel from "../../../components/Carousel";
import _ from 'lodash';

function MadeToOrder() {
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
                    <Container maxWidth="sm" style={{padding: '0 8%'}}>
                        {gallery && <Carousel images={gallery} />}
                    </Container>
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
