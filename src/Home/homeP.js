import React from "react";
import "./homeP.css";
import Logo2 from "../assets/border.png";
import Clases from "../assets/clases.jpg"
import Transporte from "../assets/transporte.png"
import Grupo from "../assets/perros1.jpeg";
import Propietario from "../view/vistaPropietario";


export default function homeP() {
  const redirigir = async () =>{
    window.location.replace('/propietario');
  }
  return (
    <div>
      <section class="hero is-medium">
        <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
          <div class="navbar-brand is-transparent">
            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item"></a>

              <a class="navbar-item">Inicio</a>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Servicios</a>

                <div class="navbar-dropdown">
                  <a class="navbar-item" href="#Sobre">Sobre nosotros</a>
                  <a class="navbar-item" href="#Clases">Clases</a>
                  <a class="navbar-item" href="#Transporte">Transporte</a>
                </div>
              </div>
            </div>

            


            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary" href="LoginE">
                    <strong>Empleados</strong>
                  </a>
                  <a class="button is-primary" href="propietario">
                    <strong>Propietarios</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <h1>Mascotas</h1>
        <br></br>
        <div class="hero">
          <div class="has-text-centered">
            <img src={Logo2} width="250" height="80"></img>
          </div>
        </div>
      </section>
      <section class="blog-posts">
        <div class="">
          <div class="columns">
            <div class="">
              <div class="columns featured-post is-multiline">
                <div class="column is-12 post">
                  <article class="columns featured">
                    <div class="column is-7 post-img ">
                      <br></br>
                      <img
                        src={Grupo}
                        width="700"
                        height="80"
                        alt="Sobre nosotros"
                      ></img>
                    </div>
                    <div class="column is-5 featured-content va">
                      <div>
                        <a name="Sobre" />
                        <h1 class="titulo1">Sobre nosotros</h1>
                        <p class="post-excerpt">
                          Guarder??a Mascotas, ofrece nuevas experiencias para
                          todo tipo de mascotas, con m??ltiples servicios para
                          consentir a tu mejor amigo peludo, ofreciendo lugares
                          para que pueda socializar anteponiendo su seguridad,
                          bienestar y tranquilidad.
                        </p>
                        <br></br>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
             

              
              <br></br>
              <div class="columns is-multiline">
                <div class="column post is-6">
                  <article class="columns is-multiline">
                    <div class="column is-12 featured-content ">
                    <a name="Clases" />
                      <h1 class="titulo1">
                        Clases
                      </h1>
                      <p class="post-excerpt">
                      Si quieres cambiar alg??n comportamiento de tu perro o si quieres resaltar 
                      su potencial, nosotros te podemos ayudar. Contamos con expertos en comportamiento 
                      y etolog??a canina del Club Del Canino.
                      </p>
                      <br></br>
                    </div>
                  </article>
                </div>

                <div class="column post is-6">
                  <article class="columns is-multiline">
                    <div class="column is-12 post-img">
                    <img
                        src={Clases}
                        width="700"
                        height="80"
                        alt="Clases"
                      ></img>
                    </div>
                    <div class="column is-12 featured-content ">
                    </div>
                  </article>
                </div>
              <hr></hr>

              <div class="columns featured-post is-multiline">
                <div class="column is-12 post">
                  <article class="columns featured">
                    <div class="column is-6 post-img ">
                      <br></br>
                      <img
                        src={Transporte}
                        width="700"
                        height="80"
                        alt="Sobre nosotros"
                      ></img>
                    </div>
                    <div class="column is-5 featured-content va">
                      <div>
                        <a name="Transporte" />
                        <h1 class="titulo1">Transporte</h1>
                        <p class="post-excerpt">
                        Para tu comodidad, contamos con el
                        servicio de transporte, con el cual recogeremos 
                        y llevaremos a tu mascota hasta la seguridad de tu casa.
                        </p>
                        <br></br>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
