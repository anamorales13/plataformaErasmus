import React, { Component } from 'react';
import Sidebar from './Sidebar';

import GlobalDocumentos from '../GlobalDocumentos';
import Documentos from './Documentos';
import axios from 'axios';
import swal from 'sweetalert';
import '../assets/css/documentos.css';
import imagen from '../assets/images/doc-default.png';

class DocumentoOficial extends Component {

/*hola2*/
    render() {

        return (
            <div className="grid-row">
               
               <div>
                   <h1 className="titulo-doc">DOCUMENTOS OFICIALES</h1>
               </div>
               <div className="grid-col">
                   <div>
                        <article className="card-doc">
                            <h5>Checklist</h5>
                        </article>
                   </div>
                   <div>
                        <div className="grid-row-docgeneral">
                           <div>
                               <h1> Antes del Erasmus </h1>
                           </div>
                           <div>
                               <div className="grid-col-doc">
                                    
                               </div> 

                           </div>
                           <div>
                               <h1>documento 2</h1>
                           </div>
                           <div>
                                <h1> Durante el Erasmus</h1> 
                            </div> 
                            <div>
                                <h1>Documento 1</h1> 
                            </div>
                            <div>
                                <h1>Documento 2</h1> 
                            </div>


                       </div>
                   </div>
                   <div>
                       <h5> añadir doc</h5>
                   </div>
               </div>
            </div>


        );

    }

}

export default DocumentoOficial;