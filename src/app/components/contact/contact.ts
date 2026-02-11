import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
    imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
    contactForm: FormGroup;

    constructor(private fb: FormBuilder) {
	this.contactForm = this.fb.group({
	    name: ['', Validators.required],
	    email: ['', [Validators.required, Validators.email]],
	    subject: ['', Validators.required],
	    message: ['', Validators.required]
	});
    }

    onSubmit(): void {
	if (this.contactForm.valid) {
	    console.log('Form submitted:', this.contactForm.value);
	    // TODO: connect to API / email service
	    this.contactForm.reset();
	} else {
	    this.contactForm.markAllAsTouched();
	}
    }
}
