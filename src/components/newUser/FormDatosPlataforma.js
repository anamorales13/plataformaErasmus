import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import imagenlogo from '../../assets/images/logo-erasmus.png';
import Card from 'react-bootstrap/Card';

import  {Link } from 'react-router-dom';

export class FormDatosPlataforma extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }

    render() {
        const { values, handleChange } = this.props;


        return (
            <div className="grid-inicio">
                <div className="logo-titulo">
                    <img src={imagenlogo} width="100px" height="80px"></img>
                    <div className="titulo-completo">
                        <h3>Universidad de Huelva</h3>
                        <h1> ERASMUS+ </h1>
                    </div>
                </div>
                <hr className="linea"></hr>

                <div className="registro-nuevoUsuario">
                    <h1 className="titulo titulo-registro "> ALTA DE PROFESOR/A</h1>
                    <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS PLATAFORMA </h1>
                    <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                    <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link><br/>
                    <Card className="card-nuevoUser">

                        <form>
                            <div className="form-login">

                                <input
                                    className="form-newUser-input"
                                    onChange={handleChange('usuario')}
                                    defaultValue={values.usuario}
                                    type="text"
                                    placeholder="Usuario" />
                            </div>
                            <br />
                            <div className="form-login">
                                <input
                                    className="form-newUser-input"
                                    onChange={handleChange('password')}
                                    defaultValue={values.password}
                                    type="password"
                                    placeholder="Contraseña" />
                                <input
                                    className="form-newUser-input form-newUser-input-apellidos"
                                    defaultValue={values.password}
                                    type="password"
                                    placeholder="Repetir contraseña" />

                            </div>


                            <button
                                label="continue"
                                className="btn-continue form-login"
                                style={styles.button}
                                onClick={this.continue}
                            >   CONTINUAR </button>
                            <button
                                label="volver"
                                className="btn-back form-login"
                                style={styles.button}
                                onClick={this.back}
                            > VOLVER </button>
                        </form>
                        <br></br>


                    </Card>
                </div>

            </div>
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default FormDatosPlataforma;