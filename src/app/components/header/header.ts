import { Component, signal, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    // Signal to track if the header is visible
    isVisible = signal(true);
    private lastScrollTop = 0;

    @HostListener('window:scroll', [])
    onWindowScroll() {
	const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

	// 1. Scrolling Down -> Hide Header
	if (currentScroll > this.lastScrollTop && currentScroll > 50) {
	    this.isVisible.set(false);
	} 
	// 2. Scrolling Up -> Show Header
	else {
	    this.isVisible.set(true);
	}

	// Update last scroll position (avoiding negative values on mobile)
	this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
}
