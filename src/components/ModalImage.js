import React, {useState} from "react"
import {Dialog, IconButton} from "@material-ui/core";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const ModalImage = ({url, alt}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <React.Fragment>
            <div style={{backgroundSize: 'cover', backgroundImage: `url(${url})`, height: '100%', width: '100%'}}>
                <button onClick={handleOpen} style={{opacity: 0, width: '100%', height: '100%'}}>
                    <img src={url} alt={alt} style={{width: '100%'}} />
                </button>
            </div>
            <Dialog open={open} onClose={handleClose} style={{zIndex: 1301}} PaperProps={{square: true}}>
                <IconButton disableRipple onClick={() => setOpen(false)} style={{position: 'absolute', right: 0, top: 0}}><CloseOutlinedIcon /></IconButton>
                <img src={url} alt={alt} />
            </Dialog>
        </React.Fragment>
    )
}

export default ModalImage