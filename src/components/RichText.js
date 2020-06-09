import React from "react"
import {Typography} from "@material-ui/core"
import dompurify from 'dompurify'

const RichText = ({
    children,
    variant = 'body1',
    ...props
                  }) => {
    return (
        <Typography
            variant={variant}
            component="div" dangerouslySetInnerHTML={{__html: dompurify.sanitize(children)}}
            {...props}
        />
    )
}

export default RichText