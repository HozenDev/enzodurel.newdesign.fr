import { Injectable, inject} from '@angular/core';
import { Observable, map } from 'rxjs';
import { LanguageModel, TechnicalModel, SkillModel } from '../models/competences.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompetencesService {
    http = inject(HttpClient);

    getTechnicalSkills(): Observable<TechnicalModel[]> {
	const url: string = 'assets/data/skills.json';
	return this.http.get<SkillModel>(url)
	    .pipe(map(res => res.technicals));
    }

    getLanguageSkills(): Observable<LanguageModel[]> {
	const url: string = 'assets/data/skills.json';
	return this.http.get<SkillModel>(url)
	    .pipe(map(res => res.languages));
    }

    getAbout(): Observable<string> {
	const url: string = 'assets/data/skills.json';
	return this.http.get<SkillModel>(url)
	    .pipe(map(res => res.about));
    }

    getSkills(): Observable<SkillModel> {
	const url: string = 'assets/data/skills.json';
	return this.http.get<SkillModel>(url);
    }
}
