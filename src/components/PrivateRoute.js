import React from "react"
import {useSelector} from "react-redux"
import {useHistory, Route,} from "react-router"


const PrivateRoute = ({...props}) => {
    let history = useHistory()
    const {authenticated} = useSelector(state => state.user)
    return (
        <React.Fragment>
            {authenticated ? <Route {...props} /> : history.goBack()}
        </React.Fragment>
    )
}

export default PrivateRoute