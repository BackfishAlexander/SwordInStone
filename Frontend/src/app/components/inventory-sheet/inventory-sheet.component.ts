import { Component, Input } from '@angular/core';
import { playerCharacter } from 'src/app/dtos/campaigns';

@Component({
  selector: 'app-inventory-sheet',
  templateUrl: './inventory-sheet.component.html',
  styleUrls: ['./inventory-sheet.component.css']
})
export class InventorySheetComponent {
    @Input() character!: playerCharacter;
}
