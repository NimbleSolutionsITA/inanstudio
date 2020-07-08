import React from "react"
import styled from "styled-components"
import Container from "../../components/Container"
import {Grid, Typography, List, ListItem, ListItemText, useMediaQuery, useTheme} from "@material-ui/core"
import Link from "../../components/Link"
import InAnLogo from "../../components/svg/InAnLogo"
import NewsletterForm from "./NewsletterForm"
import CookieConsent from "./CookieConsent";

const NavWrapper = styled.div`
  width: 100%;
  height: 18px;
  border-top: 1pt solid;
  border-bottom: 1pt solid;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  padding: 2px 0;
`;

const FooterWrapper = styled.div`
  background-color: ${({isMobile}) => isMobile ? '#000' : '#fff'};
  color: ${({isMobile}) => isMobile ? '#fff' : '#000'};
  width: 100%;
  text-transform: uppercase;
  padding: 40px 0 60px;
`
const footerLinks = [
    {name: 'Customer service', url: '/customer-service'},
    {name: 'Shipping', url: '/customer-service/shipping'},
    {name: 'Legal area', url: '/legal-area'},
    {name: 'Returns', url: '/customer-service/returns'},
    {name: 'Contact', url: '/customer-service'},
]
const Footer = () => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    return(
        <React.Fragment>
            <CookieConsent />
            <FooterWrapper isMobile={isMobile}>
                <Container>
                    {isMobile && (
                        <React.Fragment>
                            <List>
                                {footerLinks.map((link, index) => (
                                    <ListItem component={Link} to={link.url} disableGutters button key={link.name}>
                                        <ListItemText primary={link.name} />
                                    </ListItem>
                                ))}
                            </List>
                            <div style={{marginTop: '30px', paddingBottom: '5px', marginBottom: '5px', borderBottom: '1px solid #fff', display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant="body1" component="p">NEWSLETTER</Typography>
                                <Link to="https://instagram.com/inan_studio?igshid=9w5d3f9g9xg3" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </Link>
                            </div>
                            <NewsletterForm isMobile={isMobile} />
                            <div style={{position: 'relative'}}>
                                <div>© 2020 INAN. All Rights Reserved</div>
                                <div style={{width: '100%', position: 'absolute', bottom: '-45px', textAlign: 'center', color: '#0a0a0a'}}>
                                    Made with
                                    <svg style={{transform: 'scale(0.5) translate(0px, 17px)'}} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='#0a0a0a' stroke='#0a0a0a'>
                                        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
                                    </svg>
                                    by <a style={{textDecoration: 'none', color: '#0a0a0a'}} href="http://www.nimble-solutions.com" target="_blank" rel="noopener noreferrer">Nimble Solutions</a>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                    {!isMobile && (
                        <Grid container>
                            <Grid item md={4} lg={6} style={{position: 'relative'}}>
                                <div style={{position: 'absolute', bottom: '10px', left: '0'}}>
                                    <InAnLogo color="#000" height="50px" />
                                </div>
                            </Grid>
                            <Grid item md={8} lg={6}>
                                <div style={{display: 'flex', marginBottom: '10px'}}>
                                    <div style={{marginRight: '10px', padding: '8px 0'}}><b>NEWSLETTER</b> |</div>
                                    <NewsletterForm />
                                    <div style={{marginLeft: '10px', padding: '8px 0'}}>
                                        <Link color="secondary" to="https://instagram.com/inan_studio?igshid=9w5d3f9g9xg3" target="_blank" rel="noopener noreferrer">
                                            <b>Instagram</b>
                                        </Link>
                                    </div>
                                </div>
                                <NavWrapper>
                                    {footerLinks.map((link, index) => (
                                        <Link
                                            key={link.name}
                                            color="inherit"
                                            to={link.url}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </NavWrapper>
                                <div style={{position: 'relative'}}>
                                    <div>© 2020 INAN. All Rights Reserved</div>
                                    <div style={{position: 'absolute', right: 0, top: '-11px', color: '#f1f1f1'}}>
                                        Made with
                                        <svg style={{transform: 'scale(0.5) translate(0px, 17px)'}} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='#f1f1f1' stroke='#f1f1f1'>
                                            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
                                        </svg>
                                        by <a style={{textDecoration: 'none', color: '#f1f1f1'}} href="http://www.nimble-solutions.com" target="_blank" rel="noopener noreferrer">Nimble Solutions</a>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </FooterWrapper>
        </React.Fragment>
    )
}

export default Footer