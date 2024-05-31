import { Component } from '@angular/core';
import { DNDBeyondCharacter } from 'src/app/interfaces/DNDBeyondCharacter';
import { HttpService } from 'src/app/services/http.service';
import { CharacterUtils } from 'src/app/utils/character-utils';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  inputLink: string = ''; // Holds the value of the input box
  displayText: string = 'Initial text'; // Initial text for the <p> element

  constructor(private http: HttpService) {

  }

  submitLink(): void {
    let characterId: string = ''; // Variable to hold the isolated ID
    // This function will be called when the submit button is clicked.
    // Update the displayText property based on inputLink.
    const segments = this.inputLink.split('/');
    characterId = segments[segments.length - 1];

    this.http.getRequest<DNDBeyondCharacter>('http://localhost:8080/public/dndbeyond/' + characterId, 'json')
    .then(character => {
      let stats = CharacterUtils.calculateCharacterStats(character);
      this.displayText = `You submitted: ${character.data.name}
      \nSTR: ${stats.STR}
      \nDEX: ${stats.DEX}
      \nCON: ${stats.CON}
      \nINT: ${stats.INT}
      \nWIS: ${stats.WIS}
      \nCHA: ${stats.CHA}
      `
      ;
    })
    .catch(error => {
      this.displayText = error;
    });
  }
}
