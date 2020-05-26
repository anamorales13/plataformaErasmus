import React, { Component } from 'react';
import Sidebar from './Sidebar';

import GlobalDocumentos from '../GlobalDocumentos';
import Documentos from './Documentos';
import axios from 'axios';
import swal from 'sweetalert';
import '../assets/css/documentos.css';
import imagen from '../assets/images/doc-default.png';
import NuevoDocumento from './NuevoDocumento';
import Global from '../Global';
import doc from '../assets/images/default-document.png';


class DocumentoOficial extends Component {

    url = Global.url;

    constructor(props) {
        super(props);
        this.state = {
            identity: JSON.parse(localStorage.getItem('user')),
            alumno: {},
            status: null,

        };


    }

    componentWillMount() {
        this.getDocumentos();
    }

    componentDidMount(){
        this.getDocumentos();
    }

    getDocumentos() {
        console.log("prueba");

        axios.get(this.url + "getdocumentos" + "/" + this.state.identity._id)
            .then(res => {
                if (res.data.alumno) {
                    this.setState({
                        alumno: res.data.alumno,
                        status: 'sucess'
                    });

                    console.log(this.state.alumno.length)

                }


            });


    }



    render() {

        if (this.state.alumno.length == 1) {
            return (
                <div className="grid-row">
                    {/* TITULO - fila 1  */}
                    <div>
                        <h1 className="titulo-doc">DOCUMENTOS OFICIALES</h1>
                    </div>
                    {/* FILA 2 */}
                    <div className="grid-col">
                        {/* COLUMA 1 */}
                        <div>
                            <article className="card-doc">
                                <h5>Checklist</h5>
                            </article>
                        </div>
                        {/* COLUMA 2 */}
                        <div>
                            <div className="grid-row-docgeneral">
                                {/* TITULO PARTE 1 */}
                                <div>
                                    <h1> · Antes del Erasmus </h1>

                                </div>
                                {/*DOCUMENTO 1 -2 */}
                                <div>
                                    <div className="grid-documentosofi">
                                        {/*     documento 1      */}
                                        
                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div className="datos-doc">
                                                <h3 id="title-doc"> CPRA </h3>
                                                <h5 id="estado-doc">Estado : {this.state.alumno[0].documentos[0].estado} </h5>
                                                {this.state.alumno[0].documentos[0].url != 'No Presentado' &&
                                                    <a id="link-doc" target="_blank" href={this.url + '/get-image/' + this.state.alumno[0].documentos[0].url}>ver documento</a>
                                                }

                                            </div>
                                            </div>
                                    
                                         {/*     documento 2      */}
                                        
                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div>
                                                <h3 id="title-doc"> Learning Agreement </h3>
                                                <h5 id="estado-doc">Estado : {this.state.alumno[0].documentos[1].estado} </h5>
                                                {this.state.alumno[0].documentos[1].estado != 'No Presentado' &&
                                                    <a id="link-doc" target="_blank" href={this.url + '/get-image/' + this.state.alumno[0].documentos[1].url}>ver documento</a>
                                                }

                                            </div>
                                        </div>
                                        

                                    </div>
                                </div>

                                {/*DOCUMENTO 3*/}
                                <div>
                                    <h1> · Durante el Erasmus</h1>
                                </div>
                                <div>
                                    <div className="grid-documentosofi">
                                        {/*     documento 3    */}
                                        
                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div className="datos-doc">
                                                <h3 id="title-doc"> Modificacion CPRA </h3>
                                                <h5 id="estado-doc">Estado : {this.state.alumno[0].documentos[2].estado} </h5>
                                                {this.state.alumno[0].documentos[2].estado !='No Presentado' &&
                                                    <a id="link-doc" target="_blank" href={this.url + '/get-image/' + this.state.alumno[0].documentos[2].url}>ver documento</a>
                                                }

                                            </div>
                                            </div>
                                    
                                         {/*     documento 4     */}
                                        
                                        <div className="grid-documentos-dos">
                                            <div className="doc-default">
                                                <img src={doc} />
                                            </div>
                                            <div>
                                                <h3 id="title-doc"> Modificacion LA </h3>
                                                <h5 id="estado-doc">Estado : {this.state.alumno[0].documentos[3].estado} </h5>
                                                {this.state.alumno[0].documentos[3].estado != 'No Presentado' &&
                                                    <a id="link-doc" target="_blank" href={this.url + '/get-image/' + this.state.alumno[0].documentos[3].url}>ver documento</a>
                                                }

                                            </div>
                                        </div>
                                        

                                    </div>
                                </div>


                            </div>
                        </div>
                        {/* COLUMA 3 */}
                        <div>
                            <NuevoDocumento type="nuevo" />
                        </div>
                    </div>
                </div>


            );
        }
        else {
            return (
                <div>

                    <div id="articles">

                        <h2 className="subheader">No hay articulos para mostrar</h2>
                        <p>Todavia no hay contenido en esta sección</p>
                    </div>
                </div>
            );
        }


    }

}

export default DocumentoOficial;