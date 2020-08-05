import React, { Component } from 'react';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';

import "../../assets/css/mensajeria.css";

class MenuMensajes extends Component {
    render() {

        return (
            <div>
                            
            <div className="menu-mensaje">
                
                <nav> <ul>
                    <li>
                        <NavLink exact to="/mensajes/enviar" activeClassName="active"> ENVIAR MENSAJE</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/mensajes" activeClassName="active"> RECIBIDOS</NavLink >
                    </li>
                    <li>
                        <NavLink exact to="/enviados" activeClassName="active">ENVIADOS </NavLink >
                    </li>
                </ul>
                </nav>
            </div>
            </div>
        );
    }


}



export default MenuMensajes;








