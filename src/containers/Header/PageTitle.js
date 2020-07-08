import React from "react"
import {Typography, Divider, useTheme, useMediaQuery} from "@material-ui/core"
import Container from "../../components/Container"

const PageTitle = ({title, amount}) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    return (
        <React.Fragment>
            {isMobile ? (
                <React.Fragment>
                    <Divider />
                    <Container noPaddingBottom style={{display: 'flex', backgroundColor: title === 'about' ? '#000' : '#fff'}}>
                        <Typography
                            component="div"
                            style={{
                                color: title === 'about' ? '#fff' : '#000',
                                paddingTop: '6px'
                            }}
                        >
                            {title}
                        </Typography>
                        <div style={{flexGrow: 1}} />
                        {amount && (
                            <Typography
                                component="div"
                                style={{
                                    color: title === 'about' ? '#fff' : '#000',
                                    backgroundColor: title === 'about' ? '#000' : '#fff',
                                    paddingTop: '6px'
                                }}
                            >
                                ({amount})
                            </Typography>
                        )}

                    </Container>
                    {title === 'about' && <Divider style={{backgroundColor: '#fff'}} />}
                </React.Fragment>
            ) : (
                title !== 'about' && (
                    <React.Fragment>
                        <Typography
                            variant="h1"
                            component="div"
                        >
                            {title}
                        </Typography>
                        <Divider />
                    </React.Fragment>
                )
            )}
        </React.Fragment>
    )
}

export default PageTitle
