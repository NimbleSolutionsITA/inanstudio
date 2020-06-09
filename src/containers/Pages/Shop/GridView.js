import React, {useState} from "react";
import Container from "../../../components/Container";
import Filters from "./Filters";
import {Grid, Typography} from "@material-ui/core";
import ProductCard from "./ProductCard";

const GridView = ({categories, isMobile, headerHeight, products, children}) => {
    const [activeCategory, setActiveCategory] = useState(['View all', 'view-all'])
    return (
        <React.Fragment>
            <div style={{borderTop: isMobile && '1px solid black', borderBottom: isMobile && '1px solid black'}}>
                <Container style={{display: 'flex'}}>
                    <Typography style={{width: '100%', textTransform: 'uppercase', borderBottom: !isMobile && '1px solid'}} variant="h1" component="h1">{activeCategory[0]}</Typography>
                </Container>
            </div>
            <Container>
                <Grid container spacing={isMobile ? 2 : 4}>
                    {products && products.filter(prod => prod.categories.map(c => c.slug).indexOf(activeCategory[1]) !== -1).map(product => (
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