import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";

// Angula Material
import { MatTableModule, MatPaginatorModule,
  MatSortModule, MatIconModule,
  MatDatepickerModule, MatNativeDateModule,
  MatInputModule, MatToolbarModule,
  MatProgressBarModule, MatButtonModule,
  MatDialogModule
} from '@angular/material';

// Routes
import { ROUTES } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { DataTableComponent } from './components/shared/data-table/data-table.component';
import { EditCatalogDialogComponent } from './components/catalog/edit-catalog-dialog/edit-catalog-dialog.component';
import { DeleteCatalogDialogComponent } from './components/catalog/delete-catalog-dialog/delete-catalog-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    NavbarComponent,
    LoadingComponent,
    DataTableComponent,
    EditCatalogDialogComponent,
    DeleteCatalogDialogComponent,
  ],

  entryComponents: [
    EditCatalogDialogComponent,
    DeleteCatalogDialogComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES, { useHash: true } ),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule
  ],

  providers: [],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }