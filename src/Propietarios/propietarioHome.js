import React from "react";


function retroceder() {
  window.location.replace("/propietario");
}


export default function PropietarioHome() {

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
                  <tr>
                    <td>Item1</td>
                    <td>item2</td>
                    <td>Item3</td>
                    <td>Item4</td>
                    <td>Item5</td>
                  </tr>
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