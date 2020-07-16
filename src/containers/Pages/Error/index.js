import React from "react";
import {useParams} from "react-router";
import {Typography, Divider} from "@material-ui/core";
import Container from "../../../components/Container";

const Error = () => {
    let { section, code } = useParams();
    return (
        <Container headerPadding>
            {code === '404' && (
                <React.Fragment>
                    <Typography style={{color: 'red'}} variant="h1">ERROR 404</Typography>
                    <Divider />
                    <Typography variant="h1">{section} NOT FOUND</Typography>
                </React.Fragment>
                )}
        </Container>
    )
}

export default Error