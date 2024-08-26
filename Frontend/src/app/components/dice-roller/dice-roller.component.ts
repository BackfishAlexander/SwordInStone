import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import DiceBox from '@3d-dice/dice-box';
import { Subscription } from 'rxjs';
import { DiceRollerService } from 'src/app/services/dice-roller.service';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.css']
})
export class DiceRollerComponent implements OnInit {
  private diceRollSubscription!: Subscription;
  diceBox = new DiceBox({
    assetPath: '/assets/dice-box/',
    theme: 'theme-rock',
    themeColor: '#cf1717',
    scale: 9,
    offscreen: true,
  })
  isBusy = false;

  constructor(
    private diceRollService: DiceRollerService
  ) {}

  ngOnInit(): void {
    this.diceRollSubscription = this.diceRollService.diceRolled.subscribe(() => {
      this.rollD20();
    });
    this.diceBox.init();
    this.diceBox.onRollComplete = () =>
      setTimeout(() => {
        this.diceBox.clear();
        this.isBusy = false;
        // this.diceBox.reset();
      }, 2000)
  }

  rollD20() {
    if (this.isBusy == false) {
      this.isBusy = true;
      this.diceBox.roll('1d20')
    }
  }
}
