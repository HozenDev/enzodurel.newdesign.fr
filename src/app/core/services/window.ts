import { Injectable, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowService {
    readonly width = signal(window.innerWidth);
    readonly height = signal(window.innerHeight);

    readonly isMobile = computed(() => this.width() < 600);
    readonly isTablet = computed(() => this.width() < 900);
    readonly isDesktop = computed(() => this.width() >= 900);

    constructor() {
	// Use RxJS fromEvent for a cleaner listener setup in services
	fromEvent(window, 'resize')
	    .pipe(takeUntilDestroyed()) // Clean up automatically
	    .subscribe(() => {
		this.width.set(window.innerWidth);
		this.height.set(window.innerHeight);
	    });
    }
}
