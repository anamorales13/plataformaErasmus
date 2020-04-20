import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NuevoUsuario from './components/NuevoUsuario';
import RutasWeb from './RutasWeb';
import InicioSesion from './components/InicioSesion';


class Rutas extends Component{
    render(){
        return(
            <BrowserRouter>
           
                <Switch>
                   
                    <Route exact path="/" component={InicioSesion}/>
                    <Route exact path="/nuevoUsuario" component={NuevoUsuario}/>
                    <RutasWeb/>

                    
                </Switch>
                <div className="clearfix"></div>
            </BrowserRouter>
            
        );
    }
}


export default Rutas;