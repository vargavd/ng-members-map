import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

/**
 * Urls:
 * https://developers.google.com/maps/documentation/javascript/examples/map-simple#maps_map_simple-html
 * 
 */


@Component({
  selector: 'app-bs5-modal',
  templateUrl: './bs5-modal.component.html',
  styleUrls: ['./bs5-modal.component.scss']
})
export class Bs5ModalComponent implements OnChanges {
  // public properties
  @Input() opened:boolean = false;
  @Input() title:string = '';

  // output events
  @Output() onCloseModal = new EventEmitter();

  // private properties
  showModal = false;
  displayBlock = false;

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    // EMULATE BOOTSTRAP MODAL BEHAVIOR
    if (changes.opened) {
      if (changes.opened.currentValue) {
        this.displayBlock = true;
        setTimeout(() => {
          this.showModal = true;
        }, 100);
      } else {
        this.showModal = false;
        setTimeout(() => {
          this.displayBlock = false;
        }, 300);
      }
    }
  }
  
}
