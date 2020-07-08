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

const CustomerService = () => {
    const { pathname } = useLocation()
    const contact = useWordpressData('pages/404', [])
    const prodcutCare = useWordpressData('pages/406', [])
    const shipping = useWordpressData('pages/408', [])
    const returns = useWordpressData('pages/410', [])

    return (
        <Container headerPadding>
            <Grid container spacing={4} style={{paddingTop: '30px'}}>
                <Grid item xs={12} md={4}>
                    <Button inactive={pathname !== '/customer-service'} disableRipple lineThrough disableGutters disablePadding disableHover to="/customer-service"><Typography variant="h3" component="h3">{contact?.title.rendered}</Typography></Button>
                    <Divider />
                    <Button inactive={pathname !== '/customer-service/product-care'} disableRipple lineThrough disableGutters disablePadding disableHover to="/customer-service/product-care"><Typography variant="h3" component="h3">{prodcutCare?.title.rendered}</Typography></Button>
                    <Divider />
                    <Button inactive={pathname !== '/customer-service/shipping'} disableRipple lineThrough disableGutters disablePadding disableHover to="/customer-service/shipping"><Typography variant="h3" component="h3">{shipping?.title.rendered}</Typography></Button>
                    <Divider />
                    <Button inactive={pathname !== '/customer-service/returns'} disableRipple lineThrough disableGutters disablePadding disableHover to="/customer-service/returns"><Typography variant="h3" component="h3">{returns?.title.rendered}</Typography></Button>
                    <Divider />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Switch>
                        {contact && <Route exact path="/customer-service" component={() => <Component content={contact} />} />}
                        {prodcutCare && <Route exact path="/customer-service/product-care" component={() => <Component content={prodcutCare} />} />}
                        {shipping && <Route exact path="/customer-service/shipping" component={() => <Component content={shipping} />} />}
                        {returns && <Route exact path="/customer-service/returns" component={() => <Component content={returns} />} />}
                    </Switch>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CustomerService