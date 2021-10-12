import { confirmPasswordReset } from "@firebase/auth";
import React,{useState,useEffect} from 'react';
import axios from 'axios';


function retroceder() {
  window.location.replace("/propietario");
}


export default function PropietarioHome() {
  const [posts, setPosts] = useState({ blogs: [] });
  
  useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios(
        "https://mascotas-empleados.herokuapp.com/propietario/ByOwner/"+window.localStorage.getItem('emailForSignIn')
      );
      setPosts({ blogs: data });
    };
    fetchPostList();
  }, [setPosts]);

  
  
  
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
                      <td>
                       {console.log(item)} 
                      </td>
                      
                    </tr>
                  ))}
              </tbody>
              </table>
            </center>
          </div>
          <br></br>
          <button class="button is-link is-light" onClick={retroceder}>
            Regresar
          </button>
        </center>
      </div>
    );

}