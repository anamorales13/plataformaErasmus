import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class FormPersonalDetails extends Component{

    continue = e =>{
        e.preventDefault();
        this.props.nextStep();

    }

    back = e =>{
        e.preventDefault();
        this.props.prevStep();

    }

    render(){
        const {values, handleChange} = this.props;
       

        return(
            <div>
                    <AppBar title="Introduce los datos personales"/>
                    <form>
                        <label>Email </label>
                    </form>
                   
                    <br></br>s
                    <TextField
                        hinText="enter your email"
                        floatingLabeltext="Email"
                        onChange={handleChange('email')}
                        defaultValue ={values.email}
                    />
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
                    > Continuar </button>
            </div>
        );
    }
}

const styles ={
    button: {margin:15}
}

export default FormPersonalDetails;