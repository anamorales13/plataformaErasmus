

import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class FormUserDetails extends Component{

    continue = e =>{
        e.preventDefault();
        this.props.nextStep();

    }

    render(){
        const {values, handleChange} = this.props;
       

        return(
            <div>
                    <AppBar title="Introduce los datos personales"/>
                    <form>
                        <label>Nombre </label>
                    </form>
                    <TextField
                        hinText="enter your first name"
                        floatingLabeltext="First Name"
                        onChange={handleChange('firstName')}
                        defaultValue ={values.firstName}
                    />
                    <br></br>
                    <TextField
                        hinText="enter your last name"
                        floatingLabeltext="last Name"
                        onChange={handleChange('lastName')}
                        defaultValue ={values.lastName}
                    />
                    <br></br>s
                   
                    <button
                        label="continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    > Continuar </button>
            </div>
        );
    }
}

const styles ={
    button: {margin:15}
}

export default FormUserDetails;