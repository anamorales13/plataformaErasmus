import React, { Component } from 'react';
import GlobalDocumentos from '../GlobalDocumentos';

import axios from 'axios';
import swal from 'sweetalert';

import ButtonIcon from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Modal from 'react-modal'
import "../assets/css/dropbox.css";


class NuevoDocumento extends Component {

    titleRef = React.createRef();
    fileRef = React.createRef();
    contentRef = React.createRef();

    url = GlobalDocumentos.url;

    constructor(props) {
        super(props);
        this.state = {
            documento: {},
            status: null,
            selectedFile: null,
            open: 'false',
            identity: JSON.parse(localStorage.getItem('user')),


        };
    }

    changeState = () => {
        this.setState({
            documento: {
                title: this.titleRef.current.value,
                url: this.fileRef.current.value,
                // comentario: this.contentRef.current.value,
                nombre: this.state.identity.usuario,
                tipoDocumento: null
            }
        });
    }

    openModal = () => {
        this.setState({ open: 'true' });
    }

    onCloseModal = () => {
        this.setState({ open: 'false' })
    }


    saveDocument = (e) => {
        e.preventDefault();

        // 1- Rellenar el state con el formulario
        this.changeState();

        const formData = new FormData();

        formData.append(
            'file0',
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        axios.post(this.url + 'saveDoc', this.state.documento)
            .then(res => {
                if (res.data.documento) {

                    this.setState({
                        documento: res.data.documento,
                        status: 'waiting'
                    });
                    swal(
                        'Documento creado con exito',
                        'El documento ha sido creado correctamente',
                        'success'
                    )
                    // console.log("!!!!documento:" + this.state.documento.tipoDocumento);
                    // if (this.state.documento.tipoDocumento == "imagen") {
                    var docId = this.state.documento._id;
                    // const formData = new FormData();

                    /* formData.append(
                         'file0',
                         this.state.selectedFile,
                         this.state.selectedFile.name
                     );*/

                    console.log("upload")
                    axios.post(this.url + 'upload-image/' + docId, formData)
                        .then(res => {
                            if (res.data.documento) {
                                this.setState({
                                    documento: res.data.documento,
                                    status: 'sucess'
                                });
                            } else {
                                this.setState({
                                    documento: res.data.documento,
                                    status: 'failed'
                                });
                            }
                        });
                    /*  } else {
                          this.setState({
                              status: 'sucess'
                          })
                      }*/

                    //ERROR!
                } else {

                    this.setState({
                        status: 'failed'
                    });
                }


            });

    }

    fileChange = (event) => {
       
        this.setState({

            selectedFile: event.target.files[0] //aqui tengo el fichero que quiero subir.

        });

    }

    render() {

        if (this.state.status === 'sucess') {
            window.location.reload(true);

        }
        const { open } = this.state.open;

        return (
            <aside id="nuevoDocumento">
            <div className="nuevoDocumento">
            <h3>SUBIR ARCHIVO</h3>
             <form onSubmit={this.saveDocument}>
                 <div  className="form-subir">
                     {/*<label for="tittle">Titulo:</label>*/}
                     <input type="text" id="tittle" name="tittle" ref={this.titleRef}  placeholder="Titulo" className="form-input-nuevo"/>
                 </div>
                 <div id="div_file" className="form-subir">
                    {/*} <label htmlFor="file0"> URL: </label>*/}
                     <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} className="form-input-nuevo" />
                 </div>
                 <input type="submit" value="SUBIR" className="btn-submit" ></input>
             </form>
             </div>
            </aside>
           
        );
    }
}

export default NuevoDocumento;