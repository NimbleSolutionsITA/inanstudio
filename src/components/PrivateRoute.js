import React from "react"
import {connect} from "react-redux"
import {useHistory, Route,} from "react-router"


const PrivateRoute = ({authenticated, ...props}) => {
    let history = useHistory()
    return (
        <React.Fragment>
            {authenticated ? <Route {...props} /> : history.goBack()}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(PrivateRoute)