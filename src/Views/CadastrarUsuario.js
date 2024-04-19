import React from 'react';
import axios from 'axios';
import EditarFoto from './EditarFoto';

class CadastrarUsuario extends React.Component {
// VARIAVEIS QUE REGEM O SISTEMA
// VARIAS DOS INPUTS E VARIAVEIS QUE REGEM O MODO DE EXIBIÇÃO DA RELA
    state = {
        inserir: '',
        codigo: '',
        userIdAtual: '',
        modoEditarFoto: false,
        nome: '',
        modoEdicao: false,
        foto: '',
        dataNascimento: '',
        mensagemSucesso: null,
        mensagemErro: null,
        listaUsuarios: []
    }


    //FUNÇÃO EXECUTANDA SEMPRE QUE O COMPONENET É ABERTO
    componentDidMount() {
        this.consultarUsuariosAtuais()
    }
// TODAS AS FUNCOES DE CODIGO HANDLE FAZEM A MESMA COISA, FECHAR MODAL DE CODIGO DE ERRO, E ATRIBUI O VALOR DIGITADO A VARIAVEL
    handleCodigo = (e) => { 
        this.fecharModal()

        //variaveis do tipo state para receber valor é daseguinte forma
        this.setState({
            codigo: e.target.value
        })
    }
// TODAS AS FUNCOES DE CODIGO HANDLE FAZEM A MESMA COISA, FECHAR MODAL DE CODIGO DE ERRO, E ATRIBUI O VALOR DIGITADO A VARIAVEL
    handleNome = (e) => {
        //fazer a modalzinha sumir
        this.fecharModal()

        //variaveis do tipo state para receber valor é daseguinte forma
        this.setState({
            nome: e.target.value
        })

    }




    fecharModal = () => {
        //fazer a modalzinha sumir
        this.setState({
            mensagemSucesso: null
        })
        //fazer o valor que esta no input sumir
        this.setState({
            inserir: ''
        })

    }

    consultarUsuariosAtuais = () => {
        axios.get('http://localhost:8081/comites')
            .then(response => {
                this.setState({
                    listaUsuarios: response.data
                })

            }).catch(erro => {


            })
    }
// ESSA FUNÇÃO VALIDA SE OS DADOS ESTÃO PREENCHIDOS E ENVIA A INFORMAÇÃO PARA O BACK-END USANDO AXIOS.PUT QUE É O METODO DE ATUALIZAÇÃO
    atualizarUsuario = () => {

        if (this.state.codigo == '') {
            console.log('entou no erro')
            this.setState({
                mensagemErro: "Código deve ser informado!"
            })

        } else if (this.state.nome == '') {
            console.log('entou no erro')
            this.setState({
                mensagemErro: "Nome deve ser informado!"
            })
        } else if (this.state.dataNascimento == '' || this.state.dataNascimento == null) {
            console.log('entou no erro')
            this.setState({
                mensagemErro: "Data de nascimento deve ser informada!"
            })

        } else {
            axios.put('http://localhost:8081/comites/atualizar-dados', {
                codigo: this.state.codigo,
                nome: this.state.nome,
                id: this.state.userIdAtual,
                dataNascimento: this.state.dataNascimento,

            })
                .then(response => {
                    //atribuir valor a uma variavel 
                    this.setState({
                        mensagemSucesso: "Atualizado com sucesso!",
                        codigo: '',
                        nome: '',
                        dataNascimento: '',
                        modoEdicao: false,

                    })
                    this.consultarUsuariosAtuais()

                }).catch(erro => {
                    //atribuir valor a uma variavel 
                    console.log('eroooo', erro.response.data)
                    console.log('imprimir erro', erro.response.data.error)
                    this.setState({
                        mensagemErro: erro.response.data.error
                    })

                })
        }
    }
// DEPENDENDO DO MODO DE EDIÇÃO, CASO SEJA TRUE, ELE ENVIAR PARA A FUNÇÃO ATUALIZAR USUARIO OU PARA CADASTRAR USUARIO
    atualizeOuCadastre = () => {
        if (this.state.modoEdicao == true) {
            this.atualizarUsuario()
        } else {
            this.cadastrarUser()
        }
    }
    // ESSA FUNÇÃO VALIDA SE OS DADOS ESTÃO PREENCHIDOS E ENVIA A INFORMAÇÃO PARA O BACK-END USANDO AXIOS
    cadastrarUser = () => {

        if (this.state.codigo == '') {
            console.log('entou no erro')
            this.setState({
                mensagemErro: "Código deve ser informado!"
            })

        } else if (this.state.nome == '') {
            console.log('entou no erro')
            this.setState({
                mensagemErro: "Nome deve ser informado!"
            })
        } else if (this.state.dataNascimento == '' || this.state.dataNascimento == null) {
            console.log('entou no erro')
            this.setState({
                mensagemErro: "Data de nascimento deve ser informada!"
            })

        } else {
            axios.post('http://localhost:8081/comites', {
                codigo: this.state.codigo,
                nome: this.state.nome,
                dataNascimento: this.state.dataNascimento,

            })
                .then(response => {
                    //atribuir valor a uma variavel 
                    this.setState({
                        mensagemSucesso: "Cadastrado com sucesso!",
                        codigo: '',
                        nome: '',
                        dataNascimento: ''
                    })
                    this.consultarUsuariosAtuais()

                }).catch(erro => {
                    //atribuir valor a uma variavel 
                    console.log('eroooo', erro.response.data)
                    console.log('imprimir erro', erro.response.data.error)
                    this.setState({
                        mensagemErro: erro.response.data.error
                    })

                })
        }
    }
    editarFoto = (idInput, nomeInput) => {
        this.setState({
            modoEditarFoto: true,
            editarFotoId: idInput,
            editarFotoNome: nomeInput,
        })

    }
    fecharModal = () => {
        this.setState({
            mensagemSucesso: null,
            mensagemErro: null
        })

    }
// TODAS AS FUNCOES DE CODIGO HANDLE FAZEM A MESMA COISA, FECHAR MODAL DE CODIGO DE ERRO, E ATRIBUI O VALOR DIGITADO A VARIAVEL

    handleDataNascimento = (e) => {
        console.log('input do e', e.target.value)
        this.fecharModal()
        //variaveis do tipo state para receber valor é daseguinte forma
        this.setState({
            dataNascimento: e.target.value
        })

        //imprimir ou acessar valores do tipo state


    }

    editarUsuarioLista = (codigoInput, nomeInput, dataInput, idInput) => {
        console.log('editar usuario e lsita', dataInput)
        this.setState({
            codigo: codigoInput,
            nome: nomeInput,
            dataNascimento: dataInput,
            userIdAtual: idInput,
            modoEdicao: true
        })

    }
// ELE CHAMA O BACK-END PARA DELETAR ESSE ID
    deletarSkill = (id) => {

        axios.delete(`http://localhost:8081/comites/${id}`)
            .then(response => {
                this.consultarUsuariosAtuais()


            }).catch(erro => {
                if (erro.response.data.error == "Recurso ja existente!") {
                    this.setState({
                        mensagemErro: "Existem pessoas associadas à esta Skill!",
                    })
                } else {
                    this.setState({
                        mensagemErro: erro.response.data.error,
                    })
                }


            })
    }
// A PARTIR AQUI É O QUE APARECE NA TELA HTML, TABELAS, BOTÕES, COR...
    render() {
        return (

            this.state.modoEditarFoto ?
                <div className="col-lg-12 fundo-login">
                    <h3 style={{ color: 'white', textAlign: 'center', paddingBottom: '2vh' }}>Editar foto do usuário {this.state.editarFotoNome}  ID: {this.state.editarFotoId}</h3>

                    <div className="login-desktop sombra text-center ">
                        <EditarFoto userId={this.state.editarFotoId}></EditarFoto>
                    </div>
                </div> :



                <div>
                    <div className="col-lg-12 fundo-login">
                        <h3 style={{ color: 'white', textAlign: 'center', paddingBottom: '2vh' }}>{this.state.modoEdicao == false ? "Criar Usuário" : "Editar Usuário (Modo Edição)"}</h3>

                        <div className="login-desktop sombra text-center ">
                            <div>
                                {/* AQUI ESTÃO OS INPUTS. TODA VEZ QUE O INPUT É ALTERADO ELES EXECUTAM A FUNÇÃO "ONCHANGE" QUE CHAMA O "HANDLECODIGO" */}
                                <label htmlFor="exampleInputEmail1">Código do Usuário</label>

                                <input value={this.state.codigo} onChange={(e) => { this.handleCodigo(e) }} type="number" className="form-control" placeholder="Código" /><p></p>
                            </div>
                            <div>
                                <label htmlFor="exampleInputEmail2">Nome do Usuário</label>

                                <input value={this.state.nome} onChange={(e) => { this.handleNome(e) }} type="text" className="form-control" placeholder="Nome Completo" /><p></p>
                            </div>
                            <label htmlFor="exampleInputEmail3">Data de Nascimento</label>
                            <input value={this.state.dataNascimento} onChange={(e) => { this.handleDataNascimento(e) }} type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="data de Nascimento" />
                            <small id="emailHelp" className="form-text text-muted"></small>
                            <br></br>
                            {/* if no react  tem um formato diferente quando tratamos dentro do html:*/}

{/* AO CLICAR NO BOTÃO SERA SOLICITADA A FUNÇÃO QUE A REALIZA O CADASTRO E ENVIA OS DADOS AO BACK-END OU ATUALIZAÇÃO */}
                            <div>
                                <button onClick={this.atualizeOuCadastre} type="button" class="btn btn-primary"> {this.state.modoEdicao == true ? "Atualizar o Usuário" : "Inserir Usuário"}</button><p></p>
                            </div>

                            {this.state.mensagemErro ?
                                <div>
                                    <div className="alert alert-dismissible alert-danger">
                                        <button onClick={this.fecharModal} type="button" className="close" data-dismiss="alert">×</button>
                                        {this.state.mensagemErro}
                                    </div>
                                </div>
                                : false}
                            {this.state.mensagemSucesso ?
                                <div>
                                    <div className="alert alert-dismissible alert-success">
                                        <button onClick={this.fecharModal} type="button" className="close" data-dismiss="alert">×</button>
                                        {this.state.mensagemSucesso}
                                    </div>
                                </div>
                                : false}
                      <div className="tabelaHorizontalWrapper" style={{ overflowX: 'auto', maxWidth: '100%'}}>
                                <table className="table table-hover" >
                                    <thead>

                                        <tr className="table-primary">
                                            <th scope="row">Usuários</th>
                                        </tr>

                                    </thead>
                                    <div>
                                    {/* AQUI APARECE A TABELA */}
                                        <table className="table table-hover">
                                            <tr>
                                                <td>Foto</td>

                                                <td>Código</td>
                                                <td>Nome</td>
                                                <td>Data Nascimento</td>
                                                <td>Editar Dados</td>
                                                <td>Editar Foto</td>

                                                <td>Excluir</td>
                                            </tr>
                                            {/* AQUI É ONDE PERCORREMOS AS LISTAS DE USUARIOS E COLOCAMOS NA TELA. PORQUE EM REACT O .MAP É O "FOR" */}
                                            {this.state.listaUsuarios.map(user => (

                                                <tr>
                                                    <td><img width='45px' style={{ borderRadius: '100%' }} src={user.urlFoto}></img></td>

                                                    <td>{user.codigo}</td>
                                                    <td>{user.nome}</td>
                                                    <td>{user.dataNascimento}</td>
                                                    <td><button onClick={(e) => this.editarUsuarioLista(user.codigo, user.nome, user.dataNascimento, user.id)} type="button" className="btn btn-outline-info" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg></button>
                                                    </td>
                                                    <td><button onClick={(e) => this.editarFoto(user.id, user.nome)} type="button" className="btn btn-outline-info" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="https://www.w3.org/2000/svg">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg></button>
                                                    </td>
                                                    <td><button onClick={(e) => this.deletarSkill(user.id)} type="button" className="btn btn-outline-info" ><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg></button>
                                                    </td>

                                                </tr>
                                            ))}
                                        </table>
                                    </div>

                                </table>
                            </div>


                        </div>
                    </div>
                </div>

        );


    }
}


export default CadastrarUsuario;