

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

export class FormDatosPersonales extends Component {

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



    render() {


        const { values, handleChange,tipo } = this.props;
       
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
                    {tipo == 'alumno' &&
                        < div className="registro-nuevoUsuario">
                            <h1 className="titulo titulo-registro "> ALTA DE ALUMNO/A</h1>
                            <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS PERSONALES </h1>
                            <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                            <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link>
                            <br />
                            <Card className="card-nuevoUser">

                                <form>
                                    <div className="form-login">

                                        <input
                                            className="form-newUser-input"
                                            onChange={handleChange('nombre')}
                                            defaultValue={values.nombre}
                                            type="text"
                                            placeholder="Nombre"
                                            name="nombre"
                                            required pattern="$[A-Z]*" title="Introduce tu nombre." />
                                        {this.validator.message('nombre', values.nombre, 'required|alpha_space')}
                                    </div>
                                    <div className="form-login ">

                                        <input
                                            className="form-newUser-input"
                                            onChange={handleChange('apellido1')}
                                            defaultValue={values.apellido1}
                                            type="text"
                                            name="apellido1"
                                            placeholder="Primer apellido" required />
                                        {this.validator.message('apellido1', values.apellido1, 'required|alpha_space')}
                                        <input
                                            className="form-newUser-input form-newUser-input-apellidos "
                                            onChange={handleChange('apellido2')}
                                            defaultValue={values.apellido2}
                                            name="apellido2"
                                            type="text"
                                            placeholder="Segundo apellido" required />
                                        {this.validator.message('apellido2', values.apellido2, 'required|alpha_space')}

                                    </div>
                                    <br />
                                    <div className="form-login">
                                        <input
                                            className=" form-newUser-input form-newUser-input-email"
                                            onChange={handleChange('email')}
                                            defaultValue={values.email}
                                            type="email"
                                            placeholder="correo electrónico"
                                            name="email1" required
                                        />
                                        {this.validator.message('email', values.email, 'required|alpha_space')}
                                        <label className="form-newUser-input-label"> @alu.uhu.es</label>

                                        <input
                                            className="form-newUser-input form-newUser-input-apellidos form-newUser-input-email"
                                            /*onChange={handleChange('email')}*/
                                            type="email"
                                            placeholder="Repetir correo"
                                            name="email2" required />
                                        {this.validator.message('email2', values.email, 'required|alpha_space')}
                                        <label className="form-newUser-input-label"> @alu.uhu.es</label>
                                    </div>
                                    <div className="form-login">
                                        <input
                                            className="form-newUser-input"
                                            onChange={handleChange('telefono')}
                                            defaultValue={values.telefono}
                                            type="phone"
                                            name="phone"
                                            placeholder="telefono" required ></input>
                                        {this.validator.message('telefono', values.telefono, 'required|phone')}
                                    </div>
                                    <button
                                        label="continue"
                                        className="btn-continue form-login"
                                        style={styles.button}
                                        onClick={this.continue}
                                        formnovalidate
                                    > CONTINUAR </button>
                                </form>

                                <br></br>


                            </Card>

                        </div>
                    }
                    {tipo == 'profesor' &&

                        < div className="registro-nuevoUsuario">
                            <h1 className="titulo titulo-registro "> ALTA DE PROFESOR/A</h1>
                            <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS PERSONALES </h1>
                            <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                            <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link>
                            <br />
                            <Card className="card-nuevoUser">

                                <form>
                                    <div className="form-login">

                                        <input
                                            className="form-newUser-input"
                                            onChange={handleChange('nombre')}
                                            defaultValue={values.nombre}
                                            type="text"
                                            placeholder="Nombre"
                                            name="nombre"
                                            required pattern="$[A-Z]*" title="Introduce tu nombre." />
                                        {this.validator.message('nombre', values.nombre, 'required|alpha_space')}
                                    </div>
                                    <div className="form-login ">

                                        <input
                                            className="form-newUser-input"
                                            onChange={handleChange('apellido1')}
                                            defaultValue={values.apellido1}
                                            type="text"
                                            name="apellido1"
                                            placeholder="Primer apellido" required />
                                        {this.validator.message('apellido1', values.apellido1, 'required|alpha_space')}
                                        <input
                                            className="form-newUser-input form-newUser-input-apellidos "
                                            onChange={handleChange('apellido2')}
                                            defaultValue={values.apellido2}
                                            name="apellido2"
                                            type="text"
                                            placeholder="Segundo apellido" required />
                                        {this.validator.message('apellido2', values.apellido2, 'required|alpha_space')}

                                    </div>
                                    <br />
                                    <div className="form-login">
                                        <input
                                            className=" form-newUser-input form-newUser-input-email"
                                            onChange={handleChange('email')}
                                            defaultValue={values.email}
                                            type="email"
                                            placeholder="correo electrónico"
                                            name="email1" required
                                        />
                                        {this.validator.message('email', values.email, 'required|alpha_space')}
                                        <label className="form-newUser-input-label"> @alu.uhu.es</label>

                                        <input
                                            className="form-newUser-input form-newUser-input-apellidos form-newUser-input-email"
                                            /*onChange={handleChange('email')}*/
                                            type="email"
                                            placeholder="Repetir correo"
                                            name="email2" required />
                                        {this.validator.message('email2', values.email, 'required|alpha_space')}
                                        <label className="form-newUser-input-label"> @alu.uhu.es</label>
                                    </div>
                                   
                                    <button
                                        label="continue"
                                        className="btn-continue form-login"
                                        style={styles.button}
                                        onClick={this.continue}
                                        formnovalidate
                                    > CONTINUAR </button>
                                </form>

                                <br></br>


                            </Card>

                        </div>
                    }

                </div>

            </div>
        );
    }
}

const styles = {
    button: { margin: 15 }
}

export default FormDatosPersonales;