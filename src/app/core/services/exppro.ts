import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpProModel } from '../models/exppro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExpproService {
    http = inject(HttpClient);

    getExpProItems(): Observable<ExpProModel[]> {
	const url: string = 'assets/data/exppro.json';
	return this.http.get<ExpProModel[]>(url);
    }
}
