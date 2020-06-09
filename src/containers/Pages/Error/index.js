import React from "react";
import {useParams} from "react-router";
import Container from "../../../components/Container";

const Error = () => {
    let { section, code } = useParams();
    return (
        <Container>
            {section === 'product' && code === 404 && (
                <h1>PRODUCT NOT FOUND</h1>
            )}
        </Container>
    )
}

export default Error