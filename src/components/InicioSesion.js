import React, { Component } from 'react';
import Global from '../Global';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import imagenlogo from '../assets/images/logo-erasmus.png';


import imagen from '../assets/images/InicialScreen.png';
import '../assets/css/InicialScreen.css';



class InicioSesion extends Component {

    passwordRef = React.createRef();
    usuarioRef = React.createRef();
    gettoken = true;

    url = Global.url;


    state = {
        alumno: {},
        status: 'waiting',
        nuevoAlumno: {},
        token: "",
        navigate: false
    };


    /* BUSCAR ALUMNOS EN LA BD */
    change = () => {
        this.setState({

            nuevoAlumno: {
                usuario: this.usuarioRef.current.value,
                password: this.passwordRef.current.value

            },

        });

    }


    getAlumno = (e) => {
        e.preventDefault();
        this.change();

       
        axios.post(this.url + 'login', this.state.nuevoAlumno)
            .then(res => {
                this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    alumno: res.data.users,
                    token: res.data.token,
                    navigate: true

                });
                //persistir los datos del usuario
                localStorage.setItem('user', JSON.stringify(this.state.alumno));
                localStorage.setItem('token', this.state.token);
        
                //  this.get_token();
            })
            .catch(err => {
                this.setState({
                    alumno: {},
                    status: 'failed'
                });
                swal(
                    '¡Error!',
                    'Nombre de usuario o contraseña incorrectos',
                    'error'
                )

            });


    }

    get_identity() {
        return JSON.parse(localStorage.getItem('user'));
    }



    render() {

        const { navigate } = this.state
        if (navigate) {
            return <Redirect to="/inicio" push={true} />
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
                            <h1 className="title-login"> Iniciar Sesion </h1>
                            <a href="./nuevoUsuario" className="link-nuevoUsuario"> Crear una cuenta</a>
                        </div>
                        <form onSubmit={this.getAlumno}>
                            <div className="form-login">
                                <input className="form-login-input" onChange={this.change} type="text" ref={this.usuarioRef} placeholder="Usuario"></input>
                            </div>
                            <div className="form-login">
                                <input className="form-login-input" onChange={this.change} type="password" ref={this.passwordRef} placeholder="Password"></input>
                            </div>
                            <input type="submit" value="Iniciar Sesión" className="btn-login" ></input>
                        </form>
                    </article>
                </div>
            </div>










        );

    }
}

export default InicioSesion;