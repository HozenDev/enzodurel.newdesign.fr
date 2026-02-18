import { Component, inject, signal, OnInit } from '@angular/core';
import { CompetencesService } from '../../core/services/competences';
import { catchError } from 'rxjs';
import { LanguageModel, TechnicalModel, SkillModel } from '../../core/models/competences.model';

@Component({
  selector: 'app-competences',
  imports: [],
  templateUrl: './competences.html',
  styleUrl: './competences.scss',
})
export class Competences implements OnInit {
    competencesService = inject(CompetencesService);

    technicalItems = signal<TechnicalModel[]>([]);
    languageItems = signal<LanguageModel[]>([]);
    aboutItem = signal<string>("");

    ngOnInit() {
	this.competencesService
	    .getSkills()
	    .pipe(
		catchError((err) => {
		    console.log(err);
		    throw err;
		})
	    )
	    .subscribe((item) => {
		this.technicalItems.set(item.technicals);
		this.languageItems.set(item.languages);
		this.aboutItem.set(item.about);
	    })
    }
}
