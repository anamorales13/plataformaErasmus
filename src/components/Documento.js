import React, { Component } from 'react';
import Sidebar from './Sidebar';

import GlobalDocumentos from '../GlobalDocumentos';
import Documentos from './Documentos';
import axios from 'axios';
import swal from 'sweetalert';
import '../assets/css/documentos.css';
import imagen from '../assets/images/doc-default.png';

class Documento extends Component {

/*hola*/
    render() {

        return (
            <div className="grid-row">
                <div>
                    <h1 className="titulo-doc">DOCUMENTOS OFICIALES</h1>
                </div>
                <div>
                    <h2 className="subtitulo"> · Antes</h2>
                    <div className="grid-col">
                        <div>
                            <article className="card-doc">
                                <h5 className="subdoc"> CPRA </h5>
                                <img src={imagen} className="imagen-doc"></img>
                            </article>
                        </div>
                        <div>
                        <article className="card-doc">
                            <h5 className="subdoc"> Learning Agreement </h5>
                            </article>
                        </div>
                        <div>
                        
                        </div>
                    </div>
                </div>
                <div>
                    <h3>prueba</h3>
                </div>
                <div>
                    <h2 className="subtitulo-doc"> · Después</h2>
                </div>
                <div>
                    <h3>prueba</h3>
                </div>
            </div>


        );

    }

}

export default Documento;