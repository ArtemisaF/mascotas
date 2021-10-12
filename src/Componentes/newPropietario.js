import React, { useState,useEffect } from "react";
import "../Home/homeP.css";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

function retrocederAdmin() {
  window.location.replace("/admin");
}


export default function Propietario() {
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [celular, setCelular] = useState("");
  const [estado, setEstado] = useState("");
  const [docId, setDocId] = useState("");
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const guardarPropietario=(e)=>{
    e.preventDefault();
    if(estado!="editar"){
      axios.post('https://mascotas-empleados.herokuapp.com/propietario', {
        name: nombre,
        cc: cedula,
        email: email,
        direccion: direccion,
        celular: celular,
      })
      
      .then(function (response) {
        toggleModal();
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
        axios.put("https://mascotas-empleados.herokuapp.com/propietario/"+docId, {
          name: nombre,
          cc: cedula,
          email: email,
          direccion: direccion,
          celular: celular
      })
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

const eliminarPropietario = (id,e) => {
  e.preventDefault();
  axios
    .delete("https://mascotas-empleados.herokuapp.com/propietario/"+id, {

    })
    .then(function (response) {
      console.log(response);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
};

const buscarPropietario = (id,e) => {
  e.preventDefault();
  axios
    .get("https://mascotas-empleados.herokuapp.com/propietario/ByidP/"+id, {

    })
    .then(function (response) {
      console.log(response);
      setNombre(response.data.name);
      setCedula(response.data.cc);
      setCelular(response.data.celular);
      setDireccion(response.data.direccion);
      setEmail(response.data.email);
      setEstado("editar");
      setDocId(id);
    })
    //Actualizar
    .catch(function (error) {
      console.log(error);
    });
};

const [posts, setPosts] = useState({ blogs: [] });

  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios(
        "https://mascotas-empleados.herokuapp.com/getPropietarios"
      );
      setPosts({ blogs: data });
    };
    fetchPostList();
  }, [setPosts]);
  

  return (
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
          <button
            class="button is-primary"
            onClick={toggleModal}
            style={{ left: "19%" }}
          >
            Salir
          </button>
        </Modal>
      </div>
      <div class="container">
        <h1>Registro de Propietario</h1>
        <br></br> <br></br> <br></br>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Nombre completo"
            id="nombre"
            required="true"
            value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
          ></input>
        </div>
        <br></br>
        <div class="control">
          <input
            class="input"
            type="number"
            placeholder="Cedula"
            id="cedula"
            required="true"
            value={cedula}
            onChange={(ev) => setCedula(ev.target.value)}
          ></input>
        </div>
        <br></br>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Direccion"
            id="direccion"
            required="true"
            value={direccion}
            onChange={(ev) => setDireccion(ev.target.value)}
          ></input>
        </div>
        <br></br>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Email"
            id="email"
            required="true"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>
        </div>
        <br></br>
        <div class="control">
          <input
            class="input"
            type="number"
            placeholder="Celular"
            id="celular"
            required="true"
            value={celular}
            onChange={(ev) => setCelular(ev.target.value)}
          ></input>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div class="container is-max-desktop" required="true">
          <div class="field">
            <p class="control">
              <div class="buttons is-centered">
                <button
                  class="button is-primary"
                  onClick={(e) => {
                    guardarPropietario(e);
                  }}
                >
                  Guardar Propietario
                </button>
                <button
                  class="button is-link is-light"
                  onClick={retrocederAdmin}
                >
                  Regresar
                </button>
              </div>
            </p>
          </div>
        </div>

        <div class="table_wrapper is-centered">
          <br></br>
          <center>
            <h2>Seleccione la Propietario que desea modificar</h2>
            <br></br>
            <table class="table is-bordered">
              <thead>
                <tr>
                  <th style={{ color: "white" }}>Nombre</th>
                  <th style={{ color: "white" }}>correo</th>
                  <th style={{ color: "white" }}>Cedula</th>
                </tr>
              </thead>
              <tbody>
                {posts.blogs &&
                  posts.blogs.map((item) => (
                    <tr key={item.owner}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.cc}</td>
                      <td>
                        <button
                          class="button is-primary"
                          onClick={(e) => {
                            buscarPropietario(item.id, e);
                          }}
                        >
                          Editar
                        </button>{" "}
                      </td>
                      <td>
                        <button
                          class="button is-primary"
                          onClick={(e) => {
                            eliminarPropietario(item.id, e);
                          }}
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </center>
        </div>
      </div>
    </form>
  );
}
