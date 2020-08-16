import React, { Component } from 'react';

import Menu from './menu-mensajes';
import Global from '../../GlobalMensaje';
import axios from 'axios';
import swal from 'sweetalert';
import Alert from 'bootstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class enviar extends Component {

    state = {
        title: 'Enviar mensaje',
        mensaje: {},
        profesores: [],
        identity: JSON.parse(localStorage.getItem('user')),
        status: 'false',
        nuevoMensaje: {}

    }


    paraRef = React.createRef();
    asuntoRef = React.createRef();
    mensajeRef = React.createRef();




    url = Global.url;

    constructor(props) {
        super(props)
        this.listarProfesores();
    }

    componentWillMount() {
        this.listarProfesores();
    }

    listarProfesores() {
        axios.get('http://localhost:3900/apiProfesor/profesores')
            .then(res => {

                this.setState({
                    profesores: res.data.profesor,

                });
            });

        console.log(this.state.profesores.length)

    }


    changeState = () => {
        this.setState({
            mensaje: {
                texto: this.mensajeRef.current.value,
                asunto: this.asuntoRef.current.value,
                receptor: this.paraRef.current.value,
                emisor: this.state.identity._id
            }
        });
    }


    addMessage = (e) => {
        e.preventDefault();

        this.changeState();

        axios.post(this.url + 'mensaje', this.state.mensaje)
            .then(res => {

                this.setState({
                    nuevoMensaje: res.data.mensaje,
                    status: 'sucess',

                });


            })
            .catch(err => {
                this.setState({

                    status: 'failed'
                });
            });
    }


    render() {


        return (


            <div className="grid-mensajeria-col">
                <div>
                    <Menu />

                </div>

                <div>
                    {this.state.status == 'sucess' &&
                        <div className="alert alert-success">

                            <strong>¡Correo enviado correctamente!</strong>
                            <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                        </div>

                    }
                    {this.state.status == 'failed' &&
                        <div className="alert alert-danger">

                            <strong>¡Error!</strong> El correo no se pudo enviar correctamente
                            <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                        </div>
                    }

                    <h3 className="title-pantalla-mensaje">{this.state.title} </h3>

                    <div>
                        <form onSubmit={this.addMessage} className="form-mensajeria">
                            <div className="mensaje-estilo-uno">
                                  <p>
                                    <label> Para: </label>
                                    <select name="para" ref={this.paraRef} onChange={this.changeState}>
                                        <option>---------</option>
                                        {this.state.profesores.map((e, key) => {
                                            return <option key={key} value={e._id}>{e.nombre + " " + e.apellidos + " " + "| " + e.email + " "}</option>;
                                        })}
                                    </select>

                                </p>
                              {/*   <p>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        value={this.state.profesores._id}
                                        options={this.state.profesores}

                                        getOptionLabel={(option) => option.email}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="correo electrónico" variant="outlined" />}
                                    />
                                </p>*/}

                                <p>
                                    <label>Asunto</label>
                                    <input type="text" onChange={this.changeState} ref={this.asuntoRef}></input>
                                </p>
                            </div>
                            <div className="mensaje-estilo-dos">

                                <textarea type="text" name="text" onChange={this.changeState} ref={this.mensajeRef}></textarea>

                            </div>
                            <input type="submit" value="Enviar" className="btn-update" ></input>
                        </form>
                    </div>

                </div>
            </div>

        );


    }
}


export default enviar;