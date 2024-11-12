import { Component, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/Item';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent {
    @Input() item!: Item
}
