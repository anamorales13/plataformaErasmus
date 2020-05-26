import React, { Component } from 'react';
import GlobalDocumentos from '../GlobalDocumentos';
import Global from '../Global';

import axios from 'axios';
import swal from 'sweetalert';

import ButtonIcon from '@material-ui/core/Button';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Modal from 'react-modal'
import "../assets/css/dropbox.css";

import SimpleReactValidator from 'simple-react-validator';

class NuevoDocumento extends Component {

    titleRef = React.createRef();
    nombreRef=React.createRef();
    fileRef = React.createRef();
    contentRef = React.createRef();

    url = GlobalDocumentos.url;
    urldocoficial = Global.url;

    constructor(props) {
        super(props);
        this.state = {
            documento: {},
            documentoOficial: {},
            status: null,
            statuss:null,
            value:null,
            selectedFile: null,
            open: 'false',
            identity: JSON.parse(localStorage.getItem('user')),


        };
    }

    componentWillMount(){
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
            }
        });
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
    changeStateDocOficial = (e) => {
        this.setState({
           documentoOficial:{
               nombre:this.nombreRef.current.value,
           }
        })
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
                   
                    
                    var docId = this.state.documento._id;
                   

                    console.log("upload")
                    axios.post(this.url + 'upload-image/' + docId, formData)
                        .then(res => {
                            if (res.data.documento) {
                                this.setState({
                                    documento: res.data.documento,
                                    status: 'sucess'
                                });
                                swal({
                                    title: 'Documento creado con exito',
                                    text: "El documento ha sido creado correctamente",
                                    icon: "sucess",
                                    buttons: true,
                                  })
                                  .then((value) => {
                                    if (value) {
                                      window.location.reload(true);
                                    }
                                });
                            } else {
                                this.setState({
                                    documento: res.data.documento,
                                    status: 'failed'
                                });
                            }
                        });
                   
                    //ERROR!
                } else {

                    this.setState({
                        status: 'failed'
                    });
                }


            });

    }


    saveDocOficial = (e) => {

        e.preventDefault();

        // 1- Rellenar el state con el formulario
        this.changeStateDocOficial();

        const formDatadoc = new FormData();

        formDatadoc.append(
            'file0',
            this.state.selectedFile,
            this.state.selectedFile.name
        );



        console.log("upload")
      //  console.log(this.state.documentoOficial.nombre);
        axios.put(this.urldocoficial + 'upload-image/' + this.state.identity._id + '/' + this.state.documentoOficial.nombre, formDatadoc)
            .then(res => {
                if (res.data.userUpdate) {
                    this.setState({
                        documentoOficial: res.data.userUpdate,
                       
                    });
                    console.log("entra");

                    swal({
                        title: 'Documento creado con exito',
                        text: "El documento ha sido creado correctamente",
                        icon: "sucess",
                        buttons: true,
                      })
                      .then((value) => {
                        if (value) {
                          window.location.reload(true);
                        }
                    });
                   

                } else {
                    console.log("mal");
                    this.setState({
                       // documentoOficial: res.data.documento,
                        statuss: 'failed'
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

   /* if (this.state.status === 'sucess' || this.state.statuss=== 'sucess') {
        window.location.reload(true);

    }
    const { open } = this.state.open;*/


    if (this.props.type == 'documento') {
        return (


            <aside id="nuevoDocumento">
                <div className="nuevoDocumento">
                    <h3>SUBIR ARCHIVO</h3>
                    <form onSubmit={this.saveDocument}>
                        <div className="form-subir">
                            {/*<label for="tittle">Titulo:</label>*/}
                            <input type="text" id="tittle" name="tittle" ref={this.titleRef} placeholder="Titulo" className="form-input-nuevo" />
                            {this.validator.message('tittle', this.state.documento.title, 'required')}
                        </div>
                        <div id="div_file" className="form-subir">
                            {/*} <label htmlFor="file0"> URL: </label>*/}
                            <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} className="form-input-nuevo" />
                            {this.validator.message('file0', this.state.selectedFile, 'required')}
                        </div>
                        <input type="submit" value="SUBIR" className="btn-submit" ></input>
                    </form>
                </div>
            </aside>


        );
    } else {

        return (
            <aside id="nuevoDocumento">
                <div className="nuevoDocumento">
                    <h3>SUBIR ARCHIVO</h3>
                    <form onSubmit={this.saveDocOficial}>
                        <div className="form-subir">
                            <label for="tittle">Seleccionar documento:</label>
                            <select className="form-input-nuevo" ref={this.nombreRef} onChange={this.changeStateDocOficial}>
                                <option selected value="CPRA">CPRA</option>
                                <option value="Learning_Agreement">Learning Agreement</option>
                                <option value="Modificacion_CPRA">Modificacion CPRA</option>
                                <option value="Modificacion_LA">Modificacion LA</option>
                            </select>
                            {this.validator.message('tittle', this.state.documentoOficial.nombre, 'required')}
                        </div>
                        <div id="div_file" className="form-subir">
                            {/*} <label htmlFor="file0"> URL: </label>*/}
                            <input type="file" name="file0" onChange={this.fileChange} ref={this.fileRef} className="form-input-nuevo" />
                            {this.validator.message('file0', this.state.selectedFile, 'required')}
                        </div>
                        <input type="submit" value="SUBIR" className="btn-submit" ></input>
                    </form>
                </div>
            </aside>


        );
    }
}
}

export default NuevoDocumento;