import { Component, inject, signal, OnInit } from '@angular/core';
import { ExpProModel } from '../../core/models/exppro.model';
import { ExpproService } from '../../core/services/exppro';
import { catchError } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-exppro',
  imports: [RouterLink],
  templateUrl: './exppro.html',
  styleUrl: './exppro.scss',
})
export class Exppro implements OnInit {
    expproService = inject(ExpproService);
    expproItems = signal<ExpProModel[]>([]);

    ngOnInit() {
	this.expproService
	    .getExpProItems()
	    .pipe(
		catchError((err) => {
		    console.log(err);
		    throw err;
		})
	    )
	    .subscribe((res) => {
		this.expproItems.set(res);
	    })
    }
}
