
import axios from 'axios';
import { delay } from 'q';

//  async function funcionarioAutorizacao(cpf) {

//     var token = 0;
   
//     var data  = await axios.get(`http://localhost:8081/funcionarios/${cpf}`)


//     if (data.data.coordenador == 1){
//         token = 1;
//     } else if ( data.data.aprovado == 8){
//         token = 8;
//     } else {
//         token = 3;
//     }
    

//     return token;
//   }


export default class AuthService {

    static isUsuarioAutenticado() {

        const token = sessionStorage.getItem('app-token');
        if (token) {
            return true;
        } else {
            return false;
        }
    }
//    static isUsuarioAutorizado() {
//         var token = 0;
//         if (sessionStorage.getItem('app-token') != null) {
//             console.log(sessionStorage.getItem('app-token'));
//             console.log(Buffer.from(sessionStorage.getItem('app-token'), 'base64').toString('ascii'));
//             var urlsplit = Buffer.from(sessionStorage.getItem('app-token'), 'base64').toString('ascii').split('{"sub":"')[1];
//             var cpf = urlsplit.substr(0, urlsplit.indexOf('"'));
       
//         }
//       var final;
//         var tokenzinho =                                (cpf).then( result => console.log("resultado co sucesso", final = result));
      
//        console.log("autorziação do usuario:", final)


//         return final;
//     }

    static userId() {

        if (sessionStorage.getItem('app-token') != null) {
         
            var urlsplit = Buffer.from(sessionStorage.getItem('app-token'), 'base64').toString('ascii').split('{"sub":"')[1];
            var cpf = urlsplit.substr(0, urlsplit.indexOf('"'));
        }
        const id = cpf;
        if (id) {
            return id;
        } else {
            return false;
        }
    }



}

