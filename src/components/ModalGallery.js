import React, {useState, useRef} from "react"
import {Dialog, IconButton} from "@material-ui/core";
import CloseIcon from "./svg/CloseIcon";
import ArrowIcon from "./svg/ArrowIcon";


const ModalGallery = ({images, cImage, }) => {
    const [loaded, setLoaded] = useState(false)
    const [index, setIndex] = useState(images.indexOf(cImage))
    const [open, setOpen] = useState(false)
    const fullImage = useRef()
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleNext = () => {
        (index === images.length - 1) ?
        setIndex(0) :
        setIndex(index + 1)
    }
    const handlePrev = () => {
        (index === 0) ?
            setIndex(images.length - 1) :
            setIndex(index - 1)
    }

    return (
        <React.Fragment>
            <div>
                {!loaded && <div style={{width: '100%', paddingBottom: '150%', backgroundColor: '#f5f5f7'}} />}
                <img onClick={handleOpen} onLoad={() => setLoaded(true)} src={images[index].woocommerce_single || images[index].src} alt="inanstudio" style={{width: '100%'}} />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                style={{zIndex: 1401}}
                fullScreen
            >
                <img ref={fullImage} onLoad={() => setLoaded(true)} src={images[index].src} alt="inanstudio" style={{width: '100%', position: 'absolute'}} />
                <IconButton disableRipple onClick={() => setOpen(false)} style={{position: 'fixed', right: '2%', top: 0}}><CloseIcon width="21px" /></IconButton>
                <IconButton disableRipple onClick={handleNext} style={{position: 'fixed', right: '2%', top: '50%'}}><ArrowIcon next width="30px" /></IconButton>
                <IconButton disableRipple onClick={handlePrev} style={{position: 'fixed', left: '2%', top: '50%'}}><ArrowIcon width="30px" /></IconButton>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalGallery