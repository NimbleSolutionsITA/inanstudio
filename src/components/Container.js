import React from "react";
import {Container as MuiContainer, useMediaQuery, useTheme} from "@material-ui/core";
import {connect} from "react-redux";

const Container = (props) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    return (
        <div style={props.headerPadding && {width: !isMobile && '100vw', paddingTop: !isMobile && props.headerHeight, paddingBottom: '40px'}}>
            <MuiContainer fixed maxWidth="xl" {...props}>
                {props.children}
            </MuiContainer>
        </div>
    )
}
const mapStateToProps = state => ({
    headerHeight: state.header.height,
})

export default connect(mapStateToProps)(Container);