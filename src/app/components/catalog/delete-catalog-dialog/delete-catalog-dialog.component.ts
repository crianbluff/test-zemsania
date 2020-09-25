import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiCatalogService } from 'src/app/services/api-catalog.service';

@Component({
  selector: 'app-delete-catalog-dialog',
  templateUrl: './delete-catalog-dialog.component.html',
  styleUrls: ['./delete-catalog-dialog.component.css']
})
export class DeleteCatalogDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCatalogDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, public _apiCatalog: ApiCatalogService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this._apiCatalog.deleteIssue(this.data.title);
  }

}