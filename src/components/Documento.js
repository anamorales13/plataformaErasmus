import React, { Component } from 'react';
import Sidebar from './Sidebar';

import GlobalDocumentos from '../GlobalDocumentos';
import Documentos from './Documentos';
import axios from 'axios';
import swal from 'sweetalert';


class Documento extends Component {

    

    titleRef = React.createRef();
    fileRef = React.createRef();

    url = GlobalDocumentos.url;
    
    state = {
        documento: {},
        status: null,
       
    };



    changeState = () => {
        this.setState({
            documento: {
                title: this.titleRef.current.value,
                url: this.fileRef.current.value,
               

            }
        });
    }

 

    saveDocument = (e) => {
        e.preventDefault();

        // 1- Rellenar el state con el formulario
        this.changeState();
        axios.post(this.url + 'saveDoc', this.state.documento)
            .then(res => {
                if (res.data.documento) {

                    this.setState({
                        documento: res.data.documento,
                        status: 'sucess'
                    });
                    swal(
                        'Documento creado con exito',
                        'El documento ha sido creado correctamente',
                        'success'
                    )
                   
                //ERROR!
                } else {

                    this.setState({
                        status: 'failed'
                    });
                }
          
            
            });
    }


    render() {
 
        return (
            
            
            <div >
            
            <Documentos/>

                <div id="content" className="informacion">
                    <h1> DOCUMENTOS OFICIALES </h1>
                    <div className="ayuda">

                        <h2>Subir documento:</h2>
                    </div>
                    <div className="formularios">
                        <form onSubmit={this.saveDocument}>
                            <div >

                                <label for="tittle">Titulo del Documento:</label>
                                <select id="tittle" name="tittle" ref={this.titleRef}>
                                    <option>Learning Agreement</option>
                                    <option>CPRA</option>
                                    <option>Extractos de notas</option>
                                </select>

                            </div>
                            <div >
                                <label htmlFor="file0"> URL </label>
                                <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} />

                            </div>

                            <input type="submit" value="SUBIR" className="btn" ></input>
                        </form>
                    </div>

                </div>


                <Sidebar />
            </div>


        );
   
}

}

export default Documento;