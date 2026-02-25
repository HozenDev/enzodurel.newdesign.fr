import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
    imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
    contactForm: FormGroup;
    isSending = false;

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    onSubmit(formNativeElement: HTMLFormElement): void {
        if (this.contactForm.valid) {
            this.isSending = true; // On commence l'envoi

            emailjs.sendForm(
                'service_ykk8vgt',
                'template_gz51cpt',
                formNativeElement,
                'pT7y-bNDvgWdfcfqM')
                .then(() => {
                    alert('Mail envoyé avec succès!');
                    this.contactForm.reset();
                })
                .catch((error) => {
                    console.error('Erreur :', error);
                    alert('Une erreur est survenue.');
                })
                .finally(() => {
                    this.isSending = false; // On libère le bouton
                });
        } else {
            this.contactForm.markAllAsTouched();
        }
    }
}
