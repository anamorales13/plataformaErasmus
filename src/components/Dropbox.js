import React, { Component } from 'react';
import NuevoDocumento from './NuevoDocumento';

import GlobalDocumentos from '../GlobalDocumentos';
import Documentos from './Documentos';




class Dropbox extends Component {

    url = GlobalDocumentos.url;


    state = {
        documentos: [],
        status: null
    };

    

    render() {
        return (
            <div>


                <div id="content" className="informacion">
                    <h1> DROPBOX </h1>

                    
                    {/* LISTA DE DOCUMENTOS: */}
                    <div className="documento-item">
                        <table className="table-titulos">
                            <tr>
                                <th>Nombre</th>
                                <th>Última modificación</th>
                            </tr>
                        </table>
                    </div>
                    <Documentos />

                </div>

                {/* NUEVO DOCUMENTO */}
                <NuevoDocumento />

            </div>

        );


    }

}

export default Dropbox;