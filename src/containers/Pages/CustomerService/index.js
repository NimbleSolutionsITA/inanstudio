import React from 'react'
import {Switch, Route, useLocation} from "react-router";
import {Grid, Divider, useTheme, useMediaQuery} from "@material-ui/core"
import NavButton from "../../../components/NavButton"
import WpBlock from "../../../components/WpBlock";
import Container from "../../../components/Container";
import useWordpressData from "../../../providers/WordpressDataProvider";

const CustomerService = () => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const { pathname } = useLocation()
    const contact = useWordpressData('pages/404', [])
    const prodcutCare = useWordpressData('pages/406', [])
    const shipping = useWordpressData('pages/408', [])
    const returns = useWordpressData('pages/410', [])

    return (
        <Container headerPadding>
            <Grid container spacing={4} style={{paddingTop: '30px'}}>
                <Grid item xs={12} md={4}>
                    {isMobile && <Divider />}
                    <NavButton inactive={pathname !== '/customer-service' && pathname !== '/customer-service/contact'} path="/customer-service/contact" title={contact?.title.rendered} />
                    <NavButton inactive={pathname !== '/customer-service/product-care'} path="/customer-service/product-care" title={prodcutCare?.title.rendered} />
                    <NavButton inactive={pathname !== '/customer-service/shipping'} path="/customer-service/shipping" title={shipping?.title.rendered} />
                    <NavButton inactive={pathname !== '/customer-service/returns'} path="/customer-service/returns" title={returns?.title.rendered} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Switch>
                        {contact && <Route exact path="/customer-service" component={() => <WpBlock content={contact} />} />}
                        {contact && <Route exact path="/customer-service/contact" component={() => <WpBlock content={contact} />} />}
                        {prodcutCare && <Route exact path="/customer-service/product-care" component={() => <WpBlock content={prodcutCare} />} />}
                        {shipping && <Route exact path="/customer-service/shipping" component={() => <WpBlock content={shipping} />} />}
                        {returns && <Route exact path="/customer-service/returns" component={() => <WpBlock content={returns} />} />}
                    </Switch>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CustomerService