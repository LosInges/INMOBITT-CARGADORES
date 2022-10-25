import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Item } from '../../interfaces/item';
import { ItemsService } from '../../services/items.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  styleUrls: ['./paquete.component.scss'],
})
export class PaqueteComponent implements OnInit {
  @Input() id: string;
  @Input() total: number;
  item: Item = {
    id: "",
    id_item: "",
    foto: "Holi",
    item: "",
    total: 0,
    alto_item: 0,
    ancho_item: 0, 
  }
  constructor(
    private modalController: ModalController,
    private itemService: ItemsService
  ) { }

  ngOnInit() {
    this.item.id = this.id;
    this.item.id_item = uuidv4();
    this.item.total = this.total;
  }

  cerrar() { this.modalController.dismiss() }

  agregarItem() {
    this.itemService.postItem(this.item).subscribe((res) => {
      if (res.results) this.modalController.dismiss(this.item)
    });
  }
}