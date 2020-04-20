import React, { Component } from 'react';
import "../../assets/css/MiPerfil.css";
import { NavLink } from 'react-router-dom';

class MenuPerfil extends Component {
render(){

    return(
<div className="menu-perfil">
                    <nav> <ul>
                        <li>
                            <NavLink exact to="/user/profile" activeClassName="active"> Perfil</NavLink >
                        </li>
                        <li>
                            <img class="YPzqGd" src="https://www.gstatic.com/identity/boq/accountsettingsmobile/menu_personalinfo_24x24_2b08480abc2504e2d70d74f2470f0ae0.png"
                                srcset="https://www.gstatic.com/identity/boq/accountsettingsmobile/menu_personalinfo_48x48_abc40f5cd0cb6cdf43ccee39a956f199.png 2x, https://www.gstatic.com/identity/boq/accountsettingsmobile/menu_personalinfo_72x72_6d4bbb46b2b8d44af58a8aecd3051324.png 3x, https://www.gstatic.com/identity/boq/accountsettingsmobile/menu_personalinfo_96x96_e44717dc1e54121a2cc35470f08112ea.png 4x"
                                data-iml="2118673.5400001053" data-atf="true" />
                            <NavLink exact to="/user/profile/edit" activeClassName="active"> Editar Perfil </NavLink >
                        </li>
                        <li>
                            <NavLink exact to="/user/profile/passwordEdit" activeClassName="active"> Cambiar Contraseña </NavLink >
                        </li>
                    </ul>
                    </nav>
                </div>
    );
}


}



export default MenuPerfil;