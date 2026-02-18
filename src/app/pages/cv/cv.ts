import { Component } from '@angular/core';
import { Profil } from '../../components/profil/profil';
import { Exppro } from '../../components/exppro/exppro';
import { Competences } from '../../components/competences/competences';
import { Formation } from '../../components/formation/formation';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-cv',
    imports: [Profil, Competences, Exppro, Formation, Contact],
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
})
export class Cv {

}
