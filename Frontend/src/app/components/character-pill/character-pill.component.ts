import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { playerCharacter } from 'src/app/dtos/campaigns';
import { HttpService } from 'src/app/services/http.service';
import { endpointList } from 'src/environments/endpoint-list';

@Component({
  selector: 'app-character-pill',
  templateUrl: './character-pill.component.html',
  styleUrls: ['./character-pill.component.css']
})
export class CharacterPillComponent {
  @Input() character!: playerCharacter;
  @ViewChild('modal') modal!: ElementRef<HTMLElement>;
  @ViewChild('hpModal') hpModal!: ElementRef<HTMLElement>;

  constructor(
    private httpService: HttpService
  ) {

  }

  openModal(modalType: 'character' | 'hp') {
    let modalElement: HTMLElement | null = null;
    if (modalType === 'character' && this.modal) {
      modalElement = this.modal.nativeElement;
    } else if (modalType === 'hp' && this.hpModal) {
      modalElement = this.hpModal.nativeElement;
    }

    if (modalElement) {
      (modalElement as any).showModal();
    }
  }

  addHP(inputString: string) {
    let n = parseInt(inputString);
    console.log(endpointList.characterHP.replace("{id}", this.character.id));
    this.httpService.postRequest(
      this.httpService.buildURL(endpointList.characterHP.replace("{id}", this.character.id)),
      {hp: Math.max(this.character.HP + n, 0)}, 'json').then(
      response => {
        console.log(response);
        this.character.HP = Math.max(this.character.HP + n, 0);
      },
      error => {
        console.log(error);
      }
    );
  }
}
