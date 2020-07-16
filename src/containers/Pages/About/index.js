/*
 * About
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Container from "../../../components/Container";
import {Divider, Typography, Grid} from "@material-ui/core";
import useWordpressData from "../../../providers/WordpressDataProvider";
import InLogo from "../../../components/svg/InLogo";
import AnLogo from "../../../components/svg/AnLogo";

function About() {
    const content = useWordpressData('pages/371', [])
    return (
        <div style={{backgroundColor: '#000'}}>
            {content && (
                <Container headerPadding>
                    <Typography style={{color: '#fff'}} variant="h1">{content.title.rendered}</Typography>
                    <Divider style={{backgroundColor: '#fff'}} />
                    <Typography style={{color: '#fff'}} variant="h2">
                        <span dangerouslySetInnerHTML={{__html: content.acf.subtitle}} />
                    </Typography>
                    <Divider style={{backgroundColor: '#fff'}} />
                    <Typography style={{color: '#fff', padding: '5px 0'}}>
                        <span dangerouslySetInnerHTML={{__html: content.acf.body1}} />
                    </Typography>
                    <Divider style={{backgroundColor: '#fff'}} />
                    <Grid container>
                        <Grid item xs={3}>
                            <div style={{display: 'flex', justifyContent: 'left', alignItems: 'center', height: '100%'}}><InLogo color="#fff" /></div>
                        </Grid>
                        <Grid item xs={6}>
                            <img style={{width: '100%', marginBottom: '-5px'}} src={content.acf.image} alt="INAN about" />
                        </Grid>
                        <Grid item xs={3}>
                            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%'}}><AnLogo color="#fff" /></div>
                        </Grid>
                    </Grid>
                    <Divider style={{backgroundColor: '#fff'}} />
                    <Typography style={{color: '#fff'}} variant="h2">
                        <span dangerouslySetInnerHTML={{__html: content.acf.body2}} />
                    </Typography>
                    <Divider style={{backgroundColor: '#fff'}} />
                    <Typography style={{color: '#fff'}} variant="h1">
                        <span dangerouslySetInnerHTML={{__html: content.acf.footer}} />
                    </Typography>
                </Container>
            )}
        </div>
    );
}

export default About;
