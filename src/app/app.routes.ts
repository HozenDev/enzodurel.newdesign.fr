import { Routes } from '@angular/router';

export const routes: Routes = [
    {
	path: '',
	pathMatch: 'full',
	loadComponent: () => {
	    return import('./pages/home/home').then((m) => m.Home);
	}
    },
    {
	path: 'portfolio',
	loadComponent: () => {
	    return import('./pages/portfolio/portfolio').then((m) => m.Portfolio);
	}
    },
    {
	path: 'cv',
	loadComponent: () => {
	    return import('./pages/cv/cv').then((m) => m.Cv);
	}	
    }
];
