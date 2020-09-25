import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiCatalogService } from 'src/app/services/api-catalog.service';

@Component({
  selector: 'app-edit-catalog-dialog',
  templateUrl: './edit-catalog-dialog.component.html',
  styleUrls: ['./edit-catalog-dialog.component.css']
})
export class EditCatalogDialogComponent {

  constructor(public dialogRef: MatDialogRef<EditCatalogDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, public _apiCatalog: ApiCatalogService) {}

  formControl = new FormControl('', [
  Validators.required
  // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this._apiCatalog.updateIssue(this.data);
  }

}