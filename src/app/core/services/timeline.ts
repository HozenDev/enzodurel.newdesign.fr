import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TimelineEvent } from '../models/timeline.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TimelineService {
    http = inject(HttpClient);

    getTimelineEvents(): Observable<Array<TimelineEvent>> {
	const url: string = 'assets/data/timeline.json';
	return this.http.get<Array<TimelineEvent>>(url);
    }
    
}
