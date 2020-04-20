import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/css/MiPerfil.css";

import Global from '../../Global';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';
import MenuPerfil from './MenuPerfil';

import SimpleReactValidator from 'simple-react-validator';

class EditPerfil extends Component {

    state = {
        identity: null,
        alumno: {},
        alumnoNuevo: {},
        selectedFile: null,
        token: "",
        navigate: false,
    }



    nombreRef = React.createRef();
    usuarioRef = React.createRef();
    emailRef = React.createRef();
    telefonoRef = React.createRef();
    apellidosRef = React.createRef();
    imageRef = React.createRef();

    url = Global.url;

    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
                alpha_space: 'No puede contener carácteres numéricos',
                phone: 'Debe de ser un número de teléfono válido'
            },
            email: {
                messages: 'Correo invalido. Ej: usuario.usuario@alu.uhu.es',
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /([a-zA-Z]+.[a-zA-Z]+(@alu.uhu.es)$)/i) && params.indexOf(val) === -1
                }
            }
        });
    }

   componentDidMount() {
        this.setState({
            identity: JSON.parse(localStorage.getItem('user'))
        })
    }


    changeState = () => {
        this.setState({
            alumno: {
                nombre: this.nombreRef.current.value,
                usuario: this.usuarioRef.current.value,
                apellidos: this.apellidosRef.current.value,
                email: this.emailRef.current.value,
                telefono: this.telefonoRef.current.value,


            }
        });
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0] //aqui tengo el fichero que quiero subir.

        });

    }

    updateUser = (e) => {
        e.preventDefault();

        this.changeState();
        console.log("HOLA");
        axios.put(this.url + 'update-user/' + this.state.identity._id, this.state.alumno)
            .then(res => {
                console.log("HOLA2");
                this.setState({
                    alumno: res.data.user,
                    status: 'sucess',

                });
                console.log("prueba alumno:" + this.state.alumno.telefono);
                localStorage.setItem('user', JSON.stringify(this.state.alumno));

                swal(
                    '¡Perfil Actualizado!',
                    'Su perfil ha sido actualizado correctamente',
                    'sucess'
                )
            })
            .catch(err => {
                this.setState({
                    alumno: {},
                    status: 'failed'
                });
            });


        this.forceUpdate();

    }

    updateImage = (e) => {
        e.preventDefault();

       
        console.log(this.state.selectedFile.name);
        const formData = new FormData();
        formData.append(  //le vamos a vincular un fichero
            'file0',
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        //1º eliminamos la imagen anterior
        console.log("eliminar");
        axios.delete(this.url + '/delete-image/' + this.state.identity._id)
            .then(res => {
                console.log("sucess");

            });

        axios.post(this.url + '/upload-image-user/' + this.state.identity._id, formData)
            .then(res => {
                console.log("actualizacion realizada")
                this.setState({
                    alumnoNuevo: res.data.alumno,
                    status: 'sucess',
                    navigate: true
                })
                localStorage.setItem('user', JSON.stringify(this.state.alumnoNuevo));
            })

      


    }


    render() {
        const { navigate } = this.state
        if (navigate) {
          window.location.reload(true);
        }

        return (

            <div id="content" className="grid">
                <MenuPerfil />
                <div className="avatar-edit">
                    <img src={this.url + '/get-image-user/' + this.state.identity.image} classname=" avatar-edit"></img>

                </div>
                <div>
                    <h1 className="titulo"> Editar Perfil </h1>

                    <article className="elemt-one">

                        <form className="elemt-form" onSubmit={this.updateUser}>
                            <div className="form-edit">
                                <label className="form-edit-value-title">Nombre </label>
                                <input className="form-edit-value" onChange={this.changeState} type="text" defaultValue={this.state.identity.nombre} ref={this.nombreRef}></input>
                                {this.validator.message('nombre', this.state.alumno.nombre, 'required|alpha_space')}
                            </div>
                            <div className="form-edit">
                                <label className="form-edit-value-title">Apellidos</label>
                                <input className="form-edit-value" onChange={this.changeState} type="text" defaultValue={this.state.identity.apellidos} ref={this.apellidosRef}></input>
                                {this.validator.message('apellidos', this.state.alumno.nombre, 'required|alpha_space')}
                            </div>
                            <div className="form-edit">
                                <label className="form-edit-value-title">Usuario</label>
                                <input className="form-edit-value" onChange={this.changeState} type="text" defaultValue={this.state.identity.usuario} ref={this.usuarioRef}></input>
                                {this.validator.message('usuario', this.state.alumno.usuario, 'required')}
                            </div>
                            <div className="form-edit">
                                <label className="form-edit-value-title">email</label>
                                <input className="form-edit-value" onChange={this.changeState} type="text" defaultValue={this.state.identity.email} ref={this.emailRef}></input>
                                {this.validator.message('email', this.state.alumno.email, 'required')}
                            </div>
                            <div className="form-edit">
                                <label className="form-edit-value-title">telefono</label>
                                <input className="form-edit-value" onChange={this.changeState} type="text" defaultValue={this.state.identity.telefono} ref={this.telefonoRef}></input>
                                {this.validator.message('telefono', this.state.alumno.telefono, 'phone')}
                            </div>

                            <input type="submit" value="Actualizar" className="btn-update" ></input>
                        </form>


                    </article>

                    <article className="elemt-one">
                        <form className="elemt-formImage" onSubmit={this.updateImage}>
                            <div className="form-editImage">
                                <label className="form-editImage-value-title">Imagen de perfil</label>
                                <input className="form-editImage-value" type="file" name="file0" onChange={this.fileChange} required  />
                                
                            </div>
                            <input type="submit" value="Actualizar" className="btn-update" ></input>
                        </form>
                    </article>
                </div>
            </div>
        );
    }




}

export default EditPerfil;