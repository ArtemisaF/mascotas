import { confirmPasswordReset } from "@firebase/auth";
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Modal from "../Modal";


function retroceder() {
  window.location.replace("/propietario");
}
;

export default function PropietarioHome() {
  const [posts, setPosts] = useState({ blogs: [] });
  const [fechaRecogida,setFechaRecogida]=useState("");
  const [fechaEntrega,setFechaEntrega]=useState("");
  const [active,setActive]= useState(false);
  const [id,setId]=useState("");

  const toggle = (idM,e) => {
    e.preventDefault();
    setActive(!active);
    setId(idM)
  }
  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios(
        "https://mascotas-empleados.herokuapp.com/propietario/ByOwner/"+window.localStorage.getItem('emailForSignIn')
      );
      setPosts({ blogs: data });
      
    };
    fetchPostList();
  }, [setPosts]);

  const newfechaR =(id)=>{
    axios
      .put("https://mascotas-empleados.herokuapp.com/mascota/fechaRecogida/"+id+"/"+fechaRecogida, {

      })
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const newfechaE =(id)=>{
    axios
      .put("https://mascotas-empleados.herokuapp.com/mascota/fechaEntrada/"+id+"/"+fechaEntrega, {

      })
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const newAgenda =(id)=>{
    axios
      .put("https://mascotas-empleados.herokuapp.com/mascota/trasporte/"+id, {

      })
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const angendarMascota = (id,e) => {
    e.preventDefault();
    newAgenda(id);
    newfechaE(id);
    newfechaR(id);
    window.location.reload();
  };
  
  
    return (
      <div>
        <h1>Propietario name</h1>
        <br></br>

        <center>
          <div class="table_wrapper is-centered">
            <center>
              <table class="table is-bordered">
                <thead>
                  <tr>
                    <th style={{ color: "white" }}>Mascota</th>
                    <th style={{ color: "white" }}>Transporte</th>
                    <th style={{ color: "white" }}>Fecha de entrega</th>
                    <th style={{ color: "white" }}>Fecha de salida</th>
                    <th style={{ color: "white" }}>Actividad</th>
                  </tr>
                </thead>
                <tbody>
                {posts.blogs &&
                  posts.blogs.map((item) => (
                    <tr key={item.owner}>
                      <td>{item.name}</td>
                      <td>{item.trasporte}</td>
                      <td>{item.horadeEntrega}</td>
                      <td>{item.horadeRecogida}</td>
                      <td>{item.actividad} </td>
                      <td>  <button class="button is-primary" onClick={(e) => {
                            toggle(item.id, e);
                          }}>Agendar trasporte</button>
                      </td>
                      
                    </tr>
                  ))}
              </tbody>
              </table>
            </center>
          </div>
          <br></br>
          <div class="buttons is-centered">
                
                <button class="button is-link is-light" onClick={retroceder}>
                   Regresar
                 </button>
              </div>
          
        </center>
        <Modal active={active} toggle={(e) => {
                            toggle(id, e);
                          }}>
            <div className="App">
                <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Fecha de recogida"
                  id="Fr"
                  required="true"
                  value={fechaRecogida}
                  onChange={(ev) => setFechaRecogida(ev.target.value)}
                ></input>
              </div>
              <br></br> 
                <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Fecha de entrega"
                id="Fe"
                required="true"
                value={fechaEntrega}
                onChange={(ev) => setFechaEntrega(ev.target.value)}
              ></input>
            </div>  
            <button class="button is-primary" onClick={(e) => {
                            angendarMascota(id, e);
                          }} >
                                Finalizar
                            </button>          
            </div>
        </Modal>
        
      </div>
    );

}