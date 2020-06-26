import React from "react";
import {Grid, Hidden} from "@material-ui/core";

const SplitLayout = ({left, right}) => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                {left}
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container>
                    <Hidden xsDown><Grid item xs={1} lg={4} /></Hidden>
                    <Grid item xs={12} lg={8}>
                        {right}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SplitLayout