import React, { Component } from 'react';
import GlobalDocumentos from '../GlobalDocumentos';

import axios from 'axios';
import swal from 'sweetalert';

import ButtonIcon from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Modal from 'react-modal'


class NuevoDocumento extends Component {

    titleRef = React.createRef();
    fileRef = React.createRef();
    contentRef = React.createRef();

    url = GlobalDocumentos.url;

    state = {
        documento: {},
        status: null,
        selectedFile: null,
        open: 'false'


    };

    changeState = () => {
        this.setState({
            documento: {
                title: this.titleRef.current.value,
                url: this.fileRef.current.value,
                comentario: this.contentRef.current.value,
                nombre: "maldonado.morales",
                tipoDocumento: null
            }
        });
    }

    openModal=()=>{
        this.setState({open: 'true'});
    }

    onCloseModal =() =>{
        this.setState({open: 'false'})
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
                        status: 'waiting'
                    });
                    swal(
                        'Documento creado con exito',
                        'El documento ha sido creado correctamente',
                        'success'
                    )
                   // console.log("!!!!documento:" + this.state.documento.tipoDocumento);
                    if (this.state.documento.tipoDocumento == "imagen") {
                        var docId = this.state.documento._id;
                        const formData = new FormData();

                        formData.append(
                            'file0',
                            this.state.selectedFile,
                            this.state.selectedFile.name
                        );

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
                    } else {
                        this.setState({
                            status: 'sucess'
                        })
                    }

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
        const {open} =this.state.open;

        return (

            <aside id="nuevoDocumento">
                <div className="nuevoDocumento">
                   {/*  <AddCircleRoundedIcon onClick={this.openModal} style={{ fontSize: 50 }} />

                    <Modal open={this.state.open} onClose={this.onCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>NUEVO DOCUMENTO</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={this.saveDocument}>

                                <div >

                                    <label for="tittle">Titulo:</label>
                                    <input type="text" id="tittle" name="tittle" ref={this.titleRef} />

                                </div>
                                <div>
                                    <label htmlFor="content"> Comentario: </label>
                                    <textarea name="content" ref={this.contentRef}></textarea>
                                </div>
                                <div >
                                    <label htmlFor="file0"> URL: </label>
                                    <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} />

                                </div>

                                <input type="submit" value="SUBIR" className="btn" ></input>

                            </form>
                        </Modal.Body>
                    </Modal>
*/}


                    <h2>  ---- NUEVO DOCUMENTO ----</h2>
                    <form onSubmit={this.saveDocument}>

                        <div >

                            <label for="tittle">Titulo:</label>
                            <input type="text" id="tittle" name="tittle" ref={this.titleRef} />

                        </div>
                        <div>
                            <label htmlFor="content"> Comentario: </label>
                            <textarea name="content" ref={this.contentRef}></textarea>
                        </div>
                        <div >
                            <label htmlFor="file0"> URL: </label>
                            <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} />

                        </div>

                        <input type="submit" value="SUBIR" className="btn" ></input>
                        
                    </form>
                </div>
            </aside>
        );
    }
}

export default NuevoDocumento;