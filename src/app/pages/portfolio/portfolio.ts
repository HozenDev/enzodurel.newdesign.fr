import { Component, signal, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project'
import { Project } from '../../core/models/project.model'
import { catchError } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
    projectService = inject(ProjectService);
    projectItems = signal<Array<Project>>([]);

    ngOnInit(): void {
	this.projectService
	    .getProjects()
	    .pipe(
		catchError((err) => {
		    console.log(err);
		    throw err;
		})
	    )
	    .subscribe((projects) => {
		this.projectItems.set(projects);
	    });
    }
}
