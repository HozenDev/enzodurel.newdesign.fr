import { Component } from '@angular/core';
import { Profil } from '../../components/profil/profil';
import { Exppro } from '../../components/exppro/exppro';
import { Competences } from '../../components/competences/competences';
import { Formation } from '../../components/formation/formation';
import { Project } from '../../components/project/project';


@Component({
  selector: 'app-cv',
    imports: [Profil, Competences, Exppro, Formation, Project],
  templateUrl: './cv.html',
  styleUrl: './cv.scss',
})
export class Cv {

}
