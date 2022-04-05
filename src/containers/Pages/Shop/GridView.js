import React, {useMemo} from "react";
import Container from "../../../components/Container";
import {Grid, Typography} from "@material-ui/core";
import ProductCard from "./ProductCard";

const GridView = ({activeCategoryName, isMobile, products, children}) => {
    return (useMemo(() => (
        <React.Fragment>
            <div style={{borderBottom: isMobile && '1px solid black'}}>
                <Container style={{display: 'flex'}}>
                    <Typography style={{width: '100%', textTransform: 'uppercase', borderBottom: !isMobile && '1px solid'}} variant="h1" component="h1">{activeCategoryName}</Typography>
                </Container>
            </div>
            {activeCategoryName === "ARTISANAL" && (
                <div style={{borderBottom: isMobile && '1px solid black'}}>
                    <Container style={{display: 'flex'}}>
                        <div style={{width: '100%', borderBottom: !isMobile && '1px solid'}}>
                            <Typography style={{textTransform: 'uppercase', width: isMobile ? '100%' : '50%'}}>
                                One-of-a-kind artisanal objects of desire, made entirely from upcycled dead stock materials.<br />
                                Every piece is unique and hand made in Italy.<br />
                                New drops periodically updated.<br />
                                Special styles upon request.
                            </Typography>
                        </div>
                    </Container>
                </div>
            )}
            <Container>
                <Grid container spacing={isMobile ? 1 : 2}>
                    {products.map(product => (
                        <Grid key={product.id} xs={6} md={4} item>
                            <ProductCard isMobile={isMobile} product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {children}
        </React.Fragment>
    ), [activeCategoryName, children, isMobile, products]))
}

export default GridView;