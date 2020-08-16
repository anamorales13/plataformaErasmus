import React, { Component } from 'react';
import FormDatosPersonales from './FormDatosPersonales';
import FormDatosPlataforma from './FormDatosPlataforma';
import FormDatosErasmus from './FormDatosErasmus';
import FormDatosUniversidad from './FormDatosUniversidad.js';
import Sucess from './Success';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Global from '../../Global';
import GlobalProfesor from '../../GlobalProfesor';
import axios from 'axios';

export class Useform extends Component {

    state = {
        step: 1,
        nombre: "",
        apellido1: "",
        apellido2: "",
        usuario: "",
        password: "",
        email: "",
        telefono: "",
        destino: "",
        despacho: "",
        alumno: {},
        profesor: {},

    }

    url = Global.url;
    urlprofesor=GlobalProfesor.url;

    //Proceed to the next step

    nextStep = (tipo) => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });

        console.log(this.state.step);


        if (this.state.step == 2 ) {
            this.guardarAlumno();
        }
       
    }

    // back to the previus step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });

    }


    //Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });

    }

    guardarAlumno() {

        var body = {
            nombre: this.state.nombre,
            apellido1: this.state.apellido1,
            apellido2: this.state.apellido2,
            email: this.state.email,
            telefono: this.state.telefono,
            usuario: this.state.usuario,
            password: this.state.password,

        }

        axios.post(this.url + 'save', body)
            .then(res => {
                this.setState({
                    alumno: res.data.alumno
                })
            })
    }

    guardarProfesor() {
        var body = {
            nombre: this.state.nombre,
            apellido1: this.state.apellido1,
            apellido2: this.state.apellido2,
            email: this.state.email,
            telefono: this.state.telefono,
            usuario: this.state.usuario,
            password: this.state.password,
            despacho: this.state.despacho

        }

        axios.post(this.url+'save', body)
        .then(res =>{
            this.setState({
                profesor:res.data.profesor
            })
        })
    }



    render() {
        const { step } = this.state;


        const { nombre, apellido1, apellido2, usuario, password, email, telefono, destino, alumno, profesor, despacho } = this.state;
        const values = { nombre, apellido1, apellido2, usuario, password, email, telefono, destino, alumno, profesor, despacho }
        const { tipo } = this.props.location.state

        switch (step) {
            case 1:
                return (
                    <FormDatosPersonales
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        tipo={tipo}
                    />
                );
            case 2:
                return (
                    <FormDatosPlataforma
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                        tipo={tipo}
                    />
                )
            case 3:
                return (
                    <div>
                        
                            <FormDatosErasmus
                                nextStep={this.nextStep}
                                prevStep={this.prevStep}
                                handleChange={this.handleChange}
                                values={values}
                                tipo={tipo}

                            />
                        
                    </div>

                );

            case 4:
                return (
                    <div>
                        <Sucess />

                    </div>

                )
        }






    }
}

export default Useform;