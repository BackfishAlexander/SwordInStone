import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { playerCharacter } from 'src/app/dtos/campaigns';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { endpointList } from 'src/environments/endpoint-list';

@Component({
  selector: 'app-character-pill',
  templateUrl: './character-pill.component.html',
  styleUrls: ['./character-pill.component.css']
})
export class CharacterPillComponent implements OnInit, OnDestroy {
  @Input() character!: playerCharacter;
  @ViewChild('modal') modal!: ElementRef<HTMLElement>;
  @ViewChild('hpModal') hpModal!: ElementRef<HTMLElement>;
  @ViewChild('colorModal') colorModal!: ElementRef<HTMLElement>;
  @ViewChild('colorValue') colorValue!: ElementRef<HTMLInputElement>;

  activeTab = 1;

  showCharacterSheet = false;
  inventoryOnTop = false;

  private colorChangeInterval: any;
  private hue: number = 0; // Initial hue value
  isMe = false;
  isSubscriber = false;


  constructor(
    private httpService: HttpService,
    private auth: AuthenticationService
  ) {

  }

  ngOnInit() {
    // if (this.character.ownerId === "b0b24d90-ee24-432f-aa5f-3fb3644ac023") {
    //   this.character.rainbowSheet = true;
    // }
    if (this.character.rainbowSheet && this.character.owner.isSubscriber) {
      this.startRainbowEffect();
    }

    this.isMe = this.auth.getUsername() === this.character.owner.username;

    if (this.character.owner.isSubscriber) {
      this.isSubscriber = true;
    }
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.colorChangeInterval) {
      clearInterval(this.colorChangeInterval);
    }
  }



  swapSheets() {
    // Swap the sheets only on medium or larger screens
    this.inventoryOnTop = !this.inventoryOnTop;
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
    if (this.character.rainbowSheet) {
      this.httpService.postRequest(
        this.httpService.buildURL(endpointList.characterRainbow.replace("{id}", this.character.id)),
        {rainbow: true}, 'json').then(
        response => {
          console.log(response);
          (this.colorModal.nativeElement as any).close();
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.httpService.postRequest(
        this.httpService.buildURL(endpointList.characterColor.replace("{id}", this.character.id)),
        {color: newColor, rainbow: false}, 'json').then(
        response => {
          console.log(response);
          (this.colorModal.nativeElement as any).close();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  tabClick(n: number) {
    this.activeTab = n;
  }

  updateRainbow() {
    console.log("switching rainbow to " + this.character.rainbowSheet);
    if (!this.character.rainbowSheet && this.character.owner.isSubscriber) {
      clearInterval(this.colorChangeInterval);
      this.startRainbowEffect();
    }
    else {
      clearInterval(this.colorChangeInterval);
    }
  }

  startRainbowEffect() {
      // If rainbowSheet is true, start the color change interval
      this.colorChangeInterval = setInterval(() => {
        // Increment hue value between 0 and 360 for the HSL color model
        this.hue = (this.hue + 1) % 360; // Cycle through 0 to 360

        // Convert the hue to an HSL color and then to HEX
        const newColor = this.hslToHex(this.hue, 100, 50); // Full saturation, 50% lightness
        this.character.sheetColor = newColor;

        // Optionally, you can also post the color change to the backend if needed
        // this.httpService.postRequest(
        //   this.httpService.buildURL(endpointList.characterColor.replace("{id}", this.character.id)),
        //   { color: newColor }, 'json'
        // ).then(
        //   response => {
        //     console.log(response);
        //   },
        //   error => {
        //     console.log(error);
        //   }
        // );
      }, 25); // Change hue every 50 milliseconds for smooth transition
  }

  // Function to convert HSL to Hex
  hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
    return `#${f(0).toString(16).padStart(2, '0')}${f(8).toString(16).padStart(2, '0')}${f(4).toString(16).padStart(2, '0')}`;
  }
}
