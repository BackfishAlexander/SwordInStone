import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  @ViewChild('text') text!: ElementRef;
  @ViewChild('background') background!: ElementRef;
  @ViewChild('sky') sky!: ElementRef;
  @ViewChild('sky2') sky2!: ElementRef;
  @ViewChild('archway') archway!: ElementRef;
  @ViewChild('boulders') boulders!: ElementRef;


 constructor() {
  
 }

 @HostListener('window:scroll', ['$event'])
 onScroll() {
  let value = window.scrollY;

  this.text.nativeElement.style.marginTop = value * 0.4 + 'px';
  this.archway.nativeElement.style.marginTop = value * 0.1 + 'px';
  this.boulders.nativeElement.style.marginTop = value * 0.01 + 'px';
  this.sky.nativeElement.style.marginTop = value * -0.5 + 'px';
  this.sky2.nativeElement.style.marginTop = value * -0.5 + 'px';
 }
}
