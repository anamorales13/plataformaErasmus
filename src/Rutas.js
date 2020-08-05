import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NuevoUsuario from './components/NuevoUsuario';
import RutasWeb from './RutasWeb';
import InicioSesion from './components/InicioSesion';
import pantallaInicial from './components/pantallaInicial';
import Userform from './components/newUser/Userform';

class Rutas extends Component{
    render(){
        return(
            <BrowserRouter>
           
                <Switch>
                   <Route exact path="/" component={pantallaInicial}/>
                    <Route exact path="/inicioSesion" component={InicioSesion}/>
                    <Route exact path="/nuevoUsuario" component={Userform}/>
                    <RutasWeb/>

                    
                </Switch>
                <div className="clearfix"></div>
            </BrowserRouter>
            
        );
    }
}


export default Rutas;