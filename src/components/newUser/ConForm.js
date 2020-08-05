import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';


export class FormUserDetails extends Component {

    continue = e => {
        e.preventDefault();

        //process form //
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }

    render() {
        const { values: { firstName, lastName, email } } = this.props;


        return (
            <div>
                <AppBar title="Confirm User Data" />
                <ul>
                    <li>{firstName}</li>
                    <li>{lastName}</li>
                    <li>{email}</li>

                </ul>

                <br></br>
                <button
                    label="back"
                    primary={true}
                    style={styles.button}
                    onClick={this.back}
                > Back </button>
                <button
                    label="continue"
                    primary={true}
                    style={styles.button}
                    onClick={this.continue}
                > ACEPTAR & Continuar </button>
            </div>
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default FormUserDetails;