import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { playerCharacter } from 'src/app/dtos/campaigns';

@Component({
  selector: 'app-character-pill',
  templateUrl: './character-pill.component.html',
  styleUrls: ['./character-pill.component.css']
})
export class CharacterPillComponent {
  @Input() character!: playerCharacter;
  @ViewChild('modal') modal!: ElementRef<HTMLElement>;

  openModal() {
    if (this.modal && this.modal.nativeElement) {
      (this.modal.nativeElement as any).showModal();
    }
  }
}
