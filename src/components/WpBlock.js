import React from "react";
import {Typography} from "@material-ui/core";

const WpBlock = ({content}) => {
    return (
        <React.Fragment>
            <Typography variant="h1">{content.title.rendered}</Typography>
            <br />
            <div dangerouslySetInnerHTML={{__html: content.content.rendered}} />
        </React.Fragment>
    )
}

export default WpBlock