import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Inicio from './components/Inicio';
import Informacion from "./components/Informacion";
import Header from './components/Header';
import Documento from './components/DocumentoOficial';
import Dropbox from './components/Dropbox';
import MiPerfil from './components/views/MiPerfil';
import EditPerfil from './components/views/EditPefil';
import RutasInicio from './Rutas';
import PasswordEdit from './components/views/PasswordEdit';

import './assets/css/App.css';
import enviar from './components/mensajes/enviar';
import recibidos from './components/mensajes/recibidos';
import enviados from './components/mensajes/enviados';
import mensaje from './components/mensajes/mensaje'

class Rutas extends Component {

    render() {

        var user;
        return (
            <BrowserRouter>
                <div className="grid-general">
                    <Header />
                    <div>
                        <Switch>
                            <Route exact path="/inicio" component={Inicio} />
                            <Route exact path="/informacion" component={Informacion}></Route>
                            <Route exact path="/documentos" component={Documento}></Route>
                            <Route exact path="/dropbox" component={Dropbox}></Route>
                            <Route exact path="/user/profile" component={MiPerfil}></Route>
                            <Route exact path="/user/profile/edit" component={EditPerfil}></Route>
                            <Route exact path="/user/profile/passwordEdit" component={PasswordEdit}></Route>
                            <Route exact path="/mensajes" component={recibidos} />
                            <Route exact path="/mensajes/enviar" component={enviar}/>
                            <Route exact path="/mensajes/:id" component={mensaje}></Route>
                            <Route exact path="/enviados" component={enviados}/>
                           
                            <RutasInicio />
                            {/*  <Route exact path="/" component={InicioSesion}/> */}
                            {/*} <Route exact path="/inicioSesion" component={InicioSesion}/>*/}


                        </Switch>
                    </div>
                    <div className="clearfix"></div>


                </div>

            </BrowserRouter>

        );
    }
}


export default Rutas;