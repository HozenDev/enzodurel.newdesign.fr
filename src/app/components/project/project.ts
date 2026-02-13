import { Component, input } from '@angular/core';
import { ProjectModel } from '../../core/models/project.model';
import { ImageDepthStack } from '../image-depth-stack/image-depth-stack';

@Component({
  selector: 'app-project',
  imports: [ImageDepthStack],
  templateUrl: './project.html',
    styleUrl: './project.scss',
})
export class Project {
    project = input.required<ProjectModel>();
}
