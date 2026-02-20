import { Component, inject, OnInit } from '@angular/core';
import { Timeline } from '../../components/timeline/timeline';
import { TimelineService } from '../../core/services/timeline';

@Component({
  selector: 'app-formation',
  imports: [Timeline],
  templateUrl: './formation.html',
  styleUrl: './formation.scss',
})
export class Formation implements OnInit {
    timelineService = inject(TimelineService);

    ngOnInit() {
	this.timelineService.clearHoveredEvent();
    }
}
