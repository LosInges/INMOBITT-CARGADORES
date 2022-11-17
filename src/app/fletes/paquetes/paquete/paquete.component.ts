import { Component, Input, OnInit } from '@angular/core';
import { FotoService } from 'src/app/services/foto.service';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { ModalController } from '@ionic/angular';
import { environment } from './../../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { AlertController } from '@ionic/angular';

/* eslint-disable @typescript-eslint/naming-convention */

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {
  @Input() id: string;
  @Input() total: number;
  @Input() agregando = true;
  @Input() editando = false;
  @Input() item: Item = {
    id: '',
    id_item: '',
    foto: '',
    item: '',
    total: 0,
    alto_item: 0,
    ancho_item: 0,
  };
  foto = '';
  api = environment.api;
  constructor(
    private modalController: ModalController,
    private itemService: ItemsService,
    private fotoService: FotoService,
    private alertCtrl: AlertController
  ) {}

  async mostrarAlerta(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result); 
  }

  ngOnInit() {
    if (this.agregando) {
      this.item.id = this.id;
      this.item.id_item = uuidv4();
    } else {
      this.foto = `img/${this.item.foto.split('/').pop()}`;
    }
  }

  cerrar() {
    this.modalController.dismiss();
  }

  agregarItem() {
    if(
      this.item.alto_item.toString().length <= 0 ||
      this.item.ancho_item.toString().length <= 0 
    ){
      this.mostrarAlerta("Error", "Campos vacios", "No deje espacios en blanco.")
    }else{
      this.itemService.postItem(this.item).subscribe((res) => {
        if (res.results) {
          this.modalController.dismiss(this.item);
        }
      });
    } 
  }

  tomarFotografia() {
    this.fotoService.tomarFoto().then((photo) => {
      // this.fotoService.subirMiniatura(photo.webPath).subscribe((data) => {
      //   console.log(data);
      // });
      const reader = new FileReader();
      const datos = new FormData();
      reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
          type: `image/${photo.format}`,
        });
        datos.append('img', imgBlob, `imagen.${photo.format}`);
        this.fotoService.subirImgMiniatura(datos).subscribe((res) => {
          this.item.foto = res.miniatura;
          this.foto = `img/${res.miniatura.split('/').pop()}`;
        });
      };
      fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
  }
}
