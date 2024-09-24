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
  @ViewChild('colorModal') colorModal!: ElementRef<HTMLElement>;
  @ViewChild('colorValue') colorValue!: ElementRef<HTMLInputElement>;
  showCharacterSheet = false;

  constructor(
    private httpService: HttpService
  ) {

  }

  openModal(modalType: 'character' | 'hp' | 'color') {
    let modalElement: HTMLElement | null = null;
    if (modalType === 'character') {
      // modalElement = this.modal.nativeElement;
      console.log("Opening character sheet...");
      this.showCharacterSheet = true;
      return;
    } else if (modalType === 'hp' && this.hpModal) {
      modalElement = this.hpModal.nativeElement;
    }
    else if (modalType === 'color' && this.colorModal) {
      modalElement = this.colorModal.nativeElement;
    }

    if (modalElement) {
      (modalElement as any).showModal();
    }
  }

  addHP(inputString: string) {
    let n: number;
    try {
      n = parseInt(inputString) || 0;
      (this.hpModal.nativeElement as any).close();
    }
    catch (e){
      console.log("ERROR ADDING HP");
      console.log(e);
      return;
    }
    // console.log(endpointList.characterHP.replace("{id}", this.character.id));
    this.httpService.postRequest(
      this.httpService.buildURL(endpointList.characterHP.replace("{id}", this.character.id)),
      {hp: Math.max(this.character.HP + n, 0)}, 'json').then(
      response => {
        console.log(response);
        this.character.HP = Math.max(this.character.HP + n, 0);
        this.character.HP = Math.min(this.character.HP, 999);
      },
      error => {
        console.log(error);
      }
    );
  }

  setHP(inputString: string) {
    let n: number;
    try {
      n = parseInt(inputString) || this.character.HP;
      (this.hpModal.nativeElement as any).close();
    }
    catch (e){
      console.log("ERROR ADDING HP");
      console.log(e);
      return;
    }
    // console.log(endpointList.characterHP.replace("{id}", this.character.id));
    this.httpService.postRequest(
      this.httpService.buildURL(endpointList.characterHP.replace("{id}", this.character.id)),
      {hp: Math.min(Math.max(n, 0), 999)}, 'json').then(
      response => {
        console.log(response);
        this.character.HP = Math.min(Math.max(n, 0), 999)
      },
      error => {
        console.log(error);
      }
    );
  }

  closeSheet() {
    this.showCharacterSheet = false;
  }

  changeColor() {
    let newColor = this.colorValue.nativeElement.value;
    this.character.sheetColor = newColor;
    this.httpService.postRequest(
      this.httpService.buildURL(endpointList.characterColor.replace("{id}", this.character.id)),
      {color: newColor}, 'json').then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
