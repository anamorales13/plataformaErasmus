import React, { Component } from 'react';

import Menu from './menu-mensajes';

class mensajeprincipal extends Component {

    state={
        title:'Mensajes privados'
    }
    


   

    render() {
        return (
        
        <div className="grid-mensajeria-col">
           <div>
            <h3>{this.state.title} </h3>
            
               <Menu/>
            </div>
            <div>
            </div>          
        </div>
       
        
        );


    }
}


export default mensajeprincipal;