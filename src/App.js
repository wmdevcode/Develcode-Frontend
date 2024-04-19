import React from 'react';
import MenuDeNavegacao from './Components/MenuDeNavegacao'
import 'bootswatch/dist/minty/bootstrap.css'
import CadastrarUsuario  from './Views/CadastrarUsuario'
import './App.css';
function App() {
  return (
    <div>

      <div>
        <MenuDeNavegacao />
      </div>
      <CadastrarUsuario></CadastrarUsuario>

    </div>
  );
}

export default App;
