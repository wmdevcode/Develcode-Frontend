import React from 'react';



class MenuDeNavegacao extends React.Component {


  state = {
    abrirMenu: false,

    abrirDropdownSistema: false,
    handleAbrirDropdownMeuPerfil: false,
    abrirDropdownDados: false,
    abrirDropdownPendencias: false,
    abrirDropdownLista: false,
    abrirDropdownAtualizaComite: false,
    abrirDropdownAtualizaDepartamento: false,

    abrirDropdownInde: false
  };


  abrirMenu = () => {

    this.setState(state => {
      return {
        abrirMenu: !state.abrirMenu
      };
    });
  };


  handleClickOutside = event => {

    this.setState({
      abrirMenu: false,
      abrirDropdownMeuPerfil: false,
      abrirDropdownDados: false,
      abrirDropdownPendencias: false,
      abrirDropdownLista: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false,
      abrirDropdownInde: false,
      abrirDropdownDados: false,
      abrirDropdownSistema: false,
      abrirDropdownLista: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false,
      abrirDropdownPendencias: false,

    });

  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return
    }
    this.handleClickOutside()
  }

  handleAbrirDropdownSistema = () => {
    this.setState({
      abrirDropdownSistema: !this.state.abrirDropdownSistema,
      abrirDropdownDados: false,
      abrirDropdownPendencias: false,
      abrirDropdownLista: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false

    })

  }


  handleAbrirDropdownMeuPerfil = () => {
    this.setState({
      abrirDropdownMeuPerfil: !this.state.handleAbrirDropdownMeuPerfil,
      abrirDropdownDados: false,
      abrirDropdownPendencias: false,
      abrirDropdownLista: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false

    })

  }




  handleAbrirDropdownDados = () => {
    this.setState({
      abrirDropdownDados: !this.state.abrirDropdownDados,
      abrirDropdownSistema: false,
      abrirDropdownPendencias: false,
      abrirDropdownLista: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false,

      abrirDropdownInde: false,
    })

  }
  handleAbrirDropdownPendencias = () => {
    this.setState({
      abrirDropdownPendencias: !this.state.abrirDropdownPendencias,
      abrirDropdownDados: false,
      abrirDropdownSistema: false,
      abrirDropdownLista: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false,

      abrirDropdownInde: false,
    })

  }
  handleAbrirDropdownAtualizaComite = () => {
    this.setState({
      abrirDropdownLista: false,
      abrirDropdownDados: false,
      abrirDropdownSistema: false,
      abrirDropdownAtualizaComite: true,

      abrirDropdownInde: false,
      abrirDropdownPendencias: false,
    })

  }

  handleAbrirDropdownAtualizaDepartamento = () => {
    this.setState({
      abrirDropdownLista: false,
      abrirDropdownDados: false,
      abrirDropdownSistema: false,
      abrirDropdownAtualizaDepartamento: true,
      abrirDropdownInde: false,
      abrirDropdownPendencias: false,
    })

  }

  handleAbrirDropdownLista = () => {
    this.setState({
      abrirDropdownLista: !this.state.abrirDropdownLista,
      abrirDropdownDados: false,
      abrirDropdownSistema: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false,
      abrirDropdownInde: false,
      abrirDropdownPendencias: false,
    })

  }
  handleAbrirDropdownInde = () => {
    this.setState({
      abrirDropdownInde: !this.state.abrirDropdownInde,
      abrirDropdownDados: false,
      abrirDropdownSistema: false,
      abrirDropdownLista: false,
      abrirDropdownAtualizaComite: false,
      abrirDropdownAtualizaDepartamento: false,
      abrirDropdownPendencias: false,
    })

  }
  encerrarSessao = () => {

    this.context.encerrarSessao()
  }





  render() {



    return (
      <div ref={node => this.node = node}>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#4200fa' }} >
          {!this.context.isAuthenticated ?
            <a className="navbar-brand" href="#/Cadastro">Develcode</a> :
            <a className="navbar-brand" href="#/bem-vindo">Develcode</a>
          }
          <button onClick={this.abrirMenu} className={this.state.abrirMenu ? "navbar-toggler" : "navbar-toggler collapsed"} type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={this.state.abrirMenu ? "navbar-collapse collapse show" : "navbar-collapse collapse"} id="navbarColor01" >
          </div>
        </nav>
      </div>

    );

  }
}

export default MenuDeNavegacao;