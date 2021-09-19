import React,{useState} from 'react';
import "../Home/homeP.css";
import axios from 'axios';
import Modal from "react-modal";

Modal.setAppElement("#root");

  
const url="https://api-propietarios.herokuapp.com/api/student"


export default function Propietario(){
    const [isOpen, setIsOpen] = useState(false);
    const [nombre,setNombre] =useState('');
    const [cedula,setCedula] =useState('');
    const [email,setEmail] =useState('');
    const [direccion,setDireccion] = useState('');
    const [celular,setCelular] =useState('');
    function toggleModal() {
      setIsOpen(!isOpen);
    }
    
       const guardarPropietario=async()=>{
        axios.post('https://api-propietarios.herokuapp.com/api/student', {
          name: nombre,
          cc:cedula,
          email:email,
          direccion:direccion,
          celular:celular
        })
        
        .then(function (response) {
          toggleModal()
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
    return(
      
      
      <form>
         <div className="App">
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div>Registro Exitoso</div>
        <br></br>
        <button class="button is-primary" onClick={toggleModal} style= {{left:"19%"}}>Salir</button>
      </Modal>
    </div>
        <div class="container">
          <h1>Registro de Propietario</h1>
            <br></br> <br></br> <br></br>  
            <div class="control">
            <input class="input" type="text" placeholder="Nombre completo" id="nombre" required="true" onChange={(ev)=> setNombre(ev.target.value)}></input>
            </div>
            <br></br>
            <div class="control">
                <input class="input" type="number" placeholder="Cedula" id="cedula" required="true" onChange={(ev)=> setCedula(ev.target.value)}></input>
            </div>
            <br></br>
            <div class="control">
            <input class="input" type="text" placeholder="Direccion" id="direccion" required="true" onChange={(ev)=> setDireccion(ev.target.value)}></input>
            </div>
            <br></br>
            <div class="control">
            <input class="input" type="text" placeholder="Email" id="email" required="true" onChange={(ev)=> setEmail(ev.target.value)}></input>
            </div>
            <br></br>
            <div class="control">
                <input class="input" type="number" placeholder="Celular" id="celular" required="true" onChange={(ev)=> setCelular(ev.target.value)}></input>
            </div>
            <br></br>
     
            <br></br><br></br><br></br>
            <div class="container is-max-desktop" required="true">
            <div class="field">
              <p class="control">
              <div class="buttons is-centered">
                <button class="button is-primary" onClick={guardarPropietario}>Guardar Propietario</button> 
                </div>
                
              </p>
            </div>
          </div>
            </div>
        </form>            
    )
}
