import React from 'react';
import Registrar from '../Home/registro.js';
import Home from '../Home/home.js';
import homeP from '../Home/homeP.js';
import User  from '../User/usuario.js';
import {BrowserRouter,Route} from 'react-router-dom';
import Empleados from '../view/vistaEmpleado.js';
import newEmpleados from '../Componentes/newEmpleados.js';
import administrador from '../User/administrador.js';
import Propietario from '../view/vistaPropietario.js'; 
import newPropietario from '../Componentes/newPropietario.js'
import prueba from '../Componentes/prueba.js'
import modificarEmpleado from "../Componentes/modificarEmpleados.js"
import PropietarioHome from '../Propietarios/propietarioHome.js';

function ruta(){
    return (
      <BrowserRouter>
        <Route exact path="/loginE" component={Home}></Route>
        <Route exact path="/" component={homeP}></Route>
        <Route exact path="/registro" component={Registrar}></Route>
        <Route exact path="/usuario" component={User}></Route>
        <Route exact path="/empleado" component={Empleados}></Route>
        <Route exact path="/admin" component={administrador}></Route>
        <Route exact path="/newE" component={newEmpleados}></Route>
        <Route exact path="/propietario" component={Propietario}></Route>
        <Route exact path="/newP" component={newPropietario}></Route>
        <Route exact path="/prueba" component={prueba}></Route>
        <Route exact path="/modE" component={modificarEmpleado}></Route>
        <Route exact path="/propietarioHome" component={PropietarioHome}></Route>
      </BrowserRouter>
    );
}
export default ruta;