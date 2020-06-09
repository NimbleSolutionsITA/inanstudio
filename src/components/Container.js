import React from "react";
import {Container as MuiContainer} from "@material-ui/core";

const Container = (props) => {
    return (
        <MuiContainer fixed maxWidth="lg" {...props}>
            {props.children}
        </MuiContainer>
    )
}

export default Container;