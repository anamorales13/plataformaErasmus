import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import ReactDOM from 'react-dom';
import "../../assets/css/Password.css";
import MenuPerfil from './MenuPerfil';
import SimpleReactValidator from 'simple-react-validator';
var bcrypt = require('bcrypt-nodejs');


class PasswordEdit extends Component {

    passwordNuevaDos = React.createRef();
    passwordNueva = React.createRef();
    passwordActual = React.createRef();



    url = Global.url;

    constructor(props) {
        super(props);
        this.state = {
            identity: null,
            alumno: {},
            passwordNuevaDos: "",
            passwordActual: {},
            errores: {
                actual: null,
                nueva: null,
                nuevarep: null,
            },
            numerador:  0,

        }

    }



    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido' //PERSONALIZAR MENSAJES DE ERROR
                  
                }
            
            });
       
    }

    componentDidMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
       
    }



    changeState = () => {
        this.setState({
            alumno: {
                password: this.passwordNueva.current.value,
            },

            passwordNuevaDos: this.passwordNuevaDos.current.value,
            passwordActual: {
                password:this.passwordActual.current.value
            }

        });

      
    }

    cambiarError(name){
        document.getElementById(name).style.borderColor= 'rgb(251,13,13,1)';
        
   }

   
   
    updatePassword = (e) => {
        e.preventDefault();

        this.changeState();
      
        if(this.state.alumno.password != "" && this.state.passwordNuevaDos != "" && this.state.passwordActual.password != ""){
        axios.post(this.url + 'compararPassword/' + this.state.identity._id, this.state.passwordActual)
            .then(res => { 
                if(res.data.status == 'sucess'){  
                    if (this.state.alumno.password == this.state.passwordNuevaDos) {   
                        axios.put(this.url + 'update-password/' + this.state.identity._id, this.state.alumno)
                            .then(res => {
                                if (res.data.alumno) {
                                    this.setState({
                                        alumno: res.data.alumno,
                                        status: 'sucess'
                                    });
                                   
                                } else {
                                    this.setState({
                                        status: 'failed'
                                    });
                                }
                            });
                        } else {
                        this.setState({
                            errores: {
                                nueva: 'No coinciden las contraseñas',
                                nuevarep: 'No coinciden las contraseñas'
                            },
                            numerador: 1
                        });
                        this.cambiarError('input-error2');
                        this.cambiarError('input-error3');
                    }
                } else //no son iguales
                {
                    this.setState({
                        errores: {
                            actual: 'Contraseña incorrecta'
                        },
                        numerador: 1
                      
                    });
                    this.cambiarError('input-error')
                    
                    console.log("error");
                }
            });
        
        } else {
           this.validator.showMessages();
          
            if(this.state.alumno.password==undefined){
               
                this.cambiarError('input-error2')
               
            }
            if(this.state.alumno.password==""){
                this.cambiarError('input-error2');
            }
             
            if(this.state.passwordActual.password=="" ||this.state.passwordActual.password==undefined){
                console.log("error2")
                this.cambiarError('input-error')
                
            }
            
            if(this.state.passwordNuevaDos==""){
                console.log("error3")
                this.cambiarError('input-error3')
                
            }

         
       
        }


       this.forceUpdate();

    }


    render() {

        return (

            <div id="content" className="grid-passw">
                <MenuPerfil />
                <div>
                    <h1 className="titulo-passw"> Contraseña </h1>

                    <article className="elemt-one-passw">

                        <form className="elemt-form-passw" onSubmit={this.updatePassword} noValidate>
                            <div className="form-edit">
                                <label className="form-editpassw-value-title">Contraseña actual</label>
                                <input id="input-error" className="form-editpassw-value" name="actual" onChange={this.changeState} type="password" ref={this.passwordActual} required></input>
                                <div className="error">
                                {this.validator.message('actual', this.state.passwordActual.password, 'required')}
                                </div>
                                
                                {this.state.errores.actual != undefined && 
                                    <label className="error"> {this.state.errores.actual.toString()}</label>
                                    
                                }

                            </div>
                            <div className="form-edit">
                                <label className="form-editpassw-value-title">Nueva contraseña</label>
                                <input id="input-error2" className="form-editpassw-value" name="nueva" onChange={this.changeState} type="password" ref={this.passwordNueva} required></input>
                                <div className="error">
                                {this.validator.message('nueva', this.state.alumno.password, 'required')}
                                </div>
                                {this.state.errores.nueva != undefined &&
                                    <label className="error"> {this.state.errores.nueva.toString()}</label>
                                }
                            </div>
                            <div className="form-edit">
                                <label className="form-editpassw-value-title">Vuelve a escribir la nueva contraseña</label>
                                <input id="input-error3" className="form-editpassw-value" name="nuevarep" onChange={this.changeState} type="password" ref={this.passwordNuevaDos} required></input>
                                <div className="error">
                                {this.validator.message('nuevarep', this.state.passwordNuevaDos, 'required')}
                                </div>
                                {this.state.errores.nuevarep != undefined &&
                                    <label className="error"> {this.state.errores.nuevarep.toString()}</label>
                                }
                            </div>
                            <input type="submit" value="Actualizar" className="btn-update" ></input>
                        </form>
                    </article>
                </div>
            </div>
        );
    }




}

export default PasswordEdit;