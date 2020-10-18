import React, { Component } from 'react';
import Global from '../Global';
import GlobalProfesor from '../GlobalProfesor';
import axios from 'axios';
import swal from 'sweetalert';
import imagenlogo from '../assets/images/logo-erasmus.png';
import { Link, Redirect } from 'react-router-dom';

import imagen from '../assets/images/InicialScreen.png';
import imagenalumno from '../assets/images/boton-alumno.png';
import imagenprof from '../assets/images/boton-profesor.png';
import '../assets/css/InicialScreen.css';
import Form from 'react-bootstrap/Form';


class InicioAdministrador extends Component {

    
    gettoken = true;

    url = Global.url;
    urlProfesor = GlobalProfesor.url;

    state = {
        alumno: {},
        status: 'waiting',
        usuario:"",
        password:"",
        token: "",
        navigate: false
    };


    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }



    getProfesor = (e) => {
        e.preventDefault();
        
        var admin={
            usuario: this.state.usuario,
            password: this.state.password
        }

        axios.post(this.urlProfesor + 'login', admin)
            .then(res => {
                this.setState({
                    // alumno: res.data.users,
                    sucess: 'sucess',
                    alumno: res.data.users,
                    token: res.data.token,
                    navigate: true

                });

                //persistir los datos del usuario
                console.log(JSON.stringify(this.state.alumno));
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
        this.forceUpdate();
    }

    

    get_identity() {
        return JSON.parse(localStorage.getItem('user'));
    }



    render() {

        const { navigate } = this.state
        if (navigate && JSON.parse(localStorage.getItem('user')) != null) {
            return <Redirect to="/inicio" push={true} />
        }


        
        return (

            <div>
                
                    <div className="grid-inicio">
                        <div className="logo-titulo">
                            <img src={imagenlogo} width="100px" height="80px"></img>
                            <div className="titulo-completo">
                                <h3>Universidad de Huelva</h3>
                                <h1> ERASMUS+ </h1>
                            </div>
                        </div>
                        <hr className="linea"></hr>

                            <article className="formulario-inicioAdministrador " style={{marginLeft:'540px'}}>
                            <div className="cabecera-login" >
                                    <h3 className="title-login" style={{ fontSize: '25px' }}>INICIAR SESIÓN </h3>
                                    <h1 className="title-login" style={{ fontSize: '18px' }}><strong>ADMINISTRADOR</strong>   </h1>
                                </div>
                                <form onSubmit={this.getProfesor} >
                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <span className="glyphicon glyphicon-user"></span>
                                            </div>
                                            <input className="form-login-input" onChange={this.handleChange('usuario')} type="text"  placeholder="Usuario" />
                                        </div>
                                    </div>
                                    <div className="form-group ">

                                        <div className="input-group">
                                            <div className="input-group-addon icono-form">
                                                <span className="glyphicon glyphicon-lock"></span>
                                            </div>
                                            <input className="form-login-input" onChange={this.handleChange('password')} type="password" ref={this.passwordRef} placeholder="Contraseña"></input>
                                        </div>
                                    </div>
                                   
                                    <input type="submit" value="INICIAR SESIÓN" className="btn-login"></input>
                                </form>
                            </article>

                            
                        
                       
                    </div>
                
               
            </div>






        );



    }
}

export default InicioAdministrador;
