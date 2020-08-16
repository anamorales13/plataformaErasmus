

import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import imagenlogo from '../../assets/images/logo-erasmus.png';
import Card from 'react-bootstrap/Card';
import '../../assets/css/NuevoUsuario.css';
import { Link } from 'react-router-dom';
import Global from '../../Global';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';

export class FormDatosUniversidad extends Component {

    url = Global.url;


    componentWillMount() {

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
                alpha_space: 'No puede contener carácteres numéricos',
                phone: 'Debe de ser un número de teléfono válido'
            },

        });
    }

    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }


    render() {


        const { values, handleChange, tipo } = this.props;

        return (
            <div>

                < div className="grid-inicio">

                    <div className="logo-titulo">
                        <img src={imagenlogo} width="100px" height="80px"></img>
                        <div className="titulo-completo">
                            <h3>Universidad de Huelva</h3>
                            <h1> ERASMUS+ </h1>
                        </div>
                    </div>
                    <hr className="linea"></hr>

                    < div className="registro-nuevoUsuario">
                        <h1 className="titulo titulo-registro "> ALTA DE PROFESOR/A</h1>
                        <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS UNIVERSIDAD </h1>
                        <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                        <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link>
                        <br />
                        <Card className="card-nuevoUser">

                            <form>
                                <div className="form-login">

                                    <input
                                        className="form-newUser-input"
                                        onChange={handleChange('telefono')}
                                        defaultValue={values.telefono}
                                        type="text"
                                        placeholder="Telefono despacho"
                                        name="telefono"
                                        required  title="Introduce tu telefono del despacho." />
                                    
                                </div>
                                <div className="form-login ">
                                    <input
                                        className="form-newUser-input"
                                        onChange={handleChange('edificio')}
                                        defaultValue={values.edificio}
                                        type="text"
                                        name="edificio"
                                        placeholder="Edificio" required />
                                    
                                    <input
                                        className="form-newUser-input form-newUser-input-apellidos"
                                        onChange={handleChange('despacho')}
                                        defaultValue={values.despacho}
                                        type="number"
                                        name="despacho"
                                        placeholder="Número de despacho" required />
                                    

                                </div>
                               

                                <button
                                    label="continue"
                                    className="btn-continue form-login"
                                    style={styles.button}
                                    onClick={this.continue}
                                    formnovalidate
                                > CONTINUAR </button>
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

            </div>
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default FormDatosUniversidad;