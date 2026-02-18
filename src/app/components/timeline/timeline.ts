import { Component, input, ViewChild, effect, OnInit, ElementRef, AfterViewInit, HostListener, inject, signal } from '@angular/core';
import { TimelineEvent } from '../../core/models/timeline.model';
import { TimelineService } from '../../core/services/timeline';
import { CommonModule } from '@angular/common';
import { Observable, catchError } from 'rxjs';

@Component({
    selector: 'app-timeline',
    imports: [CommonModule],
    templateUrl: './timeline.html',
    styleUrl: './timeline.scss'
})
export class Timeline implements OnInit {
    @ViewChild('timelineWrapper', { static: true }) wrapper!: ElementRef<HTMLDivElement>;
    @ViewChild('timelinePath') timelinePath!: ElementRef<SVGPathElement>;

    // points récupérés par HTTP
    points = signal<TimelineEvent[]>([]);

    // largeur parent responsive
    parentWidth = signal(0);

    // path de la courbe
    pathD = signal('');
    timelineService = inject(TimelineService);

    // input elements
    urlEvent = input<string>('');
    show_description = input<boolean>(false);
    show_date = input<boolean>(true);
    show_title = input<boolean>(true);
    card_offset_x = input<number>(-50);
    card_offset_y = input<number>(40);
    svg_height = input<string>("300px");

    ngOnInit() {
	this.parentWidth.set(this.wrapper.nativeElement.clientWidth);
	const w = this.parentWidth();
	const pts = this.points();

	const path = this.generatePath(w);
	this.pathD.set(path);

	// charger les points depuis JSON
	this.timelineService.getTimelineEvents(this.urlEvent()).subscribe((data) => {
	    this.points.set(data);
	    this.updatePointsOnPath();
	});
    }

    @HostListener('window:resize')
    onResize() {
	this.parentWidth.set(this.wrapper.nativeElement.clientWidth);
	const w = this.parentWidth();
	const pts = this.points();

	const path = this.generatePath(w);
	this.pathD.set(path);

	// setTimeout(() => this.updatePointsOnPath(), 1000);
	this.updatePointsOnPath();
    }

    get renderedPoints(): TimelineEvent[] {
	return this.points().filter(p => p.x !== undefined && p.y !== undefined);
    }


    // recalcul des points sur la courbe
    updatePointsOnPath() {
	if (!this.timelinePath) return;
	const pathEl = this.timelinePath.nativeElement as SVGPathElement;
	if (!pathEl) return;
	const length = pathEl.getTotalLength();

	this.points.set(this.points().map(p => {
	    const distance = (p.percent / 100) * length;
	    const pt = pathEl.getPointAtLength(distance);
	    return { ...p, x: pt.x, y: pt.y };
	}));
    }

    generatePath(width: number): string {
	const h = 200;
	return `M 0,${h*0.4} C ${width*0.15},${h} ${width*0.25},${h*0.2} ${width*0.4},${h*0.3} S ${width*0.6},${h*0.9} ${width},${h/2}`;
    }
}
