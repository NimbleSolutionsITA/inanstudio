/*
 * Collection
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Container from "../../../components/Container";
import {Divider, Typography} from "@material-ui/core";

function Collection() {
    return (
        <Container headerPadding>
            <React.Fragment>
                <Typography variant="h1">Collection</Typography>
                <Divider />
            </React.Fragment>
        </Container>
    );
}

export default Collection;
