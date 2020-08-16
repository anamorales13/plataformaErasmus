import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


class Alumnos extends Component {



    state = {
        identity: JSON.parse(localStorage.getItem('user')),
        status: '',
        alumnos: []
    }

    url = Global.urlprofesor;
    urlalumnos = Global.url;

    componentWillMount() {
        this.getalumno();
    }

    getalumno = () => {

        axios.get(this.urlalumnos + 'alumnos/' + this.state.identity._id)
            .then(res => {
                this.setState({
                    alumnos: res.data.users,
                    status: 'sucess',

                });

            })
            .catch(err => {
                this.setState({
                    alumnos: {},
                    status: 'failed'
                });
            });
    }

    render() {

        var listaralumnos = this.state.alumnos.map((alumno) => {
            return (


                <Card className="card-root">
                    <CardActionArea>
                        <CardMedia
                            className="card-media"
                            image={this.urlalumnos + '/get-image-user/' + alumno.image}
                            title="Contemplative Reptile"
                        />
                        <hr/>
                        <CardContent>
                            <div    className="group-nombre">
                                <h3 className="card-nombre">{alumno.nombre + " " + alumno.apellido1 + " " + alumno.apellido2}</h3>
                                
                                <Link size="small" color="primary" style={{color: 'grey'}} className="card-link-perfil" to={"/user/profile/" + alumno._id}>ver perfil</Link>
                            </div>
                            <div  className="card-nombre-uni" >
                                <h4 className="card-nombre-uni">{alumno.destino.ciudad + " ("+ alumno.destino.pais + ")  -" + alumno.destino.carrera }</h4>
                                
                            </div>
                            
                        </CardContent>
                        <hr></hr>
                    </CardActionArea>
                    <CardActions>
                        <Link size="small" color="secondary" style={{color: 'rgb(16,8,168)'}} >
                            Documentos
                         </Link>
                        <Link size="small" color="primary" style={{color: 'rgb(39,149,192)'}} to={"/dropbox/" + alumno.usuario}>
                            Dropbox
                         </Link>
                        
                    </CardActions>
                </Card>

            )

        })
        return (
            <div>
                <h1 className="titulo-doc" > ALUMNOS</h1>
                {listaralumnos}
            </div>
        );

    }

}

export default Alumnos