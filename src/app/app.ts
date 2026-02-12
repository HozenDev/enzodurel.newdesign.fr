import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Copyright } from './components/copyright/copyright';

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, Header, Copyright],
  template: `
    <app-header> </app-header>
    <router-outlet />
    <app-copyright> <app-copyright/>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('enzodurel.fr');
}
