import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import React, { useState } from "react";
import "./homeP.css";

function retroceder() {
  window.location.replace("/");
}

const Registrarse = async () => {
  window.location.replace("/registro");
};
const obtenerDoc = async (id) => {
  const docRef = doc(db, "Empleados", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.data() == null) {
    return null;
  } else {
    return docSnap.data().rol;
  }
};
async function obtenerValor(id) {
  let data = await obtenerDoc(id);
  if (data === "admin") {
    window.location.replace("/Admin");
  } else if (data != null) {
    window.location.replace("/usuario");
    console.log(data);
  } else {
    window.alert("no tiene rol");
  }
}

export default function Hero() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const auth = getAuth();

  const IniciarSesion = async () => {
    await signInWithEmailAndPassword(auth, correo, contraseña)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        obtenerValor(user.uid);
      })
      .catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      <br></br>
      <div class="container">
        <section class="hero is-link">
          <div class="heroB">
            <p class="title">Iniciar Sesion</p>
          </div>
        </section>
      </div>
      <div class="container is-max-desktop">
        <label class="label">Usuario</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-link"
            type="text"
            id="correo"
            placeholder="Ingrese su usuario"
            onChange={(ev) => setCorreo(ev.target.value)}
          ></input>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <label class="label">Contraseña</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-success"
            type="password"
            id="contraseña"
            placeholder="Ingrese su contraseña"
            onChange={(ev) => setContraseña(ev.target.value)}
          ></input>
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <br></br>
        <div class="container is-max-desktop ">
          <div class="field">
            <p class="control">
              <div class="buttons is-centered">
                <button class="button is-primary" onClick={IniciarSesion}>
                  Iniciar Sesion
                </button>
              </div>
            </p>
          </div>
          <div class="container is-max-desktop ">
            <div class="field">
              <p class="control">
                <div class="buttons is-centered">
                  <button class="button is-primary" onClick={Registrarse}>
                    Registrarse
                  </button>
                  <button class="button is-link is-light" onClick={retroceder}>
                    Regresar
                  </button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
