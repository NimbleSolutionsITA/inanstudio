import React, {useState} from "react"
import styled from "styled-components"
import Link from "../../components/Link"
import {Typography, List, ListItem, ListItemText} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import RightDrawer from "../../components/RightDrawer"
import Container from "../../components/Container"

const NavWrapper = styled.div`
  width: 100%;
  padding: ${({isMobile}) => !isMobile && '3px 0'};
  border-bottom: ${({isMobile}) => !isMobile && '1px solid'};
`;

const FilterMobileWrapper = styled.div`
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
    let links =[].concat(categories)
        .filter(c => !isCollection || c.slug !== 'artisanal')
        .sort((a, b) => a.slug.localeCompare(b.slug, 'en', { numeric: true }))
    !isCollection && links.unshift(links.splice(links.findIndex(item => item.slug === 'view-all'), 1)[0])
    const FilterLinks = links.map(category =>
            isMobile ? (
                <ListItem
                    key={category.slug}
                    component={Link}
                    disableGutters
                    button
                    color="inherit"
                    onClick={() => setOpen(false)} to={isCollection ? `/collection/${category.slug}` : `/shop?category=${category.slug}`}
                >
                    <ListItemText primary={category.name} />
                </ListItem>
            ) : (
                <Link
                    key={category.slug}
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
                                    padding: '6px 0',
                                    float: 'left',
                                }}
                                to={isCollection ? '/collection' : '/shop'}
                            >
                                {isCollection ? 'COLLECTION' : 'SHOP'}
                            </Link>
                            <Link
                                color="inherit"
                                style={{
                                    marginLeft: '20px',
                                    padding: '6px 0',
                                    float: 'right',
                                }}
                                onClick={event => {
                                    event.preventDefault()
                                    setOpen(true)
                                }}
                            >
                                {isCollection ? 'PAST COLLECTIONS' : 'FILTER'}
                            </Link>
                        </Container>
                        <RightDrawer open={open} setOpen={setOpen}>
                            <List className={classes.drawerNavContainer} style={{width: '90%'}}>
                                {(!isCollection || categories.length > 2) && (
                                    <ListItem
                                        component={Typography}
                                        disableGutters
                                    >
                                        <ListItemText primaryTypographyProps={{variant: 'h5'}}>
                                            <b>{isCollection ? 'PAST COLLECTIONS' : 'FILTER'}</b>
                                        </ListItemText>
                                    </ListItem>
                                )}
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
