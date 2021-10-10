import React,{useState,useEffect} from 'react';
import "../Home/homeP.css";
import Modal from "react-modal";
import axios from 'axios';


Modal.setAppElement("#root");

export default function Empleado(){
    const [isOpen, setIsOpen] = useState(false);
    const [idPropietario,setIdPropietario] =useState('');
    const [nombre,setNombre] =useState('');
    const [edad,setEdad] = useState('');
    const [raza,setRaza] =useState('');
    const [tamaño,setTamaño] = useState('');
    const [cuidados,setCuidados] =useState('');
    const [estado, setEstado] = useState("");
    const [docId, setDocId] = useState("");
    function toggleModal() {
      setIsOpen(!isOpen);
    }
    
    const guardarMascotas=(e)=>{
      e.preventDefault();
      if(estado!="editar"){
        axios.post('https://mascotas-empleados.herokuapp.com/mascota', {
          tamaño: tamaño,
          raza: raza,
          owner: idPropietario,
          name: nombre,
          edad: edad,
          cuidados: cuidados 
        })
        
        .then(function (response) {
          toggleModal();
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
          axios.put("https://mascotas-empleados.herokuapp.com/mascota/"+docId, {
            tamaño: tamaño,
            raza: raza,
            owner: idPropietario,
            name: nombre,
            edad: edad,
            cuidados: cuidados 
        })
        .then(function (response) {
          toggleModal();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }

  const eliminarMascota = (id,e) => {
    e.preventDefault();
    axios
      .delete("https://mascotas-empleados.herokuapp.com/mascota/"+id, {

      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const buscarMascotas = (id,e) => {
    e.preventDefault();
    axios
      .get("https://mascotas-empleados.herokuapp.com/mascota/Byid/"+id, {

      })
      .then(function (response) {
        console.log(response);
        setTamaño(response.data.tamaño);
        setRaza(response.data.raza);
        setIdPropietario(response.data.owner);
        setNombre(response.data.name);
        setEdad(response.data.edad);
        setCuidados(response.data.cuidados);
        setEstado("editar");
        setDocId(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [posts, setPosts] = useState({ blogs: [] });

  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios(
        "https://mascotas-empleados.herokuapp.com/getMascotas"
      );
      setPosts({ blogs: data });
    };
    fetchPostList();
  }, [setPosts]);
  
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
          <h1>Registro de Mascotas</h1>
            <br></br> <br></br> <br></br> <br></br> <br></br> 
            <div class="control">
                <input class="input" type="number" placeholder="Id Propietario" id="idPropietario" required="true" value={idPropietario} onChange={(ev)=> setIdPropietario(ev.target.value)}></input>
            </div>
            <br></br>
            <div class="control">
                <input class="input" type="text" placeholder="Nombre" id="nombre" required="true" value={nombre} onChange={(ev)=> setNombre(ev.target.value)}></input>
            </div>
            <br></br>
            <div class="control">
                <input class="input" type="text" placeholder="Edad" id="edad" required="true" value={edad} onChange={(ev)=> setEdad(ev.target.value)}></input>
            </div>
        
            <div class="select" required="true" value={raza} onChange={(ev)=>setRaza(ev.target.value)}>
                <select>
                <option>Seleccionar raza</option>
                <option>opciones</option>
                <option>opciones 2</option>
                </select>
            </div>
            <br></br><br></br>
            <div class="select" required="true" value={tamaño} onChange={(ev)=>setTamaño(ev.target.value)}>

                <select>
                <option>Seleccionar tamaño</option>
                <option>Pequeño</option>
                <option>Mediano</option>
                <option>Grande</option>
                </select>
            </div>
            <br></br><br></br><br></br>

            <div class="control">
                <input class="input" type="text" placeholder="Observaciones o cuidados" required="true" value={cuidados} onChange={(ev)=> setCuidados(ev.target.value)}></input>
            </div>
            <br></br><br></br>
            <div class="container is-max-desktop ">
            <div class="field">
              <p class="control">
              <div class="buttons is-centered">
                <button class="button is-primary" onClick={(e)=>{guardarMascotas(e)}} >Guardar mascota</button>
              
                </div>
                
              </p>
            </div>
          </div>
            </div>
            <hr></hr>
              <h2>Seleccione el empleado que desea modificar</h2>
              <br></br>
            <div class="table_wrapper is-centered">
              <table class="table is-bordered">
                <thead>
                  <tr>
                    <th style= {{color:"white"}}>Nombre</th>
                    <th style= {{color:"white"}}>Raza</th>
                    <th style= {{color:"white"}}>Tamaño</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.blogs &&
                    posts.blogs.map((item) => (
                      <tr key={item.owner}>
                        <td>{item.name}</td>
                        <td>{item.raza}</td>                    
                        <td>{item.tamaño}</td>              
                        <td><button
                          class="button is-primary"
                          onClick={(e) => {
                            buscarMascotas(item.id,e);
                          }}
                        >
                          Editar
                        </button> </td> 
                        <td><button
                          class="button is-primary"
                          onClick={(e) => {
                            eliminarMascota(item.id,e);
                          }}
                        >
                          Borrar
                        </button></td>         
                      </tr>
                      
                    ))}
                </tbody>
              </table>
            </div>
        </form>
    )
}
