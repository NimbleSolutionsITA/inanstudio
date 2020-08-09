import React, {useState} from "react"
import {Grid, Dialog, IconButton, makeStyles, Typography} from "@material-ui/core";
import CloseIcon from "../../components/svg/CloseIcon";
import Container from "../../components/Container";
import NewsletterForm from "./NewsletterForm";

const Newsletter = ({isMobile}) => {
    const [open, setOpen] = useState(localStorage.getItem('inan_Newsletter') !== 'seen')
    const [subscribed, setSubscribed] = useState(false)
    const useStyles = makeStyles({
        paper: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            height: '100%',
        },
    })
    const classes = useStyles()

    const handleClick = () => {
        localStorage.setItem(
            'inan_Newsletter',
            'seen'
        )
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClick}
            style={{zIndex: 1401}}
            fullScreen
            PaperProps={{
                classes: {
                    root: classes.paper
                }
            }}
        >
            <Container style={{marginTop: isMobile ? 'calc(100vh - 350px)' : 'calc(50vh - 220px)'}}>
                <IconButton disableRipple onClick={handleClick} style={{position: 'absolute', right: 20, top: 20}}><CloseIcon color="#fff" width="21px" /></IconButton>
                <Grid spacing={0} container>
                    <Grid item xs={12} sm={9} md={9}>
                        <Typography style={{color: '#fff'}} variant="h1">{subscribed ? 'thank you' : 'Subscribe to INAN newsletter'}</Typography>
                        <br />
                    </Grid>
                    {!subscribed && (
                        <Grid item xs={12} sm={6} md={6}>
                            <NewsletterForm isModal sendFeedback={setSubscribed} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Dialog>
    )
}

export default Newsletter