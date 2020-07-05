import React, {useMemo, useState} from "react";
import {Grid, Typography, Divider, Collapse} from "@material-ui/core";
import OrderItem from "./OrderItem";
import {formatPrice} from "../../../helpers";
import Button from "../../../components/Button";

const Orders = ({orders}) => {
    const [currentOrder, setCurrentOrder] = useState('')
    return ( useMemo(() => (
        <React.Fragment>
            <Typography variant="h1" component="h1">Orders</Typography>
            {orders?.map((order, i) => (
                <React.Fragment>
                    {i !== 0 && <br />}
                    <br />
                    <Collapse key={order.id} in={currentOrder === order.id} collapsedHeight="230px">
                        <div style={{display: 'flex'}}>
                            <Button lineThrough disablePadding disableGutters disableHover onClick={() => setCurrentOrder(currentOrder === order.id ? '' : order.id)}>
                                <Typography component="div" variant="h3">ORDER ID {order.id}</Typography>
                            </Button>
                            <div style={{flexGrow: 1}} />
                            <Typography component="div" style={{padding: '4px 0'}}>DATE: {order.date_created.slice(0,10)} | <b>{order.status}</b></Typography>
                        </div>
                        <Divider />
                        <Grid container spacing={2}>
                            {order.line_items.map(item => (
                                <Grid key={item.id} item xs={3}>
                                    <OrderItem id={item.product_id} item={item} />
                                </Grid>
                            ))}
                        </Grid>
                        <br />
                        <Divider light />
                        <div style={{display: 'flex', padding: '5px 0'}}>
                            <Typography component="div">SHIPPING</Typography>
                            <div style={{flexGrow: 1}} />
                            <Typography component="div">{formatPrice(order.shipping_total)}</Typography>
                        </div>
                        <Divider light />
                        <div style={{display: 'flex', padding: '5px 0'}}>
                            <div style={{flexGrow: 1}} />
                            <Typography variant="h3" component="div">TOTAL: {formatPrice(order.total)}</Typography>
                        </div>
                        <Divider light />
                        <Typography style={{margin: '5px 0 10px'}}><b>ORDER DETAILS:</b></Typography>
                        <Typography>
                            <b>TO:</b><br />
                            {order.shipping.first_name} {order.shipping.last_name}
                        </Typography>
                        <br />
                        <Typography>
                            <b>ADDRESS:</b><br />
                            {order.shipping.address_1} - {order.shipping.postcode} - {order.shipping.city}{order.shipping.state && order.shipping.state !== order.shipping.city && ` - ${order.shipping.state}`} - {order.shipping.country}
                        </Typography>
                        <br />
                        <Typography style={{marginBottom: '5px'}}>
                            <b>DATE:</b><br />
                            {order.date_created.slice(0,10)}
                        </Typography>
                        <Divider />
                    </Collapse>
                </React.Fragment>
            ))}
        </React.Fragment>
    ), [currentOrder, orders]))
}

export default Orders