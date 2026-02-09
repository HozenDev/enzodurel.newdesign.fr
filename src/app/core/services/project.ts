import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
    http = inject(HttpClient);

    getProjects(): Observable<Array<Project>> {
	const url: string = 'assets/data/projects.json';
	return this.http.get<Array<Project>>(url);
    }
}
