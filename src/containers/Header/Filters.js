import React, {useState} from "react"
import styled from "styled-components"
import Link from "../../components/Link"
import {Typography, List, ListItem, ListItemText} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import RightDrawer from "../../components/RightDrawer"
import Container from "../../components/Container"

const NavWrapper = styled.div`
  width: 100%;
  border-bottom: ${({isMobile}) => !isMobile && '1px solid'};
  text-transform: uppercase;
`;

const FilterMobileWrapper = styled.div`
  height: 23px;
  color: #000;
  border-top: ${({isMobile}) => isMobile && '1px solid'};
`

const Filters = ({categories, activeCategory, isMobile, isCollection}) => {
    const useStyles = makeStyles({
        drawerNavContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',

        },
    });
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const FilterLinks = [].concat(categories)
        .sort((a, b) => a.menu_order > b.menu_order ? 1 : -1)
        .map(category =>
            isMobile ? (
                <ListItem
                    color="secondary"
                    key={category.id}
                    component={Link}
                    disableGutters
                    button
                >
                    <Link onClick={() => setOpen(false)} color="secondary" to={isCollection ? `/collection/${category.slug}` : `/shop?category=${category.slug}`}><ListItemText primary={category.name} /></Link>
                </ListItem>
            ) : (
                <Link
                    key={category.id}
                    color="inherit"
                    style={{
                        marginRight: !isMobile && '20px',
                    }}
                    isActive={activeCategory === category.slug}
                    to={isCollection ? `/collection/${category.slug}` : `/shop?category=${category.slug}`}
                >
                    {category.name}
                </Link>
            )
        );
    return (
        <React.Fragment>
            <NavWrapper isMobile={isMobile}>
                {isMobile ? (
                    <FilterMobileWrapper isMobile={isMobile}>
                        <Container>
                            <Link
                                color="inherit"
                                style={{
                                    marginRight: '20px',
                                    float: 'left',
                                }}
                                to="/shop"
                            >
                                SHOP
                            </Link>
                            <Link
                                color="inherit"
                                style={{
                                    marginLeft: '20px',
                                    float: 'right',
                                }}
                                onClick={event => {
                                    event.preventDefault()
                                    setOpen(true)
                                }}
                            >
                                FILTER
                            </Link>
                        </Container>
                        <RightDrawer open={open} setOpen={setOpen}>
                            <List className={classes.drawerNavContainer} style={{width: '90%'}}>
                                <ListItem
                                    color="secondary"
                                    component={Typography}
                                    disableGutters
                                >
                                    <ListItemText primaryTypographyProps={{variant: 'h5'}}>
                                        <b>FILTER</b>
                                    </ListItemText>
                                </ListItem>
                                {FilterLinks}
                            </List>
                        </RightDrawer>
                    </FilterMobileWrapper>
                ) : FilterLinks}
            </NavWrapper>
        </React.Fragment>
    )
}

export default Filters
