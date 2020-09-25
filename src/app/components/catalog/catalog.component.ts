import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ApiCatalogService } from 'src/app/services/api-catalog.service';
import { ICatalog } from '../catalog/interfaces/catalog.interface';
import { EditCatalogDialogComponent } from './edit-catalog-dialog/edit-catalog-dialog.component';
import { DeleteCatalogDialogComponent } from './delete-catalog-dialog/delete-catalog-dialog.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit, OnDestroy {

  loading:boolean = false;
  error:boolean = false;
  catalogs:any = [];

  // Pagination config
  pageIndex:any = 0;
  totalCatalog:number = 120935;
  pageOffset:number = 0;
  pageSize:number = 5;

  // Columns of table catalogs
  displayedColumns: string[] = ['title', '_about', 'accessURL', 'actions']; 

  // Query params catalog
  queryParamsCatalog:any;
  
  constructor(
    private _apiCatalog:ApiCatalogService,
    private _router:Router,
    private route: ActivatedRoute,
    public dialogService: MatDialog
  ) { }

  ngOnInit() {
    this.queryParamsCatalog = this.route.queryParams.subscribe( (params:any) => {
      if ( params['pageSize'] === undefined || params['pageIndex'] === undefined ) {
        this.getAllCatalogs(5, 0);
      } else if ( isNaN(params['pageSize']) === true ||  isNaN(params['pageIndex']) === true || params['pageSize'].trim() === '' || params['pageIndex'].trim() === '' ) {
          this.getAllCatalogs(5, 0);
        } else {
            this.pageSize = params['pageSize'];
            this.pageIndex = params['pageIndex'];
            this.getAllCatalogs(this.pageSize, this.pageIndex);
          }
    });
  }

  editCatalog({i, catalog}) {    
    // this.id = id;
    // index row is used just for debugging proposes and can be removed
    // this.index = i;
    const dialogRef = this.dialogService.open(EditCatalogDialogComponent, {
      data: {title: catalog['title'], _about: catalog['_about'], accessURL: catalog['accessURL'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // console.log('bbb');
        // When using an edit things are little different, firstly we find record inside DataService by id
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        // this.refreshTable();
      }
    });
  }

  deleteCatalog({i, catalog}) {
    // this.index = i;
    // this.id = id;
    const dialogRef = this.dialogService.open(DeleteCatalogDialogComponent, {
      data: {title: catalog['title'], _about: catalog['_about'], accessURL: catalog['accessURL'] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // console.log('bbb');
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }
  
  // Logical to detect pagination but wasn't possible because API doesn't offer data about the pagination
  pageEvent(pageEvent:any) {
    pageEvent.pageIndex === 0 ? this.pageOffset = 0 : '';
    pageEvent.pageIndex === 1 ? this.pageOffset = pageEvent.pageIndex + pageEvent.pageSize - 1 : '';
    if ( pageEvent.pageIndex > 1 ) {
      this.pageIndex > pageEvent.pageIndex ? this.pageOffset = this.pageOffset - pageEvent.pageSize : this.pageOffset = this.pageOffset + pageEvent.pageSize;
    }
    this.pageIndex = pageEvent.pageIndex;
    this._router.navigate(['/catalog'], { queryParams: { pageSize: this.pageSize, pageIndex: this.pageIndex } } );
  }

  // Make a request to service to get data about catalogs
  getAllCatalogs(pageSize:number, pageIndex:number) {
    this.loading = true;
    this.error = false;
    
    this._apiCatalog.getCatalog(pageSize, pageIndex).subscribe( (data:ICatalog) => {
      // Save the data got from the request
      this.catalogs = data;
      this.catalogs = new MatTableDataSource(this.catalogs);
      this.loading = false;
    }, ( error ) => {
      console.error(error);
      this.catalogs = [];
      this.loading = false;
      this.error = true;
    });
  }

  ngOnDestroy() {
    this.queryParamsCatalog.unsubscribe();
  }
}