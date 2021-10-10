import React, { useState, useEffect } from "react";
import "../Home/homeP.css";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

function retrocederAdmin() {
  window.location.replace("/admin");
}

const url = "https://mascotas-empleados.herokuapp.com/";

export default function Empleado() {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estado, setEstado] = useState("");
  const [docId, setDocId] = useState("");
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const buscarEmpleado = (id, e) => {
    e.preventDefault();
    axios
      .get("https://api-empleados.herokuapp.com/api/empleado/" + id, {})
      .then(function (response) {
        console.log(response);
        setId(response.data.cc);
        setNombre(response.data.nombre);
        setEmail(response.data.email);
        setDireccion(response.data.direccion);
        setRol(response.data.rol);
        setEstado("editar");
        setDocId(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const eliminarEmpleado = (id, e) => {
    e.preventDefault();
    axios
      .delete("https://api-empleados.herokuapp.com/api/empleado/" + id, {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const guardarEmpleado = (e) => {
    e.preventDefault();
    if (estado != "editar") {
      axios
        .post("https://mascotas-empleados.herokuapp.com/empleado", {
          cc: id,
          creador: "Admin",
          direccion: direccion,
          email: email,
          fechaDeActualizacion: "Hoy",
          fechaDeCreacion: "Ayer",
          nombre: nombre,
          rol: rol,
        })

        .then(function (response) {
          toggleModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .put("https://mascotas-empleados.herokuapp.com/empleado/" + docId, {
          cc: id,
          creador: "Admin",
          direccion: direccion,
          email: email,
          fechaDeActualizacion: Date.now(),
          fechaDeCreacion: "Ayer",
          nombre: nombre,
          rol: rol,
        })
        .then(function (response) {
          toggleModal();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const [posts, setPosts] = useState({ blogs: [] });

  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios(
        "https://mascotas-empleados.herokuapp.com/getEmpleados"
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
        <h1>Registro de Empleados</h1>
        <br></br> <br></br> <br></br> <br></br> <br></br>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Id"
            id="id"
            required="true"
            onChange={(ev) => setId(ev.target.value)}
            value={id}
          ></input>
        </div>
        <br></br>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Nombre"
            id="nombre"
            required="true"
            onChange={(ev) => setNombre(ev.target.value)}
            value={nombre}
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
            onChange={(ev) => setDireccion(ev.target.value)}
            value={direccion}
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
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
          ></input>
        </div>
        <br></br>
        <div
          class="select"
          required="true"
          onChange={(ev) => setRol(ev.target.value)}
        >
          <select value={rol}>
            <option>Seleccionar Rol</option>
            <option>Director</option>
            <option>Profesor</option>
            <option>Conductor</option>
          </select>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="container is-max-desktop">
          <div class="field">
            <p class="control">
              <div class="buttons is-centered">
                <button
                  class="button is-primary"
                  onClick={(e) => {
                    guardarEmpleado(e);
                  }}
                >
                  Guardar empleado
                </button>
                
                <button class="button is-link is-light" onClick={retrocederAdmin}>
                  Regresar
                </button>
              </div>
            </p>
            <hr></hr>
            <h2>Seleccione el empleado que desea modificar</h2>
            <br></br>
            <div class="table_wrapper is-centered">
              <center>
                <table class="table is-bordered">
                  <thead>
                    <tr>
                      <th style={{ color: "white" }}>ID</th>
                      <th style={{ color: "white" }}>Email</th>
                      <th style={{ color: "white" }}>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.blogs &&
                      posts.blogs.map((item) => (
                        <tr key={item.id}>
                          <td>{item.cc}</td>
                          <td>{item.email}</td>
                          <td>{item.rol}</td>
                          <td>
                            <button
                              class="button is-primary"
                              onClick={(e) => {
                                buscarEmpleado(item.id, e);
                              }}
                            >
                              Editar
                            </button>{" "}
                          </td>
                          <td>
                            <button
                              class="button is-primary"
                              onClick={(e) => {
                                eliminarEmpleado(item.id, e);
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
        </div>
      </div>
    </form>
  );
}
