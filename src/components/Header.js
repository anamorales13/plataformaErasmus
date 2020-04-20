import React, { Component, useState } from 'react';
import logo from '../assets/images/logoUni.png';
import { NavLink } from 'react-router-dom';
import '../assets/css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Redirect, Link } from 'react-router-dom';
import InicioSesion from './InicioSesion';
import Global from '../Global';
class Header extends Component {

    contador = '1';
    url = Global.url;

    state = {
        navigate: false,
        identity: null
    }


    constructor(props) {

        super(props);


    }

    componentWillMount() {
        this.getIdentity();
    }

    botonmenu = () => {

        if (this.contador == '1') {
            var elem = document.getElementById('menuvar');
            elem.style.left = '0';
            this.contador = '0';

        } else {
            this.contador = '1';
            var elem = document.getElementById('menuvar');
            elem.style.left = '-100%';
        }

    }


    getIdentity = () => {
        console.log("hola");
        console.log(localStorage.getItem('token'));
        this.setState({
            identity: localStorage.getItem('token')
        })
    }

    render() {

        const { navigate } = this.state

        if (navigate) {
            localStorage.clear();
            return <Redirect to="/" push={true} />
        }

        return (

            <header /*id="header"*/ className="background">

                {/***** LOGO  ****  */}
                <div>  <a href="#" id="logo">LOGO</a></div>

                <div className="menu_bar">
                    <a href="#" id="btn-menu" onClick={this.botonmenu}>
                        <span>A</span>
                    </a>
                </div>
                <div className="menu">
                <nav /*id="menu"*/ id="menuvar">

                    <ul >

                        <li >
                            <NavLink exact to="/inicio" activeClassName="active"> INICIO </NavLink >
                        </li>
                        <li>
                            <NavLink to="/informacion" activeClassName="active">INFORMACION </NavLink >
                        </li>
                        <li>
                            <NavLink to="/documentos" activeClassName="active"> DOCUMENTOS </NavLink >
                        </li>
                        <li>
                            <NavLink to="/dropbox" activeClassName="active">DROPBOX </NavLink >
                        </li>
                    </ul>

                    { JSON.parse(localStorage.getItem('user')) != null &&
                        <div className="perfil-header">
                            <img src={this.url + '/get-image-user/' + JSON.parse(localStorage.getItem('user')).image} className="mini-avatar" ></img>
                            <h1>{JSON.parse(localStorage.getItem('user')).nombre}</h1>
                            <DropdownButton id="dropdown-basic-button" style={{left:"auto"},{ rigth:'85%'}} className="dropdown-menu.show">
                            <Dropdown.Item href="/user/profile">Perfil</Dropdown.Item>
                            <Dropdown.Item href="/user/profile/edit">Editar Perfil</Dropdown.Item>
                            <Dropdown.Item href="/user/profile/passwordEdit">Constraseña</Dropdown.Item>
                            <Dropdown.Item href="#">Ayuda</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({ navigate: true })}>Cerrar Sesion</Dropdown.Item>
                        </DropdownButton> 
                        </div>
                    }
                       
                    

                </nav>
                </div>
                <div className="clearfix"></div>

            </header>
        );
    }
}

export default Header;