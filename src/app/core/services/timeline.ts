import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { TimelineEvent } from '../models/timeline.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TimelineService {
    http = inject(HttpClient);

    activeEvent = signal<any | null>(null);

    getTimelineEvents(url: string): Observable<Array<TimelineEvent>> {
	return this.http.get<Array<TimelineEvent>>(url);
    }

    setHoveredEvent(event: any) {
	if (this.activeEvent() == event) {
	    this.clearHoveredEvent();
	}
	else {
	    this.activeEvent.set(event);
	}
    }

    clearHoveredEvent() {
	this.activeEvent.set(null);
    }
    
}
