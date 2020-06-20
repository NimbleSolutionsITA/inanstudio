import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import VideoPlayer from "./VideoPlayer";
import ModalImage from "./ModalImage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'relative',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    imgWrapper: {
        height: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        backgroundColor: '#e9e9e9',
    },
    img: {
        display: 'block',
        overflow: 'hidden',
        width: '100%',
        opacity: 0,
    },
    stepper: {
        position: 'absolute',
        bottom: '6px',
        width: '100%',
        background: 'transparent',
        flexDirection: 'column',
    },
    dot: {
        margin: '0 6px',
        backgroundColor: '#666',
    },
    dotActive: {
        backgroundColor: '#333',
    },
}));

const Carousel = ({images, poster, src}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = src ? images.length + 1 : images.length;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            {src ? (
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div className={classes.imgWrapper}  key={step.src} style={{backgroundImage: `url(${step.src})`}}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <ModalImage className={classes.img} url={step.src} alt={step.alt} />
                            ) : null}
                        </div>
                    ))}
                    <VideoPlayer
                        key={src}
                        poster={poster}
                        src={src}
                    />
                </SwipeableViews>
            ) : (
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div className={classes.imgWrapper}  key={step.src} style={{backgroundImage: `url(${step.src})`}}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <ModalImage className={classes.img} url={step.src} alt={step.alt} />
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
            )}
            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                className={classes.stepper}
                classes={{dot: classes.dot, dotActive: classes.dotActive}}
                backButton={null}
                nextButton={null}/>
        </div>
    );
}

export default Carousel;