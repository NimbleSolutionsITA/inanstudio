import React from "react";
import {Container as MuiContainer, useMediaQuery, useTheme} from "@material-ui/core";
import { useSelector} from "react-redux";

const Container = (props) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const headerHeight = useSelector(state => state.header.height)
    const {headerPadding, children, ...rest} = props
    return (
        <div style={headerPadding && {width: !isMobile && '100vw', paddingTop: !isMobile && headerHeight, paddingBottom: '40px'}}>
            <MuiContainer fixed maxWidth="xl" {...rest}>
                {children}
            </MuiContainer>
        </div>
    )
}

export default Container;