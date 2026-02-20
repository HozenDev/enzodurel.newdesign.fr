import { Component, input, ViewChild, effect, OnInit, ElementRef, AfterViewInit, HostListener, inject, signal } from '@angular/core';
import { TimelineEvent } from '../../core/models/timeline.model';
import { TimelineService } from '../../core/services/timeline';
import { WindowService } from '../../core/services/window';
import { CommonModule } from '@angular/common';
import { Observable, catchError } from 'rxjs';

@Component({
    selector: 'app-timeline',
    imports: [CommonModule],
    templateUrl: './timeline.html',
    styleUrl: './timeline.scss'
})
export class Timeline implements OnInit {
    @ViewChild('timelinePath') timelinePath!: ElementRef<SVGPathElement>;
    private hostElement = inject(ElementRef);

    // points récupérés par HTTP
    points = signal<TimelineEvent[]>([]);

    // largeur parent responsive
    parentWidth = signal<number>(0);
    parentHeight = signal<number>(0);
    isVertical: boolean = false;

    // path de la courbe
    pathD = signal('');
    timelineService = inject(TimelineService);
    windowService = inject(WindowService);

    // input elements
    urlEvent = input<string>('');
    show_description = input<boolean>(false);
    show_date = input<boolean>(true);
    show_title = input<boolean>(true);
    card_offset_x = signal<number>(20);
    card_offset_y = signal<number>(-20);
    svg_height = input<string>("300px");
    timeline_height = signal<string>("500px");

    // color
    curveColor = input<string>("#5D5D5D");
    dotBgColor = input<string>("white");
    dotBorderColor = input<string>("#5D5D5D");

    updateTimeline() {
	this.parentWidth.set(this.hostElement.nativeElement.offsetWidth);
	this.parentHeight.set(this.hostElement.nativeElement.offsetHeight);
	const w = this.parentWidth();
	const h = this.parentHeight();
	const pts = this.points();

	let path = "";
	if (this.windowService.isMobile()) {
	    path = this.generateVerticalPath(w, h);
	    this.card_offset_y.set(-20);
	}
	else {
	    path = this.generatePath(w, h);
	    this.card_offset_y.set(20);
	}
	
	this.pathD.set(path);
	this.updatePointsOnPath();
    }

    cardHeight(p: TimelineEvent): number {
	let h = 0;
	if (this.windowService.isMobile()) {
	    h = this.parentHeight() / this.renderedPoints.length;
	}
	else {
	    if (p.y) {
		h = this.parentHeight() - (p.y + this.card_offset_y());
	    }
	}
	return (h > 0) ? h : 0;
    }

    cardWidth(p: TimelineEvent): number {
	let w = 0;
	if (this.windowService.isMobile()) {
	    if (p.x) {
		w = this.parentWidth() - (p.x + this.card_offset_x());
	    }
	}
	else {
	    w = this.parentWidth() / this.renderedPoints.length;
	}
	return (w > 0) ? w : 0;
    }

    /*
      Horizontale:
      [attr.x]="p.x! - cardWidth(p)/2"
      [attr.y]="p.y! + card_offset_y()"
      Verticale:
      [attr.x]="p.x! + card_offset_x()"
      [attr.y]="p.y! - cardHeight(p)/2"
    */

    cardOffsetY(p: TimelineEvent):number {
	let y = 0;
	if (!p.y) {
	    return y;
	}
	if (this.windowService.isMobile()) {
	    y = p.y - this.cardHeight(p) / 2;
	}
	else {
	    y = p.y + this.card_offset_y();
	}
	return y;
    }
    
    cardOffsetX(p: TimelineEvent):number {
	let x = 0;
	if (!p.x) {
	    return x;
	}
	if (this.windowService.isMobile()) {
	    x = p.x + this.card_offset_x();
	}
	else {
	    x = p.x - this.cardWidth(p) / 2;
	}
	return x;
    }

    ngOnInit() {
	// charger les points depuis JSON
	this.timelineService.getTimelineEvents(this.urlEvent()).subscribe((data) => {
	    this.points.set(data);
	    this.updatePointsOnPath();
	});

	this.updateTimeline();
    }

    @HostListener('window:resize')
    onResize() {
	this.updateTimeline();
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

    generatePath(w: number, h: number): string {
	return `M 0,${h*0.4} C ${w*0.15},${h} ${w*0.25},${h*0.2} ${w*0.4},${h*0.3} S ${w*0.6},${h*0.9} ${w},${h/2}`;
    }

    generateVerticalPath(w: number, h: number): string {
    return `M ${w * 0.5},0 
            C ${w * 0.8},${h * 0.5} 
              ${w * 0.2},${h * 0.5} 
              ${w * 0.5},${h}`;
    }

    generateVerticalPathNC(w: number, h: number): string {
	const centerX = 50;
	
	// Starts at the top center and draws a straight line to the bottom center
	return `M ${centerX},0 L ${centerX},${h}`;
    }
}
