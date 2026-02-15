import { Component } from '@angular/core';
import { Timeline } from '../../components/timeline/timeline';
import { Contact } from '../../components/contact/contact';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [Timeline, Contact, RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class Home {

}
