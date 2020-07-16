import React from "react"
import {Typography, Divider, useTheme, useMediaQuery} from "@material-ui/core"
import Container from "../../components/Container"
import Button from "../../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../providers/AuthProvider/actions";

const PageTitle = ({title, amount}) => {
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"))
    const authenticated = useSelector(state => state.user.authenticated)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
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
                        {title === 'account' && authenticated && (
                            <Button disableGutters disablePadding onClick={handleLogout}>Logout</Button>
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
                            style={{position: 'relative'}}
                        >
                            {title}
                            {title === 'account' && authenticated && (
                                <div style={{position: 'absolute', right: 0, top: '25px'}}>
                                    <Button disableGutters disablePadding onClick={handleLogout}>Logout</Button>
                                </div>
                            )}
                        </Typography>
                        <Divider />
                    </React.Fragment>
                )
            )}
        </React.Fragment>
    )
}

export default PageTitle
