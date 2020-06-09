import React from 'react';
import { TextControl, Button } from '@wordpress/components';

const axios = require('axios');

class Login extends React.Component {
    constructor( props ) {
        super( props );
        this.state = { username: '', password: '', user: { } }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.Logout = this.Logout.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    componentDidMount() {
        if (this.props.token) this.getCurrentUser();
    }

    getCurrentUser() {
        const token = this.props.token;
        const userURI = this.props.url + '/wp-json/wp/v2/users/me';
        const _this = this;
        axios({
            method: 'POST',
            url: userURI,
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(function (response) {
            if ( response.status === 200 ) {
                const data = response.data;
                _this.setState( {user:data});

            }
        })
            .catch(function (error) {
                _this.Logout();
            });

    }

    handleUsername( username ) {
        this.setState( { username } )
    }

    handlePassword( password ) {
        this.setState( { password } )
    }
    handleSubmit( e ) {
        e.preventDefault();
        const _this = this;
        axios.post( this.props.url + '/wp-json/jwt-auth/v1/token/',
            {
                username: this.state.username,
                password: this.state.password
            })
            .then(function (response) {
                if ( response.status === 200 ) {
                    const data = response.data;
                    console.log(data);
                    localStorage.setItem( 'login', data.token );
                    _this.props.setLogin( data.token );
                }
            })
            .catch(function (error) {
                function strip_html_tags(str) {
                    if ((str===null) || (str===''))
                        return false;
                    else
                        str = str.toString();
                    return str.replace(/<[^>]*>/g, '');
                }
                alert( strip_html_tags( error.response.data.message ) );
            });
    }
    Logout() {
        localStorage.removeItem('login');
        this.props.setLogin('');
    }
    render() {
        const { nickname, first_name, last_name } = this.state.user;
        return (
            <div>
                {this.props.token && (
                    <div className="dashboard">
                        <button type="button" className="btn btn-danger" onClick={this.Logout}>Logout</button>

                        <div className="jumbotron">
                            Welcome { nickname }
                            <p>I think your name is { first_name } { last_name}</p>
                        </div>
                    </div>
                )}
                {!this.props.token && (
                    <form className="login" method="post">
                        <TextControl className="form-group"
                                     label="Username"
                                     value={ this.state.username }
                                     onChange={ (value) => this.handleUsername( value ) }
                        />
                        <TextControl className="form-group"
                                     label="Password"
                                     type="password"
                                     onChange={ (value) => this.handlePassword( value ) }
                        />
                        <Button isPrimary onClick={this.handleSubmit}>Login</Button>
                    </form>
                )}
            </div>
        );
    }
}

export default Login;