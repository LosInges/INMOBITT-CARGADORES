import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../../interfaces/item';
import { PaqueteComponent } from '../paquete/paquete.component';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-detalle-paquete',
  templateUrl: './detalle-paquete.component.html',
  styleUrls: ['./detalle-paquete.component.scss'],
})
export class DetallePaqueteComponent implements OnInit {
  items: Item[] = []
  total: number
  id: string
  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemsService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros.id
      this.itemService.getItems(parametros.id).subscribe(items => {
        this.items = items
        this.total = items[0] ? items[0].total : 0
      })
    })
  }

  eliminar(item: Item) {
    if (this.items.length > 1)
      this.itemService.deleteItem(item.id, item.id_item).subscribe(val => {
        if (val.results) this.items = this.items.filter(i => item != i)
        else console.log(val)
      })
    else this.itemService.deleteUltimoItem(item.id).subscribe(val => {
      if (val.results) this.items = []
      else console.log(val)
    })
  }

  async agregarItem() {
    const modal = await this.modalController.create({
      component: PaqueteComponent,
      componentProps: { id: this.id, total: this.total }
    })
    modal.onDidDismiss().then((item) => {
      if (!item.data) return
      if (this.items) {
        let total = item.data.total
        this.items.push(item.data)
        this.items = this.items.map(item => {
          item.total = total
          return item
        })
      } else this.items = [item.data]
    })
    return await modal.present();
  }


}
