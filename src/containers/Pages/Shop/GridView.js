import React from "react";
import Container from "../../../components/Container";
import {Grid, Typography} from "@material-ui/core";
import ProductCard from "./ProductCard";

const GridView = ({activeCategory, activeCategoryName, isMobile, products, children}) => {
    return (
        <React.Fragment>
            <div style={{borderBottom: isMobile && '1px solid black'}}>
                <Container style={{display: 'flex'}}>
                    <Typography style={{width: '100%', textTransform: 'uppercase', borderBottom: !isMobile && '1px solid'}} variant="h1" component="h1">{activeCategoryName}</Typography>
                </Container>
            </div>
            <Container>
                <Grid container spacing={isMobile ? 1 : 2}>
                    {products && products.filter(prod => prod.categories.map(c => c.slug).indexOf(activeCategory) !== -1).map(product => (
                        <Grid xs={6} md={4} item key={product.id}>
                            <ProductCard isMobile={isMobile} product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {children}
        </React.Fragment>
    )
}

export default GridView;