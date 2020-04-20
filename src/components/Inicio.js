import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import Header from './Header';

/*IMAGENES - BOTONES */
import btn1 from '../assets/images/bot-documentos1.png';
import btn2 from '../assets/images/bot-informacion1.png';
import btn3 from '../assets/images/bot-dropbox1.png';
import InicioSesion from './InicioSesion';

class Inicio extends Component {

   state={
       user: {}
   }

   

    render() {
        return (
            <div>             
                <Slider />
                <div id="content"  >
                  <h1>{this.state.user._id}</h1>
                        <h2 id="h2-servicios"> SERVICIOS </h2>
                        <div className="servicios">
                        <ul>
                            <li>
                                <div id="btn-inf">
                                    <Link href="/informacion">
                                        <img src={btn2} alt="Informacion" />
                                    </Link>
                                    <Link href="/informacion" >INFORMACION</Link>
                                </div>

                            </li>
                            <li>
                                <div id="btn-doc">
                                    <Link href="/documentos" >
                                        <img src={btn1} alt="documentos" />
                                    </Link>
                                    <Link href="/documentos" >DOCUMENTOS </Link>
                                </div>

                            </li>
                            <li>
                                <div id="btn-dropbox">
                                    <Link href="/dropbox">
                                        <img src={btn3} alt="dropbox" />
                                    </Link>
                                    <Link href="/dropbox">DROPBOX</Link>
                                </div>

                            </li>
                        </ul>
                        </div>

                    </div>
                    <Sidebar />
                </div>

                );
            }
        }
        
export default Inicio;