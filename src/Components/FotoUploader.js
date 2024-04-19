import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { storage } from '../firebase/Index'
import axios from 'axios';



class FotoUploader extends PureComponent {
    state = {
        src: null,
        salvar: false,
        fim: false,
        id: this.props.userId,
        crop: {
            unit: '%',
            width: 100,
            aspect: 16 / 16,
            carregando: false

        },
    };

   

    handleCaixaDeErro = () => {
        this.setState({
            carregando: false,
            mensagemSucesso: null,
            mensagemErro: null
        })
    }
    onSelectFile = e => {

        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
 
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
     

        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {

        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        this.setState({
            salvar: true
        })
    

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
           

            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                this.setState({
                    blob: blob
                })
                blob.name = fileName;
              
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }


    // }

    enviar = () => {

        this.setState({
            carregando: true
        })

        var data = new Date();
        var DataAtual = `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}-${data.getHours()}_${data.getMinutes()}:${data.getSeconds()}:${data.getMilliseconds()}`;

        const uploadTask = storage.ref(`FOTO/D${DataAtual}`).put(this.state.blob);
        uploadTask.on('state_changed',
            snapshot => {
                const progresso = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({
                    progress: progresso,
                    progressPerCent: progresso / 100
                })
            }, (error) => {
           
                this.setState({
                    carregando: null,
                    mensagemErro: "Houve problemas no upload da imagem! Tente novamente!",
                    mensagemSucesso: null
                })
            },
            () => {
 

                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    this.setState({
                        diretorio: url,

                    }, () => {
                        this.cadastrar(this.state.diretorio)
                   
                    })
                })

            })

    }


    cadastrar = (url) => {
        axios.put('http://localhost:8081/comites/atualizar-foto', {
            id: this.props.userId,
            urlFoto: url

        }).then(response => {
                this.setState({
                    mensagemSucesso: "Foto atualizada com sucesso!",
                    carregando: false,
                    fim: true
                })

          

            }).catch(erroResposta => {
     
                this.setState({
                    mensagemErro: erroResposta.response.data.error,
                    carregando: false
                })

            })

    }

    handleChange = (e) => {

        this.setState({ files: e.target.files }, () => {
 
        })

    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className="">
                {!this.state.fim ?
                    <div>
                        {this.state.carregando ?
                            <div className="" style={{ marginTop: '15%', marginBottom: '2%' }}>
                                Carregando ...
                            </div>
                            :
                            this.state.mensagemSucesso || this.state.mensagemErro ?
                                <div>
                                    {this.state.mensagemErro ?
                                        <div style={{ paddingLeft: '12%', paddingRight: '12%' }}>
                                            <div className="alert alert-dismissible alert-danger" >
                                                <button type="button" onClick={this.handleCaixaDeErro} className="close" data-dismiss="alert">×</button>
                                                <strong>Ops!</strong> {this.state.mensagemErro}
                                            </div></div> : false}
                                    {this.state.mensagemSucesso ?
                                        <div style={{ paddingLeft: '12%', paddingRight: '12%' }}>
                                            <div className="alert alert-dismissible alert-success" >
                                                <button type="button" onClick={this.handleCaixaDeErro} className="close" data-dismiss="alert">×</button>
                                                <strong>Ops!</strong> {this.state.mensagemSucesso}
                                            </div></div> : false}
                                </div>
                                :
                                <div>


                                    <br></br>                      <br></br>
                                    <div>
                                        <input type="file" accept="image/*" onChange={this.onSelectFile} />
                                    </div>

                                    {src && (
                                        <div>

                                            <br></br>

                                            <ReactCrop
                                                src={src}
                                                crop={crop}
                                                ruleOfThirds
                                                onImageLoaded={this.onImageLoaded}
                                                onComplete={this.onCropComplete}
                                                onChange={this.onCropChange}
                                            />
                                        </div>
                                    )}
                                    <br></br><br></br>
                                    {croppedImageUrl && (
                                        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                                    )}
                                    <br></br><br></br>
                                    {this.state.salvar ?
                                        <button type="button" onClick={(e) => this.enviar()} className="btn btn-primary btn-lg botao-tamanho">Salvar</button>
                                        : false}
                                </div>
                        }
                    </div> :
                    this.state.diretorio ?
                        <div className="row">
                            <div className="col-lg-4">
                                <img className="sombra" src={this.state.diretorio} style={{
                                    backgroundColor: '#19296B',
                                    borderRadius: '100%',

                                    width: '200px', height: '200px',

                                    //  border: '2px solid red'
                                }} />
                            </div>
                            <div className="col-lg-8">

                                <br></br>

                                <p>Sua foto foi atualizada!  Voce será direcionado para o menu inicial!</p>

                                <a href={window.location.reload()}><button type="button" class="btn btn-success" style={{ width: '250px', marginBottom: '20px' }}> Fechar essa página</button></a>

                            </div>
                        </div>
                        : false


                }
            </div>
        );
    }
}


export default FotoUploader;
ReactDOM.render(<FotoUploader />, document.getElementById('root'));
