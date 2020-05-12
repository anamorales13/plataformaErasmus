import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';
import Global from '../../Global';
import MenuPerfil from './MenuPerfil';

class MiPerfil extends Component {

    state = {
        identity: null
    }

    url = Global.url;

    constructor(props){
        super(props);
        
    }

    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
    }

    

    render() {
     

        return (
           
            <div id="content" className="grid">
               <MenuPerfil/>
                <div className="avatar">
                    <img src={this.url + '/get-image-user/' + this.state.identity.image} classname="avatar"></img>
                </div>

                <div >
                    <h1 className="titulo"> Infomación personal </h1>
                    <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                    <article className="elemt-one">
                        
                            <div className="elemt-form">
                                <header >
                                    <h2 className="form-perfil-title">Perfil</h2>
                                 
                                </header>
                                <div>
                                    <div>
                                        <div>
                                            <ul className="form-perfil">
                                                <li>
                                                    <span className="form-perfil-value-title">Nombre</span>
                                                    <span className="form-perfil-value">{this.state.identity.nombre}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">Apellidos</span>
                                                    <span className="form-perfil-value">{this.state.identity.apellidos}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">Usuario</span>
                                                    <span className="form-perfil-value">{this.state.identity.usuario}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">Universidad destino</span>
                                                    <span className="form-perfil-value">{this.state.identity.UniDestino}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>

                                            </ul>

                                        </div>

                                    </div>
                                </div>
                            </div>
                    </article>

                    <article className="elemt-one">
                    <div className="elemt-form">
                                <header >
                                    <h2 className="form-perfil-title">Informacion de contacto</h2>
                                    

                                </header>
                                <div>
                                    <div>
                                        <div>
                                            <ul className="form-perfil">
                                                <li>
                                                    <span className="form-perfil-value-title">Email</span>
                                                    <span className="form-perfil-value">{this.state.identity.email}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>
                                                <li>
                                                    <span className="form-perfil-value-title">telefono</span>
                                                    <span className="form-perfil-value">{this.state.identity.telefono}</span>
                                                    <br /><br />
                                                    <div className="form-line">

                                                    </div>
                                                </li>

                                            </ul>

                                        </div>

                                    </div>
                                </div>
                                </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default MiPerfil;