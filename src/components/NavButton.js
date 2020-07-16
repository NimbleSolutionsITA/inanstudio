import {Divider, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import React from "react";
import Button from "./Button";

const NavButton = ({inactive, path, title}) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    return (
        <React.Fragment>
            <div style={{display: "flex"}}>
                <Button color="secondary" inactive={inactive} disableRipple lineThrough disableGutters disablePadding disableHover to={path}>
                    <Typography variant="h3" component="h3">{title}</Typography>
                </Button>
                <div style={{flexGrow: 1, height: '100%'}} />
                {isMobile && (
                    <Typography style={{fontSize: '11px', lineHeight: '10px'}}>
                        >
                    </Typography>
                )}
            </div>
            <Divider />
        </React.Fragment>
    )
}

export default NavButton