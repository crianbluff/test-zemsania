import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICatalog } from '../../catalog/interfaces/catalog.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

  // Communication with the parent component
  @Input() loading:boolean = false;
  @Input() error:boolean = false;
  @Input() showViewColumns:boolean = false;
  @Input() dataSource:any[] = [];
  @Input() displayedColumns:string[] = [];

  // Emmit events from this component to the parent component
  @Output() captureClickEdit = new EventEmitter();
  @Output() captureClickDelete = new EventEmitter();
  
  // Give back event of click to the parent component
  editCatalog(i, catalog:ICatalog) {
    let data = { i, catalog };
    this.captureClickEdit.emit(data);
  }

  deleteCatalog(i, catalog:ICatalog) {
    let data = { i, catalog };
    this.captureClickDelete.emit(data);
  }
}