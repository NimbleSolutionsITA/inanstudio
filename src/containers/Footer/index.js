import React from "react"
import styled from "styled-components"
import Container from "../../components/Container";
import {ListItem, ListItemText} from "@material-ui/core";
import Link from "../../components/Link";

const FooterWrapper = styled.div`
  background-color: #000;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
  padding: 40px 0;
`
const footerLinks = [
    {name: 'Customer service', url: '/customer-service'},
    {name: 'Shipping', url: '/shipping'},
    {name: 'Legal area', url: '/legal-area'},
    {name: 'Returns', url: '/returns'},
    {name: 'Contact', url: '/contact'},
]
const Footer = () => {
    return(
        <FooterWrapper>
            <Container>
                {footerLinks.map((link, index) => (
                    <ListItem component={Link} to={link.url} disableGutters button key={link.name}>
                        <ListItemText primary={link.name} />
                    </ListItem>
                ))}
            </Container>
        </FooterWrapper>
    )
}

export default Footer