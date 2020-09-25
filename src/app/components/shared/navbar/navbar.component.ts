import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // Communication with the parent component
  @Input() title:string;
  @Input() pageIndex:number = 0;
  @Input() totalCatalog:string;
  @Input() pageSize:number = 5;

  // Emmit events from this component to the parent component
  @Output() capturePage = new EventEmitter();
  
  // Give back event of pagination to the parent component
  pageEvent(event) {
    this.capturePage.emit(event);
  }
}