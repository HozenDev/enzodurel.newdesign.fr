import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ProjectService } from '../../core/services/project';
import { ProjectModel } from '../../core/models/project.model';
import { SortOption } from '../../core/models/sort-option.type';
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
    sortOption = signal<SortOption>('date-desc');

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

    sortedProjects = computed(() => {
	const projects = [...this.projectItems()];
	const option = this.sortOption();

	return projects.sort((a, b) => {

	    switch (option) {

            case 'date-asc':
		return new Date(a.date).getTime() - new Date(b.date).getTime();

            case 'date-desc':
		return new Date(b.date).getTime() - new Date(a.date).getTime();

            case 'title-asc':
		return a.title.localeCompare(b.title);

            case 'title-desc':
		return b.title.localeCompare(a.title);

            default:
		return 0;
	    }
	});
    });

    // changer le tri depuis le template
    setSort(option: SortOption) {
	this.sortOption.set(option);
    }
}
