import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Cargador } from 'src/app/fletes/interfaces/cargador';
import { CargadoresService } from 'src/app/fletes/services/cargadores.service';
import { FotoService } from './../services/foto.service';
import { SessionService } from 'src/app/services/session.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  api = environment.api;
  confirmPassword = '';
  apellidoPat = '';
  apellidoMat = '';
  cargador: Cargador = {
    rfc: '',
    nombre: '',
    apellido: '',
    password: '',
    telefono: '',
    foto: '',
    empresa: '',
  };

  constructor(
    private sessionService: SessionService,
    private cargadoresService: CargadoresService,
    private fotoService: FotoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.sessionService.get('rfc').then((rfc) => {
      if (rfc) {
        this.sessionService.get('empresa').then((empresa) => {
          if (empresa) {
            this.cargadoresService
              .getCargador(empresa, rfc)
              .subscribe((cargador) => {
                this.cargador = cargador;
                this.apellidoPat = this.cargador.apellido.split(' ')[0];
                this.apellidoMat = this.cargador.apellido.split(' ')[1];
              });
          }
        });
      }
    });
  }

  tomarFotografia() {
    this.fotoService.tomarFoto().then((photo) => {
      // this.fotoService.subirMiniatura(photo.webPath).subscribe((data) => {
      //   console.log(data);
      // });
      console.log(photo);
      const reader = new FileReader();
      const datos = new FormData();
      reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
          type: `image/${photo.format}`,
        });
        datos.append('img', imgBlob, `imagen.${photo.format}`);
        this.fotoService
          .subirMiniatura(datos)
          .subscribe((res) => (this.cargador.foto = res.path));
      };
      const consulta = fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
  }

  async actualizarPerfil() {
    let alert: HTMLIonAlertElement;
      alert = await this.alertController.create({
        header: 'Confirmar Contraseña',
        inputs: [
          {
            name: 'password',
            placeholder: 'Contraseña',
            type: 'text',

          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            role: 'accept',
            handler: (data) => {
              if(data.password === this.cargador.password){
                this.cargador.apellido = this.apellidoPat + ' ' + this.apellidoMat
                this.cargadoresService.postCargador(this.cargador).subscribe((resultado) => 
                    {
                      if (resultado.results) {
                        console.log('EXITOSO');
                      }
                    });
              } 
              else {
                this.alertController.create({
                  header: 'Contraseña',
                  message: 'Contraseña INCORRECTA',
                  buttons: ['Aceptar'],
                }).then(a=>a.present());
              }
            },
          },
        ],
      });
    await alert.present();
  }
      
}

//this.confirmPassword === this.cargador.password