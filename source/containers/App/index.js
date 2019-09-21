// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Login from 'components/Login';
import StatusBar from 'components/StatusBar';
import Catcher from '../../components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from '../../theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstName: 'Дмитрий',
    currentUserLastName:  'Голубенко',
    authenticated:        false,
};

@hot(module)
export default class App extends Component {
    state = {
        authenticated: options.authenticated,
    };

    componentDidMount() {
        const authenticatedKey = JSON.parse(localStorage.getItem('authenticated'));
        const authenticated = authenticatedKey === null ? options.authenticated : authenticatedKey;

        this._setAuthenticatedState(authenticated);
    }

    _setAuthenticatedState = (authenticated) => {
        this.setState({ authenticated });
        localStorage.setItem('authenticated', JSON.stringify(authenticated));
    };

    _login = () => {
        this._setAuthenticatedState(true);
    };

    _logout = () => {
        this._setAuthenticatedState(false);
    };

    render() {
        const { authenticated } = this.state;

        return (
            <Catcher>
                <Provider value = {{ ...options, authenticated, login: this._login }}>
                    <StatusBar logout = { this._logout } />
                    <Switch>
                        <Route
                            component = { Login }
                            path = '/login'
                        />
                        {!authenticated && <Redirect to = '/login' />}
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
