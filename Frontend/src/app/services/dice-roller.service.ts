import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {
  diceRolled: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  triggerDiceRoll(): void {
    this.diceRolled.emit(); // Emit the event
  }
}
