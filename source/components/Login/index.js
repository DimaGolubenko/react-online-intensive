//Core
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    _login = () => {
        this.props.login();
    };

    render() {
        const { authenticated } = this.props;

        if (authenticated) {
            return <Redirect to = '/' />;
        }

        return (
            <div className = { Styles.login }>
                <button onClick = { this._login }>Войти</button>
            </div>
        );
    }
}
