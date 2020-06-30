import React, { Component } from 'react';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';

import "../../assets/css/mensajeria.css";

class MenuMensajes extends Component {
    render() {

        return (
            <div className="menu-perfil">
                <nav> <ul>
                    <li>
                        <NavLink exact to="/user/profile" activeClassName="active"> Enviar mensajes</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/user/profile/edit" activeClassName="active"> Mensajes recibidos</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/user/profile/passwordEdit" activeClassName="active"> Mensajes enviados </NavLink >
                    </li>
                </ul>
                </nav>
            </div>
        );
    }


}



export default MenuMensajes;








