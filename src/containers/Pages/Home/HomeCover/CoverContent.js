
import React, {useMemo} from "react";
import Link from "../../../../components/Link";
import styled from "styled-components";
import {Typography, makeStyles} from "@material-ui/core";
import Container from "../../../../components/Container";


const CoverWrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 1;
  overflow: hidden;
  -ms-overflow: hidden;
`;
const TitleWrapper = styled.div`
  width: 100%;
`;
const Cta = styled.div`
  width: 100%;
  border-bottom: 1px solid;
  text-align: right;
  margin-top: -30px;
  text-transform: uppercase;
  a {
    line-height: 18px;
  }
`;

const CoverContent = ({color, colorMobile, title, ctaLink, ctaText, isMobile, headerHeight}) => {
    const useStyles = makeStyles((theme) => ({
        container: {
            color: color,
            [theme.breakpoints.down('sm')]: {
                color: colorMobile,
            }
        },
        title: {
            marginTop: `calc(${headerHeight}px + 5px)`,
            textTransform: 'uppercase',
            minHeight: '75px',
            width: 'calc(100% - 80px)',
            lineHeight: '45px',
            [theme.breakpoints.down('sm')]: {
                marginTop: '10px',
                width: '100%',
            },
        },
    }));
    const classes = useStyles();
    return (useMemo(() => (
        <CoverWrapper>
            <Container classes={{root: classes.container}}>
                <TitleWrapper>
                    {title && (
                        <Typography
                            classes={{ root: classes.title }}
                            variant="h1"
                            component="h1"
                            to={ctaLink}
                        >
                            <Link disableHover underline="none" color="inherit" to={ctaLink}>{title}</Link>
                        </Typography>
                    )}
                    {ctaLink && !isMobile && (
                        <Cta>
                            <Link disableHover underline="none" color="inherit" to={ctaLink}>{ctaText}</Link>
                        </Cta>
                    )}
                </TitleWrapper>
            </Container>
        </CoverWrapper>
    ), [classes.container, classes.title, ctaLink, ctaText, isMobile, title])
    )
}

export default CoverContent;