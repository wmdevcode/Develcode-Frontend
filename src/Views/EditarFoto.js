import React from 'react'
import FotoUploader from '../Components/FotoUploader'
import axios from 'axios';

class EditarFoto extends React.Component {

    state = {
        mensagemSucesso : '',
    }
    remover = (url) => {
        console.log('this.props.userId', this.props.userId)
        axios.put('http://localhost:8081/comites/atualizar-foto', {
            id: this.props.userId,
            urlFoto:  "vazio"

        }).then(response => {
                this.setState({
                    mensagemSucesso: "Foto removida com sucesso!",
               
                })

          

            }).catch(erroResposta => {
     
                this.setState({
                    mensagemErro: erroResposta.response.data.error,
                    
                })

            })

    }
    render() {
        const userId = this.props.userId;
        console.log('userid dentroooo', userId)

        return (
            <FotoUploader userId={userId}></FotoUploader>

           
        )

    }
}



export default EditarFoto;

