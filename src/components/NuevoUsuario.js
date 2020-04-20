import React, { Component } from 'react';
import Global from '../Global';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';

import imagenlogo from '../assets/images/logo-erasmus.png';
import imagenUsuario from '../assets/images/user-default.jpg'
import '../assets/css/InicialScreen.css';


import imagen from '../assets/images/InicialScreen.png';

class NuevoUsuario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    usuarioRef = React.createRef();
    passwordRef = React.createRef();
    emailRef = React.createRef();
    telefonoRef = React.createRef();
    uniDestinoRef = React.createRef();

    url = Global.url;

    state = {
        alumno: {},
        status: null,
        statusNuevo: 'nohay'
    };

    changeState = () => {
        this.setState({
            alumno: {
                nombre: this.nombreRef.current.value,
                apellidos: this.apellidosRef.current.value,
                usuario: this.usuarioRef.current.value,
                password: this.passwordRef.current.value,
                email: this.emailRef.current.value,
                telefono: this.telefonoRef.current.value,
                uniDestino: this.uniDestinoRef.current.value,
                images: 'user-default.jpg'

            }
        });




    }

    /* GUARDAR EL ALUMNO */

    saveAlumno = (e) => {
        e.preventDefault();

        this.changeState();

        axios.post(this.url + 'save', this.state.alumno)
            .then(res => {
                if (res.data.alumno) {

                    this.setState({
                        alumno: res.data.alumno,
                        status: 'sucess'
                    });
                    swal(
                        'Alumno creado con exito',
                        'Ahora puedes iniciar sesion con tu usuario y contraseña',
                        'success'
                    )

                } else {

                    this.setState({
                        status: 'failed'
                    });
                }

            });
        this.validator.showMessages();
        this.forceUpdate();

    }

    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
                alpha_space: 'No puede contener carácteres numéricos',
                phone : 'Debe de ser un número de teléfono válido'
            },
            email: {
                messages: 'Correo invalido. Ej: usuario.usuario@alu.uhu.es',
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /([a-zA-Z]+.[a-zA-Z]+(@alu.uhu.es)$)/i) && params.indexOf(val) === -1
                }
            }
        });

    }

    render() {

        if (this.state.status === 'sucess') {
            return <Redirect to="/" />;
        }

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



                <div className="grid-logo-inicio">
                    <div className="inicio-logo">
                        <img src={imagen} width="400px" height="200px"></img>
                    </div>

                    <article className="formulario-inicioSesion">
                        <div className="cabecera-login">
                            <h1 className="title-login"> Crear cuenta </h1>
                            <a href="./" className="link-nuevoUsuario"> Iniciar sesion</a>
                        </div>
                        <form onSubmit={this.saveAlumno}>
                            <div className="form-login">
                                <input type="text" name="nombre" ref={this.nombreRef} placeholder="Nombre*" onChange={this.changeState} className="form-login-input" />
                                {this.validator.message('nombre', this.state.alumno.nombre, 'required|alpha_space')}
                            </div>
                            <div className="form-login">
                                <input type="text" name="apellidos" ref={this.apellidosRef} placeholder="Apellidos*" onChange={this.changeState} className="form-login-input" />
                                {this.validator.message('apellidos', this.state.alumno.nombre, 'required|alpha_space')}
                            </div>
                            <div className="form-login">
                                <input type="text" name="usuario" ref={this.usuarioRef} onChange={this.changeState} placeholder="Usuario*" className="form-login-input" />
                                {this.validator.message('usuario', this.state.alumno.usuario, 'required')}
                            </div>
                            <div className="form-login">
                                <input type="password" name="password" ref={this.passwordRef} onChange={this.changeState} placeholder="Contraseña*"  className="form-login-input"/>
                                {this.validator.message('password', this.state.alumno.password, 'required')}
                            </div>
                            <div className="form-login">
                                <input type="email" name="email" ref={this.emailRef} onChange={this.changeState} placeholder="Correo electrónico" className="form-login-input" />
                                {this.validator.message('email', this.state.alumno.email, 'required')}
                            </div>
                            <div className="form-login">
                                <input type="tel" name="telefono" ref={this.telefonoRef} onChange={this.changeState} placeholder="Teléfono" className="form-login-input" />
                                {this.validator.message('telefono', this.state.alumno.telefono, 'phone')}
                            </div>
                            <div className="form-login">
                                <input type="text" name="uniDestino" ref={this.uniDestinoRef} onChange={this.changeState} placeholder="Universidad de Destino"  className="form-login-input"/>
                                {this.validator.message('uniDestino', this.state.alumno.uniDestino, 'alpha')}
                            </div>
                            <input type="submit" value="CREAR" className="btn-login" ></input>
                        </form>
                    </article>
                </div>

            </div>



        );
    }
}

export default NuevoUsuario;