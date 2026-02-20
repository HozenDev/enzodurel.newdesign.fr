import { Component, signal, inject, HostListener } from '@angular/core';
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

    isMobile(): boolean {
	return this.windowService.isMobile();
    }
    
    isVisible = signal(true);
    isMenuOpen = signal(false);
    private lastScrollTop = 0;

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
