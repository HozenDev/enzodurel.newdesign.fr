import { Component } from '@angular/core';
import { Timeline } from '../../components/timeline/timeline';
import { Contact } from '../../components/contact/contact';

@Component({
    selector: 'app-home',
    imports: [Timeline, Contact],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home {

}
