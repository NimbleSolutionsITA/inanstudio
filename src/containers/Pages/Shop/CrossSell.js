import React from "react"
import CrossSellItem from "./CrossSellItem"
import SwipeableViews from 'react-swipeable-views'
import {Grid, Typography} from "@material-ui/core"

const styles = {
    root: {
        padding: '0 100px 0 0',
    },
    slideContainer: {
        padding: '0 5px 0 0',
    },
    slide: {
        padding: 0,
        maxWidth: 200,
        height: '100%',
    },
};

const CrossSell = ({items, isMobile}) => {

    return (
        <React.Fragment>
            <Typography variant="h1" component="h2">You may also like</Typography>
            {isMobile ? (
                <SwipeableViews
                    style={styles.root}
                    slideStyle={styles.slideContainer}
                >
                    {items.map(item => (
                        <div style={styles.slide}>
                            <CrossSellItem key={item} id={item}/>
                        </div>
                    ))}
                </SwipeableViews>
            ) : (
                <Grid container spacing={isMobile ? 2 : 4}>
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