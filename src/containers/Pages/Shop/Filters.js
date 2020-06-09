import React, {useState} from "react"
import styled from "styled-components"
import Link from "../../../components/Link"
import {Typography, List, ListItem, ListItemText, SwipeableDrawer, IconButton} from "@material-ui/core"
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import {makeStyles} from "@material-ui/core/styles"
import Container from "../../../components/Container"

const NavWrapper = styled.div`
  width: 100%;
  border-bottom: ${({isMobile}) => !isMobile && '1px solid'};
  text-transform: uppercase;
`;

const FilterMobileWrapper = styled.div`
  height: 23px;
`

const Filters = ({categories, activeCategory, setActiveCategory, isMobile, headerHeight}) => {
    const useStyles = makeStyles((theme) => ({
        drawerRoot: {
            height: '100vh',
            width: '100vw',
            paddingTop: `${headerHeight}px`,
            textTransform: 'uppercase',
        },
        drawerNavContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',

        },
    }));
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
                    onClick={event => {
                        event.preventDefault()
                        setActiveCategory([category.name, category.slug])
                        setOpen(false)
                    }}
                >
                    <ListItemText primary={category.name} />
                </ListItem>
            ) : (
                <Link
                    key={category.id}
                    color="inherit"
                    style={{
                        marginRight: !isMobile && '20px',
                    }}
                    active={activeCategory[1] === category.slug}
                    onClick={event => {
                        event.preventDefault()
                        setActiveCategory([category.name, category.slug])
                        setOpen(false)
                    }}
                >
                    {category.name}
                </Link>
            )
        );
    return (
        <React.Fragment>
            <NavWrapper isMobile={isMobile}>
                {isMobile ? (
                    <FilterMobileWrapper>
                        <Link
                            color="inherit"
                            style={{
                                marginRight: '20px',
                                float: 'left',
                            }}
                            onClick={event => {
                                event.preventDefault()
                                setActiveCategory(['View all', 'view-all'])
                            }}
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
                        <SwipeableDrawer
                            anchor="right"
                            classes={{paper: classes.drawerRoot}}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            open={open}
                        >
                            <Container style={{height: '100%', position: 'relative'}}>
                                <IconButton onClick={() => setOpen(false)} style={{position: 'absolute', right: 0, top: '12px'}}><CloseOutlinedIcon /></IconButton>
                                <List className={classes.drawerNavContainer}>
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
                            </Container>
                        </SwipeableDrawer>
                    </FilterMobileWrapper>
                ) : FilterLinks}
            </NavWrapper>
        </React.Fragment>
    )
}

export default Filters
