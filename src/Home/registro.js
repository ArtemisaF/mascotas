import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, {useState} from 'react';

function retroceder(){
    window.location.replace('/')
}



export default (props)=> {
  const [correo,setCorreo] =useState('');
  const [contraseña,setContraseña] = useState('');
  const auth = getAuth();
  const newUser= async()=> {
    await createUserWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
            // Signed in
             //const user = userCredential.user;
             window.location.replace('/usuario')
            })
            .catch((error) => {
                //const errorCode = error.code;
                //const errorMessage = error.message;
                window.alert("Error en los datos");
            // ..
            });
  }
  return (
    <div class="container">
            <section class="hero is-link">
            <div class="hero-body">
                <p class="title">
                Registro
                </p>
                <p class="subtitle">Termine de ingresar los datos para completar el registro</p>                
            </div>
            </section>
            <br></br>
            <div class="container is-full">
                <div class="field">
                    <label class="label">Nombre</label>
                    <div class="control">
                        <input class="input" type="text" id="nombre" placeholder="Ingrese su nombre completo" ></input>
                    </div>
                </div> 
                <div class="field">
                    <label class="label">Correo</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-danger" type="email" id="correo" placeholder="Ingrese su correo" onChange={(ev)=> setCorreo(ev.target.value)}></input>
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Contraseña</label>
                    <div class="control">
                        <input class="input" type="password" id="contraseña" placeholder="Ingresa tu contraseña" onChange={(ev)=> setContraseña(ev.target.value)}></input>
                    </div>
                </div>
                <br></br>
                <div class="buttons is-centered">
                    <button class="button is-primary is-light" onClick={newUser}>Completar registro</button>
                    <button class="button is-link is-light" onClick={retroceder}>Regresar</button>
                </div>
                <footer class="footer">
                    <div class="content has-text-centered">
                        <p>
                          Registro para nuestra pagina <strong>Mascotas</strong>
                        </p>
                    </div>
                </footer>
            </div>
            
        </div>
        
  )
 

}





