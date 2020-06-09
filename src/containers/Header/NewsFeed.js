import React from "react";
import styled from "styled-components";
import Container from "../../components/Container";

const NewsContainer = styled.div`
  width: 100%;
  text-transform: uppercase;
  color: ${({isMobile}) => isMobile ? '#000' : 'inherit'};
  border-bottom: ${({isMobile}) => isMobile ? 'none' : '1px solid'};
  border-top: ${({isMobile}) => isMobile ? '1px solid' : 'none'};
`;

const NewsFeed = ({currentNews, isMobile}) => {
    return (
        <React.Fragment>
            {isMobile ? (
                <NewsContainer isMobile={isMobile}>
                    <Container>{currentNews[0].title.rendered}</Container>
                </NewsContainer>
            ) : (
                <NewsContainer>{currentNews[0].title.rendered}</NewsContainer>
            )}
        </React.Fragment>
    )
}

export default NewsFeed;