import React, { useState,useEffect } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import "../Home/homeP.css";
import axios from 'axios';


function retroceder() {
  window.location.replace("/");
}


//Cambiar funcionalidad del token para que ingrese directo


export default function Propietario() {
  const [correo, setCorreo] = useState("");
  const [correoData, setCorreoData] = useState();

  useEffect(() => {
    const recibirCorreo= async () => {
      const { data } = await axios(
        "https://mascotas-empleados.herokuapp.com/propietario/ByEmail/"+correo
      );
      setCorreoData(data);
    };
    recibirCorreo();
  }, [setCorreoData]);
  


  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://mascotas-3c0f1.web.app/propietarioHome',
    // This must be true.
    handleCodeInApp: true
  };
  //ingreso de los user por link
  function ingresarPropietario() {
        const auth = getAuth();
      
       console.log(correo,"SOy el correo",correoData);
        if (correo===correoData) {
          sendSignInLinkToEmail(auth, correo, actionCodeSettings)
          .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', correo);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });
          alert("Revise su correo");
        }else{
          alert("Tu correo no esta registrado, hable con su nuestros trabajadores");
        }
        

  }

  return (
    <div>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      <br></br>
      <div class="container">
        <section class="hero is-link">
          <div class="heroB">
            <p class="title">Ver estado de la mascota</p>
          </div>
        </section>
      </div>
      <div class="container is-max-desktop">
        <label class="label">Correo</label>
        <div class="control">
          <input
            class="input is-link"
            type="text"
            id="token"
            placeholder="Ingrese su token"
            onChange={(ev) => setCorreo(ev.target.value)}
          ></input>
        </div>
        <br></br>
        <div class="container is-max-desktop ">
          <div class="field">
            <p class="control">
              <div class="buttons is-centered">
                <button class="button is-primary" onClick={ingresarPropietario}>
                  Enviar
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
  );
}
