import React, { Component } from 'react';

import imagenlogo from '../../assets/images/logo-erasmus.png';
import  {Link } from 'react-router-dom';
import axios from 'axios';



export class FormDatosErasmus extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }

    state = {
        destinos: [],
        alumno: {},
        status: ""
    }

    constructor(props) {
        super(props);
        this.listarDestinos();
    }

    listarDestinos() {
        axios.get('http://localhost:3900/apiDestino/destinos')
            .then(res => {
                this.setState({
                    destinos: res.data.destino,

                });
            });
    }


    guardarDestino(alumno, update, profesor, coordinador) {

        var body = {
            destino: update
        }
        var body2 = {
            profesor: profesor,
            coordinador: coordinador
        }
        var body3={
            alumno: alumno
        }

        axios.put('http://localhost:3900/apiErasmus/savedestino/' + alumno, body)
            .then(res => {
                this.setState({
                    alumno: res.data.alumno
                })
                axios.put('http://localhost:3900/apiErasmus/saveprofesor/' + alumno, body2)
                    .then(res => {
                        this.setState({
                            alumno: res.data.alumno,
                            status: 'sucess'
                        })
                        console.log("Done")

                    })
                axios.put('http://localhost:3900/apiProfesor/saveAlumnos/'+profesor, body3)
                    .then(res=>{
                        this.setState({
                            status:'sucess'
                        });
                    });
                console.log("Done")

            })


    }





    render() {

        const { values, handleChange ,tipo} = this.props;


        const listarDestinos = this.state.destinos.map((destino) => {
            return (

                <div>
                {tipo =='alumno' &&
                <table>
                    <tbody>
                        <tr>
                            <td className="th-pequeño">
                                {destino.pais}
                            </td>
                            <td className="th-pequeño">
                                {destino.ciudad}
                            </td>
                            <td>
                                {destino.carrera}
                            </td>
                            <td>
                                {destino.profesor.nombre}
                            </td>
                            <td className="th-pequeño">
                                <button
                                    className="btn-continue btn-seleccionar"
                                    onClick={() => this.guardarDestino(values.alumno._id, destino._id, destino.profesor._id, destino.coordinador._id)}
                                >seleccionar</button>
                            </td>
                        </tr>

                    </tbody>
                </table>

            }
            </div>
            )
        })
        return (
            <div className="grid-inicio">
                <div className="logo-titulo">
                    <img src={imagenlogo} width="100px" height="80px"></img>
                    <div className="titulo-completo">
                        <h3>Universidad de Huelva</h3>
                        <h1> ERASMUS+ </h1>
                    </div>
                </div>
                <hr className="linea"></hr>

                <div className="registro-nuevoUsuario">
                    <h1 className="titulo titulo-registro "> ALTA DE ALUMNO/A</h1>
                    <h1 className="titulo titulo-registro titulo-registro-secundario"> DATOS  </h1>
                    <div className="subtitulo">Es posible que otros usuarios puedan ver parte de la infomación al usar la plataforma. </div>
                    <Link to='/' className="link-cancelar">Cancelar registro de usuario</Link><br/>
                    <div>
                        {this.state.status == 'sucess' &&
                            <div className="alert alert-success alert-sucess-middle">

                                <strong>¡Destino guardado correctamente!</strong>
                                <h5>Pulse <strong>CONFIMAR</strong> para completar el alta de usuario</h5>
                                <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                            </div>

                        }
                        {this.state.status == 'failed' &&
                            <div className="alert alert-danger">

                                <strong>¡Error!</strong> El correo no se pudo enviar correctamente
                            <button classsName="close" data-dismiss="alert"> <span>&times;</span></button>
                            </div>
                        }
                    </div>
                    {/* NUEVOOOOO TABLAS */}
                    <table >
                        <thead className="cabecera">
                            <tr>
                                <th className="th-pequeño">Pais</th>
                                <th className="th-pequeño">Ciudad</th>
                                <th>Especialidad</th>
                                <th>Coordinador</th>
                            </tr>
                        </thead>
                    </table>
                    {listarDestinos}
                  
                        <button
                            label="continue"
                            className="btn-continue form-login"
                            style={styles.button}
                            onClick={this.continue}
                        > CONFIMAR </button>
                        <button
                            label="volver"
                            className="btn-back form-login"
                            style={styles.button}
                            onClick={this.back}
                        > VOLVER </button>
                    
                </div>

            </div>
        );

    }
}

const styles = {
    button: { margin: 15 }
}

export default FormDatosErasmus;