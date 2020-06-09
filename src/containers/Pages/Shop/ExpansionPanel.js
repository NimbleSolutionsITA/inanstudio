import React, {useState} from "react"
import {
    ExpansionPanel as MuiExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlusIcon from "@material-ui/icons/Add";
import Minus from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
    expansionPanel: {
        textTransform: 'uppercase',
        '&.Mui-expanded': {
            marginTop: 0,
        },
        '&::before': {
            display: 'none',
        },
    },
    expansionPanelSummary: {
        padding: 0,
        '&.Mui-expanded': {
            minHeight: '48px',
        },
    },
    expansionPanelSummaryContent: {
        '&.Mui-expanded': {
            margin: '12px 0',
        },
    },
}));

const ExpansionPanel = ({children ,title, plusMinus}) => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const expandIcon = () => {
        if (plusMinus) return expanded ? <Minus /> : <PlusIcon />
        return <ExpandMoreIcon />
    }

    return (
        <MuiExpansionPanel
            square
            elevation={0}
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            classes={{root: classes.expansionPanel}}
        >
            <ExpansionPanelSummary
                expandIcon={expandIcon()}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                classes={{root: classes.expansionPanelSummary, content: classes.expansionPanelSummaryContent}}
            >
                {title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'block', padding: 0}}>
                {children}
            </ExpansionPanelDetails>
        </MuiExpansionPanel>
    )
}

export default ExpansionPanel