import React, { Component } from 'react';
import GlobalDocumentos from '../GlobalDocumentos';
import axios from 'axios';
import Moment from 'react-moment';



/*IMAGENES - BOTONES */
import btn1 from '../assets/images/word.png';
import btn2 from '../assets/images/pdf.png';
import btn3 from '../assets/images/powerpoint.jpg';
import btn4 from '../assets/images/default.png';


class Documentos extends Component {

    url = GlobalDocumentos.url;

    state = {
        documentos: [],
        status: null
    };

    componentWillMount(){
       
         this.getDocumentos();
     }
    

    getDocumentos = () => {
       
        axios.get(this.url + "documentos" + "/" + this.usuario)
            .then(res => {
                this.setState({
                    documentos: res.data.documento,
                    status: 'sucess'
                });
            });
    }

    render() {
        

        if (this.state.documentos.length >= 1) {
            var listdocumentos = this.state.documentos.map((documentos) => {
                return (

                    <div className="documento-item">
                        
                        <table aria-rowcount={this.state.documentos.length} className="documento-table">
                            <tr>
                                <td>
                                    <div>
                                        
                                        {
                                            documentos.tipoDocumento == "word.png" ?(
                                              <img src={btn1} alt="prueba" className="image-wrap" />
                                            ) : documentos.tipoDocumento=="pdf.png" ?(
                                                <img src={btn2} alt="prueba" className="image-wrap" />
                                            ) : documentos.tipoDocumento == "powerpoint.jpg" ?(
                                                <img src={btn3} alt="prueba" className="image-wrap" />
                                              ) :documentos.tipoDocumento=="imagen" ?(
                                                <img src={this.url + 'get-image/' + documentos.url} alt={documentos.title}  className="image-wrap" />
                                              ):                                             
                                              (
                                                <img src={btn4} alt="prueba" className="image-wrap" />
                                              )
                                        }
                                         
                                    </div>
                                    <div>
                                       {documentos.title}
                                    </div>
                                </td>
                              
                                <td>
                                    <spain>
                                        <Moment format="DD-MM-YYYY">{documentos.date}</Moment>
                                    </spain>


                                </td>
                            </tr>
                        </table>

                        <div className="clearfix"></div>
                    </div>

                );

            })
            return (
                <div>
                    {listdocumentos}
                </div>
            )

        } else if (this.state.documentos.length === 0 && this.state.status === 'sucess') {
            return (
                <div>
                  
                <div id="articles">
                
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavia no hay contenido en esta sección</p>
                </div>
                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>
            );
        }


    }
}

export default Documentos;