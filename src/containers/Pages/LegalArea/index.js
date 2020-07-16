import React from 'react'
import {Switch, Route, useLocation} from "react-router";
import {Grid, Divider, useTheme, useMediaQuery} from "@material-ui/core"
import NavButton from "../../../components/NavButton"
import WpBlock from "../../../components/WpBlock";
import Container from "../../../components/Container";
import useWordpressData from "../../../providers/WordpressDataProvider";


const LegalArea = () => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const { pathname } = useLocation()
    const termsConditions = useWordpressData('pages/421', [])
    const privacyPolicy = useWordpressData('pages/423', [])
    const cookiePolicy = useWordpressData('pages/425', [])

    return (
        <Container headerPadding>
            <Grid container spacing={4} style={{paddingTop: '30px'}}>
                <Grid item xs={12} md={4}>
                    {isMobile && <Divider />}
                    <NavButton inactive={pathname !== '/legal-area' && pathname !== '/legal-area/terms-and-conditions'} path="/legal-area/terms-and-conditions" title={termsConditions?.title.rendered} />
                    <NavButton inactive={pathname !== '/legal-area/privacy-policy'} path="/legal-area/privacy-policy" title={privacyPolicy?.title.rendered} />
                    <NavButton inactive={pathname !== '/legal-area/cookie-policy'} path="/legal-area/cookie-policy" title={cookiePolicy?.title.rendered} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Switch>
                        {termsConditions && <Route exact path="/legal-area" component={() => <WpBlock content={termsConditions} />} />}
                        {termsConditions && <Route exact path="/legal-area/terms-and-conditions" component={() => <WpBlock content={termsConditions} />} />}
                        {privacyPolicy && <Route exact path="/legal-area/privacy-policy" component={() => <WpBlock content={privacyPolicy} />} />}
                        {cookiePolicy && <Route exact path="/legal-area/cookie-policy" component={() => <WpBlock content={cookiePolicy} />} />}
                    </Switch>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LegalArea