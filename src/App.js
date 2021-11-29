import './App.css';
import {BrowserRouter as Router ,Route,Routes,Redirect }from 'react-router-dom'
import Login from './Paginas/Login'
import CrearCuenta from './Paginas/CrearCuenta'
import NotFound from './Paginas/NotFound'
import ListadoUsuarios from './Paginas/ListadoUsuarios'


function App() {
  return (
    <div>
    <Router>
    <Routes>
    <Route  path="/listadousuarios" element={<ListadoUsuarios/>}></Route>
    <Route  path="/crearcuenta" element={<CrearCuenta/>}></Route>
    <Route  path="/" element={<Login/>}></Route>
    <Route  path="*" element={<NotFound/>}></Route>
   
    </Routes>          
    </Router>
    </div>
  );
}

export default App;
