import React, {useState} from "react"
import {Dialog, IconButton, makeStyles} from "@material-ui/core";
import CloseIcon from "./svg/CloseIcon";


const ModalImage = ({url, alt}) => {

    const useStyles = makeStyles({
        paper: {
            backgroundSize: 'contain',
            backgroundImage: `url(${url.src})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#f4f4f6',
        },
    })
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <React.Fragment>
            <div onClick={handleOpen}>
                <img src={url.woocommerce_single || url.src} alt={alt} style={{width: '100%'}} />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{zIndex: 1401}}
                fullScreen
                PaperProps={{
                    classes: {
                        root: classes.paper
                    }
                }}
            >
                <IconButton disableRipple onClick={() => setOpen(false)} style={{position: 'absolute', right: 0, top: 0}}><CloseIcon width="21px" /></IconButton>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalImage