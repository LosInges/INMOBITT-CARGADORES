import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PaqueteComponent } from '../paquete/paquete.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-paquete',
  templateUrl: './detalle-paquete.component.html',
  styleUrls: ['./detalle-paquete.component.scss'],
})
export class DetallePaqueteComponent implements OnInit {
  items: Item[] = [];
  total = 0;
  id: string;
  api = environment.api;
  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((parametros) => {
      this.id = parametros.id;
      this.itemService.getItems(parametros.id).subscribe((items) => {
        this.items = items;
        this.total = items[0] ? items[0].total : 0;
      });
    });
  }

  eliminar(item: Item) {
    if (this.items.length > 1) {
      this.itemService.deleteItem(item.id, item.id_item).subscribe((val) => {
        if (val.results) {
          this.items = this.items.filter((i) => item !== i);
        } else {
          console.log(val);
        }
      });
    } else {
      this.itemService.deleteUltimoItem(item.id).subscribe((val) => {
        if (val.results) {
          this.items = [];
        } else {
          console.log(val);
        }
      });
    }
  }

  async agregarItem() {
    const modal = await this.modalController.create({
      component: PaqueteComponent,
      componentProps: { id: this.id, total: this.total },
    });
    modal.onDidDismiss().then((item) => {
      if (!item.data) {
        return;
      }
      if (this.items) {
        const total = item.data.total;
        this.items.push(item.data);
        this.items = this.items.map((i) => {
          i.total = total;
          return i;
        });
      } else {
        this.items = [item.data];
      }
    });
    return await modal.present();
  }

  async verDetalle(item: Item) {
    const modal = await this.modalController.create({
      component: PaqueteComponent,
      componentProps: {
        id: this.id,
        total: this.total,
        agregando: false,
        editando: true,
        item,
      },
    });
    return await modal.present();
  }

  async cambiarTotal() {
    let alert: HTMLIonAlertElement;
    if (this.items.length > 0) {
      alert = await this.alertController.create({
        header: 'Total',
        inputs: [
          {
            name: 'total',
            placeholder: 'Total del paquete',
            type: 'number',
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
              this.total = data.total;
              if (this.items.length > 0) {
                this.items = this.items.map((i) => {
                  i.total = data.total;
                  return i;
                });
                this.itemService.postItem(this.items[0]).subscribe((val) => {
                  if (val.results) {
                    console.log('Total actualizado');
                  } else {
                    console.log(val);
                  }
                });
              }
            },
          },
        ],
      });
    } else {
      alert = await this.alertController.create({
        header: 'Total',
        message: 'No hay items en el paquete',
        buttons: ['Aceptar'],
      });
    }

    await alert.present();
  }
}
