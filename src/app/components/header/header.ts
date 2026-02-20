import { Component, Renderer2, effect, signal, inject, HostListener } from '@angular/core';
import { WindowService } from '../../core/services/window';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    // Signal to track if the header is visible
    windowService = inject(WindowService);
    isVisible = signal(true);
    isMenuOpen = signal(false);
    private lastScrollTop = 0;
    private renderer = inject(Renderer2);

    constructor() {
	// Cet effet surveille isMenuOpen
	effect(() => {
	    if (this.isMenuOpen()) {
		this.renderer.addClass(document.body, 'no-scroll');
	    } else {
		this.renderer.removeClass(document.body, 'no-scroll');
	    }
	});
    }

    isMobile(): boolean {
	return this.windowService.isMobile();
    }

    toggleMenu() {
	this.isMenuOpen.update(v => !v);
    }
    
    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (this.isMenuOpen()) return; // Ne pas cacher si le menu est ouvert
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        this.isVisible.set(currentScroll <= this.lastScrollTop || currentScroll <= 50);
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
}
