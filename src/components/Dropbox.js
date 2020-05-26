import React, { Component } from 'react';
import NuevoDocumento from './NuevoDocumento';

import GlobalDocumentos from '../GlobalDocumentos';
import Documentos from './Documentos';
import '../assets/css/dropbox.css';



class Dropbox extends Component {

    url = GlobalDocumentos.url;


    state = {
        documentos: [],
        status: null
    };



    render() {
        return (

            <div className="grid-documentos">
                <div className="titulo-doc">
                    <h1>DROPBOX</h1>
                </div>
                <div className=" grid-documentos-col">
                    <div>
                    <div className=" documento-item">
                                <table className="table-titulos">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Última modificación</th>
                                    </tr>
                                </table>
                            </div>
                            <Documentos />
                    </div>
                    <div>
                    <NuevoDocumento type="documento" />
                    </div>

                </div>

            </div>



           /*  <div>


                <div id="content" className="grid-documentos">
                    <div>
                        <h1> DROPBOX </h1>
                    </div>

                    <div>
                    <div className="grid-documentos-col">
                        
                        <div>
                            <div className=" documento-item">
                                <table className="table-titulos">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Última modificación</th>
                                    </tr>
                                </table>
                            </div>
                            <Documentos />
                        </div>
                        <div>
                            <NuevoDocumento />
                        </div>

                        </div>

                    </div>


                </div>

              


            </div>*/

        );


    }

}

export default Dropbox;