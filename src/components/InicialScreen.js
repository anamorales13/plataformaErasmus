
import React, { Component } from 'react';
import '../assets/css/InicialScreen.css';

import imagen from '../assets/images/InicialScreen.png';
import InicioSesion from './InicioSesion';

class InicialScreen extends Component {

render(){
    return(
        
        <div>
            <br/><br/><br/>
            <h1 className="logo_inicialScreen"> ERASMUS </h1>
            <br/><hr/>

            <br/><br/><br/><br/><br/><br/>
            <div>
                <div>
                <img src={imagen} width="400px" height="200px" className="imagen-InicialScreen"></img>
                </div>
                <div>
                {InicioSesion}
                </div>
            </div>
            
        </div>
    );
}


}

export default InicialScreen;