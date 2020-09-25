import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

export const ROUTES:Routes = [
	{
		path: 'catalog',
		component: CatalogComponent
	},
	
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'catalog'
	}
];