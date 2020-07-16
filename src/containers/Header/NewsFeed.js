import React from "react";
import styled from "styled-components";
import Container from "../../components/Container";
import {useMediaQuery, useTheme} from "@material-ui/core";
import {useSelector} from "react-redux";

const NewsContainer = styled.div`
  width: 100%;
  text-transform: uppercase;
  color: ${({isMobile}) => isMobile ? '#000' : 'inherit'};
  border-bottom: ${({isMobile}) => isMobile ? 'none' : '1px solid'};
  border-top: ${({isMobile}) => isMobile ? '1px solid' : 'none'};
`;

const NewsFeed = () => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const currentNews = useSelector(state => state.wordpress['news-feed'])
    return (
        <React.Fragment>
            {currentNews?.length > 0 && (isMobile ? (
                <NewsContainer isMobile={isMobile}>
                    <Container>{currentNews[0].title.rendered}</Container>
                </NewsContainer>
            ) : (
                <NewsContainer>{currentNews[0].title.rendered}</NewsContainer>
            ))}
        </React.Fragment>
    )
}

export default NewsFeed;