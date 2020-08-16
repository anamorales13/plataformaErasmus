import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import Global from '../../GlobalMensaje';
import GlobalPerfil from '../../Global';

import Menu from './menu-mensajes';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

class mensaje extends Component {

    state = {
        identity: JSON.parse(localStorage.getItem('user')),
        mensaje: [],
        mensajeguardar: {},

    }

    componentWillMount() {
        this.getMessage();

    }

    url = Global.url;
    urlperfil = GlobalPerfil.url;


    getMessage = (e) => {

        var id = this.props.match.params.id;
        console.log("id " + id);

        axios.put(this.url + 'marcar-leido/' + id)
            .then(res => {
                if (res.data.mensajes) {
                    this.setState({
                        // mensaje: res.data.mensajes,
                        status: 'sucess'
                    })
                }
            });

        axios.get(this.url + 'mensaje/' + id)
            .then(res => {
                if (res.data.mensajes) {
                    this.setState({
                        mensaje: res.data.mensajes,
                        status: 'sucess'
                    });
                }
            });
    }

    back() {
        window.history.back();
    }


    render() {
        var listarmensajes = this.state.mensaje.map((mensajes) => {
                  
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/inicio">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/mensajes">
                            Bandeja de entrada
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>ver mensaje</Breadcrumb.Item>
                    </Breadcrumb>


                    <button type="button" href={'/enviar/' + mensajes._id} className="btn-default btn-lg btn-left" aria-label="Left Align" name="volver atrás" placeholder="volver">
                           responder
                    </button>
                    <Link to={'/mensajes/enviar'} params={{ mensajeId: mensajes._id}} className="btn btn-warning ">RESPONDER</Link>
                    <hr className="linea-bajo"></hr>
                    <Card style={{ width: '70em' }} className="card-mensajes-individual row no-gutters ">

                        <Card.Img variant="left" src={this.urlperfil + '/get-image-user/' + mensajes.emisor.image} className="image-user" />
                        
                        <Card.Body id="cardbody">
                            <div className="mensaje-header">
                                <h4 id="mensaje-nombre-novisto">{mensajes.emisor.nombre + " " + mensajes.emisor.apellido1 + "    " + mensajes.emisor.apellido2} </h4>

                                <h6 className="fecha"> <Moment format="DD-MM-YYYY">{mensajes.fecha}</Moment></h6>
                            </div>
                            <h5> {"    <" + mensajes.emisor.email + ">"} </h5>
                            <br></br>
                            <Card.Text >
                                {mensajes.texto}
                            </Card.Text>

                        </Card.Body>
                    </Card>


                </div>
            );
        });
        return (
            <div className="grid-mensajeria-col">
                <div>
                    <Menu />

                </div>
                <div>
                    {listarmensajes}
                </div>
            </div>
        );
    }
}


export default mensaje;