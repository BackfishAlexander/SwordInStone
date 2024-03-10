import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  //This is 
  statToPlus(num: number) {
      let r = (num - 10) / 2;
      if (r < 0) {
        return "" + r;
      }
      else {
        return "+" + r;
      }
  }
}
