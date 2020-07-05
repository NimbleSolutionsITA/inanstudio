import React from 'react'
import {Switch, Route, useLocation} from "react-router";
import { Grid, Divider, Typography } from "@material-ui/core"
import Button from "../../../components/Button"
import Container from "../../../components/Container";
import useWordpressData from "../../../providers/WordpressDataProvider";

const Component = ({content}) => {
    return (
        <React.Fragment>
            <Typography variant="h1">{content.title.rendered}</Typography>
            <br />
            <div dangerouslySetInnerHTML={{__html: content.content.rendered}} />
        </React.Fragment>
    )
}

const LegalArea = () => {
    const { pathname } = useLocation()
    const termsOfUse = useWordpressData('pages/418', [])
    const termsConditions = useWordpressData('pages/421', [])
    const privacyPolicy = useWordpressData('pages/423', [])
    const cookiePolicy = useWordpressData('pages/425', [])

    return (
        <Container headerPadding>
            <Typography variant="h1" component="h1">Legal Area</Typography>
            <Divider />
            <Grid container spacing={4} style={{paddingTop: '30px'}}>
                <Grid item xs={12} md={4}>
                    <Button inactive={pathname !== '/legal-area'} disableRipple lineThrough disableGutters disablePadding disableHover to="/legal-area"><Typography variant="h3" component="h3">{termsOfUse?.title.rendered}</Typography></Button>
                    <Divider />
                    <Button inactive={pathname !== '/legal-area/terms-and-conditions'} disableRipple lineThrough disableGutters disablePadding disableHover to="/legal-area/terms-and-conditions"><Typography variant="h3" component="h3">{termsConditions?.title.rendered}</Typography></Button>
                    <Divider />
                    <Button inactive={pathname !== '/legal-area/privacy-policy'} disableRipple lineThrough disableGutters disablePadding disableHover to="/legal-area/privacy-policy"><Typography variant="h3" component="h3">{privacyPolicy?.title.rendered}</Typography></Button>
                    <Divider />
                    <Button inactive={pathname !== '/legal-area/cookie-policy'} disableRipple lineThrough disableGutters disablePadding disableHover to="/legal-area/cookie-policy"><Typography variant="h3" component="h3">{cookiePolicy?.title.rendered}</Typography></Button>
                    <Divider />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Switch>
                        {termsOfUse && <Route exact path="/legal-area" component={() => <Component content={termsOfUse} />} />}
                        {termsConditions && <Route exact path="/legal-area/terms-and-conditions" component={() => <Component content={termsConditions} />} />}
                        {privacyPolicy && <Route exact path="/legal-area/privacy-policy" component={() => <Component content={privacyPolicy} />} />}
                        {cookiePolicy && <Route exact path="/legal-area/cookie-policy" component={() => <Component content={cookiePolicy} />} />}
                    </Switch>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LegalArea