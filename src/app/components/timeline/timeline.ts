import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { TimelineEvent } from '../../core/models/timeline.model';
import { TimelineService } from '../../core/services/timeline';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-timeline',
    imports: [CommonModule],
    templateUrl: './timeline.html',
    styleUrl: './timeline.scss'
})
export class Timeline implements OnInit {

    @Input() events: TimelineEvent[] = [];
    timelineService = inject(TimelineService);
    points: any[] = [];
    isReady = false;

    ngOnInit(): void {
	this.timelineService
	    .getTimelineEvents()
	    .pipe(
		catchError((err) => {
		    console.log(err);
		    throw err;
		})
	    )
	    .subscribe((timelineEvents) => {
		this.events = timelineEvents;
		this.generatePoints();
		this.isReady = true;
	    });
    }

    get startPoint() {
	return this.points?.[0];
    }

    get endPoint() {
	return this.points?.[this.points.length - 1];
    }
    


    generatePoints() {
	if (!this.events.length) return;

	const dates = this.events.map(e => new Date(e.date).getTime());
	const min = Math.min(...dates);
	const max = Math.max(...dates);

	const width = 1000;
	const baseY = 120;

	this.points = this.events.map(e => {
	    const time = new Date(e.date).getTime();

	    const x = ((time - min) / (max - min)) * width;

	    // variation verticale
	    const importance = e.importance ?? 1;
	    const y = baseY + Math.sin(x / 120) * 40 * importance;

	    return { ...e, x, y };
	});
    }

    generatePath(): string {
	if (this.points.length < 2) return '';

	let d = `M ${this.points[0].x},${this.points[0].y}`;

	for (let i = 0; i < this.points.length - 1; i++) {
	    const p0 = this.points[i - 1] || this.points[i];
	    const p1 = this.points[i];
	    const p2 = this.points[i + 1];
	    const p3 = this.points[i + 2] || p2;

	    const cp1x = p1.x + (p2.x - p0.x) / 6;
	    const cp1y = p1.y + (p2.y - p0.y) / 6;

	    const cp2x = p2.x - (p3.x - p1.x) / 6;
	    const cp2y = p2.y - (p3.y - p1.y) / 6;

	    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
	}

	return d;
    }
}
