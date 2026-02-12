import { Component, signal, inject, OnInit } from '@angular/core';
import { ProjectService } from '../../core/services/project';
import { ProjectModel } from '../../core/models/project.model';
import { Project } from '../../components/project/project';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, Project],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
    projectService = inject(ProjectService);
    projectItems = signal<Array<ProjectModel>>([]);

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
