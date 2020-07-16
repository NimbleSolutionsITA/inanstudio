/*
 * Stockists
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useState} from 'react';
import Container from "../../../components/Container";
import useWordpressData from "../../../providers/WordpressDataProvider";
import {Divider, Typography ,Grid, Collapse} from "@material-ui/core";
import Button from "../../../components/Button";

function Stockists() {
    const [current, setCurrent] = useState('')
    const shops = useWordpressData('stockist', [])
    const cities = shops?.map(s => {
        return s.acf.city
    }).filter((v, i, a) => a.indexOf(v) === i)
    return (
        <Container headerPadding>
            {shops && (
                <React.Fragment>
                    <br />
                    <br />
                    {cities.map((city, index) => (
                        <div>
                            <Button disableRipple disablePadding disableGutters disableHover lineThrough onClick={() => current === city ? setCurrent('') : setCurrent(city)}>
                                <Typography style={{padding: current === city ? `${index === 0 ? '2px 0 17px' : '17px 0'}` : '2px 0', transition: 'padding .5s ease'}} variant="h2">
                                    {city}
                                </Typography>
                            </Button>
                            <Collapse in={current === city}>
                                <Grid container>
                                    {shops.filter(shop => shop.acf.city === city).map(shop => (
                                        <Grid item xs={4}>
                                            <Typography style={{paddingBottom: '10px', color: 'red', fontWeight: 'bold'}}>{shop.title.rendered}</Typography>
                                            <Typography >
                                                <div dangerouslySetInnerHTML={{__html: shop.acf.contacts}} />
                                            </Typography>
                                            <Typography><a href={shop.acf.website} target="_blank" rel="noopener noreferrer">{new URL(shop.acf.website).host}</a></Typography>
                                            <br />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Collapse>
                            <Divider />
                        </div>
                    ))}
                </React.Fragment>
            )}
        </Container>
    );
}

export default Stockists;
