import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

import {Link, Redirect} from 'react-router-dom';

/*hola */
class Alumnos extends Component {

    url= Global.url;

    //*** LISTAR LOS ARTICULOS */

    state = {
        alumno: [],
        status: null
    };

    componentWillMount() {
      
        var search= this.props.search;

         if(search && search!==null && search!==undefined){
            this.getAlumnosBySearch(search);
        
        
    }
}

  

    getAlumnoBySearch = (searched) => {
        axios.get(this.url+"search/"+searched)
            .then(res => {
                this.setState({
                    alumno: res.data.alumno,
                    status: 'sucess'
                });
        })

        //capturamos el error. Y le damos a articulos=vacio para que nos muestre
        //un mensaje diciendo No hay articulos que mostrar.
        .catch( err => {
            this.setState({
                alumno:[],
                status: 'sucess'
            });
         
        });
    }

    render(){

        

        if(this.state.alumno.length >=1){
        return(
            <Redirect to="/inicio"/>

        );
        }
    }

}


export default Alumnos;